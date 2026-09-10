import React, { useRef, useState, useEffect, useCallback } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (8-10 max)
  scale?: number; // Scale on hover (1.02 - 1.05)
  perspective?: number; // Perspective distance in px (e.g. 1000)
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.025,
  perspective = 1000,
  style,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  // Detect desktop environment (hover capability and fine pointer, e.g. mouse)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIsDesktop = () => {
      const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isWideEnough = window.innerWidth >= 768;
      setIsDesktop(hasFinePointer && isWideEnough);
    };

    checkIsDesktop();

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    mediaQuery.addEventListener?.('change', checkIsDesktop);
    window.addEventListener('resize', checkIsDesktop);

    return () => {
      mediaQuery.removeEventListener?.('change', checkIsDesktop);
      window.removeEventListener('resize', checkIsDesktop);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop) {
        onMouseEnter?.(e);
        return;
      }
      setIsHovered(true);
      setTiltStyle({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      });
      onMouseEnter?.(e);
    },
    [isDesktop, perspective, scale, onMouseEnter]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop) {
        onMouseMove?.(e);
        return;
      }

      const card = cardRef.current;
      if (!card) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Cursor position relative to card boundaries
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Normalized between -1 and 1
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        // Invert Y axis for natural 3D tilt: cursor at top tilts card away
        const rotateX = Number((-percentY * maxTilt).toFixed(2));
        const rotateY = Number((percentX * maxTilt).toFixed(2));

        // Glare percentage coordinates (0 - 100%)
        const glareX = Number(((x / rect.width) * 100).toFixed(1));
        const glareY = Number(((y / rect.height) * 100).toFixed(1));
        setGlarePos({ x: glareX, y: glareY });

        setTiltStyle({
          transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        });
      });

      onMouseMove?.(e);
    },
    [isDesktop, maxTilt, perspective, scale, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop) {
        onMouseLeave?.(e);
        return;
      }

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      setIsHovered(false);
      setTiltStyle({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        willChange: 'auto',
      });

      onMouseLeave?.(e);
    },
    [isDesktop, perspective, onMouseLeave]
  );

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        ...(isDesktop ? tiltStyle : {}),
        transformStyle: isDesktop ? 'preserve-3d' : undefined,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Subtle dynamic sheen/glare that follows the cursor on desktop */}
      {isDesktop && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-1"
          style={{
            opacity: isHovered ? 0.45 : 0,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.12), transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

