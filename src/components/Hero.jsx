import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';

export default function Hero({ onOpenReserve }) {
  const [lightShift, setLightShift] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setLightShift({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#05090C] overflow-hidden pt-28 pb-12"
    >
      {/* Background Panoramic Dark Mountains Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/iona_dark_mountains.jpg"
          alt="IONA Glacial Mountains"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${lightShift.x * 0.5}px, ${lightShift.y * 0.5}px) scale(1.05)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05090C] via-[#05090C]/60 to-[#05090C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,24,32,0.4)_0%,rgba(5,9,12,0.95)_75%)]" />
      </div>

      {/* Top Campaign Label */}
      <div className="relative z-10 text-center space-y-2 mt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="inline-flex items-center space-x-3 px-4 py-1.5 border border-white/10 bg-[#081118]/80 backdrop-blur-sm text-[10px] tracking-ultra uppercase text-[#89B4D4]"
        >
          <Compass className="w-3 h-3 text-[#89B4D4] animate-spin-slow" />
          <span>ORIGIN 64°08'N 21°56'W — EDITION 2026</span>
        </motion.div>
      </div>

      {/* Main Center Visual & Hero Typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center my-auto py-8">
        {/* Main IONA Heading */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-syncopate text-5xl sm:text-7xl md:text-9xl font-extralight text-white uppercase mb-4 tracking-ultra select-none"
        >
          I O N A
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base font-light tracking-editorial text-[#E8ECEF] uppercase mb-10 max-w-2xl"
        >
          W A T E R , &nbsp; R E I M A G I N E D .
        </motion.p>

        {/* Master Bottle Product Anchor Image */}
        <div className="relative my-4 w-full max-w-md mx-auto group">
          {/* Ambient Cold Steel Light Halo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#89B4D4]/10 blur-3xl pointer-events-none animate-pulse-glow"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 animate-float-slow"
          >
            <img
              src="/images/iona_master_bottle.jpg"
              alt="IONA Master Crystal Water Decanter"
              className="w-64 sm:w-80 md:w-96 mx-auto h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-transform duration-700"
              style={{
                transform: `rotateX(${lightShift.y * 0.3}deg) rotateY(${lightShift.x * 0.3}deg)`
              }}
            />
          </motion.div>
        </div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mt-6"
        >
          <button
            onClick={onOpenReserve}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium text-xs tracking-ultra uppercase hover:bg-[#E8ECEF] transition-all transform hover:-translate-y-0.5 shadow-2xl"
          >
            RESERVE DECANTER
          </button>
          <a
            href="#campaign"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white/60 text-white text-xs tracking-ultra uppercase transition-all backdrop-blur-sm"
          >
            EXPLORE THE CAMPAIGN
          </a>
        </motion.div>
      </div>

      {/* Bottom Telemetry Bar & Scroll Indicator */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-ultra text-[#6C7A89] uppercase border-t border-white/5 pt-6 gap-4">
        <div className="flex items-center space-x-8">
          <span>TDS: <strong className="text-[#E8ECEF]">12 PPM</strong></span>
          <span>pH: <strong className="text-[#E8ECEF]">7.8 ALKALINE</strong></span>
          <span>FACET CUT: <strong className="text-[#E8ECEF]">OCTAGUIDE 24</strong></span>
        </div>

        <a
          href="#campaign"
          className="flex items-center space-x-2 text-[#E8ECEF] hover:text-white transition-colors group"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
