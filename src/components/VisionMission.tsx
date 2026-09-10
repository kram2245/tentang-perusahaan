import React from 'react';
import { Target, Rocket, Compass, Quote, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TextReveal } from './TextReveal';

interface VisionMissionProps {
  theme?: 'dark' | 'light';
}

export const VisionMission: React.FC<VisionMissionProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <section
      id="visi-misi"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-white text-slate-800' : 'bg-navy-950 text-white'
      }`}
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isLight
                  ? 'bg-blue-50 border border-blue-200 text-blue-900'
                  : 'bg-navy-800 border border-navy-700 text-gold-400'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${isLight ? 'text-navy-700' : 'text-gold-400'}`} />
              <span>Arah Strategis</span>
            </div>
            <TextReveal
              text="Visi & Misi Perusahaan"
              as="h2"
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-navy-900' : 'text-white'}`}
              stagger={70}
            />
            <div className={`mx-auto rounded-full ${
              isLight
                ? 'w-20 h-1 bg-gold-500'
                : 'w-28 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_8px_rgba(234,179,8,0.5)]'
            }`} />
            <p className={`text-base sm:text-lg ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Panduan landasan dan cita-cita PT Sucofindo dalam memberikan kontribusi terbaik bagi industri nasional dan seluruh pemangku kepentingan.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Column Grid (Stacked on mobile) */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card VISI */}
          <ScrollReveal delay={100}>
            <div className={`rounded-2xl p-8 sm:p-10 shadow-xl border relative flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1 h-full ${
              isLight
                ? 'bg-gradient-to-br from-navy-900 to-navy-800 text-white border-navy-700 hover:border-gold-500/50'
                : 'bg-gradient-to-br from-navy-900 to-navy-850 text-white border-white/15 hover:border-gold-400/70 hover:shadow-[0_0_24px_rgba(234,179,8,0.2)]'
            }`}>
              <Quote className="absolute top-6 right-6 w-16 h-16 text-white/5 pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400 shrink-0 shadow-[0_0_14px_rgba(234,179,8,0.3)]">
                    <Target className="w-7 h-7" />
                  </div>
                  <div>
                    <TextReveal
                      text="VISI"
                      as="h3"
                      className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide"
                      delay={100}
                    />
                  </div>
                </div>

                <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed italic relative z-10 pl-4 border-l-4 border-gold-500 my-4">
                  "Menjadi Perusahaan kelas dunia yang kompetitif, andal dan terpercaya di bidang inspeksi, pengujian, sertifikasi, konsultasi, dan pelatihan."
                </blockquote>
              </div>

              <div className="pt-6 mt-6 border-t border-navy-700/80 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>World Class Quality & Trust Standard</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>Integrity, Expertise & Operational Certainty</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card MISI */}
          <ScrollReveal delay={200}>
            <div className={`rounded-2xl p-8 sm:p-10 shadow-xl border relative flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1 h-full ${
              isLight
                ? 'bg-white text-navy-900 border-slate-200 hover:border-navy-700/40'
                : 'bg-navy-900/80 backdrop-blur-xs text-white border-white/15 hover:border-gold-400/70 hover:shadow-[0_0_24px_rgba(234,179,8,0.2)]'
            }`}>
              <Quote className="absolute top-6 right-6 w-16 h-16 opacity-5 pointer-events-none" />

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isLight
                      ? 'bg-navy-100 border-navy-200 text-navy-800 shadow-md'
                      : 'bg-navy-950/60 border-gold-500/40 text-gold-400 shadow-[0_0_14px_rgba(234,179,8,0.3)]'
                  }`}>
                    <Rocket className="w-7 h-7" />
                  </div>
                  <div>
                    <TextReveal
                      text="MISI"
                      as="h3"
                      className={`text-2xl sm:text-3xl font-extrabold tracking-wide ${isLight ? 'text-navy-900' : 'text-white'}`}
                      delay={150}
                    />
                  </div>
                </div>

                <blockquote className={`text-base sm:text-lg font-medium leading-relaxed italic relative z-10 pl-4 border-l-4 my-4 ${
                  isLight ? 'text-slate-700 border-navy-700' : 'text-slate-200 border-gold-400'
                }`}>
                  "Menciptakan nilai ekonomi kepada para pemangku kepentingan terutama pelanggan, pemegang saham dan pegawai melalui layanan jasa inspeksi, pengujian, sertifikasi, konsultansi serta jasa terkait lainnya untuk menjamin kepastian berusaha."
                </blockquote>
              </div>

              <div className={`pt-6 mt-6 border-t space-y-2 ${isLight ? 'border-slate-100' : 'border-navy-800'}`}>
                <div className={`flex items-center gap-2 text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  <CheckCircle2 className="w-4 h-4 text-gold-500" />
                  <span>Nilai Tambah Ekonomi Bagi Pemangku Kepentingan</span>
                </div>
                <div className={`flex items-center gap-2 text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  <CheckCircle2 className="w-4 h-4 text-gold-500" />
                  <span>Jaminan Kepastian Berusaha Seluruh Pelanggan</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

