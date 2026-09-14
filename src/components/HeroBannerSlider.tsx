import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, ImageIcon, ShieldCheck, AlertCircle } from 'lucide-react';

interface SlideItem {
  id: string;
  image: string;
  alt: string;
  isClone?: boolean;
  realIndex: number;
}

// 5 Official Banner Images (16:9 Landscape format)
const BANNER_IMAGES = [
  {
    url: 'https://i.ibb.co/F4g4ZyWx/937911.png',
    alt: 'PT Sucofindo Unit Pelayanan Duri Banner 1 - Layanan Inspeksi & Sertifikasi Terpercaya',
  },
  {
    url: 'https://i.ibb.co/hRbYrPhH/937914.png',
    alt: 'PT Sucofindo Unit Pelayanan Duri Banner 2 - Keandalan Operasional & Kualitas Berkelanjutan',
  },
  {
    url: 'https://i.ibb.co/3m5bg0k1/937915.png',
    alt: 'PT Sucofindo Unit Pelayanan Duri Banner 3 - Pengujian Laboratorium & Fasilitas Energi',
  },
  {
    url: 'https://i.ibb.co/kVSfXZWh/937916.png',
    alt: 'PT Sucofindo Unit Pelayanan Duri Banner 4 - Solusi Komprehensif Industri Hulu & Hilir Migas',
  },
  {
    url: 'https://i.ibb.co/KjLyvjh6/937917.png',
    alt: 'PT Sucofindo Unit Pelayanan Duri Banner 5 - Keselamatan Kerja, K3, dan Kepatuhan Regulasi',
  },
];

const TOTAL_REAL_SLIDES = BANNER_IMAGES.length; // 5 slides

// Carousel slide structure with boundary clones for seamless 100% infinite loop in consistent direction
// [Clone Banner 5, Real 1, Real 2, Real 3, Real 4, Real 5, Clone Banner 1]
const carouselSlides: SlideItem[] = [
  {
    id: 'clone-prev',
    image: BANNER_IMAGES[TOTAL_REAL_SLIDES - 1].url,
    alt: BANNER_IMAGES[TOTAL_REAL_SLIDES - 1].alt,
    isClone: true,
    realIndex: TOTAL_REAL_SLIDES - 1, // 4 (0-indexed)
  },
  ...BANNER_IMAGES.map((b, idx) => ({
    id: `real-${idx}`,
    image: b.url,
    alt: b.alt,
    isClone: false,
    realIndex: idx,
  })),
  {
    id: 'clone-next',
    image: BANNER_IMAGES[0].url,
    alt: BANNER_IMAGES[0].alt,
    isClone: true,
    realIndex: 0,
  },
];

const AUTO_SLIDE_DURATION = 3000; // Exactly 3 seconds as requested

