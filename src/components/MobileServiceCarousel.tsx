import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { ScopeItem } from '../types';

export interface ExtendedScopeItem extends ScopeItem {
  serviceId: string;
  categoryName: string;
  themeColor: {
    accent: string;
    badgeBgLight: string;
    badgeTextLight: string;
    badgeBgDark: string;
    badgeTextDark: string;
    hoverBorderLight: string;
    hoverBorderDark: string;
    hoverShadowLight: string;
    hoverShadowDark: string;
    glowGradient: string;
    iconBgLight: string;
    iconBgDark: string;
  };
}

interface MobileServiceCarouselProps {
  items: ExtendedScopeItem[];
  theme: 'dark' | 'light';
  onSelectService?: (serviceId: string) => void;
  onOpenModal: (item: ExtendedScopeItem) => void;
  renderIcon: (iconName: string, className?: string) => React.ReactNode;
}

export const MobileServiceCarousel: React.FC<MobileServiceCarouselProps> = ({
  items,
  theme,
  onSelectService,
  onOpenModal,
  renderIcon,
}) => {
  const isLight = theme === 'light';
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number; scrollLeft: number } | null>(null);
  const touchLastRef = useRef<{ x: number; y: number } | null>(null);
  const isEdgeGestureRef = useRef(false);
  const isDirectionLockedRef = useRef(false);
  const isHorizontalSwipeRef = useRef(false);
  const isDraggingRef = useRef(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Function to smoothly scroll container to center a specific card
  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.children;
    if (!cards[index]) return;

    const card = cards[index] as HTMLElement;
    // Center the card in the viewport so the next card peeks on the right (or previous on the left)
    const targetScroll = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: smooth ? 'smooth' : 'auto',
    });

    setActiveIndex(index);
  }, []);

  // Update active index based on current scroll position
  const updateActiveByScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    if (closestIndex !== activeIndexRef.current) {
      setActiveIndex(closestIndex);
    }
  }, []);

  // Attach native touch handlers with { passive: false } to allow e.preventDefault()
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Edge dead zone in pixels: if touch starts within 20px from screen edges,
    // do NOT intercept it. Let Android/browser handle it as native back/forward edge swipe.
    const DEAD_ZONE_PX = 20;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const screenWidth = window.innerWidth;

      // 1. Dead zone check (15-20px from left/right screen edge)
      if (touch.clientX <= DEAD_ZONE_PX || touch.clientX >= screenWidth - DEAD_ZONE_PX) {
        isEdgeGestureRef.current = true;
        isDraggingRef.current = false;
        return;
      }

      // Valid carousel touch within the content area
      isEdgeGestureRef.current = false;
      isDirectionLockedRef.current = false;
      isHorizontalSwipeRef.current = false;
      isDraggingRef.current = false;

      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
        scrollLeft: container.scrollLeft,
      };
      touchLastRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      // If swipe started from screen edge, do not interfere (allow native Android back gesture)
      if (isEdgeGestureRef.current || !touchStartRef.current) return;

      const touch = e.touches[0];
      touchLastRef.current = { x: touch.clientX, y: touch.clientY };

      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Determine gesture direction once movement exceeds threshold
      if (!isDirectionLockedRef.current) {
        if (Math.abs(deltaX) > 7 || Math.abs(deltaY) > 7) {
          isDirectionLockedRef.current = true;
          // If horizontal movement is stronger than vertical, lock to carousel swipe
          isHorizontalSwipeRef.current = Math.abs(deltaX) > Math.abs(deltaY);
        }
      }

      if (isHorizontalSwipeRef.current) {
        // Prevent default to stop browser back/forward history navigation
        if (e.cancelable) {
          e.preventDefault();
        }
        isDraggingRef.current = true;
        // Direct tracking with zero lag
        container.scrollLeft = touchStartRef.current.scrollLeft - deltaX;
      }
    };

    const handleTouchEnd = () => {
      if (isEdgeGestureRef.current || !touchStartRef.current || !touchLastRef.current) {
        touchStartRef.current = null;
        touchLastRef.current = null;
        isEdgeGestureRef.current = false;
        return;
      }

      if (isHorizontalSwipeRef.current) {
        const deltaX = touchLastRef.current.x - touchStartRef.current.x;
        const currentIdx = activeIndexRef.current;
        const SWIPE_THRESHOLD = 36; // minimum displacement to switch cards

        let targetIdx = currentIdx;
        if (deltaX < -SWIPE_THRESHOLD) {
          targetIdx = Math.min(items.length - 1, currentIdx + 1);
        } else if (deltaX > SWIPE_THRESHOLD) {
          targetIdx = Math.max(0, currentIdx - 1);
        } else {
          // Snap to closest card if swipe was slight
          const containerCenter = container.scrollLeft + container.clientWidth / 2;
          const cards = container.children;
          let closestIndex = currentIdx;
          let minDistance = Infinity;

          for (let i = 0; i < cards.length; i++) {
            const card = cards[i] as HTMLElement;
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = i;
            }
          }
          targetIdx = closestIndex;
        }

        scrollToIndex(targetIdx, true);

        // Keep dragging flag for a brief moment to suppress accidental click on release
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 70);
      }

      touchStartRef.current = null;
      touchLastRef.current = null;
      isDirectionLockedRef.current = false;
      isHorizontalSwipeRef.current = false;
    };

    const handleTouchCancel = () => {
      touchStartRef.current = null;
      touchLastRef.current = null;
      isEdgeGestureRef.current = false;
      isDirectionLockedRef.current = false;
      isHorizontalSwipeRef.current = false;
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [items.length, scrollToIndex]);

  return (
    <div className="md:hidden">
      {/* Scrollable Container with touch-action: pan-y and overscroll containment */}
      <div
        ref={containerRef}
        onScroll={updateActiveByScroll}
        className="flex overflow-x-auto gap-3.5 px-5 pt-2 pb-5 no-scrollbar scroll-smooth relative"
        style={{
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
        }}
        id="mobile-service-carousel"
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          const handleCardClick = () => {
            if (isDraggingRef.current) return;
            if (onSelectService) {
              onSelectService(item.serviceId);
            } else {
              onOpenModal(item);
            }
          };

          return (
            <div
              key={item.id}
              onClick={handleCardClick}
              className={`w-[84vw] max-w-[340px] shrink-0 rounded-2xl p-5 border-2 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between overflow-hidden relative select-none ${
                isActive
                  ? 'scale-100 opacity-100 shadow-xl'
                  : 'scale-[0.95] opacity-75'
              } ${
                isLight
                  ? `bg-white border-slate-200 shadow-md ${item.themeColor.hoverBorderLight} ${item.themeColor.hoverShadowLight}`
                  : `bg-navy-900 border-navy-800 shadow-xl ${item.themeColor.hoverBorderDark} ${item.themeColor.hoverShadowDark}`
              }`}
              id={`scope-mobile-item-${item.id}`}
            >
              {/* Background Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.themeColor.glowGradient} ${
                  isActive ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300 pointer-events-none`}
              />

              {/* Top Header: Badge, Number, and Icon */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-black font-mono leading-none ${
                        isLight
                          ? 'text-navy-900/40'
                          : 'text-gold-400 font-extrabold'
                      }`}
                    >
                      {item.numberStr}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isLight ? item.themeColor.badgeBgLight : item.themeColor.badgeBgDark
                      }`}
                    >
                      {item.categoryName}
                    </span>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs border ${
                      isLight ? item.themeColor.iconBgLight : item.themeColor.iconBgDark
                    }`}
                  >
                    {renderIcon(item.icon, 'w-5 h-5')}
                  </div>
                </div>

                <h3 className={`text-lg font-extrabold leading-snug mb-2 ${isLight ? 'text-navy-900' : 'text-white'}`}>
                  {item.title}
                </h3>

                <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isLight
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-navy-950 text-slate-200 border border-navy-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className={`relative z-10 pt-3 border-t ${
                isLight ? 'border-slate-200' : 'border-navy-800'
              }`}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isDraggingRef.current) return;
                    if (onSelectService) {
                      onSelectService(item.serviceId);
                    } else {
                      onOpenModal(item);
                    }
                  }}
                  className={`relative overflow-hidden w-full py-2.5 rounded-xl font-extrabold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 ${
                    isLight
                      ? 'bg-navy-900 text-white active:bg-navy-950'
                      : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 text-navy-950 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  }`}
                  id={`mobile-detail-btn-${item.id}`}
                >
                  <span>Detail Layanan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator & Swipe Hint */}
      <div className="flex flex-col items-center justify-center gap-2 mt-2">
        <div className="flex items-center gap-2">
          {items.map((_, dotIdx) => {
            const isActive = dotIdx === activeIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToIndex(dotIdx, true)}
                aria-label={`Lihat layanan ${dotIdx + 1}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  isActive
                    ? isLight
                      ? 'w-7 h-2 bg-navy-900'
                      : 'w-7 h-2 bg-gradient-to-r from-amber-400 to-gold-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : isLight
                    ? 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/40'
                }`}
              />
            );
          })}
        </div>
        <span className={`text-[11px] font-medium tracking-wide flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          <span>Geser untuk melihat layanan lainnya</span>
          <span className="font-bold opacity-80">({activeIndex + 1}/{items.length})</span>
        </span>
      </div>
    </div>
  );
};
