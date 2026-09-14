import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, PhoneCall, Building2, ChevronRight, Sun, Moon } from 'lucide-react';
import sucofindoLogo from '../assets/images/sucofindo_logo_1785141877598.jpg';

interface NavbarProps {
  activeSection: string;
  onNavigateHome?: () => void;
  onSelectSection?: (sectionId: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigateHome,
  onSelectSection,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            window.scrollY ||
            0;

          // If currently clicking a nav link, temporarily keep navbar visible
          if (isNavigatingRef.current) {
            setIsVisible(true);
            lastScrollYRef.current = currentScrollY;
            ticking = false;
            return;
          }

          // Always visible and standard style at the very top of the page
          if (currentScrollY <= 15) {
            setIsVisible(true);
            setIsScrolled(false);
            lastScrollYRef.current = Math.max(0, currentScrollY);
            ticking = false;
            return;
          }

          // Beyond 15px, activate sticky shadow styling
          setIsScrolled(true);

          // If mobile menu is currently open, keep navbar visible
          if (mobileMenuOpen) {
            setIsVisible(true);
            lastScrollYRef.current = currentScrollY;
            ticking = false;
            return;
          }

          const diff = currentScrollY - lastScrollYRef.current;

          // Scroll DOWN -> Hide navbar smoothly
          if (diff > 2 && currentScrollY > 50) {
            setIsVisible(false);
          }
          // Scroll UP -> Show navbar smoothly immediately
          else if (diff < -2) {
            setIsVisible(true);
          }

          lastScrollYRef.current = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Tentang Kami', href: '#tentang' },
    { name: 'Visi & Misi', href: '#visi-misi' },
    { name: 'Nilai AKHLAK', href: '#akhlak' },
    { name: 'Ruang Lingkup', href: '#ruang-lingkup' },
    { name: 'Kontak', href: '#kontak' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIsVisible(true);
    isNavigatingRef.current = true;

    // Reset navigating flag after smooth scroll finishes
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);

    const targetSection = href.replace('#', '');

    if (onNavigateHome) {
      onNavigateHome();
    }
    if (onSelectSection) {
      onSelectSection(targetSection);
    }

    if (href === '#beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const isLight = theme === 'light';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isLight
          ? isScrolled
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-200 shadow-xs'
          : isScrolled
          ? 'bg-navy-900/95 backdrop-blur-md py-3 shadow-xl border-b border-navy-700/60'
          : 'bg-navy-900 py-4 border-b border-navy-800 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 lg:gap-8 xl:gap-12">
          {/* Logo Brand */}
          <a
            href="#beranda"
            onClick={(e) => handleNavClick(e, '#beranda')}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            id="brand-logo-link"
          >
            <div className="bg-white p-1 sm:p-1.5 rounded-lg border border-slate-200 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
              <img
                src={sucofindoLogo}
                alt="Logo PT Sucofindo"
                className="h-8 sm:h-9 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-extrabold text-lg sm:text-xl tracking-tight leading-tight transition-colors ${
                  isLight ? 'text-navy-950' : 'text-white'
                }`}
              >
                PT SUCOFINDO
              </span>
              <span
                className={`text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isLight ? 'text-gold-600' : 'text-gold-400'
                }`}
              >
                Unit Pelayanan Duri
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto pl-4 lg:pl-6 xl:pl-8"
            id="desktop-nav"
          >
            {navLinks.map((link) => {
              const linkSectionId = link.href.substring(1);
              const isActive = activeSection === linkSectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative overflow-hidden px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-normal whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isLight
                      ? isActive
                        ? 'text-navy-950 bg-gold-100/90 font-extrabold border border-gold-300 shadow-xs'
                        : 'text-slate-700 hover:text-navy-950 hover:bg-slate-100/80'
                      : isActive
                      ? 'text-gold-400 bg-navy-800/90 font-extrabold border border-gold-500/40 shadow-xs'
                      : 'text-slate-200 hover:text-white hover:bg-navy-800/60'
                  }`}
                  id={`nav-link-${linkSectionId}`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse shrink-0" />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}

            {/* Divider between navigation links and action controls */}
            <div className={`h-5 w-px mx-1 xl:mx-2 shrink-0 ${isLight ? 'bg-slate-200' : 'bg-navy-700/80'}`} />

            {/* Theme Toggle Button Desktop */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`relative overflow-hidden p-2 rounded-lg transition-all border shrink-0 cursor-pointer ${
                isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                  : 'bg-navy-800 text-gold-400 hover:bg-navy-700 border-navy-700'
              }`}
              title={isLight ? 'Beralih ke Dark Mode' : 'Beralih ke Light Mode'}
              aria-label="Toggle Theme"
              id="theme-toggle-desktop"
            >
              {isLight ? <Moon className="w-4 h-4 text-navy-900" /> : <Sun className="w-4 h-4 text-gold-400" />}
            </button>

            {/* Hubungi Kami CTA */}
            <a
              href="#kontak"
              onClick={(e) => handleNavClick(e, '#kontak')}
              className={`relative overflow-hidden px-3.5 py-2 xl:px-4 xl:py-2 text-xs font-extrabold rounded-lg text-navy-950 transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-gold-400 shrink-0 whitespace-nowrap cursor-pointer ${
                isLight
                  ? 'bg-gold-500 hover:bg-gold-400 shadow-md'
                  : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:via-gold-400 hover:to-orange-400 shadow-[0_0_14px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]'
              }`}
              id="cta-nav-button"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Hubungi Kami</span>
            </a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={onToggleTheme}
              className={`relative overflow-hidden p-2 rounded-lg transition-all border cursor-pointer ${
                isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                  : 'bg-navy-800 text-gold-400 hover:bg-navy-700 border-navy-700'
              }`}
              title={isLight ? 'Beralih ke Dark Mode' : 'Beralih ke Light Mode'}
              aria-label="Toggle Theme Mobile"
            >
              {isLight ? <Moon className="w-4 h-4 text-navy-900" /> : <Sun className="w-4 h-4 text-gold-400" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative overflow-hidden p-2 rounded-lg cursor-pointer ${
                isLight
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              } focus:outline-none focus:ring-2 focus:ring-gold-400`}
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn ${
            isLight
              ? 'bg-white border-b border-slate-200 text-slate-800'
              : 'bg-navy-900/98 border-b border-navy-700 text-slate-200'
          }`}
          id="mobile-drawer"
        >
          <div className={`pt-2 pb-1 border-b mb-2 ${isLight ? 'border-slate-200' : 'border-navy-800'}`}>
            <div className={`text-xs flex items-center justify-between gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gold-500" />
                <span>BUMN Jasa Inspeksi, Pengujian & Sertifikasi</span>
              </div>
            </div>
          </div>
          {navLinks.map((link) => {
            const linkSectionId = link.href.substring(1);
            const isActive = activeSection === linkSectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative overflow-hidden flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isLight
                    ? isActive
                      ? 'bg-gold-100/90 text-navy-950 font-extrabold border border-gold-300 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50'
                    : isActive
                    ? 'bg-navy-800 text-gold-400 font-extrabold border border-gold-500/40 shadow-sm'
                    : 'text-slate-200 hover:bg-navy-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse shrink-0" />
                  )}
                  <span>{link.name}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-colors ${isActive ? 'text-gold-500' : 'text-slate-400'}`} />
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="#kontak"
              onClick={(e) => handleNavClick(e, '#kontak')}
              className={`relative overflow-hidden w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-navy-950 font-extrabold text-center text-sm cursor-pointer ${
                isLight
                  ? 'bg-gold-500 hover:bg-gold-400 shadow-md'
                  : 'bg-gradient-to-br from-amber-400 via-gold-400 to-amber-500 shadow-[0_0_16px_rgba(245,158,11,0.35)]'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi Unit Duri</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

