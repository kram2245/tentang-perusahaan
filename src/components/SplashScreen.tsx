import React, { useEffect, useState } from 'react';
import sucofindoLogo from '../assets/images/sucofindo_logo_1785141877598.jpg';

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number; // default duration before fadeout starts in ms
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 900,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Start fade out after specified duration (e.g., 0.9s)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration);

    // Complete removal after fade transition (400ms)
    const removeTimer = setTimeout(() => {
      setIsMounted(false);
      if (onFinish) {
        onFinish();
      }
    }, duration + 400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onFinish]);

  if (!isMounted) return null;

  return (
    <aside
      aria-label="Loading Screen"
      aria-hidden={isFadingOut}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 text-white transition-all duration-400 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-sm mx-auto">
        
        {/* Logo Container with Smooth Pulse/Glow */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 to-blue-500 rounded-3xl blur opacity-30 animate-pulse" />
          <div className="relative bg-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center justify-center transition-transform duration-500 hover:scale-105">
            <img
              src={sucofindoLogo}
              alt="Logo PT Sucofindo"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm"
            />
          </div>
        </div>

        {/* Company Title */}
        <div className="space-y-1.5 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-['Poppins',sans-serif]">
            PT SUCOFINDO
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-navy-900 border border-gold-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-gold-400 uppercase">
              Unit Pelayanan Duri
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 tracking-wider pt-1">
            Inspeksi • Pengujian • Sertifikasi • Konsultasi
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-3">
          {/* Animated Spinner with Gold Accent */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-navy-800 border-t-gold-400 animate-spin" />
            <div className="absolute w-2 h-2 rounded-full bg-gold-400" />
          </div>

          {/* 3 Staggered Dots Animation */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 animate-bounce" />
          </div>
        </div>

      </div>

      {/* Subtle Bottom Credit Line */}
      <div className="absolute bottom-6 text-[11px] text-slate-500 tracking-widest uppercase">
        BUMN Untuk Indonesia
      </div>
    </aside>
  );
};
