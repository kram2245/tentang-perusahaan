import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, CheckCircle2, ArrowLeft, PhoneCall, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { ServiceData } from '../data/services';

interface ServiceDetailViewProps {
  service: ServiceData;
  onBack: () => void;
  onContactClick: () => void;
  theme?: 'dark' | 'light';
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  onBack,
  onContactClick,
  theme = 'dark',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setImageLoaded(false);
  }, [service]);

  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-fadeIn transition-colors duration-300 ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-navy-950 text-slate-100'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Top Header Navigation / Back Action Bar */}
        <div
          className={`flex items-center justify-between gap-3 mb-5 pt-2 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-navy-800'
          }`}
        >
          {/* "Kembali ke Beranda" Button with arrow left */}
          <button
            type="button"
            onClick={onBack}
            className={`relative overflow-hidden cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all shadow-sm group ${
              isLight
                ? 'bg-white border-slate-200 hover:border-navy-700 hover:bg-slate-100 text-navy-900 hover:text-navy-950'
                : 'bg-navy-900 border-navy-700 hover:border-gold-400 hover:bg-navy-850 text-white hover:text-gold-300'
            }`}
            id="btn-back-to-home"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1.5 transition-transform ${isLight ? 'text-navy-700' : 'text-gold-400'}`} />
            <span className="group-hover:underline underline-offset-4 decoration-gold-500">Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                onContactClick();
              }}
              className={`relative overflow-hidden cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-navy-950 text-xs sm:text-sm font-extrabold transition-all ${
                isLight
                  ? 'bg-gold-500 hover:bg-gold-400 shadow-md'
                  : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 shadow-[0_0_14px_rgba(245,158,11,0.3)] hover:shadow-[0_0_22px_rgba(245,158,11,0.5)]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Hubungi Kami</span>
            </a>

            {/* "X" Close Button */}
            <button
              type="button"
              onClick={onBack}
              className={`relative overflow-hidden cursor-pointer inline-flex items-center justify-center p-2 rounded-xl border transition-all shadow-sm ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-600 hover:text-navy-900'
                  : 'bg-navy-900 border-navy-700 hover:border-gold-400/60 hover:bg-navy-800 text-slate-300 hover:text-white'
              }`}
              title="Tutup (Kembali ke Beranda)"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-xs font-semibold mb-6 flex-wrap ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          <button 
            onClick={onBack} 
            className={`transition-colors flex items-center gap-1 ${isLight ? 'hover:text-navy-900' : 'hover:text-white'}`}
          >
            <Home className="w-3.5 h-3.5 text-gold-500" />
            <span>Beranda</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button 
            onClick={onBack} 
            className={`transition-colors ${isLight ? 'hover:text-navy-900' : 'hover:text-white'}`}
          >
            Ruang Lingkup
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={`font-bold px-2.5 py-0.5 rounded-md ${isLight ? 'bg-navy-100 text-navy-900' : 'bg-navy-800 text-gold-400 border border-navy-700'}`}>
            {service.shortTitle || service.title}
          </span>
        </nav>

        {/* Full-width Header / Banner Image with Skeleton & Dark Gradient Overlay */}
        <div className="w-full relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200/90 mb-8 bg-slate-900 group min-h-[220px] sm:min-h-[300px] md:min-h-[380px] flex items-end">
          {/* Skeleton Loader while Image is Loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/40 to-transparent animate-shimmer" />
            </div>
          )}

          <img
            src={service.image}
            alt={service.title}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100 hover:scale-[1.02]' : 'opacity-0 scale-105'
            }`}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-navy-950/20 backdrop-blur-[1px] pointer-events-none z-10" />

          {/* Overlay Text Content (Small Label "Layanan" & Large Title) */}
          <div className="relative z-20 p-6 sm:p-8 md:p-10 w-full space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-500 text-navy-950 font-extrabold text-xs tracking-wider uppercase shadow-md">
              <span>Layanan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
              {service.modalTitle || service.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow flex items-center gap-2 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
              <span>{service.category} • PT Sucofindo Unit Pelayanan Duri</span>
            </p>
          </div>
        </div>

        {/* Detailed Paragraph Description */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border shadow-xl mb-8 space-y-4 transition-colors ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-navy-900/80 backdrop-blur-xs border-white/15 text-slate-200'
          }`}
        >
          <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>Deskripsi & Layanan Utama</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed font-normal ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            {service.fullDetail}
          </p>

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 pt-3 border-t ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
            {service.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  isLight
                    ? 'bg-slate-100 text-navy-800 border-slate-200'
                    : 'bg-navy-950/80 text-gold-300 border-white/10'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scope of Work Features List */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border shadow-xl mb-10 transition-colors ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-navy-900/80 backdrop-blur-xs border-white/15'
          }`}
        >
          <h2 className={`text-xl sm:text-2xl font-extrabold mb-6 flex items-center gap-3 ${isLight ? 'text-navy-900' : 'text-white'}`}>
            <div className="w-10 h-10 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span>Cakupan Layanan Utama</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {service.features.map((feature, fIdx) => (
              <div
                key={fIdx}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 group ${
                  isLight
                    ? 'bg-slate-50 border-slate-200/80 hover:border-navy-300 hover:bg-slate-100'
                    : 'bg-navy-950/80 border-white/10 hover:border-gold-500/50 hover:bg-navy-850/60'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:text-white transition-colors" />
                </div>
                <span className={`text-sm font-bold leading-snug ${isLight ? 'text-navy-900' : 'text-slate-100'}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className={`rounded-2xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border ${
          isLight
            ? 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 border-navy-700'
            : 'bg-navy-900/80 backdrop-blur-xs border-white/15'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">
              Butuh Layanan {service.shortTitle || service.title}?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Tim tenaga ahli tersertifikasi Sucofindo Unit Pelayanan Duri siap membantu konsultasi & pelaksanaan pengujian teknis sesuai standar regulasi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={onBack}
              className="relative overflow-hidden cursor-pointer w-full sm:w-auto px-5 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-600 text-slate-300 font-bold text-xs transition-colors"
            >
              Kembali
            </button>
            
            <a
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                onContactClick();
              }}
              className={`relative overflow-hidden cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl text-navy-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 group ${
                isLight
                  ? 'bg-gold-500 hover:bg-gold-400 shadow-lg'
                  : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_28px_rgba(245,158,11,0.55)]'
              }`}
            >
              <span>Konsultasi & Penawaran</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

