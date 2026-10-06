import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Box, Image as ImageIcon } from 'lucide-react';
import ThreeBottleCanvas from './ThreeBottleCanvas';

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
  const [lightingMode, setLightingMode] = useState<'glacier' | 'midnight' | 'silver'>('glacier');
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

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
            <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
              PRODUCT ARCHITECTURE
            </span>
            <h2 className="font-syncopate text-3xl md:text-5xl font-extralight text-white uppercase tracking-editorial">
              THE DECANTER
            </h2>
          </div>

          {/* Controls: 3D / Photo Mode & Lighting Presets */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#081118] border border-white/10 p-1 text-[10px] tracking-ultra uppercase text-[#E8ECEF]">
              <button
                onClick={() => setViewMode('3d')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 transition-colors ${
                  viewMode === '3d' ? 'bg-white text-black font-semibold' : 'hover:text-white text-white/60'
                }`}
              >
                <Box className="w-3 h-3" />
                <span>3D WEBGL</span>
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 transition-colors ${
                  viewMode === 'photo' ? 'bg-white text-black font-semibold' : 'hover:text-white text-white/60'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>PHOTOGRAPHY</span>
              </button>
            </div>

            {/* Lighting Mode Toggle Buttons */}
            <div className="flex items-center space-x-2 bg-[#081118] border border-white/10 p-1 text-[10px] tracking-ultra uppercase text-[#E8ECEF]">
              <button
                onClick={() => setLightingMode('glacier')}
                className={`px-3 py-1.5 transition-colors ${
                  lightingMode === 'glacier' ? 'bg-white text-black font-semibold' : 'hover:text-white text-white/60'
                }`}
              >
                GLACIER BLUE
              </button>
              <button
                onClick={() => setLightingMode('midnight')}
                className={`px-3 py-1.5 transition-colors ${
                  lightingMode === 'midnight' ? 'bg-white text-black font-semibold' : 'hover:text-white text-white/60'
                }`}
              >
                MIDNIGHT
              </button>
              <button
                onClick={() => setLightingMode('silver')}
                className={`px-3 py-1.5 transition-colors ${
                  lightingMode === 'silver' ? 'bg-white text-black font-semibold' : 'hover:text-white text-white/60'
                }`}
              >
                SILVER
              </button>
            </div>
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
              <span className="text-[10px] tracking-ultra text-[#6C7A89] uppercase block mb-4 font-mono">
                ARCHITECTURAL DETAILS:
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

          {/* Center Interactive Bottle Anchor (3D WebGL Canvas or Photography) */}
          <div className="lg:col-span-8 relative flex items-center justify-center bg-[#081118]/60 border border-white/10 min-h-[550px] lg:min-h-[620px] order-1 lg:order-2 overflow-hidden">
            {viewMode === '3d' ? (
              <ThreeBottleCanvas
                lightingMode={lightingMode}
                activeFeatureId={activeFeature.id}
                onSelectFeature={(id) => {
                  const f = ARCHITECTURE_FEATURES.find((item) => item.id === id);
                  if (f) setActiveFeature(f);
                }}
              />
            ) : (
              <div className="relative max-w-sm w-full mx-auto p-6">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
