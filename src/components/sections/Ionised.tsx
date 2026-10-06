import { useState } from 'react';

export default function Ionised() {
  const [activeTab, setActiveTab] = useState<'clarity' | 'fluidity' | 'vitality'>('clarity');

  const dimensions = [
    {
      id: 'clarity',
      label: 'WEIGHTLESS PALATE',
      metric: 'Zero Residue',
      description: 'Remarkably clean on the tongue with no heavy minerals or metallic trace—tasting like cold mountain spring water.',
    },
    {
      id: 'fluidity',
      label: 'MICRO-CLUSTER HARMONY',
      metric: 'Rapid Uptake',
      description: 'Aligned molecular clusters pass through cellular aquaporin channels with immediate biological ease.',
    },
    {
      id: 'vitality',
      label: 'NATURAL REDUCTION',
      metric: '-200mV ORP',
      description: 'Endowed with gentle negative oxidation-reduction potential that naturally buffers cellular oxidative strain.',
    },
  ];

  return (
    <section
      id="ionised"
      className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 pointer-events-none select-none z-10 py-28"
    >
      {/* Left Column Content */}
      <div className="max-w-xl pointer-events-auto">

        {/* Heading */}
        <h2 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[var(--theme-text-primary)] leading-[1.0] text-luminous-heading">
          <span className="block font-light">
            Molecular
          </span>
          <span className="block italic text-accent-highlight font-normal">
            harmony &
          </span>
          <span className="block font-light opacity-95">
            clarity.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-8 text-sm sm:text-base text-[var(--theme-text-secondary)] font-light tracking-wide leading-relaxed max-w-lg text-editorial-body">
          In untouched glacial springs, water is alive and structurally coherent. Gentle ionisation realigns molecular clusters into their most bio-available form, imparting a silky mouthfeel that dissolves effortlessly upon consumption.
        </p>

        {/* Editorial Feature Cards */}
        <div className="mt-12 flex flex-col gap-3.5">
          {dimensions.map((dim) => {
            const isSelected = activeTab === dim.id;
            return (
              <div
                key={dim.id}
                onClick={() => setActiveTab(dim.id as any)}
                className={`p-5 rounded-xl transition-all duration-300 cursor-pointer card-luxury-glass ${
                  isSelected
                    ? 'border-[var(--theme-border-highlight)] ring-1 ring-[var(--theme-border-highlight)] translate-x-1'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif-luxury tracking-widest text-[var(--theme-text-primary)] uppercase font-medium">
                    {dim.label}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--theme-text-accent)] tracking-wider font-semibold">{dim.metric}</span>
                </div>
                <p className="mt-2 text-xs text-[var(--theme-text-secondary)] font-light leading-relaxed">
                  {dim.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: In 3D space, this holds the gentle mist particles */}
      <div className="hidden lg:block w-1/3" />
    </section>
  );
}
