import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  theme?: 'dark' | 'light';
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ theme = 'dark' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const shouldShow = scrollY > 300;

      if (shouldShow !== isVisibleRef.current) {
        isVisibleRef.current = shouldShow;
        setIsVisible(shouldShow);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    toggleVisibility(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
      id="btn-scroll-to-top"
      className={`fixed bottom-6 right-6 sm:bottom-7 sm:right-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 overflow-hidden cursor-pointer print:hidden ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-6 pointer-events-none scale-90'
      } ${
        isLight
          ? 'bg-gold-500 hover:bg-gold-400 text-navy-950 border-2 border-white/80 shadow-gold-500/20'
          : 'bg-gold-500 hover:bg-gold-400 text-navy-950 border-2 border-navy-900 shadow-gold-500/30'
      } hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gold-400/50`}
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform duration-200" />
    </button>
  );
};

