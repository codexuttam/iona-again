import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const CAMPAIGN_TILES = [
  {
    id: '01',
    motif: '01 — DARK MOUNTAINS',
    title: 'GLACIAL SANCTUARY',
    subtitle: 'ORIGIN STORY',
    src: '/images/iona_dark_mountains.jpg',
    span: 'col-span-12 lg:col-span-8 row-span-2',
    aspect: 'h-[480px] lg:h-[620px]',
    caption: 'Forged in remote volcanic basalt valleys where ice melts under blue hour moonlight.'
  },
  {
    id: '02',
    motif: '02 — BLACK ROCK & WATER',
    title: 'BASALT FILTRATION',
    subtitle: 'PURITY LAYER',
    src: '/images/iona_black_rock_water.jpg',
    span: 'col-span-12 sm:col-span-6 lg:col-span-4',
    aspect: 'h-[300px] lg:h-[300px]',
    caption: 'Silky glacial spring water trickling through non-porous obsidian rock formations.'
  },
  {
    id: '03',
    motif: '03 — FACETED CRYSTAL',
    title: 'CAUSTIC GEOMETRY',
    subtitle: 'MATERIAL SELECTION',
    src: '/images/iona_crystal_glass.jpg',
    span: 'col-span-12 sm:col-span-6 lg:col-span-4',
    aspect: 'h-[300px] lg:h-[300px]',
    caption: 'Heavy faceted lead-free crystal glass engineered to refract ambient lighting.'
  },
  {
    id: '04',
    motif: '04 — WATER DROPLETS',
    title: 'CONDENSATION & ION MATRIX',
    subtitle: 'MOLECULAR BOND',
    src: '/images/iona_water_droplets.jpg',
    span: 'col-span-12 sm:col-span-6 lg:col-span-4',
    aspect: 'h-[350px] lg:h-[400px]',
    caption: 'Ultra-pure surface tension creating perfect spherical micro-droplets on cold glass.'
  },
  {
    id: '05',
    motif: '05 — UNDERWATER DEPTHS',
    title: 'DEEP OCEAN RAYS',
    subtitle: 'LIGHT SPECTRUM',
    src: '/images/iona_underwater.jpg',
    span: 'col-span-12 sm:col-span-6 lg:col-span-8',
    aspect: 'h-[350px] lg:h-[400px]',
    caption: 'Submerged deep-water imagery capturing atmospheric cyan light rays breaking through cold ice.'
  },
  {
    id: '06',
    motif: '07 — SILVER & BLACK DETAILS',
    title: 'BRUSHED TITANIUM CAP',
    subtitle: 'CRAFTSMANSHIP',
    src: '/images/iona_product_cap_detail.jpg',
    span: 'col-span-12 sm:col-span-6 lg:col-span-4',
    aspect: 'h-[360px] lg:h-[420px]',
    caption: 'Micro-milled brushed metallic cap with hermetic basalt seal and precision rim threading.'
  },
  {
    id: '07',
    motif: '08 — WHITE EMPTY SPACE',
    title: 'THE ESSENCE OF NOTHINGNESS',
    subtitle: 'EDITORIAL CONTRAST',
    isWhiteTile: true,
    span: 'col-span-12 lg:col-span-8',
    aspect: 'h-[360px] lg:h-[420px]',
    caption: 'Selective stark white space introduced to create powerful contrast against cinematic darkness.'
  }
];

export default function CampaignGrid() {
  const [selectedTile, setSelectedTile] = useState(null);

  return (
    <section id="campaign" className="relative bg-[#05090C] py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-10 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block">
              VISUAL CAMPAIGN — VOL. 01
            </span>
            <h2 className="font-syncopate text-3xl md:text-5xl font-extralight text-white uppercase tracking-editorial">
              THE IONA MOSAIC
            </h2>
          </div>
          <p className="text-xs tracking-editorial text-[#6C7A89] max-w-md uppercase leading-relaxed">
            Every frame is extracted from the master IONA campaign board. Preserving black wet-rock environments, crystal caustics, and architectural typography.
          </p>
        </div>

        {/* Asymmetric Editorial Grid Mosaic */}
        <div className="grid grid-cols-12 gap-6">
          {CAMPAIGN_TILES.map((tile) => (
            <div
              key={tile.id}
              className={`${tile.span} relative group overflow-hidden ${
                tile.isWhiteTile
                  ? 'bg-white text-black p-12 flex flex-col justify-between border border-white'
                  : 'bg-[#081118] border border-white/10 hover:border-white/30'
              } transition-all duration-700`}
            >
              {tile.isWhiteTile ? (
                /* Visual Motif 08: White Empty Space Contrast Panel */
                <div className="h-full flex flex-col justify-between py-6">
                  <div className="space-y-4">
                    <span className="text-[10px] tracking-ultra font-bold uppercase text-black/60 block">
                      {tile.motif}
                    </span>
                    <h3 className="font-syncopate text-2xl md:text-4xl font-light tracking-editorial text-black uppercase leading-tight">
                      {tile.title}
                    </h3>
                  </div>
                  <div className="space-y-4 border-t border-black/10 pt-6">
                    <p className="text-xs tracking-editorial text-black/80 font-light uppercase leading-relaxed">
                      "Purity is not the addition of features, but the complete elimination of noise."
                    </p>
                    <span className="text-[10px] tracking-ultra uppercase text-black/50 block font-mono">
                      IONA MANIFESTO — PAGE 01
                    </span>
                  </div>
                </div>
              ) : (
                /* Standard Dark Cinematic Panel */
                <div
                  onClick={() => setSelectedTile(tile)}
                  className={`relative ${tile.aspect} w-full cursor-pointer overflow-hidden img-editorial-container`}
                >
                  <img
                    src={tile.src}
                    alt={tile.title}
                    className="w-full h-full object-cover img-editorial-zoom"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05090C] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top motif tag */}
                  <div className="absolute top-6 left-6 z-10 flex items-center justify-between w-[calc(100%-3rem)]">
                    <span className="text-[9px] tracking-ultra text-white/70 bg-[#05090C]/80 backdrop-blur-md px-3 py-1 border border-white/10 uppercase">
                      {tile.motif}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#05090C]/80 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>

                  {/* Bottom Title & Subtitle */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
                    <span className="text-[9px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
                      {tile.subtitle}
                    </span>
                    <h3 className="font-syncopate text-lg sm:text-xl font-light text-white tracking-editorial uppercase">
                      {tile.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for High Res Visual Campaign Inspection */}
      <AnimatePresence>
        {selectedTile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTile(null)}
            className="fixed inset-0 z-50 bg-[#05090C]/95 backdrop-blur-xl p-6 sm:p-12 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#081118] border border-white/20 p-6 sm:p-10 space-y-6 overflow-hidden"
            >
              <button
                onClick={() => setSelectedTile(null)}
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white border border-white/10 hover:border-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs tracking-ultra text-[#89B4D4] uppercase">
                {selectedTile.motif}
              </div>

              <div className="relative aspect-video w-full overflow-hidden border border-white/10">
                <img
                  src={selectedTile.src}
                  alt={selectedTile.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-syncopate text-2xl font-light text-white tracking-editorial uppercase">
                  {selectedTile.title}
                </h3>
                <p className="text-xs tracking-editorial text-[#E8ECEF]/80 uppercase leading-relaxed max-w-2xl">
                  {selectedTile.caption}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] tracking-ultra text-[#6C7A89] uppercase">
                <span>MASTER CAMPAIGN BOARD</span>
                <span>IONA EDITORIAL GALLERY</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