interface HeroBannerSliderProps {
  theme?: 'dark' | 'light';
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  // Start at real index 0 (which is position 1 in the 7-element array: [clone-last, real-0, real-1, real-2, real-3, real-4, clone-first])
  const [currentIndex, setCurrentIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  // Active real index for dot indicators (0, 1, 2, 3, 4)
  const activeDotIndex = carouselSlides[currentIndex]?.realIndex ?? 0;

  // Track image load and error status per banner URL
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (url: string) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  const handleImageError = (url: string) => {
    setErrorImages((prev) => ({ ...prev, [url]: true }));
  };

  // Pause condition: user hover (desktop), touch/hold (mobile), or browser tab hidden
  const isPaused = isHovered || isTouching || isTabHidden;

  // Handle seamless infinite loop snapping on CSS transition end
  const handleTransitionEnd = useCallback(() => {
    // Total items in array: 7 (index 0 to 6)
    // Index 6 is clone of real-0 (Banner 1) -> Snap back to index 1 instantly without transition
    if (currentIndex === TOTAL_REAL_SLIDES + 1) {
      setEnableTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // Index 0 is clone of real-4 (Banner 5) -> Snap forward to index 5 instantly without transition
      setEnableTransition(false);
      setCurrentIndex(TOTAL_REAL_SLIDES);
    }
  }, [currentIndex]);

  // Re-enable CSS transition after instantaneous snap
  useEffect(() => {
    if (!enableTransition) {
      // Use double requestAnimationFrame to ensure browser has painted the snap position before re-enabling transition
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [enableTransition]);

  // Move to next slide (sliding consistently from right to left)
  const handleNext = useCallback(() => {
    setEnableTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Move to previous slide
  const handlePrev = useCallback(() => {
    setEnableTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Move directly to selected slide via dots (targetRealIndex: 0 to 4)
  const handleSelectDot = (targetRealIndex: number) => {
    if (targetRealIndex === activeDotIndex) return;
    setEnableTransition(true);
    // targetRealIndex 0 maps to index 1, 1 maps to 2, 2 maps to 3, etc.
    setCurrentIndex(targetRealIndex + 1);
  };

  // Automated 3-second infinite slide timer (pauses on hover, touch, or hidden tab)
  useEffect(() => {
    if (isPaused) {
      return;
    }

    const intervalId = setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_DURATION);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused, handleNext]);

  // Preload first banner image on mount for instant LCP loading
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = BANNER_IMAGES[0].url;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Pause auto-sliding when the browser tab is hidden to prevent interval pile-up
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
    isSwipingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current) return;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isSwipingRef.current) {
      isSwipingRef.current = false;
      const diff = touchStartXRef.current - touchEndXRef.current;
      // 40px threshold for swipe detection
      if (diff > 40) {
        handleNext();
      } else if (diff < -40) {
        handlePrev();
      }
    }
    setIsTouching(false);
  };

  const handleTouchCancel = () => {
    isSwipingRef.current = false;
    setIsTouching(false);
  };

  return (
    <div
      id="hero-banner-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero Banner Slider PT Sucofindo Unit Pelayanan Duri"
      className={`relative w-full overflow-hidden bg-navy-950 select-none h-[220px] xs:h-[260px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[500px] shadow-xl transition-colors ${
        isLight ? 'border-b border-slate-200' : 'border-b border-navy-800/80'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Preload ONLY the first banner image for fastest initial paint without network congestion */}
      <link rel="preload" as="image" href={BANNER_IMAGES[0].url} />

      {/* Horizontal Carousel Track with Hardware-Accelerated Smooth Slide */}
      <div
        className={`flex w-full h-full will-change-transform ${
          enableTransition
            ? 'transition-transform duration-700 ease-in-out'
            : 'transition-none'
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {carouselSlides.map((slide, idx) => {
          const isLoaded = Boolean(loadedImages[slide.image]);
          const isError = Boolean(errorImages[slide.image]);
          const isFirstImage = idx === 1; // Real index 0 (first slide visible on page load)

          return (
            <div
              key={`${slide.id}-${idx}`}
              className="min-w-full w-full h-full flex-shrink-0 relative overflow-hidden bg-navy-950"
              aria-hidden={slide.realIndex !== activeDotIndex}
            >
              {/* 1. SKELETON LOADER (Visible while image is loading and no error occurred) */}
              {!isLoaded && !isError && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-navy-900 overflow-hidden"
                  aria-label="Memuat banner gambar..."
                >
                  {/* Shimmer sweep effect across the entire skeleton box */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                  
                  {/* Skeleton Pulse Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-4 text-center select-none animate-pulse">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-navy-800 border border-navy-700/80 flex items-center justify-center text-navy-400 shadow-inner">
                      <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7 text-gold-400/60 animate-pulse" />
                    </div>
                    <div className="space-y-2 flex flex-col items-center">
                      <div className="h-3.5 sm:h-4 w-36 sm:w-48 bg-navy-800/90 rounded-full" />
                      <div className="h-2.5 sm:h-3 w-24 sm:w-32 bg-navy-800/60 rounded-full" />
                    </div>
                  </div>

                  {/* Subtle technological grid texture */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
                </div>
              )}

              {/* 2. ERROR FALLBACK (Visible if image fails to load due to network issues) */}
              {isError && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 p-6 text-center select-none border border-navy-800/80 overflow-hidden"
                  role="alert"
                >
                  {/* Subtle ambient gold radial glow */}
                  <div className="absolute w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center max-w-md mx-auto space-y-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-navy-800/90 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-xl">
                      <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <div className="space-y-1">
                      <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/15 text-gold-300 border border-gold-400/30">
                        PT SUCOFINDO (PERSERO)
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-white">
                        Unit Pelayanan Duri
                      </h3>
                      <p className="text-xs text-slate-300 max-w-xs sm:max-w-sm mx-auto">
                        Layanan Inspeksi, Pengujian Laboratorium, Sertifikasi & Konsultansi
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-amber-300 bg-navy-950/80 px-3 py-1 rounded-full border border-amber-400/25 shadow-sm">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Banner sedang tidak dapat dimuat dari server gambar</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. 16:9 Landscape Foreground Image with Smooth Fade-In and Eager/Lazy Strategy */}
              <img
                src={slide.image}
                alt={slide.alt}
                referrerPolicy="no-referrer"
                loading={isFirstImage ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={isFirstImage ? 'high' : undefined}
                onLoad={() => handleImageLoad(slide.image)}
                onError={() => handleImageError(slide.image)}
                className={`w-full h-full object-cover object-center block pointer-events-none select-none transition-opacity duration-700 ease-in-out ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Subtle soft gradient at the bottom so navigation indicators always have stellar contrast */}
              <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none z-10" />
            </div>
          );
        })}
      </div>

      {/* Left Navigation Arrow Button (‹) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Lihat gambar banner sebelumnya"
        title="Gambar sebelumnya"
        id="btn-banner-prev"
        className="cursor-pointer absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-navy-950/75 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 hover:border-gold-400 shadow-xl flex items-center justify-center transition-all duration-200 backdrop-blur-md hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Right Navigation Arrow Button (›) */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Lihat gambar banner selanjutnya"
        title="Gambar selanjutnya"
        id="btn-banner-next"
        className="cursor-pointer absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-navy-950/75 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 hover:border-gold-400 shadow-xl flex items-center justify-center transition-all duration-200 backdrop-blur-md hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pause Indicator Badge when user hovers or holds touch */}
      {isPaused && (
        <div className="absolute top-3 sm:top-4 left-4 sm:left-6 z-20 pointer-events-none transition-opacity duration-200">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-navy-950/80 text-gold-300 border border-gold-400/30 backdrop-blur-md shadow-md">
            <Pause className="w-3 h-3 text-gold-400 animate-pulse" />
            <span>Jeda (Disentuh / Hover)</span>
          </span>
        </div>
      )}

      {/* Dot Indicators at Bottom Center (5 dots for 5 images) */}
      <div
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/20 shadow-xl"
        role="tablist"
        aria-label="Pilih gambar banner"
      >
        {BANNER_IMAGES.map((_, dotIdx) => {
          const isActive = dotIdx === activeDotIndex;
          return (
            <button
              key={`dot-${dotIdx}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Beralih ke banner ${dotIdx + 1}`}
              id={`banner-dot-${dotIdx + 1}`}
              onClick={() => handleSelectDot(dotIdx)}
              className={`cursor-pointer rounded-full transition-all duration-300 focus:outline-none ${
                isActive
                  ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-gold-400 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.7)]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          );
        })}
      </div>

      {/* Slide Counter on Top Right: e.g. 1 / 5 */}
      <div className="absolute top-3 sm:top-4 right-4 sm:right-6 z-20 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-navy-950/80 text-white/95 border border-white/20 backdrop-blur-md shadow-md">
          {activeDotIndex + 1} / {TOTAL_REAL_SLIDES}
        </span>
      </div>
    </div>
  );
};
