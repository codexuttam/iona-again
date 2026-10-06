import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Layers, Eye } from 'lucide-react';

const ARCHITECTURE_FEATURES = [
  {
    id: 'cap',
    title: 'BRUSHED METALLIC CAP',
    spec: 'TITANIUM & BASALT SEAL',
    desc: 'Heavy-weight brushed silver cap featuring precision micro-grooved rim threading and an inert vulcanized basalt seal to preserve zero-TDS purity.',
    top: '18%',
    left: '52%'
  },
  {
    id: 'facets',
    title: 'OCTAGUIDE 24 FACET BODY',
    spec: 'DIAMOND-CUT CRYSTAL GLASS',
    desc: 'Each angle is precision-faceted to capture and refract ambient light, creating silver and cold blue caustic refractions across wet dark surfaces.',
    top: '42%',
    left: '32%'
  },
  {
    id: 'emblem',
    title: 'MINIMAL ETCHED EMBLEM',
    spec: 'WHITE ARCHITECTURAL TYPE',
    desc: 'The iconic widely-spaced I O N A lettering is laser-etched onto the lower glass body with high-contrast white opacity.',
    top: '68%',
    left: '60%'
  },
  {
    id: 'base',
    title: 'HEAVY BASALT BASE',
    spec: 'STABILITY & MASS',
    desc: 'Formulated with high-density crystal mass to provide substantial weight and elegance when resting on wet basalt rock or marble.',
    top: '85%',
    left: '42%'
  }
];

export default function BottleArchitecture() {
  const [activeFeature, setActiveFeature] = useState(ARCHITECTURE_FEATURES[0]);
  const [lightingMode, setLightingMode] = useState('glacier');

  return (
    <section id="architecture" className="relative bg-[#05090C] py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 ${
          lightingMode === 'glacier'
            ? 'bg-[#89B4D4]/10'
            : lightingMode === 'midnight'
            ? 'bg-[#0D1820]/40'
            : 'bg-[#D1D8E0]/15'
        }`}
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-10 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block">
              PRODUCT ARCHITECTURE
            </span>
            <h2 className="font-syncopate text-3xl md:text-5xl font-extralight text-white uppercase tracking-editorial">
              THE DECANTER
            </h2>
          </div>

          {/* Lighting Mode Toggle Buttons */}
          <div className="flex items-center space-x-3 bg-[#081118] border border-white/10 p-1.5 text-[10px] tracking-ultra uppercase text-[#E8ECEF]">
            <span className="px-3 py-1 text-[#6C7A89] hidden sm:inline">REFLECTION:</span>
            <button
              onClick={() => setLightingMode('glacier')}
              className={`px-3 py-1.5 transition-colors ${
                lightingMode === 'glacier' ? 'bg-white text-black font-semibold' : 'hover:text-white'
              }`}
            >
              GLACIER BLUE
            </button>
            <button
              onClick={() => setLightingMode('midnight')}
              className={`px-3 py-1.5 transition-colors ${
                lightingMode === 'midnight' ? 'bg-white text-black font-semibold' : 'hover:text-white'
              }`}
            >
              MIDNIGHT
            </button>
            <button
              onClick={() => setLightingMode('silver')}
              className={`px-3 py-1.5 transition-colors ${
                lightingMode === 'silver' ? 'bg-white text-black font-semibold' : 'hover:text-white'
              }`}
            >
              SILVER SPECTRUM
            </button>
          </div>
        </div>

        {/* Main Interactive Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Specs Column */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <div className="space-y-3 border-l-2 border-[#89B4D4] pl-6 py-2">
              <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
                {activeFeature.spec}
              </span>
              <h3 className="font-syncopate text-xl md:text-2xl font-light text-white tracking-editorial uppercase">
                {activeFeature.title}
              </h3>
              <p className="text-xs tracking-editorial text-[#E8ECEF]/80 uppercase leading-relaxed font-light">
                {activeFeature.desc}
              </p>
            </div>

            {/* Feature selection list */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block mb-4">
                SELECT ARCHITECTURAL ZONE:
              </span>
              {ARCHITECTURE_FEATURES.map((feat) => (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(feat)}
                  className={`w-full text-left px-5 py-3.5 border transition-all text-xs tracking-editorial uppercase flex items-center justify-between ${
                    activeFeature.id === feat.id
                      ? 'bg-[#081118] border-white text-white font-medium shadow-lg'
                      : 'bg-transparent border-white/10 text-[#6C7A89] hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{feat.title}</span>
                  {activeFeature.id === feat.id && <Sparkles className="w-3.5 h-3.5 text-[#89B4D4]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Center Interactive Bottle Anchor */}
          <div className="lg:col-span-8 relative flex items-center justify-center p-6 bg-[#081118]/60 border border-white/10 min-h-[550px] order-1 lg:order-2">
            <div className="relative max-w-sm w-full mx-auto">
              {/* Master Bottle Asset */}
              <img
                src="/images/iona_master_bottle.jpg"
                alt="IONA Master Bottle Asset"
                className={`w-full h-auto object-contain transition-all duration-700 ${
                  lightingMode === 'glacier'
                    ? 'filter brightness-105 contrast-110 drop-shadow-[0_0_35px_rgba(137,180,212,0.25)]'
                    : lightingMode === 'midnight'
                    ? 'filter brightness-95 contrast-125 drop-shadow-[0_0_35px_rgba(5,9,12,0.9)]'
                    : 'filter brightness-110 contrast-105 drop-shadow-[0_0_35px_rgba(209,216,224,0.3)]'
                }`}
              />

              {/* Hotspots */}
              {ARCHITECTURE_FEATURES.map((feat) => (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(feat)}
                  style={{ top: feat.top, left: feat.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group p-2 focus:outline-none`}
                >
                  <span className="relative flex h-5 w-5">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        activeFeature.id === feat.id ? 'bg-[#89B4D4]' : 'bg-white'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-5 w-5 border border-white flex items-center justify-center text-[9px] font-mono ${
                        activeFeature.id === feat.id ? 'bg-[#89B4D4] text-black font-bold' : 'bg-[#05090C] text-white'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
