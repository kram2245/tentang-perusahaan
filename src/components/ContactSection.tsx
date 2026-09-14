import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, Clock, Building2, ExternalLink, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { CopyButton } from './CopyButton';

interface ContactSectionProps {
  theme?: 'dark' | 'light';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme = 'dark' }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceInterest: 'Non Destructive Test (NDT)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const isLight = theme === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validation for required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setValidationError('Mohon lengkapi seluruh kolom wajib yang bertanda bintang (*).');
      return;
    }

    setIsSubmitting(true);

    const messageText = `Halo, saya ingin mengajukan jasa:
Nama: ${formData.name.trim()}
Perusahaan: ${formData.company.trim() || '-'}
Email: ${formData.email.trim()}
No. Telepon: ${formData.phone.trim()}
Layanan: ${formData.serviceInterest}
Detail: ${formData.message.trim()}`;

    const targetNumber = '6281385066178';
    const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(messageText)}`;

    setWaUrl(url);

    // Simulate small processing loading delay for spinner feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Redirect to WhatsApp
      setTimeout(() => {
        window.open(url, '_blank');
      }, 500);
    }, 700);
  };

  return (
    <section
      id="kontak"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-slate-100 text-slate-800' : 'bg-navy-950 text-white'
      }`}
    >
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isLight
                  ? 'bg-gold-100 border border-gold-200 text-navy-900'
                  : 'bg-navy-800 border border-navy-700 text-gold-400'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi Kami</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-navy-900' : 'text-white'}`}>
              Kontak PT Sucofindo Unit Duri
            </h2>
            <div className={`mx-auto rounded-full ${
              isLight
                ? 'w-20 h-1 bg-gold-500'
                : 'w-28 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_8px_rgba(234,179,8,0.5)]'
            }`} />
            <p className={`text-base sm:text-lg ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Tim profesional kami siap memberikan konsultasi teknis, pengajuan proposal, dan informasi jasa inspeksi & sertifikasi.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info Detail Cards */}
          <ScrollReveal delay={100} className="lg:col-span-5">
            <div className="space-y-6">
              
              <div
                className={`rounded-2xl p-6 sm:p-8 border shadow-xl space-y-6 transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-navy-900/80 backdrop-blur-xs border-white/15 text-white'
                }`}
              >
                <h3 className={`text-xl font-bold flex items-center gap-2.5 pb-4 border-b ${isLight ? 'text-navy-900 border-slate-200' : 'text-white border-white/10'}`}>
                  <Building2 className="w-5 h-5 text-gold-500" />
                  <span>Kantor Unit Pelayanan Duri</span>
                </h3>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isLight ? 'bg-slate-100 border-slate-200 text-navy-800' : 'bg-navy-950/80 border-white/10 text-gold-400'}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Alamat Lengkap</div>
                    <div className={`text-sm font-semibold mt-1 leading-snug ${isLight ? 'text-navy-900' : 'text-white'}`}>
                      Jl. Tri Brata Hangtuah No. 5B, Duri Barat, Kec. Mandau, Kabupaten Bengkalis, Riau
                    </div>
                    <a
                      href="https://maps.google.com/?q=Jl.+Tri+Brata+Hangtuah+No.+5B,+Duri+Barat,+Kec.+Mandau,+Kabupaten+Bengkalis,+Riau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gold-600 font-bold hover:underline mt-1.5"
                    >
                      <span>Petunjuk Arah Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isLight ? 'bg-slate-100 border-slate-200 text-navy-800' : 'bg-navy-950/80 border-white/10 text-gold-400'}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Telepon Kantor / WhatsApp</div>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      <a href="tel:076592323" className={`text-base font-bold transition-colors ${isLight ? 'text-navy-900 hover:text-gold-600' : 'text-white hover:text-gold-400'}`}>
                        (0765) 92323 / +62 813-8506-6178
                      </a>
                      <CopyButton textToCopy="+62 813-8506-6178" label="Salin WA" theme={theme} />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isLight ? 'bg-slate-100 border-slate-200 text-navy-800' : 'bg-navy-950/80 border-white/10 text-gold-400'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Email Layanan</div>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      <a href="mailto:duri@sucofindo.co.id" className={`text-base font-bold transition-colors ${isLight ? 'text-navy-900 hover:text-gold-600' : 'text-white hover:text-gold-400'}`}>
                        duri@sucofindo.co.id
                      </a>
                      <CopyButton textToCopy="duri@sucofindo.co.id" label="Salin Email" theme={theme} />
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isLight ? 'bg-slate-100 border-slate-200 text-navy-800' : 'bg-navy-950/80 border-white/10 text-gold-400'}`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>OFFICIAL WEBSITE</div>
                    <a
                      href="https://www.sucofindo.co.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-base font-bold transition-colors mt-0.5 inline-flex items-center gap-1.5 ${isLight ? 'text-navy-900 hover:text-gold-600' : 'text-white hover:text-gold-400'}`}
                    >
                      <span>www.sucofindo.co.id</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Hours card */}
              <div className={`rounded-2xl p-6 border shadow-xl space-y-4 transition-colors ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-navy-900/80 backdrop-blur-xs border-white/15 text-white'}`}>
                <div className={`flex items-center gap-2.5 pb-3 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${isLight ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-navy-950/80 border-white/10 text-gold-400'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${isLight ? 'text-navy-900' : 'text-white'}`}>Jam Operasional</h4>
                    <span className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Waktu Pelayanan Kantor Unit Duri</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className={`flex items-center justify-between p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200/80 text-slate-700' : 'bg-navy-950/80 border-white/10 text-slate-200'}`}>
                    <span className="font-semibold">Senin - Jumat:</span>
                    <span className="font-bold text-gold-500">08.00 - 17.00 WIB</span>
                  </div>

                  <div className={`flex items-center justify-between p-2.5 rounded-lg border ${isLight ? 'bg-red-50/50 border-red-100 text-slate-700' : 'bg-red-950/20 border-red-900/30 text-slate-200'}`}>
                    <span className="font-semibold">Sabtu, Minggu & Hari Libur:</span>
                    <span className="font-bold text-red-500">Tutup</span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Right: Interactive Inquiry Form */}
          <ScrollReveal delay={150} className="lg:col-span-7">
            <div className={`rounded-2xl p-6 sm:p-8 shadow-2xl border transition-colors ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-navy-900/80 backdrop-blur-xs border-white/15 text-white'}`}>
              <h3 className={`text-2xl font-extrabold mb-2 ${isLight ? 'text-navy-900' : 'text-white'}`}>
                Kirim Pesan / Pengajuan Jasa
              </h3>
              <p className={`text-sm mb-6 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Isi formulir di bawah ini untuk berkonsultasi mengenai kebutuhan pengujian, inspeksi, atau sertifikasi di wilayah Duri.
              </p>

            {submitted ? (
              <div className="p-6 sm:p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-emerald-900">Validasi Berhasil!</h4>
                
                {/* Notification message requirement */}
                <div className="p-3.5 rounded-lg bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Anda akan diarahkan ke WhatsApp untuk mengirim pesan</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Jika aplikasi WhatsApp tidak terbuka secara otomatis, silakan klik tombol di bawah untuk terhubung ke nomor <strong>+62 813-8506-6178</strong>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Buka WhatsApp Sekarang</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', company: '', email: '', phone: '', serviceInterest: 'Non Destructive Test (NDT)', message: '' });
                      setWaUrl('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Isi Formulir Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400/40 ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-navy-700'
                          : 'bg-navy-950/80 border-slate-700/80 text-white placeholder-slate-400 focus:bg-navy-950 focus:border-gold-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                      Nama Perusahaan / Instansi
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: PT Energi Riau"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400/40 ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-navy-700'
                          : 'bg-navy-950/80 border-slate-700/80 text-white placeholder-slate-400 focus:bg-navy-950 focus:border-gold-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400/40 ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-navy-700'
                          : 'bg-navy-950/80 border-slate-700/80 text-white placeholder-slate-400 focus:bg-navy-950 focus:border-gold-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                      Nomor Telepon / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08123456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400/40 ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-navy-700'
                          : 'bg-navy-950/80 border-slate-700/80 text-white placeholder-slate-400 focus:bg-navy-950 focus:border-gold-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                    Layanan Yang Diminati
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400/40 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-navy-700'
                        : 'bg-navy-950/80 border-slate-700/80 text-white focus:bg-navy-950 focus:border-gold-400'
                    }`}
                  >
                    <option value="Non Destructive Test (NDT)">Non Destructive Test (NDT)</option>
                    <option value="Inspeksi & Sertifikasi EBTKE (Geothermal)">Inspeksi & Sertifikasi EBTKE (Geothermal)</option>
                    <option value="Lingkungan">Pengujian & Uji Lingkungan</option>
                    <option value="Area Migas">Inspeksi Area Migas</option>
                    <option value="Sertifikasi Industri">Sertifikasi Industri (ISO / TKDN / SMK3)</option>
                    <option value="Konsultasi Umum">Lainnya / Konsultasi Umum</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                    Detail Pesan / Kebutuhan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Jelaskan kebutuhan inspeksi atau lokasi pekerjaan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400/40 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-navy-700'
                        : 'bg-navy-950/80 border-slate-700/80 text-white placeholder-slate-400 focus:bg-navy-950 focus:border-gold-400'
                    }`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative overflow-hidden w-full py-3.5 px-6 rounded-xl disabled:opacity-75 disabled:cursor-not-allowed text-navy-950 font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer ${
                    isLight
                      ? 'bg-gold-500 hover:bg-gold-400 shadow-lg'
                      : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_28px_rgba(245,158,11,0.55)]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-navy-950 shrink-0" />
                      <span>Memproses Pengajuan Pesan...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Pesan Ke Unit Duri</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-navy-950" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          </ScrollReveal>

        </div>

        {/* Feature 1: PETA LOKASI (GOOGLE MAPS EMBED) */}
        <ScrollReveal delay={300}>
          <div className={`mt-12 rounded-2xl p-5 sm:p-7 border shadow-xl transition-all duration-300 ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-navy-900 border-navy-800 text-white'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${isLight ? 'text-navy-900' : 'text-white'}`}>
                    Lokasi Kantor Kami
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Jl. Tri Brata Hangtuah No. 5B, Duri Barat, Kec. Mandau, Kabupaten Bengkalis, Riau
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Jl.+Tri+Brata+Hangtuah+No.+5B,+Duri+Barat,+Kec.+Mandau,+Kabupaten+Bengkalis,+Riau"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-navy-950 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
                  isLight
                    ? 'bg-gold-500 hover:bg-gold-400 shadow-md'
                    : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 shadow-[0_0_14px_rgba(245,158,11,0.3)] hover:shadow-[0_0_22px_rgba(245,158,11,0.5)]'
                }`}
                id="btn-open-google-maps"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka di Google Maps</span>
              </a>
            </div>

            {/* Full-width Responsive Google Maps Embed Iframe */}
            <div className="w-full h-[300px] sm:h-[360px] md:h-[400px] rounded-xl overflow-hidden border border-slate-300/60 shadow-inner relative bg-slate-200">
              <iframe
                title="Peta Lokasi Kantor PT Sucofindo Unit Pelayanan Duri"
                src="https://maps.google.com/maps?q=Jl.+Tri+Brata+Hangtuah+No.+5B,+Duri+Barat,+Kec.+Mandau,+Kabupaten+Bengkalis,+Riau&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

