import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Activity, Zap, ShieldCheck } from 'lucide-react';

const PURIFICATION_STAGES = [
  {
    stage: '01',
    name: 'SUBTERRANEAN GLACIAL ORIGIN',
    motif: '01 — DARK MOUNTAINS',
    image: '/images/iona_dark_mountains.jpg',
    tds: '18 PPM',
    ph: '7.2',
    symmetry: '92.4%',
    tension: '71.2 mN/m',
    detail: 'Meltwater originates from deep arctic glaciers, naturally protected from atmospheric pollutants inside deep volcanic basalt chambers for over 400 years.'
  },
  {
    stage: '02',
    name: 'TRIPLE BASALT ROCK MATRIX',
    motif: '02 — BLACK ROCK + WATER',
    image: '/images/iona_black_rock_water.jpg',
    tds: '14 PPM',
    ph: '7.5',
    symmetry: '96.1%',
    tension: '72.0 mN/m',
    detail: 'Water cascades across smooth black basalt stone beds, allowing natural gravity filtration to remove macro-particles while retaining essential mineral traces.'
  },
  {
    stage: '03',
    name: 'ELECTRO-MAGNETIC IONIZATION',
    motif: '06 — WATER DROPLETS',
    image: '/images/iona_water_droplets.jpg',
    tds: '12 PPM',
    ph: '7.8',
    symmetry: '99.9%',
    tension: '72.8 mN/m',
    detail: 'Water is exposed to structured ionic fields, reorganizing hydrogen bonds into hexagonal molecular formations for optimal cellular bioavailability.'
  },
  {
    stage: '04',
    name: 'FACETED DECANTER SEAL',
    motif: '03 — CRYSTAL GLASS',
    image: '/images/iona_crystal_glass.jpg',
    tds: '12 PPM',
    ph: '7.8',
    symmetry: '99.9%',
    tension: '72.8 mN/m',
    detail: 'Directly decanted at 4°C in a zero-oxygen environment inside hand-inspected crystal glass vessels to guarantee absolute purity.'
  }
];

export default function IonizationProcess() {
  const [currentStageIdx, setCurrentStageIdx] = useState(2);
  const activeStage = PURIFICATION_STAGES[currentStageIdx];

  return (
    <section id="purification" className="relative bg-[#05090C] py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-10 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
              THE IONIZATION PROTOCOL
            </span>
            <h2 className="font-syncopate text-3xl md:text-5xl font-extralight text-white uppercase tracking-editorial">
              PURITY ARCHITECTURE
            </h2>
          </div>
          <p className="text-xs tracking-editorial text-[#6C7A89] max-w-md uppercase leading-relaxed">
            Zero chemical additives. Zero synthetic membranes. Pure physical basalt filtration and electromagnetic ionic alignment.
          </p>
        </div>

        {/* Stage Navigation Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PURIFICATION_STAGES.map((stg, idx) => (
            <button
              key={stg.stage}
              onClick={() => setCurrentStageIdx(idx)}
              className={`p-6 border text-left transition-all duration-500 relative overflow-hidden ${
                currentStageIdx === idx
                  ? 'bg-[#081118] border-white text-white shadow-2xl'
                  : 'bg-transparent border-white/10 text-[#6C7A89] hover:border-white/30 hover:text-white'
              }`}
            >
              {currentStageIdx === idx && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#89B4D4]" />
              )}
              <div className="text-[10px] tracking-ultra text-[#89B4D4] font-mono mb-2">
                STAGE {stg.stage}
              </div>
              <div className="font-syncopate text-xs tracking-editorial uppercase line-clamp-1 font-light">
                {stg.name}
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Stage Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#081118] border border-white/10 p-8 lg:p-12">
          {/* Stage Visual */}
          <div className="lg:col-span-7 relative aspect-video w-full overflow-hidden border border-white/10 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStage.stage}
                src={activeStage.image}
                alt={activeStage.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute top-4 left-4 bg-[#05090C]/90 backdrop-blur-md px-3 py-1 text-[9px] tracking-ultra text-white/80 border border-white/10 font-mono uppercase">
              {activeStage.motif}
            </div>
          </div>

          {/* Stage Telemetry & Description */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
                STAGE {activeStage.stage} PROTOCOL
              </span>
              <h3 className="font-syncopate text-2xl font-light text-white tracking-editorial uppercase">
                {activeStage.name}
              </h3>
              <p className="text-xs tracking-editorial text-[#E8ECEF]/80 uppercase leading-relaxed font-light">
                {activeStage.detail}
              </p>
            </div>

            {/* Live Telemetry Matrix */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-6">
              <div>
                <span className="text-[9px] tracking-ultra text-[#6C7A89] uppercase block font-mono">TDS PURITY</span>
                <span className="text-lg font-light text-white tracking-editorial">{activeStage.tds}</span>
              </div>
              <div>
                <span className="text-[9px] tracking-ultra text-[#6C7A89] uppercase block font-mono">ALKALINE pH</span>
                <span className="text-lg font-light text-white tracking-editorial">{activeStage.ph}</span>
              </div>
              <div>
                <span className="text-[9px] tracking-ultra text-[#6C7A89] uppercase block font-mono">HEX SYMMETRY</span>
                <span className="text-lg font-light text-white tracking-editorial">{activeStage.symmetry}</span>
              </div>
              <div>
                <span className="text-[9px] tracking-ultra text-[#6C7A89] uppercase block font-mono">SURFACE TENSION</span>
                <span className="text-lg font-light text-white tracking-editorial">{activeStage.tension}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-[10px] tracking-ultra text-[#89B4D4] uppercase font-mono">
              <ShieldCheck className="w-4 h-4 text-[#89B4D4]" />
              <span>CERTIFIED ISO-14001 VOLCANIC ORIGIN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
