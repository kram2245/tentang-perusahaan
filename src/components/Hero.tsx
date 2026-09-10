import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Flame, Zap, Award, Leaf, Shield, CheckCircle2, ChevronDown, X, ChevronRight, Info } from 'lucide-react';
import { TextReveal } from './TextReveal';

interface SectorDetail {
  id: string;
  category: string;
  title: string;
  modalTitle?: string;
  description: string;
  fullDetail: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  badgeColor: string;
  features: string[];
}

interface HeroProps {
  onSelectService?: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectService }) => {
  const [selectedSector, setSelectedSector] = useState<SectorDetail | null>(null);

  const handleScrollToContact = (e: React.MouseEvent<React.AnchorHTMLAttributes<HTMLAnchorElement>>) => {
    e.preventDefault();
    const contactSec = document.querySelector('#kontak');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToScope = (e: React.MouseEvent<React.AnchorHTMLAttributes<HTMLAnchorElement>>) => {
    e.preventDefault();
    const scopeSec = document.querySelector('#ruang-lingkup');
    if (scopeSec) {
      scopeSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSector(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sectorCards: SectorDetail[] = [
    {
      id: 'migas',
      category: 'Area Migas',
      title: 'Inspeksi & Sertifikasi Migas',
      description: 'Inspeksi kelayakan tangki timbun, bejana tekan & fasilitas produksi migas.',
      fullDetail: 'Layanan inspeksi teknis dan kelayakan operasional peralatan serta fasilitas produksi minyak dan gas bumi sesuai standar keselamatan Migas.',
      icon: Flame,
      iconBg: 'bg-amber-500/10 border-amber-500/30',
      iconColor: 'text-amber-400',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      features: [
        'Inspeksi Peralatan Putar',
        'Inspeksi Peralatan Listrik',
        'Inspeksi Pesawat Angkat',
        'Inspeksi Bejana Tekan',
        'Inspeksi Alat Pengaman',
        'Inspeksi Tangki',
        'Inspeksi Pipa Penyalur'
      ]
    },
    {
      id: 'inspeksi-sertifikasi',
      category: 'Area Industri',
      title: 'Inspeksi & Sertifikasi Industri',
      description: 'Layanan terintegrasi inspeksi K3 Kemnaker & Ketenagalistrikan (DJK).',
      fullDetail: 'Layanan terintegrasi inspeksi Keselamatan dan Kesehatan Kerja (K3) Kemnaker serta Sertifikasi Ketenagalistrikan (DJK) untuk keandalan instalasi dan keselamatan peralatan.',
      icon: Shield,
      iconBg: 'bg-indigo-500/10 border-indigo-500/30',
      iconColor: 'text-indigo-400',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      features: [
        'Inspektur Boiler (Pesawat Uap)',
        'Ahli K3 Listrik',
        'Inspektur Pesawat Tenaga & Produksi',
        'Inspektur Proteksi Kebakaran (Alarm, Fire System, Hidran)',
        'Inspektur Elevator/Lift',
        'Welding Inspeksi',
        'Inspektur SLO PLTD',
        'Inspektur Instalasi Listrik (SLO)',
        'Personil PDKB'
      ]
    },
    {
      id: 'ndt',
      category: 'Pengujian',
      title: 'NDT',
      modalTitle: 'Non Destructive Test (NDT)',
      description: 'Non Destructive Test & sertifikasi keutuhan struktur material.',
      fullDetail: 'Layanan Non Destructive Test (NDT) dan sertifikasi sistem manajemen industri untuk memastikan mutu dan keandalan peralatan serta proses produksi.',
      icon: Award,
      iconBg: 'bg-blue-500/10 border-blue-500/30',
      iconColor: 'text-blue-400',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      features: [
        'Ultrasonic Testing (UT)',
        'Radiographic Testing (RT)',
        'Magnetic Particle Inspection (MPI)',
        'Liquid Penetrant Testing (PT)'
      ]
    },
    {
      id: 'ebtke',
      category: 'Energi Terbarukan',
      title: 'Area EBTKE (Geothermal)',
      description: 'Pengujian & konsultasi teknis energi panas bumi & konservasi.',
      fullDetail: 'Pengujian dan konsultasi teknis untuk energi panas bumi dan konservasi energi, termasuk pengukuran efisiensi dan kepatuhan terhadap standar lingkungan.',
      icon: Zap,
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      iconColor: 'text-emerald-400',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      features: [
        'Inspeksi Fasilitas & Pembangkit Panas Bumi (Geothermal)',
        'Persetujuan Laik Fungsi (PLF)',
        'Sertifikat Laik Operasi (SLO)'
      ]
    },
    {
      id: 'sertifikasi-eco',
      category: 'SERTIFIKASI & ECO',
      title: 'Sertifikasi dan Eco-Framework',
      description: 'Persetujuan kawasan hutan, teknis air limbah, UKL/UPL & dokumen lingkungan kerja.',
      fullDetail: 'Layanan penyusunan dokumen lingkungan hidup, perizinan kawasan hutan, dan persetujuan teknis air limbah untuk industri.',
      icon: Leaf,
      iconBg: 'bg-teal-500/10 border-teal-500/30',
      iconColor: 'text-teal-400',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      features: [
        'Persetujuan Penggunaan Kawasan Hutan (PPKH)',
        'Dokumen Penyusunan Persetujuan Teknis Air Limbah',
        'UKL/UPL',
        'Penyusunan Dokumen Lingkungan Kerja'
      ]
    }
  ];

  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 bg-cover bg-center bg-no-repeat text-white overflow-hidden flex items-center"
      style={{ backgroundImage: "url('https://i.postimg.cc/CKGgbGgg/IMG-20260730-WA0152.jpg')" }}
    >
      {/* Dark Semi-Transparent Gradient Overlay for Optimal Readability & Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/90 to-navy-950/85 pointer-events-none" />
      <div className="absolute inset-0 bg-navy-950/30 pointer-events-none" />

      {/* Decorative Grid Overlay & Light Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Industrial Pattern Graphic */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden lg:block">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="280" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
          <circle cx="300" cy="300" r="200" stroke="white" strokeWidth="1" />
          <circle cx="300" cy="300" r="120" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Headline & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-blue-400/40 text-xs sm:text-sm font-semibold text-blue-200 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
              <span>BUMN Jasa Survey & Sertifikasi Terpercaya</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-lg">
              <TextReveal
                text="PT Sucofindo"
                as="span"
                className="block"
                delay={50}
                stagger={70}
              />
              <TextReveal
                text="Unit Pelayanan Duri"
                as="span"
                className="block"
                wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-gold-400"
                delay={220}
                stagger={70}
              />
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed font-medium drop-shadow">
              Kompeten, Andal, dan Terpercaya dalam <strong className="text-white font-bold">Inspeksi</strong>, <strong className="text-white font-bold">Pengujian</strong>, <strong className="text-white font-bold">Sertifikasi</strong>, <strong className="text-white font-bold">Konsultasi</strong>, dan <strong className="text-white font-bold">Pelatihan</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#kontak"
                onClick={handleScrollToContact}
                className="relative overflow-hidden px-6 py-3.5 rounded-xl bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 text-navy-950 font-extrabold text-center text-sm sm:text-base shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_28px_rgba(245,158,11,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group cursor-pointer"
                id="hero-cta-contact"
              >
                <span>Hubungi Kami</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#ruang-lingkup"
                onClick={handleScrollToScope}
                className="relative overflow-hidden px-6 py-3.5 rounded-xl bg-navy-800/90 hover:bg-navy-750 text-white border border-navy-600/80 hover:border-gold-400/50 hover:shadow-[0_0_16px_rgba(234,179,8,0.2)] font-semibold text-center text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-cta-scope"
              >
                <span>Lihat Ruang Lingkup</span>
              </a>
            </div>

            {/* Fast Highlights Badges */}
            <div className="pt-6 border-t border-navy-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Standar BUMN</div>
                  <div className="text-xs text-slate-400">Akreditasi KAN & ISO</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Area Duri & Riau</div>
                  <div className="text-xs text-slate-400">Inspeksi Sertifikasi dan Konsultasi</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Tenaga Ahli</div>
                  <div className="text-xs text-slate-400">Qualifate & Certifate</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Graphic Cards (Clickable Interactive Cards: Migas, Geothermal, Sertifikasi) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3">
              
              {sectorCards.map((sector, index) => {
                const IconComponent = sector.icon;
                const isIndent = index % 2 === 1 ? 'ml-0 sm:ml-4' : '';
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => onSelectService ? onSelectService(sector.id) : setSelectedSector(sector)}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-2xl bg-navy-800/90 border border-navy-700/80 shadow-xl backdrop-blur-md transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 hover:bg-navy-800 cursor-pointer group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold-400 ${isIndent}`}
                    id={`hero-sector-card-${sector.id}`}
                  >
                    {/* Top Right Hint */}
                    <div className="absolute top-3 right-3 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-navy-900/60 border border-navy-600/50 text-slate-300 group-hover:text-gold-400 group-hover:border-gold-400/40 transition-colors flex items-center gap-1">
                      <span>Detail</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <div className="flex items-start gap-4 pr-12">
                      <div className={`w-12 h-12 rounded-xl ${sector.iconBg} border flex items-center justify-center ${sector.iconColor} shrink-0 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${sector.badgeColor} inline-block mb-1`}>
                          {sector.category}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                          {sector.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {sector.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

            </div>
          </div>

        </div>

        {/* Bottom indicator */}
        <div className="pt-12 text-center">
          <a
            href="#tentang"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#tentang')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-xs text-slate-400 hover:text-white transition-colors gap-1"
            aria-label="Scroll down"
          >
            <span>Scroll Untuk Selengkapnya</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-gold-400" />
          </a>
        </div>

      </div>

      {/* Sector Detail Modal Popup */}
      {selectedSector && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedSector(null)}
        >
          <div 
            className="bg-navy-900 border border-blue-400/30 text-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative animate-scaleUp overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button X */}
            <button
              type="button"
              onClick={() => setSelectedSector(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-navy-800 text-slate-400 hover:text-white hover:bg-navy-700 transition-colors border border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label="Tutup detail modal"
              id="close-sector-modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pt-1">
              <div className={`w-14 h-14 rounded-2xl ${selectedSector.iconBg} border flex items-center justify-center ${selectedSector.iconColor} shrink-0 shadow-lg`}>
                <selectedSector.icon className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${selectedSector.badgeColor} inline-block`}>
                  {selectedSector.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {selectedSector.modalTitle || selectedSector.title}
                </h3>
              </div>
            </div>

            {/* Modal Detail Content */}
            <div className="space-y-4 border-t border-navy-800/90 pt-4">
              <p className="text-sm text-slate-200 leading-relaxed font-normal bg-navy-800/60 p-4 rounded-xl border border-navy-700/60">
                {selectedSector.fullDetail}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Cakupan Layanan Utama:</span>
                </h4>
                <ul className="space-y-2">
                  {selectedSector.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-navy-800/90">
              <button
                type="button"
                onClick={() => setSelectedSector(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 font-bold text-xs transition-colors border border-navy-700"
              >
                Tutup
              </button>

              <a
                href="#kontak"
                onClick={(e) => {
                  setSelectedSector(null);
                  handleScrollToContact(e);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 text-navy-950 font-extrabold text-xs shadow-[0_0_16px_rgba(245,158,11,0.3)] hover:shadow-[0_0_24px_rgba(245,158,11,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Pengajuan Jasa Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

