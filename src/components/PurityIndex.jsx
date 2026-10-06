import React, { useState } from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

const MINERAL_SPECS = [
  { name: 'SILICA (SiO2)', value: '18.2 mg/L', benefit: 'Enhances skin collagen bio-density and connective tissue.' },
  { name: 'CALCIUM (Ca2+)', value: '2.4 mg/L', benefit: 'Ultra-light mineral balance preserving soft velvety mouthfeel.' },
  { name: 'MAGNESIUM (Mg2+)', value: '1.1 mg/L', benefit: 'Facilitates cellular electrolyte transmission.' },
  { name: 'POTASSIUM (K+)', value: '0.6 mg/L', benefit: 'Natural intracellular ionic hydration.' },
  { name: 'BICARBONATES (HCO3-)', value: '14.5 mg/L', benefit: 'Sustains optimal systemic alkaline equilibrium.' },
  { name: 'SODIUM (Na+)', value: '1.8 mg/L', benefit: 'Extremely low sodium footprint for pure taste.' }
];

const CERTIFICATIONS = [
  '0% PFAS / FOREVER CHEMICALS',
  '0% MICROPLASTICS (DOWN TO 0.1 MICRONS)',
  '0% SYNTHETIC FLUORIDE ADDITIVES',
  '0% CHLORINE DISINFECTION BYPRODUCTS',
  '0% HEAVY METALS OR LEAD CONTAMINATION',
  '100% RECYCLABLE CRYSTAL GLASS VESSEL'
];

export default function PurityIndex() {
  const [activeTab, setActiveTab] = useState('minerals');

  return (
    <section id="minerals" className="relative bg-[#05090C] py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-10 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] tracking-ultra text-[#89B4D4] uppercase block font-mono">
              SPECIFICATION ARCHITECTURE
            </span>
            <h2 className="font-syncopate text-3xl md:text-5xl font-extralight text-white uppercase tracking-editorial">
              MINERAL MATRIX
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center space-x-2 bg-[#081118] border border-white/10 p-1 text-[10px] tracking-ultra uppercase text-[#E8ECEF]">
            <button
              onClick={() => setActiveTab('minerals')}
              className={`px-5 py-2 transition-all ${
                activeTab === 'minerals' ? 'bg-white text-black font-semibold' : 'hover:text-white'
              }`}
            >
              MINERAL MATRIX
            </button>
            <button
              onClick={() => setActiveTab('zero')}
              className={`px-5 py-2 transition-all ${
                activeTab === 'zero' ? 'bg-white text-black font-semibold' : 'hover:text-white'
              }`}
            >
              ZERO GUARANTEE
            </button>
          </div>
        </div>

        {activeTab === 'minerals' ? (
          /* Mineral Matrix Table */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MINERAL_SPECS.map((spec, i) => (
                <div
                  key={i}
                  className="bg-[#081118] border border-white/10 p-8 space-y-4 hover:border-white/30 transition-all group"
                >
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                    <span className="text-[10px] tracking-ultra text-[#89B4D4] font-mono">
                      ELEMENT 0{i + 1}
                    </span>
                    <span className="font-syncopate text-xl font-light text-white tracking-editorial">
                      {spec.value}
                    </span>
                  </div>
                  <h3 className="font-syncopate text-sm font-light text-white tracking-editorial uppercase">
                    {spec.name}
                  </h3>
                  <p className="text-xs tracking-editorial text-[#6C7A89] uppercase leading-relaxed font-light">
                    {spec.benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary Bar */}
            <div className="bg-[#081118] border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between text-xs tracking-editorial text-[#E8ECEF] uppercase gap-6">
              <div className="flex items-center space-x-4">
                <Award className="w-5 h-5 text-[#89B4D4]" />
                <span>INDEPENDENT LABORATORY CERTIFIED ANALYSIS — ISO 17025</span>
              </div>
              <span className="text-[10px] tracking-ultra text-[#6C7A89] font-mono">
                TOTAL DISSOLVED SOLIDS: 12 PPM (ULTRA LIGHT)
              </span>
            </div>
          </div>
        ) : (
          /* Zero Guarantee List */
          <div className="bg-[#081118] border border-white/10 p-10 md:p-14 space-y-10">
            <div className="space-y-3">
              <h3 className="font-syncopate text-2xl font-light text-white tracking-editorial uppercase">
                THE ABSOLUTE ZERO STANDARDS
              </h3>
              <p className="text-xs tracking-editorial text-[#6C7A89] uppercase leading-relaxed max-w-2xl font-light">
                We believe what is absent from your water is as critical as what is present. IONA contains zero chemical processing, synthetic minerals, or municipal runoff.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 border border-white/5 bg-[#05090C]/50">
                  <CheckCircle2 className="w-4 h-4 text-[#89B4D4] shrink-0" />
                  <span className="text-xs tracking-editorial text-white uppercase">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
