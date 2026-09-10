/**
 * Material Design Tap Ripple Utility for PT Sucofindo Unit Pelayanan Duri
 * Provides high-performance, 60fps hardware-accelerated ripple effects
 * on touch and click across all interactive elements.
 */

import type React from 'react';

export interface RippleOptions {
  color?: string;
  duration?: number; // Duration in ms (default 500ms)
  centered?: boolean;
}

/**
 * Calculates optimal ripple color based on target element's background and text luminance
 */
export function getOptimalRippleColor(element: HTMLElement): string {
  // 1. Check if custom ripple color attribute is set
  const customAttrColor = element.getAttribute('data-ripple-color');
  if (customAttrColor) return customAttrColor;

  const style = window.getComputedStyle(element);

  // 2. Check if element has bright gold / yellow background (e.g. CTA buttons)
  const isGoldBg =
    element.classList.contains('bg-gold-500') ||
    element.classList.contains('bg-gold-400') ||
    element.className.includes('from-amber-400') ||
    element.className.includes('bg-gradient-to-br');

  if (isGoldBg) {
    // Dark ripple provides sharp, beautiful contrast against bright gold
    return 'rgba(3, 10, 22, 0.26)';
  }

  // 3. Inspect text color and background luminance
  const colorStr = style.color; // e.g., "rgb(255, 255, 255)"
  const rgbMatch = colorStr.match(/\d+/g);

  let textLuminance = 255;
  if (rgbMatch && rgbMatch.length >= 3) {
    const [r, g, b] = rgbMatch.map(Number);
    // Standard relative luminance formula
    textLuminance = 0.299 * r + 0.587 * g + 0.114 * b;
  }

  const isLightMode =
    document.documentElement.classList.contains('light-theme') ||
    !document.documentElement.classList.contains('dark');

  // If text is dark (luminance <= 140) or element explicitly has dark text in light mode
  if (
    textLuminance < 140 ||
    element.classList.contains('text-navy-950') ||
    element.classList.contains('text-slate-900') ||
    element.classList.contains('text-slate-800') ||
    element.classList.contains('text-slate-700')
  ) {
    return 'rgba(15, 23, 42, 0.20)';
  }

  // If text is light / white (e.g., dark surfaces, dark mode cards, navy buttons)
  if (textLuminance >= 140 || !isLightMode) {
    return 'rgba(255, 255, 255, 0.28)';
  }

  return 'rgba(255, 255, 255, 0.28)';
}

/**
 * Creates a circular ripple expanding from the tap/click point
 */
export function createRipple(
  event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement> | React.PointerEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
  customTarget?: HTMLElement,
  options?: RippleOptions
): void {
  const target = (customTarget ||
    (event.currentTarget as HTMLElement) ||
    (event.target as HTMLElement))?.closest(
    'button, a[href], [role="button"], .ripple-target, [id^="scope-item-"], [id^="scope-mobile-item-"], .cursor-pointer'
  ) as HTMLElement | null;

  if (!target) return;

  // Respect opt-out attribute
  if (target.getAttribute('data-no-ripple') === 'true') return;

  // Ensure target has position relative & overflow hidden so ripple stays cleanly bounded
  const computedStyle = window.getComputedStyle(target);
  if (computedStyle.position === 'static') {
    target.style.position = 'relative';
  }
  if (computedStyle.overflow !== 'hidden') {
    target.style.overflow = 'hidden';
  }

  const rect = target.getBoundingClientRect();

  // Extract coordinates from Pointer / Mouse / Touch event
  let clientX = 0;
  let clientY = 0;

  if ('touches' in event && event.touches && event.touches.length > 0) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else if ('changedTouches' in event && event.changedTouches && event.changedTouches.length > 0) {
    clientX = event.changedTouches[0].clientX;
    clientY = event.changedTouches[0].clientY;
  } else if ('clientX' in event && typeof event.clientX === 'number') {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    clientX = rect.left + rect.width / 2;
    clientY = rect.top + rect.height / 2;
  }

  // Keyboard trigger (Enter or Space) fallback: center the ripple
  const isKeyboardTrigger =
    clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;

  const x = options?.centered || isKeyboardTrigger ? rect.width / 2 : clientX - rect.left;
  const y = options?.centered || isKeyboardTrigger ? rect.height / 2 : clientY - rect.top;

  // Calculate radius needed to reach the farthest corner of the element
  const distX = Math.max(x, rect.width - x);
  const distY = Math.max(y, rect.height - y);
  const radius = Math.hypot(distX, distY);
  const size = Math.round(radius * 2.2); // 2.2x ensures comfortable coverage with smooth edges

  const rippleColor = options?.color || getOptimalRippleColor(target);
  const duration = options?.duration || 500;

  // Create DOM ripple element
  const ripple = document.createElement('span');
  ripple.className = 'material-ripple-circle';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${Math.round(x - size / 2)}px`;
  ripple.style.top = `${Math.round(y - size / 2)}px`;
  ripple.style.backgroundColor = rippleColor;
  ripple.style.animationDuration = `${duration}ms`;

  target.appendChild(ripple);

  // Self-destruct after animation completes
  const removeRipple = () => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  };

  ripple.addEventListener('animationend', removeRipple, { once: true });
  setTimeout(removeRipple, duration + 100);
}

/**
 * Initializes global delegation for Tap Ripple on all buttons, links, and cards
 * Uses passive pointerdown listener for instant 0ms response without blocking scrolling
 */
export function initGlobalRipple(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handlePointerDown = (e: PointerEvent) => {
    // Only respond to primary click (left button or finger touch)
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const rawTarget = e.target as HTMLElement | null;
    if (!rawTarget) return;

    // Ignore text inputs, textareas, selects
    if (rawTarget.closest('input, textarea, select, [contenteditable="true"]')) {
      return;
    }

    // Find nearest interactive element
    const target = rawTarget.closest(
      'button, a[href], [role="button"], .ripple-target, [id^="scope-item-"], [id^="scope-mobile-item-"], .cursor-pointer'
    ) as HTMLElement | null;

    if (!target) return;

    if (target.getAttribute('data-no-ripple') === 'true') return;

    createRipple(e, target);
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown);
  };
}
