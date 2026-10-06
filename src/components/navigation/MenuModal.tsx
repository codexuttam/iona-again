import { X, ArrowRight, ShieldCheck, Droplets, Sparkles, Compass, Sun, Moon } from 'lucide-react';
import { SECTIONS } from '../../lib/constants';
import { useTheme } from '../../context/ThemeContext';
import { ambientSound } from '../ui/AmbientAudio';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function MenuModal({ isOpen, onClose, onNavigate }: MenuModalProps) {
  const { theme, toggleTheme, isLight } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[var(--theme-modal-backdrop)] backdrop-blur-2xl text-[var(--theme-text-primary)] p-8 sm:p-16 animate-in fade-in duration-300 overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--theme-border-subtle)] pb-6 shrink-0">
        <div className="font-serif-luxury text-2xl tracking-[0.2em] text-[var(--theme-text-primary)]">
          IONA SANCTUARY
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Theme Toggle */}
          <button
            onClick={() => {
              ambientSound.playDropChime();
              toggleTheme();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-border-medium)] hover:border-[var(--theme-border-strong)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-card-bg)] transition-all cursor-pointer text-xs font-mono"
            aria-label="Toggle visual theme"
          >
            {isLight ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="tracking-wider">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-300" />
                <span className="tracking-wider">DARK</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors p-2 rounded-full border border-[var(--theme-border-medium)] hover:border-[var(--theme-border-strong)] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">CLOSE</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-8">
        {/* Navigation Column */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--theme-text-muted)] font-mono mb-3 font-medium">
            INDEX DIRECTORY
          </span>
          {SECTIONS.map((sec) => {
            if (!sec.num) return null;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  onNavigate(sec.id);
                  onClose();
                }}
                className="group flex items-center justify-between py-2.5 text-left border-b border-[var(--theme-border-subtle)] hover:border-[var(--theme-border-strong)] transition-colors cursor-pointer"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-xs font-mono text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text-primary)] transition-colors font-medium">
                    {sec.num}
                  </span>
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-light text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] group-hover:translate-x-2 transition-all">
                    {sec.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text-primary)] group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>

        {/* Specifications & Ethos */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-8 border-l border-[var(--theme-border-subtle)] lg:pl-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--theme-text-muted)] font-mono font-medium">
              ELEMENTAL BASELINE
            </span>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl card-luxury-glass">
                <Droplets className="w-4 h-4 text-[var(--theme-text-accent)] mb-2" />
                <div className="text-base font-serif-luxury text-[var(--theme-text-primary)]">8.5 - 8.8</div>
                <div className="text-[10px] text-[var(--theme-text-muted)] uppercase tracking-wider font-mono">Natural pH</div>
              </div>
              <div className="p-4 rounded-xl card-luxury-glass">
                <Sparkles className="w-4 h-4 text-[var(--theme-text-accent)] mb-2" />
                <div className="text-base font-serif-luxury text-[var(--theme-text-primary)]">-200 mV</div>
                <div className="text-[10px] text-[var(--theme-text-muted)] uppercase tracking-wider font-mono">Redox ORP</div>
              </div>
              <div className="p-4 rounded-xl card-luxury-glass">
                <ShieldCheck className="w-4 h-4 text-[var(--theme-text-accent)] mb-2" />
                <div className="text-base font-serif-luxury text-[var(--theme-text-primary)]">Crystal Resin</div>
                <div className="text-[10px] text-[var(--theme-text-muted)] uppercase tracking-wider font-mono">BPA-Free Vessel</div>
              </div>
              <div className="p-4 rounded-xl card-luxury-glass">
                <Compass className="w-4 h-4 text-[var(--theme-text-accent)] mb-2" />
                <div className="text-base font-serif-luxury text-[var(--theme-text-primary)]">380m</div>
                <div className="text-[10px] text-[var(--theme-text-muted)] uppercase tracking-wider font-mono">Aquifer Depth</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl card-luxury-glass">
            <h4 className="text-xs font-serif-luxury tracking-widest text-[var(--theme-text-primary)] uppercase font-medium">
              Orders & Customer Inquiries
            </h4>
            <p className="mt-2 text-xs text-[var(--theme-text-secondary)] font-light leading-relaxed">
              Available at select private residences, boutique spaces, and direct scheduled orders.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-mono text-[var(--theme-text-muted)]">
              <span className="text-[var(--theme-text-primary)] font-medium">contact@ionawater.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-muted)] shrink-0">
        <div>© 2026 IONA WATER CO. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-6 mt-2 sm:mt-0 font-mono">
          <span>LAT 46.2044° N</span>
          <span>·</span>
          <span>SUBTERRANEAN AQUIFER RESERVE</span>
        </div>
      </div>
    </div>
  );
}
