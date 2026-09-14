import React, { useState } from 'react';
import { Layers, Activity, Zap, TreePine, Flame, Award, Shield, Cpu, CheckCircle, ChevronRight, X, PhoneCall } from 'lucide-react';
import { ScopeItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { TextReveal } from './TextReveal';
import { TiltCard } from './TiltCard';
import { MobileServiceCarousel, ExtendedScopeItem } from './MobileServiceCarousel';

interface ScopeOfWorkProps {
  onSelectService?: (serviceId: string) => void;
  theme?: 'dark' | 'light';
}

export const ScopeOfWork: React.FC<ScopeOfWorkProps> = ({ onSelectService, theme = 'dark' }) => {
  const [selectedScope, setSelectedScope] = useState<ScopeItem | null>(null);
  const isLight = theme === 'light';

  const scopeList: ExtendedScopeItem[] = [
    {
      id: 2,
      serviceId: 'migas',
      numberStr: '01',
      title: 'Inspeksi & Sertifikasi Migas',
      categoryName: 'Sektor Migas & Energi',
      description: 'Layanan inspeksi kelayakan tangki, bejana tekan, & fasilitas produksi migas.',
      icon: 'Flame',
      themeColor: {
        accent: 'yellow',
        badgeBgLight: 'bg-amber-100 text-amber-900 border-amber-300',
        badgeTextLight: 'text-amber-900',
        badgeBgDark: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
        badgeTextDark: 'text-amber-300',
        hoverBorderLight: 'hover:border-amber-400',
        hoverBorderDark: 'hover:border-yellow-400/90',
        hoverShadowLight: 'hover:shadow-[0_16px_36px_-6px_rgba(234,179,8,0.24)]',
        hoverShadowDark: 'hover:shadow-[0_0_24px_rgba(234,179,8,0.25)]',
        glowGradient: 'from-yellow-500/10 via-yellow-500/5 to-transparent',
        iconBgLight: 'bg-amber-50 text-amber-600 border-amber-200/80',
        iconBgDark: 'bg-navy-950 text-amber-400 border-amber-500/40 shadow-[0_0_14px_rgba(234,179,8,0.28)]',
      },
      features: [
        'Inspeksi Peralatan Putar',
        'Inspeksi Peralatan Listrik',
        'Inspeksi Pesawat Angkat',
        'Inspeksi Bejana Tekan',
        'Inspeksi Alat Pengaman',
        'Inspeksi Tangki',
        'Inspeksi Pipa Penyalur',
        'Instalasi Umum'
      ],
      tags: ['Area Migas', 'Pipa Penyalur', 'Bejana Tekan', 'Instalasi Umum', 'Tangki']
    },
    {
      id: 3,
      serviceId: 'inspeksi-sertifikasi',
      numberStr: '02',
      title: 'Inspeksi & Sertifikasi Industri',
      categoryName: 'K3 Kemnaker & DJK',
      description: 'Layanan inspeksi K3 Kemnaker dan Keselamatan Ketenagalistrikan (DJK) untuk kepatuhan industri.',
      icon: 'Shield',
      themeColor: {
        accent: 'blue',
        badgeBgLight: 'bg-blue-100 text-blue-900 border-blue-200',
        badgeTextLight: 'text-blue-900',
        badgeBgDark: 'bg-blue-950/80 text-blue-300 border-blue-500/50',
        badgeTextDark: 'text-blue-300',
        hoverBorderLight: 'hover:border-blue-400',
        hoverBorderDark: 'hover:border-blue-400/90',
        hoverShadowLight: 'hover:shadow-[0_16px_36px_-6px_rgba(59,130,246,0.22)]',
        hoverShadowDark: 'hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]',
        glowGradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
        iconBgLight: 'bg-blue-50 text-blue-600 border-blue-200/80',
        iconBgDark: 'bg-navy-950 text-blue-400 border-blue-500/40 shadow-[0_0_14px_rgba(59,130,246,0.28)]',
      },
      features: [
        'Inspeksi Boiler (Pesawat Uap)',
        'K3 Listrik dan Penangkal Petir',
        'Inspeksi Pesawat Tenaga & Produksi',
        'Inspeksi Proteksi Kebakaran (Alarm, Fire System, Hidran)',
        'Inspeksi Elevator/Lift',
        'Welding Inspeksi',
        'Inspeksi SLO PLTD',
        'Inspeksi Instalasi Listrik (SLO)',
        'Personil PDKB'
      ],
      tags: ['Area Industri', 'K3 Kemnaker', 'DJK', 'Boiler', 'SLO Listrik']
    },
    {
      id: 1,
      serviceId: 'ndt',
      numberStr: '03',
      title: 'Non Destructive Test (NDT)',
      categoryName: 'Uji Material & NDT',
      description: 'Pengujian material dan keutuhan struktur tanpa merusak komponen peralatan.',
      icon: 'Activity',
      themeColor: {
        accent: 'amber',
        badgeBgLight: 'bg-amber-100 text-amber-900 border-amber-200',
        badgeTextLight: 'text-amber-900',
        badgeBgDark: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
        badgeTextDark: 'text-amber-300',
        hoverBorderLight: 'hover:border-amber-400',
        hoverBorderDark: 'hover:border-amber-400/90',
        hoverShadowLight: 'hover:shadow-[0_16px_36px_-6px_rgba(245,158,11,0.24)]',
        hoverShadowDark: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
        glowGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
        iconBgLight: 'bg-amber-50 text-amber-600 border-amber-200/80',
        iconBgDark: 'bg-navy-950 text-amber-400 border-amber-500/40 shadow-[0_0_14px_rgba(245,158,11,0.28)]',
      },
      features: [
        'Ultrasonic Testing (UT)',
        'Radiographic Testing (RT)',
        'Magnetic Particle Inspection (MPI)',
        'Liquid Penetrant Testing (PT)'
      ],
      tags: ['NDT', 'Ultrasonic', 'Radiografi', 'Inspeksi Material']
    },
    {
      id: 4,
      serviceId: 'ebtke',
      numberStr: '04',
      title: 'Inspeksi & Sertifikasi EBTKE (Geothermal)',
      categoryName: 'EBTKE & Panas Bumi',
      description: 'Layanan inspeksi & teknis Energi Baru Terbarukan dan Konservasi Energi.',
      icon: 'Zap',
      themeColor: {
        accent: 'emerald',
        badgeBgLight: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        badgeTextLight: 'text-emerald-900',
        badgeBgDark: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
        badgeTextDark: 'text-emerald-300',
        hoverBorderLight: 'hover:border-emerald-400',
        hoverBorderDark: 'hover:border-emerald-400/90',
        hoverShadowLight: 'hover:shadow-[0_16px_36px_-6px_rgba(16,185,129,0.22)]',
        hoverShadowDark: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]',
        glowGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
        iconBgLight: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
        iconBgDark: 'bg-navy-950 text-emerald-400 border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.28)]',
      },
      features: [
        'Inspeksi Fasilitas & Pembangkit Panas Bumi (Geothermal)',
        'Persetujuan Laik Fungsi (PLF)',
        'Sertifikat Laik Operasi (SLO)'
      ],
      tags: ['Geothermal', 'EBTKE', 'Panas Bumi', 'SLO']
    },
    {
      id: 5,
      serviceId: 'sertifikasi-eco',
      numberStr: '05',
      title: 'Sertifikasi dan Eco-Framework',
      categoryName: 'Eco-Framework & Lingkungan',
      description: 'Penyusunan dokumen lingkungan hidup, perizinan kawasan hutan, serta persetujuan teknis air limbah.',
      icon: 'TreePine',
      themeColor: {
        accent: 'teal',
        badgeBgLight: 'bg-teal-100 text-teal-900 border-teal-200',
        badgeTextLight: 'text-teal-900',
        badgeBgDark: 'bg-teal-950/80 text-teal-300 border-teal-500/50',
        badgeTextDark: 'text-teal-300',
        hoverBorderLight: 'hover:border-teal-400',
        hoverBorderDark: 'hover:border-teal-400/90',
        hoverShadowLight: 'hover:shadow-[0_16px_36px_-6px_rgba(20,184,166,0.22)]',
        hoverShadowDark: 'hover:shadow-[0_0_24px_rgba(20,184,166,0.25)]',
        glowGradient: 'from-teal-500/10 via-teal-500/5 to-transparent',
        iconBgLight: 'bg-teal-50 text-teal-600 border-teal-200/80',
        iconBgDark: 'bg-navy-950 text-teal-400 border-teal-500/40 shadow-[0_0_14px_rgba(20,184,166,0.28)]',
      },
      features: [
        'Persetujuan Penggunaan Kawasan Hutan (PPKH)',
        'Dokumen Penyusunan Persetujuan Teknis Air Limbah',
        'UKL/UPL',
        'AMDAL (Analisa Dampak Lingkungan)',
        'Penyusunan Dokumen Lingkungan Kerja'
      ],
      tags: ['PPKH', 'AMDAL', 'Air Limbah', 'UKL/UPL', 'Dokumen Lingkungan']
    }
  ];

  const renderIcon = (iconName: string, iconClass?: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className={iconClass || "w-6 h-6 text-amber-500"} />;
      case 'Flame':
        return <Flame className={iconClass || "w-6 h-6 text-amber-500"} />;
      case 'Shield':
        return <Shield className={iconClass || "w-6 h-6 text-blue-500"} />;
      case 'Cpu':
        return <Cpu className={iconClass || "w-6 h-6 text-purple-500"} />;
      case 'Zap':
        return <Zap className={iconClass || "w-6 h-6 text-emerald-500"} />;
      case 'TreePine':
        return <TreePine className={iconClass || "w-6 h-6 text-teal-500"} />;
      case 'Award':
        return <Award className={iconClass || "w-6 h-6 text-blue-500"} />;
      default:
        return <Layers className={iconClass || "w-6 h-6 text-navy-700"} />;
    }
  };

  return (
    <section
      id="ruang-lingkup"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-white text-slate-800' : 'bg-navy-950 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isLight
                  ? 'bg-navy-100 border border-navy-200 text-navy-900'
                  : 'bg-navy-800 border border-navy-700 text-gold-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-gold-500" />
              <span>Portofolio Layanan</span>
            </div>
            <TextReveal
              text="Ruang Lingkup Pekerjaan"
              as="h2"
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-navy-900' : 'text-white'}`}
              stagger={70}
            />
            <div className={`mx-auto rounded-full ${
              isLight
                ? 'w-20 h-1 bg-gold-500'
                : 'w-28 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_8px_rgba(234,179,8,0.5)]'
            }`} />
            <TextReveal
              text="Cakupan jasa profesional PT Sucofindo Unit Pelayanan Duri untuk menjamin keselamatan operasional, kepatuhan standar, dan efisiensi industri Anda."
              as="p"
              className={`text-base sm:text-lg ${isLight ? 'text-slate-600' : 'text-slate-300'}`}
              stagger={55}
              delay={150}
              distance={10}
            />
          </div>
        </ScrollReveal>

        {/* Mobile Swipe Carousel with Android back-gesture protection */}
        <MobileServiceCarousel
          items={scopeList}
          theme={theme}
          onSelectService={onSelectService}
          onOpenModal={(item) => setSelectedScope(item)}
          renderIcon={renderIcon}
        />

        {/* Uniform Vertical List Layout (Tablet & Desktop only) */}
        <div className="hidden md:block space-y-5 max-w-5xl mx-auto">
          {scopeList.map((item, scopeIdx) => (
            <ScrollReveal key={item.id} delay={scopeIdx * 100}>
              <TiltCard
                onClick={() => onSelectService ? onSelectService(item.serviceId) : setSelectedScope(item)}
                maxTilt={8}
                scale={1.025}
                perspective={1000}
                className={`relative rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 ease-out active:scale-[0.99] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group cursor-pointer overflow-hidden ${
                  isLight
                    ? `bg-white hover:bg-slate-50 border-slate-200 shadow-sm hover:shadow-md ${item.themeColor.hoverBorderLight} ${item.themeColor.hoverShadowLight}`
                    : `bg-navy-900 hover:bg-navy-850 border-navy-800 hover:border-gold-500/60 shadow-xl ${item.themeColor.hoverBorderDark} ${item.themeColor.hoverShadowDark}`
                }`}
                id={`scope-item-${item.id}`}
              >
                {/* Background Ambient Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.themeColor.glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Left Side: Number, Category Badge, Title, Description, Tags */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 relative z-10 w-full md:w-auto">
                  {/* Number Indicator */}
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold font-mono shrink-0 transition-all duration-300 ${
                      isLight
                        ? 'text-navy-900/35 group-hover:text-navy-900'
                        : 'text-gold-400 group-hover:text-amber-300 font-extrabold'
                    }`}
                  >
                    {item.numberStr}
                  </span>

                  {/* Icon Box with theme-matching background */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border transition-transform duration-300 group-hover:scale-105 ${
                      isLight ? item.themeColor.iconBgLight : item.themeColor.iconBgDark
                    }`}
                  >
                    {renderIcon(item.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Category Pill */}
                    <div className="mb-1.5 flex items-center gap-2">
                      <span
                        className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border transition-colors duration-300 ${
                          isLight ? item.themeColor.badgeBgLight : item.themeColor.badgeBgDark
                        }`}
                      >
                        {item.categoryName}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl sm:text-2xl font-extrabold transition-colors duration-300 ${
                        isLight ? 'text-navy-900 group-hover:text-navy-950' : 'text-white group-hover:text-gold-300'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm mt-1 max-w-2xl leading-relaxed transition-colors duration-300 ${
                        isLight ? 'text-slate-600 group-hover:text-slate-700' : 'text-slate-300 group-hover:text-slate-100'
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors duration-300 ${
                            isLight
                              ? 'bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-slate-200/80'
                              : 'bg-navy-950 text-slate-200 border border-navy-800 group-hover:border-navy-700 group-hover:text-white'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side Action Button */}
                <div className="w-full md:w-auto shrink-0 relative z-10 pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectService) {
                        onSelectService(item.serviceId);
                      } else {
                        setSelectedScope(item);
                      }
                    }}
                    className={`relative overflow-hidden w-full md:w-auto px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isLight
                        ? 'bg-navy-900 group-hover:bg-navy-950 text-white shadow-md group-hover:shadow-lg'
                        : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 text-navy-950 shadow-[0_0_14px_rgba(245,158,11,0.3)] hover:shadow-[0_0_22px_rgba(245,158,11,0.5)]'
                    }`}
                  >
                    <span>Detail Layanan</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Modal Detail Ruang Lingkup */}
      {selectedScope && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className={`rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-navy-900 border-navy-700 text-white'
          }`}>
            
            <button
              type="button"
              onClick={() => setSelectedScope(null)}
              className={`relative overflow-hidden cursor-pointer absolute top-4 right-4 p-2 rounded-full transition-colors border ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  : 'bg-navy-950 hover:bg-navy-800 text-slate-300 border-navy-700'
              }`}
              aria-label="Tutup detail"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-black text-gold-400 font-mono">{selectedScope.numberStr}</span>
              <h3 className={`text-2xl font-extrabold ${isLight ? 'text-navy-900' : 'text-white'}`}>{selectedScope.title}</h3>
            </div>

            <p className={`text-sm mb-6 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {selectedScope.description}
            </p>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Cakupan Pekerjaan & Pengujian Utama:
              </h4>

              <div className={`space-y-2.5 p-4 rounded-xl border ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-navy-950 border-navy-800 text-slate-200'
              }`}>
                {selectedScope.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`pt-6 mt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isLight ? 'border-slate-200' : 'border-navy-800'
            }`}>
              <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Konsultasi kustom kebutuhan pengujian industri Duri & Riau.
              </div>

              <a
                href="#kontak"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedScope(null);
                  document.querySelector('#kontak')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative overflow-hidden cursor-pointer w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-all text-center flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-md'
                    : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 text-navy-950 shadow-[0_0_16px_rgba(245,158,11,0.3)] hover:shadow-[0_0_24px_rgba(245,158,11,0.5)]'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Ajukan Penawaran Jasa Ini</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

