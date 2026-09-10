import React, { useEffect, useRef, useState, useMemo } from 'react';

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  wordClassName?: string;
  delay?: number; // Base delay in ms
  stagger?: number; // Delay per word in ms (e.g. 50-80ms)
  duration?: number; // Duration of word transition in ms (e.g. 350-450ms)
  distance?: number; // Distance in px for translateY slide-up (e.g. 10-15px)
  threshold?: number;
  id?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  as: Component = 'div',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 65,
  duration = 400,
  distance = 12,
  threshold = 0.1,
  id,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold]);

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  return (
    <Component
      ref={containerRef as any}
      className={className}
      id={id}
      aria-label={text}
    >
      {/* Screen reader only for clean, accessible text reading */}
      <span className="sr-only">{text}</span>
      {/* Visual stagger animation */}
      <span aria-hidden="true" className="inline">
        {words.map((word, idx) => {
          const wordDelay = delay + idx * stagger;
          return (
            <span
              key={`${word}-${idx}`}
              className={`inline-block whitespace-pre transition-all ease-out ${wordClassName}`}
              style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${wordDelay}ms`,
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated
                  ? 'translate3d(0, 0, 0)'
                  : `translate3d(0, ${distance}px, 0)`,
                willChange: hasAnimated ? 'auto' : 'opacity, transform',
              }}
            >
              {word}
              {idx < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </span>
    </Component>
  );
};
