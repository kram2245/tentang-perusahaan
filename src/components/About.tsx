import React, { useState } from 'react';
import { MapPin, Phone, Globe, Mail, Copy, Check, ExternalLink, Building2, ShieldCheck, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface AboutProps {
  theme?: 'dark' | 'light';
}

export const About: React.FC<AboutProps> = ({ theme = 'dark' }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const isLight = theme === 'light';

  const contactCards = [
    {
      id: 'address',
      title: 'Alamat Kantor',
      value: 'Jl. Tri Brata Hangtuah No. 5B, Duri Barat, Kec. Mandau, Kabupaten Bengkalis, Riau',
      icon: MapPin,
      badge: 'Lokasi Duri',
      colorLight: 'bg-blue-500/10 text-blue-600 border-blue-200',
      colorDark: 'bg-blue-950/50 text-blue-400 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.25)]',
      actionType: 'copy',
      actionText: 'Salin Alamat',
      actionTarget: 'Jl. Tri Brata Hangtuah No. 5B, Duri Barat, Kec. Mandau, Kabupaten Bengkalis, Riau'
    },
    {
      id: 'phone',
      title: 'Telepon Resmi',
      value: '(0765) 92323',
      icon: Phone,
      badge: 'Layanan Telepon',
      colorLight: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      colorDark: 'bg-emerald-950/50 text-emerald-400 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]',
      actionType: 'link',
      actionText: 'Hubungi Sekarang',
      actionTarget: 'tel:076592323'
    },
    {
      id: 'email',
      title: 'Email Resmi',
      value: 'duri@sucofindo.co.id',
      icon: Mail,
      badge: 'Layanan Surel',
      colorLight: 'bg-amber-500/10 text-amber-600 border-amber-200',
      colorDark: 'bg-amber-950/50 text-amber-400 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
      actionType: 'link',
      actionText: 'Kirim Email',
      actionTarget: 'mailto:duri@sucofindo.co.id'
    },
    {
      id: 'website',
      title: 'Website Utama',
      value: 'www.sucofindo.co.id',
      icon: Globe,
      badge: 'Portal Resmi',
      colorLight: 'bg-purple-500/10 text-purple-600 border-purple-200',
      colorDark: 'bg-purple-950/50 text-purple-400 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]',
      actionType: 'external',
      actionText: 'Kunjungi Website',
      actionTarget: 'https://www.sucofindo.co.id'
    }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <section
      id="tentang"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-navy-900 text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isLight
                  ? 'bg-navy-100 border border-navy-200 text-navy-800'
                  : 'bg-navy-800 border border-navy-700 text-gold-400'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 ${isLight ? 'text-navy-700' : 'text-gold-400'}`} />
              <span>Profil Perusahaan</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-navy-900' : 'text-white'}`}>
              Tentang PT Sucofindo Unit Pelayanan Duri
            </h2>
            <div className={`mx-auto rounded-full ${
              isLight
                ? 'w-20 h-1 bg-gold-500'
                : 'w-28 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_8px_rgba(234,179,8,0.5)]'
            }`} />
            <p className={`text-base sm:text-lg leading-relaxed pt-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              PT Superintending Company of Indonesia (Persero) Unit Pelayanan Duri hadir sebagai perusahaan terdepan dalam menyediakan layanan kepastian mutu, keselamatan kerja, serta pengujian laboratorium dan inspeksi teknik di wilayah Duri dan sekitarnya.
            </p>
          </div>
        </ScrollReveal>

        {/* Corporate Summary Card */}
        <ScrollReveal delay={100}>
          <div
            className={`rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border mb-12 transition-colors ${
              isLight
                ? 'bg-white border-slate-200/80 text-slate-800'
                : 'bg-navy-950 border-navy-800 text-slate-100'
            }`}
          >
            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-7 space-y-4">
                <h3 className={`text-2xl font-bold ${isLight ? 'text-navy-900' : 'text-white'}`}>
                  Komitmen Pelayanan Profesional & Terpercaya di Riau
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Unit Pelayanan Duri beroperasi secara strategis mendukung sektor energi migas, geothermal, industri manufaktur, lingkungan hidup, serta pengujian material. Dengan dukungan tenaga ahli yang profesional dan bersertifikat, kami memastikan kepastian berusaha dan keamanan operasional mitra kerja kami.
                </p>
                
                <div className="pt-2 grid grid-cols-2 gap-4">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-navy-900 border-navy-800'}`}>
                    <ShieldCheck className="w-8 h-8 text-gold-500 shrink-0" />
                    <div>
                      <div className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Jaminan</div>
                      <div className={`text-sm font-bold ${isLight ? 'text-navy-900' : 'text-white'}`}>Kualitas & Keselamatan</div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-navy-900 border-navy-800'}`}>
                    <Award className="w-8 h-8 text-gold-500 shrink-0" />
                    <div>
                      <div className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Sertifikasi</div>
                      <div className={`text-sm font-bold ${isLight ? 'text-navy-900' : 'text-white'}`}>Standar Internasional</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stat Highlight */}
              <div className="md:col-span-5 bg-gradient-to-br from-navy-900 to-navy-800 text-white p-6 sm:p-8 rounded-xl shadow-lg border border-navy-700 flex flex-col justify-between">
                <div>
                  <div className="text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Unit Pelayanan Duri
                  </div>
                  <h4 className="text-xl font-bold mb-4">Informasi Kontak & Operasional</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Silakan hubungi tim kami untuk konsultasi teknis, pengajuan penawaran jasa inspeksi, pengujian laboratorium, maupun pendaftaran sertifikasi industri.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-navy-700/80 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jam Operasional:</span>
                    <span className="font-semibold text-white">Senin - Jumat | 08.00 - 17.00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Wilayah Layanan:</span>
                    <span className="font-semibold text-white">Duri, Bengkalis, Riau</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* 4 Cards Information Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, cardIndex) => {
            const IconComponent = card.icon;
            return (
              <ScrollReveal key={card.id} delay={cardIndex * 100}>
                <div
                  className={`rounded-xl p-6 shadow-md border transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group h-full ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 hover:shadow-xl'
                      : 'bg-navy-950 border-navy-800 text-white hover:border-gold-400/60 hover:shadow-[0_0_20px_rgba(234,179,8,0.18)]'
                  }`}
                  id={`about-card-${card.id}`}
                >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${
                      isLight ? card.colorLight : card.colorDark
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-navy-800 text-slate-300'}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {card.title}
                  </h4>
                  <p className={`text-base font-bold leading-snug break-words ${isLight ? 'text-navy-900' : 'text-white'}`}>
                    {card.value}
                  </p>
                </div>

                <div className={`pt-6 mt-4 border-t ${isLight ? 'border-slate-100' : 'border-navy-800'}`}>
                  {card.actionType === 'copy' && (
                    <button
                      type="button"
                      onClick={() => handleCopy(card.actionTarget, card.id)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 focus:outline-none ${
                        isLight
                          ? 'bg-slate-100 hover:bg-navy-900 hover:text-white text-slate-700'
                          : 'bg-navy-800 hover:bg-gradient-to-r hover:from-amber-400 hover:to-gold-400 hover:text-navy-950 hover:shadow-[0_0_14px_rgba(245,158,11,0.4)] text-slate-200'
                      }`}
                    >
                      {copiedKey === card.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-600">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400 group-hover:text-current" />
                          <span>{card.actionText}</span>
                        </>
                      )}
                    </button>
                  )}

                  {card.actionType === 'link' && (
                    <a
                      href={card.actionTarget}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        isLight
                          ? 'bg-slate-100 hover:bg-navy-900 hover:text-white text-slate-700'
                          : 'bg-navy-800 hover:bg-gradient-to-r hover:from-amber-400 hover:to-gold-400 hover:text-navy-950 hover:shadow-[0_0_14px_rgba(245,158,11,0.4)] text-slate-200'
                      }`}
                    >
                      <span>{card.actionText}</span>
                    </a>
                  )}

                  {card.actionType === 'external' && (
                    <a
                      href={card.actionTarget}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        isLight
                          ? 'bg-slate-100 hover:bg-navy-900 hover:text-white text-slate-700'
                          : 'bg-navy-800 hover:bg-gradient-to-r hover:from-amber-400 hover:to-gold-400 hover:text-navy-950 hover:shadow-[0_0_14px_rgba(245,158,11,0.4)] text-slate-200'
                      }`}
                    >
                      <span>{card.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

