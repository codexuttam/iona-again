import { Droplets, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 pointer-events-none select-none z-10"
    >
      {/* Left Column Content */}
      <div className="max-w-2xl pointer-events-auto pt-24 sm:pt-0">
        {/* Timeless Editorial Luxury Heading */}
        <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[var(--theme-text-primary)] leading-[0.98] text-luminous-heading">
          <span className="block font-light">
            Water in its
          </span>
          <span className="block italic text-accent-highlight font-normal">
            purest elemental
          </span>
          <span className="block font-light opacity-95">
            stillness.
          </span>
        </h1>

        {/* Supporting Editorial Story Copy */}
        <p className="mt-8 text-sm sm:text-base text-[var(--theme-text-secondary)] font-light tracking-wide max-w-md leading-relaxed text-editorial-body">
          Born from prehistoric glacial snowpack, filtered through granite strata 380 meters beneath the surface. Sourced for a discerning audience who view hydration not as a utility, but as an intentional ritual.
        </p>

        {/* Minimalist Tactile CTA & Elemental Specs */}
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <button
            onClick={onExplore}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-[var(--theme-pill-border)] bg-[var(--theme-pill-bg)] backdrop-blur-md text-[var(--theme-pill-text)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--theme-pill-hover-bg)] hover:text-[var(--theme-pill-hover-text)] transition-all duration-500 cursor-pointer shadow-sm"
          >
            <span>DISCOVER THE STORY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-accent)] transition-colors" />
          </button>

          <div className="flex items-center gap-6 text-[11px] text-[var(--theme-text-muted)] font-mono tracking-wider border-l border-[var(--theme-border-medium)] pl-6">
            <div>
              <span className="block text-[var(--theme-text-primary)] font-serif-luxury text-[17px] font-medium leading-tight">380m</span>
              <span className="text-[10px] text-[var(--theme-text-muted)] uppercase tracking-widest font-mono">Aquifer Depth</span>
            </div>
            <div className="w-[1px] h-6 bg-[var(--theme-border-medium)]" />
            <div>
              <span className="block text-[var(--theme-text-primary)] font-serif-luxury text-[17px] font-medium leading-tight">pH 8.5</span>
              <span className="text-[10px] text-[var(--theme-text-muted)] uppercase tracking-widest font-mono">Naturally Balanced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column has the 3D bottle in WebGL space */}
      <div className="hidden lg:block w-1/3" />
    </section>
  );
}
