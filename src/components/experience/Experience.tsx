import { useState, useMemo } from 'react';
import Scene from './Scene';
import Navbar from '../navigation/Navbar';
import ProgressBar from '../navigation/ProgressBar';
import MenuModal from '../navigation/MenuModal';
import ContactModal from '../ui/ContactModal';
import LegalModal from '../ui/LegalModal';
import Loader from '../ui/Loader';
import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import Alkaline from '../sections/Alkaline';
import Ionised from '../sections/Ionised';
import Process from '../sections/Process';
import ProductBottle from '../sections/ProductBottle';
import ProductRange from '../sections/ProductRange';
import FAQ from '../sections/FAQ';
import { useLenis } from '../../animation/useLenis';
import { SECTIONS } from '../../lib/constants';
import { ambientSound } from '../ui/AmbientAudio';

export default function Experience() {
  const { scrollProgress, scrollTo } = useLenis();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [selectedBottleSizeIndex, setSelectedBottleSizeIndex] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Compute active section index based on scrollProgress (0 to 1)
  const activeSectionIndex = useMemo(() => {
    const count = SECTIONS.length;
    const idx = Math.min(count - 1, Math.max(0, Math.floor(scrollProgress * count)));
    return idx;
  }, [scrollProgress]);

  const handleNavigate = (sectionId: string) => {
    ambientSound.playDropChime();
    const el = document.getElementById(sectionId);
    if (el) {
      scrollTo(el);
    }
  };

  const handleScrollNext = () => {
    ambientSound.playDropChime();
    const nextIdx = Math.min(SECTIONS.length - 1, activeSectionIndex + 1);
    const target = SECTIONS[nextIdx].id;
    handleNavigate(target);
  };

  const handleOpenContact = (subject = 'General Inquiry & Contact') => {
    ambientSound.playDropChime();
    setContactSubject(subject);
    setIsContactOpen(true);
  };

  return (
    <main className="relative w-full min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-primary)] transition-colors duration-500 overflow-hidden selection:bg-[#20BFD3] selection:text-white">
      {/* Initial cinematic luxury loader */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {/* Persistent Fixed 3D WebGL Canvas */}
      <Scene
        scrollProgress={scrollProgress}
        activeSectionIndex={activeSectionIndex}
        selectedBottleIndex={selectedBottleSizeIndex}
      />

      {/* Fixed Cinematic Navigation */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigate={handleNavigate}
        activeSection={SECTIONS[activeSectionIndex]?.id || 'hero'}
        onOpenContact={() => handleOpenContact('General Inquiry')}
      />

      <ProgressBar
        scrollProgress={scrollProgress}
        onScrollNext={handleScrollNext}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Contact & Orders Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialSubject={contactSubject}
      />

      {/* Terms & Conditions / Privacy Policy Modal */}
      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        onSwitchType={(type) => setLegalModalType(type)}
      />

      {/* DOM Content Sections (Spaced along the scroll track) */}
      <div className="relative z-10 w-full flex flex-col">
        <Hero onExplore={() => handleNavigate('philosophy')} />
        <Philosophy onLearnMore={() => handleNavigate('alkaline')} />
        <Alkaline />
        <Ionised />
        <Process />
        <ProductBottle onRotateBottle={() => ambientSound.playDropChime()} />
        <ProductRange
          selectedSizeIndex={selectedBottleSizeIndex}
          onSelectSize={(idx) => {
            setSelectedBottleSizeIndex(idx);
            ambientSound.playDropChime();
          }}
          onReserveCase={(size) => handleOpenContact(`Reserve Case Order - ${size}`)}
        />
        <FAQ
          onExperience={() => handleNavigate('bottle')}
          onNavigate={handleNavigate}
          onOpenTerms={() => setLegalModalType('terms')}
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenContact={() => handleOpenContact('Contact & Inquiries')}
        />
      </div>
    </main>
  );
}
