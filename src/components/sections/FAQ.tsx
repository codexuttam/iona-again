import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../lib/constants';

interface FAQProps {
  onExperience: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export default function FAQ({ onExperience, onNavigate, onOpenTerms, onOpenPrivacy, onOpenContact }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="questions"
      className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-24 pointer-events-none select-none z-10 pt-28 pb-12"
    >
      <div className="max-w-4xl w-full pointer-events-auto mx-auto lg:mx-0">

        {/* Heading */}
        <h2 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[var(--theme-text-primary)] leading-[1.0] text-luminous-heading">
          <span className="block font-light">
            Frequently
          </span>
          <span className="block italic text-accent-highlight font-normal">
            pondered.
          </span>
        </h2>

        {/* FAQ Accordion List */}
        <div className="mt-12 border-t border-[var(--theme-border-subtle)] divide-y divide-[var(--theme-border-subtle)]">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q} className="py-6 group">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-luxury text-lg sm:text-xl text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors pr-6 font-light">
                    {item.q}
                  </span>
                  <div className="p-1.5 rounded-full border border-[var(--theme-border-medium)] group-hover:border-[var(--theme-border-strong)] text-[var(--theme-text-primary)] transition-colors shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 text-xs sm:text-sm text-[var(--theme-text-secondary)] font-light leading-relaxed pr-8 animate-in fade-in duration-300">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FINAL SECTION: Sanctuary Invitation */}
      <div id="ultimate-hydration" className="mt-32 max-w-4xl w-full pointer-events-auto mx-auto text-center flex flex-col items-center py-20 border-t border-[var(--theme-border-subtle)]">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--theme-text-muted)] mb-5 font-medium">
          AN ELEVATED BASELINE
        </span>

        <h3 className="font-serif-luxury text-5xl sm:text-7xl font-light tracking-tight text-[var(--theme-text-primary)] leading-[1.05] text-luminous-heading">
          Stillness in an <br />
          <span className="italic text-accent-highlight font-normal">
            accelerated world.
          </span>
        </h3>

        <p className="mt-6 text-sm sm:text-base text-[var(--theme-text-secondary)] font-light max-w-md leading-relaxed text-editorial-body">
          Welcome to a circle of individuals who regard purity, aesthetics, and mental clarity as essential foundations.
        </p>

        <div className="mt-10">
          <button
            onClick={() => onOpenContact ? onOpenContact() : onExperience()}
            className="flex items-center gap-3 px-9 py-4 rounded-full border border-[var(--theme-pill-border)] bg-[var(--theme-pill-bg)] text-[var(--theme-pill-text)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--theme-pill-hover-bg)] hover:text-[var(--theme-pill-hover-text)] transition-all duration-500 cursor-pointer shadow-sm"
          >
            <span>GET IN TOUCH / ORDER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-accent)] transition-colors" />
          </button>
        </div>
      </div>

      {/* CINEMATIC FOOTER */}
      <footer className="mt-20 pt-8 border-t border-[var(--theme-border-subtle)] pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--theme-text-muted)]">
        {/* Left: Brand */}
        <div className="flex items-center gap-5">
          <span className="font-serif-luxury text-2xl tracking-[0.15em] text-[var(--theme-text-primary)]">
            IONA
          </span>
          <span className="opacity-30">|</span>
          <span className="text-[11px] font-mono tracking-wider">
            NATURAL ALKALINE & IONISED WATER
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-widest uppercase">
          <button onClick={() => onNavigate('philosophy')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
            PHILOSOPHY
          </button>
          <button onClick={() => onNavigate('alkaline')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
            ORIGIN
          </button>
          <button onClick={() => onNavigate('process')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
            PROVENANCE
          </button>
          <button onClick={() => onNavigate('range')} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
            EDITIONS
          </button>
          <button onClick={() => (onOpenContact ? onOpenContact() : onNavigate('questions'))} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer font-medium text-[var(--theme-text-primary)]">
            CONTACT
          </button>
          <span className="opacity-30 hidden md:inline">|</span>
          <button onClick={onOpenTerms} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
            TERMS
          </button>
          <button onClick={onOpenPrivacy} className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
            PRIVACY
          </button>
        </div>

        {/* Right: Socials & Copyright */}
        <div className="flex items-center gap-5">
          <span className="text-[11px] font-mono">© 2026 IONA SANCTUARY.</span>
        </div>
      </footer>
    </section>
  );
}
