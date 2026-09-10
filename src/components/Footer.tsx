import React from 'react';
import { MapPin, Phone, Mail, Globe, ArrowUp, ExternalLink, Clock } from 'lucide-react';
import { CopyButton } from './CopyButton';
import sucofindoLogo from '../assets/images/sucofindo_logo_1785141877598.jpg';

interface FooterProps {
  theme?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t text-sm transition-colors duration-300 ${
      isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-navy-900 text-slate-300 border-navy-800'
    }`}>
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src={sucofindoLogo}
                  alt="Logo PT Sucofindo"
                  className="h-9 object-contain"
                />
              </div>
              <div>
                <span className={`font-extrabold text-xl tracking-tight block ${isLight ? 'text-navy-900' : 'text-white'}`}>
                  PT SUCOFINDO
                </span>
                <span className="text-xs font-semibold text-gold-600 tracking-wider uppercase block">
                  Unit Pelayanan Duri
                </span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Badan Usaha Milik Negara (BUMN) pelopor di bidang jasa inspeksi, sertifikasi, dan konsultasi untuk menjamin kepastian berusaha di Indonesia.
            </p>

            <div className={`pt-2 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <span className={`font-semibold ${isLight ? 'text-navy-900' : 'text-slate-200'}`}>Induk Holding:</span> IDSurvey (PT Biro Klasifikasi Indonesia / BKI)
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-navy-900' : 'text-white'}`}>
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#beranda" className="hover:text-gold-600 transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-gold-600 transition-colors">Tentang Kami</a>
              </li>
              <li>
                <a href="#visi-misi" className="hover:text-gold-600 transition-colors">Visi & Misi</a>
              </li>
              <li>
                <a href="#akhlak" className="hover:text-gold-600 transition-colors">Nilai AKHLAK Perusahaan</a>
              </li>
              <li>
                <a href="#ruang-lingkup" className="hover:text-gold-600 transition-colors">Ruang Lingkup Pekerjaan</a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-gold-600 transition-colors">Kontak Unit Duri</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Repeat */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-navy-900' : 'text-white'}`}>
              Informasi Kontak Duri
            </h4>
            
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="leading-tight">Jl. Tri Brata Hangtuah No. 5B, Duri Barat, Kec. Mandau, Kabupaten Bengkalis, Riau</span>
              </li>

              <li className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                  <a href="tel:076592323" className="hover:text-gold-600 transition-colors font-medium">(0765) 92323</a>
                </div>
                <CopyButton textToCopy="(0765) 92323" label="Salin Telp" theme={theme} />
              </li>

              <li className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-500 shrink-0 opacity-0" />
                  <a href="tel:+6281385066178" className="hover:text-gold-600 transition-colors font-medium">+62 813-8506-6178</a>
                </div>
                <CopyButton textToCopy="+62 813-8506-6178" label="Salin WA" theme={theme} />
              </li>

              <li className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                  <a href="mailto:duri@sucofindo.co.id" className="hover:text-gold-600 transition-colors font-medium">duri@sucofindo.co.id</a>
                </div>
                <CopyButton textToCopy="duri@sucofindo.co.id" label="Salin Email" theme={theme} />
              </li>

              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-gold-500 shrink-0" />
                <a
                  href="https://www.sucofindo.co.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-600 transition-colors inline-flex items-center gap-1"
                >
                  <span>www.sucofindo.co.id</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>

              <li className="pt-2.5 border-t border-navy-800/80 mt-2 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-gold-500">
                  <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Jam Operasional</span>
                </div>
                <div className={`text-[11px] space-y-1 pl-6 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  <div className="flex justify-between gap-3 max-w-[240px]">
                    <span>Senin - Jumat:</span>
                    <span className="font-bold text-gold-500">08.00 - 17.00 WIB</span>
                  </div>
                  <div className="flex justify-between gap-3 max-w-[240px]">
                    <span>Sabtu, Mgg & Libur:</span>
                    <span className="font-bold text-red-500">Tutup</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Back-to-top */}
      <div className={`py-6 border-t ${isLight ? 'bg-slate-200 border-slate-300 text-slate-600' : 'bg-navy-950 border-navy-800/80 text-slate-400'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div>
            © 2026 PT Sucofindo Unit Pelayanan Duri. All Rights Reserved.
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all border cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-50 text-navy-900 border-slate-300'
                : 'bg-navy-800 hover:bg-navy-700 text-slate-200 hover:text-white border-navy-700'
            }`}
            aria-label="Kembali ke atas"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-gold-500" />
          </button>

        </div>
      </div>

    </footer>
  );
};

