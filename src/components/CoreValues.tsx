import React from 'react';
import { ShieldAlert, GraduationCap, Heart, Medal, Sparkles, Users, Award } from 'lucide-react';
import { AkhlakValue } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { TextReveal } from './TextReveal';

interface CoreValuesProps {
  theme?: 'dark' | 'light';
}

export const CoreValues: React.FC<CoreValuesProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const akhlakData: AkhlakValue[] = [
    {
      id: 'amanah',
      letter: 'A',
      title: 'Amanah',
      description: 'Memegang teguh kepercayaan yang diberikan.',
      iconName: 'ShieldAlert',
      color: 'from-blue-600 to-navy-900',
    },
    {
      id: 'kompeten',
      letter: 'K',
      title: 'Kompeten',
      description: 'Terus belajar dan mengembangkan kapabilitas.',
      iconName: 'GraduationCap',
      color: 'from-sky-600 to-blue-800',
    },
    {
      id: 'harmonis',
      letter: 'H',
      title: 'Harmonis',
      description: 'Saling peduli dan menghargai perbedaan.',
      iconName: 'Heart',
      color: 'from-emerald-600 to-teal-800',
    },
    {
      id: 'loyal',
      letter: 'L',
      title: 'Loyal',
      description: 'Berdedikasi dan mengutamakan kepentingan Bangsa dan Negara.',
      iconName: 'Medal',
      color: 'from-amber-600 to-red-800',
    },
    {
      id: 'adaptif',
      letter: 'A',
      title: 'Adaptif',
      description: 'Terus berinovasi dan antusias dalam menggerakkan ataupun menghadapi perubahan.',
      iconName: 'Sparkles',
      color: 'from-indigo-600 to-purple-800',
    },
    {
      id: 'kolaboratif',
      letter: 'K',
      title: 'Kolaboratif',
      description: 'Membangun kerja sama yang sinergis.',
      iconName: 'Users',
      color: 'from-navy-700 to-blue-900',
    },
  ];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-white" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-white" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-white" />;
      case 'Medal':
        return <Medal className="w-6 h-6 text-white" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-white" />;
      case 'Users':
        return <Users className="w-6 h-6 text-white" />;
      default:
        return <Award className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section
      id="akhlak"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-navy-900 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isLight
                  ? 'bg-gold-100 border border-gold-200 text-navy-900'
                  : 'bg-navy-800 border border-navy-700 text-gold-400'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-gold-500" />
              <span>Budaya Kerja BUMN</span>
            </div>
            <TextReveal
              text="Nilai-Nilai Perusahaan (AKHLAK)"
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
              Nilai-nilai utama insan BUMN yang menjadi pedoman perilaku dan fondasi etika kerja seluruh personel PT Sucofindo Unit Pelayanan Duri.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {akhlakData.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 100}>
              <div
                className={`rounded-2xl p-6 sm:p-7 shadow-md border transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden h-full ${
                  isLight
                    ? 'bg-white border-slate-200/80 text-slate-800 hover:shadow-2xl'
                    : 'bg-navy-950 border-navy-800 text-white hover:border-gold-400/60 hover:shadow-[0_0_22px_rgba(234,179,8,0.18)]'
                }`}
                id={`akhlak-card-${item.id}`}
              >
                {/* Background watermark letter */}
                <span className={`absolute -bottom-4 -right-2 text-8xl font-black select-none pointer-events-none transition-colors ${
                  isLight ? 'text-slate-100 group-hover:text-slate-200/60' : 'text-navy-900/60 group-hover:text-gold-500/10'
                }`}>
                  {item.letter}
                </span>

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ${
                      !isLight ? 'shadow-[0_0_12px_rgba(59,130,246,0.25)]' : ''
                    }`}>
                      {renderIcon(item.iconName)}
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      isLight ? 'text-slate-500 bg-slate-100' : 'text-gold-400 bg-navy-900 border border-navy-700'
                    }`}>
                      Nilai #{idx + 1}
                    </span>
                  </div>

                  <h3 className={`text-xl font-extrabold mb-2 flex items-center gap-2 ${isLight ? 'text-navy-900' : 'text-white'}`}>
                    <span>{item.title}</span>
                  </h3>

                  <p className={`text-sm leading-relaxed relative z-10 font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {item.description}
                  </p>
                </div>

                <div className={`pt-5 mt-4 border-t flex items-center justify-between text-xs font-semibold ${
                  isLight ? 'border-slate-100 text-navy-700' : 'border-navy-800 text-slate-300'
                }`}>
                  <span className="group-hover:text-gold-500 transition-colors">PT Sucofindo Duri</span>
                  <span className="w-2 h-2 rounded-full bg-gold-400"></span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

