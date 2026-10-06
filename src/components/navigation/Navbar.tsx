import { useState } from 'react';
import { Volume2, VolumeX, Menu as MenuIcon, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { ambientSound } from '../ui/AmbientAudio';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenMenu: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenMenu, onNavigate, activeSection: _activeSection, onOpenContact }: NavbarProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const { theme, toggleTheme, isLight } = useTheme();

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsAudioActive(active);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-5 bg-[var(--theme-navbar-bg)] backdrop-blur-[8px] border-b border-[var(--theme-border-subtle)] transition-all duration-300">
      {/* Left: Nav Links (Desktop) & Menu (Mobile) */}
      <div className="flex items-center gap-6 flex-1">
        {/* Mobile Menu trigger */}
        <button
          onClick={onOpenMenu}
          className="flex lg:hidden items-center gap-2.5 text-xs font-medium tracking-[0.25em] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] uppercase transition-colors group cursor-pointer"
          aria-label="Open navigation menu"
        >
          <span className="p-1.5 rounded-full border border-[var(--theme-border-medium)] group-hover:border-[var(--theme-border-strong)] transition-colors">
            <MenuIcon className="w-3.5 h-3.5 text-[var(--theme-text-primary)]" />
          </span>
          <span className="hidden sm:inline">INDEX</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--theme-text-secondary)]">
          <button onClick={() => onNavigate('philosophy')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">PHILOSOPHY</button>
          <button onClick={() => onNavigate('alkaline')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">ORIGIN</button>
          <button onClick={() => onNavigate('process')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">PROVENANCE</button>
          <button onClick={() => onNavigate('range')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">EDITIONS</button>
        </nav>
      </div>

      {/* Center: Brand Wordmark */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <button
          onClick={() => onNavigate('hero')}
          className="cursor-pointer focus:outline-none"
        >
          <span className="font-serif-luxury text-2xl sm:text-3xl font-light tracking-[0.25em] text-[var(--theme-text-primary)] hover:opacity-80 transition-opacity">
            I O N A
          </span>
        </button>
      </div>

      {/* Right: Audio + Theme Switcher + Action */}
      <div className="flex items-center justify-end gap-3 sm:gap-4 xl:gap-6 flex-1">
        {/* Visual Theme Toggle (Light / Dark) */}
        <button
          onClick={() => {
            ambientSound.playDropChime();
            toggleTheme();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--theme-border-medium)] hover:border-[var(--theme-border-strong)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-card-bg)] backdrop-blur-md transition-all cursor-pointer shadow-sm group"
          title={isLight ? 'Switch to Abyssal Dark Mode' : 'Switch to Glacial Light Mode'}
          aria-label="Toggle visual theme"
        >
          {isLight ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase font-medium">LIGHT</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-cyan-300 group-hover:-rotate-12 transition-transform" />
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase font-medium">DARK</span>
            </>
          )}
        </button>

        {/* Ambient Atmosphere Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-full border border-[var(--theme-border-medium)] hover:border-[var(--theme-border-strong)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-card-bg)] backdrop-blur-md transition-all cursor-pointer relative"
          title={isAudioActive ? 'Mute Glacial Atmosphere' : 'Listen to Glacial Stillness'}
          aria-label="Toggle ambient sound"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[var(--theme-text-primary)]" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--theme-text-accent)] animate-ping" />
            </>
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Primary Action Button */}
        <button
          onClick={() => (onOpenContact ? onOpenContact() : onNavigate('bottle'))}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--theme-pill-border)] bg-[var(--theme-pill-bg)] hover:bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-text)] hover:text-[var(--theme-pill-hover-text)] text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-sm cursor-pointer"
        >
          <span>CONTACT US</span>
          <ArrowUpRight className="w-3 h-3 opacity-70" />
        </button>
      </div>
    </header>
  );
}
