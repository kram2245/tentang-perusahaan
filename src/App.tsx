import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VisionMission } from './components/VisionMission';
import { CoreValues } from './components/CoreValues';
import { ScopeOfWork } from './components/ScopeOfWork';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailView } from './components/ServiceDetailView';
import { ServiceDetailSkeleton } from './components/ServiceDetailSkeleton';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SplashScreen } from './components/SplashScreen';
import { servicesData } from './data/services';
import { initGlobalRipple } from './utils/ripple';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('beranda');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const selectedService = selectedServiceId
    ? servicesData.find((s) => s.id === selectedServiceId)
    : null;

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const activeSectionRef = useRef('beranda');

  // Initialize Material Design Tap Ripple globally
  useEffect(() => {
    const cleanupRipple = initGlobalRipple();
    return () => cleanupRipple();
  }, []);

  // Synchronize theme classes on document.documentElement for styling & ripple contrast
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (selectedServiceId) return;

    const sections = ['beranda', 'tentang', 'visi-misi', 'akhlak', 'ruang-lingkup', 'kontak'];

    // Use IntersectionObserver to track visible sections
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.15,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Find the most visible intersecting section
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target.id && entry.target.id !== activeSectionRef.current) {
          activeSectionRef.current = entry.target.id;
          setActiveSection(entry.target.id);
          break;
        }
      }
    };

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(handleIntersect, observerOptions);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer?.observe(el);
      });
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [selectedServiceId]);

  const handleSelectService = (serviceId: string) => {
    setIsLoadingDetail(true);
    setSelectedServiceId(serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Skeleton delay simulation (0.6 seconds)
    setTimeout(() => {
      setIsLoadingDetail(false);
    }, 600);
  };

  const handleBackToHome = () => {
    setSelectedServiceId(null);
    setIsLoadingDetail(false);
  };

  const handleContactFromDetail = () => {
    setSelectedServiceId(null);
    setIsLoadingDetail(false);
    setTimeout(() => {
      const contactElem = document.querySelector('#kontak');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col selection:bg-gold-500 selection:text-navy-950 ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-navy-950 text-slate-100'
    }`}>
      {/* Initial Page Load Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} duration={900} />
      )}

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Navigation Bar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigateHome={handleBackToHome}
        onSelectSection={(sectionId) => setActiveSection(sectionId)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {selectedService ? (
          isLoadingDetail ? (
            <ServiceDetailSkeleton theme={theme} />
          ) : (
            <ServiceDetailView
              service={selectedService}
              onBack={handleBackToHome}
              onContactClick={handleContactFromDetail}
              theme={theme}
            />
          )
        ) : (
          <>
            {/* Section 1: Hero */}
            <Hero onSelectService={handleSelectService} />

            {/* Section 2: Tentang Kami */}
            <About theme={theme} />

            {/* Section 3: Visi & Misi */}
            <VisionMission theme={theme} />

            {/* Section 4: Nilai-Nilai Perusahaan (AKHLAK) */}
            <CoreValues theme={theme} />

            {/* Section 5: Ruang Lingkup Pekerjaan */}
            <ScopeOfWork onSelectService={handleSelectService} theme={theme} />

            {/* Section 6: Kontak */}
            <ContactSection theme={theme} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop theme={theme} />
    </div>
  );
}

