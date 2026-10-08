import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FogLayer from '../ambient/FogLayer';
import ParticleField from '../ambient/ParticleField';
import SoundToggle from '../ambient/SoundToggle';
import ThreeMasterScene from '../experience/ThreeMasterScene';
import OpeningScene from './OpeningScene';
import { ArrowDown, ShieldCheck, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContinuousExperienceProps {
  onOpenReserve?: () => void;
}

export default function ContinuousExperience({ onOpenReserve }: ContinuousExperienceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [openingFinished, setOpeningFinished] = useState(false);
  const [alkalinePH, setAlkalinePH] = useState(7.0);

  // Animate pH counter when Alkaline section comes into view
  useEffect(() => {
    const el = document.getElementById('scene-alkaline');
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => {
        let val = { p: 7.0 };
        gsap.to(val, {
          p: 8.5,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => setAlkalinePH(Number(val.p.toFixed(1))),
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#03070A] text-[#E8ECEF] overflow-x-hidden selection:bg-[#7DEAF0] selection:text-black font-sans"
    >
      {/* 00 — Opening Scene Curtain (auto-completes & skips on scroll/click) */}
      {!openingFinished && (
        <OpeningScene onComplete={() => setOpeningFinished(true)} />
      )}

      {/* ========================================================
          TRUE 3D WEBGL STAGE (THREE.JS + GSAP)
          Contains:
          - 3D Panoramic Curved Misty Mountains Layer (with real depth & fog)
          - 3D Cascading Waterfall & Wet Basalt Rock Layer
          - 3D Undulating Fluid Water Caustic Wave
          - 3D Floating Bubbles & Ionized Crystal Particles
          - THE EXACT 3D IONA PRODUCT BOTTLE (Moves continuously throughout the 13 scenes,
            featuring true 3D rotation, camera macro dollies, physical glass transmission,
            and interactive 360° drag rotation)
          ======================================================== */}
      <ThreeMasterScene />

      {/* Ambient Micro-Fog and Atmospheric Sound Toggle */}
      <FogLayer density={0.8} speed={0.25} className="fixed inset-0 z-1 pointer-events-none" />
      <ParticleField count={30} />
      <SoundToggle />

      {/* ========================================================
          SCENE 01 — HERO (Misty mountains, black rock, waterfall, exact bottle)
          ======================================================== */}
      <section
        id="scene-hero"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-2xl pointer-events-auto">
          {/* Elegant Scene Badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0] animate-ping" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              01 / 13 &bull; HERO
            </span>
          </div>

          {/* Monumental IONA Monogram */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-light tracking-[0.25em] text-white leading-none font-sans mb-6">
            IONA
          </h1>

          {/* Editorial Display Heading */}
          <p className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light italic text-[#E2F4F8] leading-tight mb-8">
            Water, <span className="font-normal not-italic text-white">Reimagined.</span>
          </p>

          {/* Readable, Stylish Storytelling Copy */}
          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed max-w-lg mb-10">
            Ultra-pure ionized glacial water, housed in faceted crystal glass and forged in black basalt stone. Sourced for a discerning audience who view hydration not as a utility, but as an intentional ritual.
          </p>

          {/* Four Core Pillars */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest text-[#7DEAF0] uppercase mb-12">
            <span>PURER</span>
            <span className="text-white/30">&bull;</span>
            <span>SMARTER</span>
            <span className="text-white/30">&bull;</span>
            <span>CLEANER</span>
            <span className="text-white/30">&bull;</span>
            <span>BRIGHTER</span>
          </div>

          {/* Subtle Scroll Callout */}
          <div className="flex items-center space-x-3 text-xs tracking-widest text-white/50 uppercase font-mono">
            <ArrowDown className="w-3.5 h-3.5 text-[#7DEAF0] animate-bounce" />
            <span>Scroll to navigate the cinematic story</span>
          </div>
        </div>

        <div className="hidden lg:block w-1/2" />
      </section>

      {/* ========================================================
          SCENE 02 — CAP CLOSE-UP (Bottle dollies into macro cap)
          ======================================================== */}
      <section
        id="scene-cap"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              02 / 13 &bull; CAP CLOSE-UP
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Embossed <span className="italic text-[#7DEAF0]">Signature</span> Seal
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            The camera dollies into the summit of the bottle. Observe the precision-crafted glossy black cap with the embossed IONA seal, faceted glass shoulders, and condensation droplets sliding downward in real-time.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs tracking-wider uppercase font-mono text-white/60">
            <div>
              <span className="block text-white text-sm font-sans font-medium mb-1">HERMETIC SEAL</span>
              <span>Pressure-Locked Cap</span>
            </div>
            <div>
              <span className="block text-white text-sm font-sans font-medium mb-1">FACETED GLASS</span>
              <span>Geometric Shoulders</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/2" />
      </section>

      {/* ========================================================
          SCENE 03 — IONIZED (Deep teal world, rising bubbles)
          ======================================================== */}
      <section
        id="scene-ionized"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="hidden lg:block w-1/2" />

        <div className="max-w-xl pointer-events-auto ml-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#20BFD3]/15 border border-[#20BFD3]/35 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20BFD3] animate-ping" />
            <span className="text-xs font-mono tracking-widest text-[#20BFD3] uppercase">
              03 / 13 &bull; IONIZED
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-4">
            Ionized for <span className="italic text-[#20BFD3]">Better Absorption</span>
          </h2>

          <p className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase mb-8">
            MICRO-CLUSTERED MOLECULAR MATRIX
          </p>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            As the bottle tilts to the left, rising micro-bubbles drift at varying depths through deep teal subterranean waters. Light refracts through crystalline droplets, preparing water for rapid cellular uptake.
          </p>
        </div>
      </section>

      {/* ========================================================
          SCENE 04 — ALKALINE pH 8.5+ (The One Major Light Contrast Section!)
          ======================================================== */}
      <section
        id="scene-alkaline"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-700/50 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              04 / 13 &bull; ALKALINE
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-4">
            Naturally <span className="italic text-[#7DEAF0]">Balanced</span>
          </h2>

          {/* Dynamic pH Counter */}
          <div className="flex items-baseline space-x-3 mb-6">
            <span className="text-6xl sm:text-8xl font-light font-sans text-white">
              pH {alkalinePH.toFixed(1)}
            </span>
            <span className="text-3xl sm:text-4xl font-light text-[#7DEAF0]">+</span>
          </div>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            A deliberate shift from darkness into bright glacial light. The bottle centers as twisting water geometry spirals around its core, bringing the body into natural alkaline equilibrium.
          </p>
        </div>

        <div className="hidden lg:block w-1/2" />
      </section>

      {/* ========================================================
          SCENE 05 — CLEAN & PURE (Multi-stage purification)
          ======================================================== */}
      <section
        id="scene-clean-pure"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="hidden lg:block w-1/2" />

        <div className="max-w-xl pointer-events-auto ml-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              05 / 13 &bull; CLEAN & PURE
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Multi-Stage <span className="italic text-[#7DEAF0]">Purification</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            Returning to the dark rock environment. The bottle glides to the right while glowing crystal formations rotate with internal refraction and water particles stream past in complete elemental purity.
          </p>

          <div className="flex items-center space-x-4 text-xs tracking-wider uppercase font-mono text-white/50">
            <ShieldCheck className="w-4 h-4 text-[#7DEAF0]" />
            <span>0.00% Contaminants &bull; Absolute Clarity</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 06 — ESSENTIAL MINERALS (Misty mountain valley, river)
          ======================================================== */}
      <section
        id="scene-minerals"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              06 / 13 &bull; ESSENTIAL MINERALS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Naturally Balanced for a <span className="italic text-[#7DEAF0]">Healthier You</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            Hovering over the shimmering mountain river, the bottle takes in essential electrolytes. Calcium, magnesium, and silica naturally balanced through prehistoric artesian filtration.
          </p>

          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-center font-mono text-xs">
            <div>
              <span className="block text-[#7DEAF0] font-sans font-medium text-lg">Ca²⁺</span>
              <span className="text-white/50">Calcium</span>
            </div>
            <div>
              <span className="block text-[#7DEAF0] font-sans font-medium text-lg">Mg²⁺</span>
              <span className="text-white/50">Magnesium</span>
            </div>
            <div>
              <span className="block text-[#7DEAF0] font-sans font-medium text-lg">SiO₂</span>
              <span className="text-white/50">Silica</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/2" />
      </section>

      {/* ========================================================
          SCENE 07 — A HIGHER STANDARD OF WATER (Macro wave pause)
          ======================================================== */}
      <section
        id="scene-higher-standard"
        className="relative min-h-[90vh] w-full flex flex-col items-center justify-center text-center px-6 sm:px-12 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-3xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              07 / 13 &bull; STILLNESS
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-white leading-tight mb-8">
            A Higher Standard <span className="italic text-[#7DEAF0]">of Water.</span>
          </h2>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#7DEAF0] to-transparent mx-auto my-6" />

          <p className="text-base sm:text-lg text-[#DCE8ED]/80 font-light max-w-xl mx-auto leading-relaxed">
            A visual breathing point in the journey. The bottle hovers in peaceful stillness as smooth macro ripples roll across the water surface in slow motion.
          </p>
        </div>
      </section>

      {/* ========================================================
          SCENE 08 — SPOTLIGHT CAP (Vertical beams sweeping)
          ======================================================== */}
      <section
        id="scene-spotlight-cap"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="hidden lg:block w-1/2" />

        <div className="max-w-xl pointer-events-auto ml-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              08 / 13 &bull; SPOTLIGHT CAP
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Architectural <span className="italic text-[#7DEAF0]">Illumination</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            Vertical spotlight shafts sweep side-to-side across the faceted crown of the bottle. Real-time specular highlights shimmer across the glass facets while microscopic dust particles float within luminous beams.
          </p>
        </div>
      </section>

      {/* ========================================================
          SCENE 09 — DESIGNED FOR A BRIGHTER TOMORROW (Water ribbon)
          ======================================================== */}
      <section
        id="scene-brighter-tomorrow"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              09 / 13 &bull; VISION
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Designed for a <span className="italic text-[#7DEAF0]">Brighter Tomorrow</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            Tilted gracefully inside a continuous loop of flowing water, the vessel symbolizes enduring purity. Infinitely recyclable, faceted heavy-crystal glass designed to outlast ordinary vessels.
          </p>
        </div>

        <div className="hidden lg:block w-1/2" />
      </section>

      {/* ========================================================
          SCENE 10 — PRODUCT PACK (The Bespoke Monolith)
          ======================================================== */}
      <section
        id="scene-pack"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="hidden lg:block w-1/2" />

        <div className="max-w-xl pointer-events-auto ml-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              10 / 13 &bull; PRODUCT PACK
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            The Bespoke <span className="italic text-[#7DEAF0]">Collector Case</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            Presented alongside a luxury black coffer with engraved alpine reliefs. Light sweeps across the engraving while floor reflections accentuate the architectural glass silhouette.
          </p>

          {onOpenReserve && (
            <button
              onClick={onOpenReserve}
              className="px-8 py-3.5 bg-white text-black font-medium hover:bg-[#7DEAF0] transition-all rounded-full text-xs font-mono tracking-widest uppercase cursor-pointer shadow-lg"
            >
              RESERVE COLLECTOR EDITION
            </button>
          )}
        </div>
      </section>

      {/* ========================================================
          SCENE 11 — WATERFALL BOTTLE (Stillness in motion)
          ======================================================== */}
      <section
        id="scene-waterfall"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              11 / 13 &bull; WATERFALL
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Stillness <span className="italic text-[#7DEAF0]">in Motion</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            The bottle remains immovably still while the environment moves with force. Cascading glacial torrents splash against black basalt rocks around the vessel, generating cold mountain spray.
          </p>
        </div>

        <div className="hidden lg:block w-1/2" />
      </section>

      {/* ========================================================
          SCENE 12 — CRYSTAL FACETS (Extreme macro glass zoom)
          ======================================================== */}
      <section
        id="scene-facets"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="hidden lg:block w-1/2" />

        <div className="max-w-xl pointer-events-auto ml-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0]" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              12 / 13 &bull; CRYSTAL FACETS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Prismatic <span className="italic text-[#7DEAF0]">Refraction</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            Extreme macro camera dolly directly into the glass facets. Observe chromatic dispersion splitting ambient light into razor-sharp prismatic spectra along every crystal edge.
          </p>
        </div>
      </section>

      {/* ========================================================
          SCENE 13 — UNDERWATER ENDING (Weightless descent)
          ======================================================== */}
      <section
        id="scene-underwater"
        className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#7DEAF0]/15 border border-[#7DEAF0]/35 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DEAF0] animate-ping" />
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              13 / 13 &bull; UNDERWATER ENDING
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-6">
            Weightless <span className="italic text-[#7DEAF0]">Descent</span>
          </h2>

          <p className="text-base sm:text-lg text-[#DCE8ED]/90 font-light leading-relaxed mb-8">
            The camera descends slowly into deep ocean blue. As the bottle settles serenely into weightless stillness, crystalline bubbles rise and light rays shimmer across the deep abyss.
          </p>
        </div>

        <div className="hidden lg:block w-1/2" />
      </section>

      {/* ========================================================
          SCENE 14 — CLOSING (Ends where it began: Darkness -> Final Ripple)
          ======================================================== */}
      <section
        id="scene-closing"
        className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 sm:px-12 py-32 z-20 pointer-events-none"
      >
        <div className="max-w-2xl pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="text-xs font-mono tracking-widest text-[#7DEAF0] uppercase">
              EPILOGUE
            </span>
          </div>

          <h2 className="text-6xl sm:text-8xl font-light tracking-[0.25em] text-white leading-none font-sans mb-6">
            IONA
          </h2>

          <p className="font-serif text-2xl sm:text-3xl font-light italic text-[#E2F4F8] leading-tight mb-12">
            Water, Reimagined.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
            <button
              onClick={() => {
                const el = document.getElementById('scene-hero');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/60 text-white text-xs font-mono tracking-widest uppercase transition-all cursor-pointer hover:bg-white/5"
            >
              EXPLORE AGAIN
            </button>

            <button
              onClick={onOpenReserve}
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-[#7DEAF0] transition-all text-xs font-mono tracking-widest uppercase cursor-pointer shadow-lg"
            >
              CONTACT & RESERVE
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 tracking-wider">
            <span>&copy; IONA BEVERAGES</span>
            <span className="mt-2 sm:mt-0">pH 8.5+ ALKALINE &bull; ARTESIAN STRATA</span>
          </div>
        </div>
      </section>
    </div>
  );
}
