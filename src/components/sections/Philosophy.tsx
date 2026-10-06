import { useState } from 'react';

interface PhilosophyProps {
  onLearnMore?: () => void;
}

export default function Philosophy({ onLearnMore: _onLearnMore }: PhilosophyProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const pillars = [
    {
      title: 'SUBTERRANEAN SILENCE',
      desc: 'Resting 380 meters beneath dense granite strata, preserved in untouched geological stillness for centuries.',
      sub: 'Untouched Origin',
    },
    {
      title: 'ELEMENTAL EQUILIBRIUM',
      desc: 'A stable alkaline pH of 8.5 naturally enriched with living electrolytes that restore effortless clarity.',
      sub: 'Bio-Harmony',
    },
    {
      title: 'THE DISCERNING RITUAL',
      desc: 'Not a mass commodity. An elevated daily companion crafted for those who value purity as a way of life.',
      sub: 'Curated Identity',
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 pointer-events-none select-none z-10 py-28"
    >
      {/* Left Column Content */}
      <div className="max-w-xl pointer-events-auto">

        {/* Heading */}
        <h2 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[var(--theme-text-primary)] leading-[1.0] text-luminous-heading">
          <span className="block font-light">
            An intention,
          </span>
          <span className="block italic text-accent-highlight font-normal">
            not just
          </span>
          <span className="block font-light opacity-95">
            hydration.
          </span>
        </h2>

        {/* Supporting Narrative Copy */}
        <p className="mt-8 text-sm sm:text-base text-[var(--theme-text-secondary)] font-light tracking-wide leading-relaxed max-w-lg text-editorial-body">
          In a world defined by relentless acceleration, IONA is an invitation to pause. Crafted for individuals who curate their mental and physical environment with conscious discernment, water becomes an anchor of calm.
        </p>

        {/* Subtle quote element */}
        <div className="mt-10 pl-6 border-l border-[var(--theme-border-medium)]">
          <p className="text-sm sm:text-base text-[var(--theme-text-primary)] font-serif-luxury italic leading-relaxed">
            "Purity is not the absence of impurities; it is the presence of quiet harmony."
          </p>
        </div>
      </div>

      {/* Right Column: Serene Minimalist Pillars */}
      <div className="hidden xl:flex flex-col gap-5 pointer-events-auto max-w-sm">
        {pillars.map((pillar, idx) => {
          const isActive = activeFeature === idx;
          return (
            <div
              key={pillar.title}
              onMouseEnter={() => setActiveFeature(idx)}
              className={`p-6 rounded-xl transition-all duration-500 cursor-pointer card-luxury-glass ${
                isActive
                  ? 'border-[var(--theme-border-highlight)] ring-1 ring-[var(--theme-border-highlight)] translate-x-[-6px]'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif-luxury tracking-[0.15em] text-[var(--theme-text-primary)] font-medium">
                  0{idx + 1} · {pillar.title}
                </span>
                <span className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase tracking-widest">{pillar.sub}</span>
              </div>
              <p className="mt-3 text-xs text-[var(--theme-text-secondary)] font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
