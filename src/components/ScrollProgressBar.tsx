import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;

      const totalScrollable = documentHeight - windowHeight;
      if (totalScrollable > 0 && barRef.current) {
        const progress = Math.min(1, Math.max(0, scrollTop / totalScrollable));
        barRef.current.style.transform = `scaleX(${progress})`;
      } else if (barRef.current) {
        barRef.current.style.transform = 'scaleX(0)';
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress(); // initial execution

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-[3.5px] bg-black/10 z-[100] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 origin-left will-change-transform shadow-[0_0_8px_rgba(234,179,8,0.6)]"
        style={{ transform: 'scaleX(0)' }}
        role="progressbar"
        aria-label="Kemajuan membaca halaman"
      />
    </div>
  );
};

