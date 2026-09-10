import React from 'react';
import { createRipple, RippleOptions } from '../utils/ripple';

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  centered?: boolean;
  className?: string;
}

/**
 * Reusable wrapper component that automatically confines and renders
 * a Material Design ripple on tap/click.
 */
export const RippleContainer: React.FC<RippleProps> = ({
  children,
  color,
  duration = 500,
  centered = false,
  className = '',
  onPointerDown,
  ...props
}) => {
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    createRipple(e, e.currentTarget, { color, duration, centered });
    onPointerDown?.(e);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Reusable React Hook to attach ripple to any component
 */
export function useRipple<T extends HTMLElement = HTMLElement>(options?: RippleOptions) {
  const handlePointerDown = (e: React.PointerEvent<T> | React.MouseEvent<T> | React.TouchEvent<T>) => {
    createRipple(e, e.currentTarget, options);
  };

  return {
    onPointerDown: handlePointerDown,
  };
}
