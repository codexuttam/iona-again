import { RotateCcw } from 'lucide-react';

interface ProductBottleProps {
  onRotateBottle?: () => void;
}

export default function ProductBottle({ onRotateBottle }: ProductBottleProps) {
  return (
    <section
      id="bottle"
      className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 pointer-events-none select-none z-10 py-28"
    >
      {/* Left Column Content */}
      <div className="max-w-md pointer-events-auto">

        {/* Heading */}
        <h2 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[var(--theme-text-primary)] leading-[1.0] text-luminous-heading">
          <span className="block font-light">
            An architectural
          </span>
          <span className="block italic text-accent-highlight font-normal">
            object of
          </span>
          <span className="block font-light opacity-95">
            desire.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-8 text-sm sm:text-base text-[var(--theme-text-secondary)] font-light tracking-wide leading-relaxed text-editorial-body">
          Sculpted with diamond-cut crystal facets that catch and refract ambient light from every angle. Delivering the optical brilliance of hand-cut crystal glass with featherweight durability.
        </p>

        <div className="mt-8 pl-5 border-l border-[var(--theme-border-medium)]">
          <p className="text-xs text-[var(--theme-text-secondary)] font-light leading-relaxed">
            Crowned with a high-gloss obsidian fluted closure and hermetically sealed to preserve electrolytic equilibrium.
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={onRotateBottle}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-pill-bg)] hover:bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-text)] hover:text-[var(--theme-pill-hover-text)] text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-sm group"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-500" />
            <span>DRAG OR CLICK TO INSPECT 360°</span>
          </button>
        </div>
      </div>

      {/* Right Column: Architectural Annotations */}
      <div className="hidden lg:flex flex-col justify-between h-[390px] pointer-events-auto pl-12">
        {/* Top Annotation */}
        <div className="flex items-center gap-4 group">
          <div className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-accent)] shadow-sm" />
            <span className="w-16 h-[1px] bg-gradient-to-r from-[var(--theme-text-accent)]/50 to-transparent" />
          </div>
          <div className="p-4 rounded-xl card-luxury-glass">
            <div className="text-xs font-serif-luxury text-[var(--theme-text-primary)] tracking-widest uppercase font-medium">
              OBSIDIAN FLUTED CROWN
            </div>
            <div className="text-xs text-[var(--theme-text-muted)] font-light mt-1">Hermetic precision twist seal with laser emblem</div>
          </div>
        </div>

        {/* Middle Annotation */}
        <div className="flex items-center gap-4 group">
          <div className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-accent)] shadow-sm" />
            <span className="w-20 h-[1px] bg-gradient-to-r from-[var(--theme-text-accent)]/50 to-transparent" />
          </div>
          <div className="p-4 rounded-xl card-luxury-glass">
            <div className="text-xs font-serif-luxury text-[var(--theme-text-primary)] tracking-widest uppercase font-medium">
              DIAMOND-CUT CRYSTAL PRISMS
            </div>
            <div className="text-xs text-[var(--theme-text-muted)] font-light mt-1">Refractive faceted geometry, BPA/BPS-free clarity</div>
          </div>
        </div>

        {/* Bottom Annotation */}
        <div className="flex items-center gap-4 group">
          <div className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-accent)] shadow-sm" />
            <span className="w-14 h-[1px] bg-gradient-to-r from-[var(--theme-text-accent)]/50 to-transparent" />
          </div>
          <div className="p-4 rounded-xl card-luxury-glass">
            <div className="text-xs font-serif-luxury text-[var(--theme-text-primary)] tracking-widest uppercase font-medium">
              MONOLITHIC WEIGHTED BASE
            </div>
            <div className="text-xs text-[var(--theme-text-muted)] font-light mt-1">Chamfered facets engineered for grounded stillness</div>
          </div>
        </div>
      </div>
    </section>
  );
}
