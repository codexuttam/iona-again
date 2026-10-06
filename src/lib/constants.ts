export const COLORS = {
  bgPrimary: '#030709',
  deepSlate: '#081116',
  mineralStone: '#121C22',
  glacialIce: '#E5F3F5',
  mistCyan: '#B8DDE3',
  subtleAqua: '#6E98A0',
  glassHighlight: '#FFFFFF',
  white: '#FFFFFF',
  primaryText: '#FFFFFF',
  secondaryText: '#D6E2E7',
  mutedText: '#94A7B0',
};

export interface SectionDef {
  id: string;
  num: string;
  label: string;
  title: string;
}

export const SECTIONS: SectionDef[] = [
  { id: 'hero', num: '', label: '', title: '' },
  { id: 'philosophy', num: '02', label: 'STILLNESS', title: 'THE ART OF STILLNESS' },
  { id: 'alkaline', num: '03', label: 'EQUILIBRIUM', title: 'SHAPED BY SUBTERRANEAN STONE' },
  { id: 'ionised', num: '04', label: 'RESONANCE', title: 'MOLECULAR HARMONY' },
  { id: 'process', num: '05', label: 'PROVENANCE', title: 'CENTURIES IN CREATION' },
  { id: 'bottle', num: '06', label: 'THE VESSEL', title: 'AN ARCHITECTURAL OBJECT' },
  { id: 'range', num: '07', label: 'COLLECTION', title: 'CURATED EDITIONS' },
  { id: 'questions', num: '08', label: 'INQUIRIES', title: 'THE SANCTUARY' },
];

export const PROCESS_STAGES = [
  {
    step: '01',
    name: 'GLACIAL ORIGIN',
    description: 'Alpine melt filtered through stone into a sealed aquifer.',
    depth: 'Subterranean Reservoir',
  },
  {
    step: '02',
    name: 'MINERAL INFUSION',
    description: 'Enriched with natural magnesium, calcium, and silica from ancient granite.',
    depth: 'Geological Balance',
  },
  {
    step: '03',
    name: 'MOLECULAR CLARITY',
    description: 'Subtle micro-clustering and catalytic ionisation for perfect resonance.',
    depth: 'Electrolytic Harmony',
  },
  {
    step: '04',
    name: 'HERMETIC SEAL',
    description: 'Bottled in clean-room stillness into BPA-free crystal vessels.',
    depth: 'Micro-Batch Allocation',
  },
];

export const PRODUCT_SIZES = [
  {
    size: '250 ML',
    name: 'On The Go',
    tag: 'Pocket Hydration',
    description: 'Compact for high mobility and swift replenishment.',
    heightScale: 0.72,
    diameterScale: 0.85,
    specs: { height: '162mm', weight: '290g', cap: 'Aluminium Twist' },
  },
  {
    size: '500 ML',
    name: 'Everyday',
    tag: 'Signature Size',
    description: 'The golden balance for day-long clarity.',
    heightScale: 0.95,
    diameterScale: 0.98,
    specs: { height: '215mm', weight: '540g', cap: 'Aluminium Twist' },
  },
  {
    size: '750 ML',
    name: 'Selected Icon',
    tag: 'Flagship Edition',
    description: 'Our primary reference silhouette, engineered with heavy food-grade resin.',
    heightScale: 1.15,
    diameterScale: 1.05,
    specs: { height: '248mm', weight: '780g', cap: 'Precision Fluted' },
  },
  {
    size: '1 L',
    name: 'Active Lifestyle',
    tag: 'Maximum Capacity',
    description: 'Designed for intensive performance and prolonged focus.',
    heightScale: 1.32,
    diameterScale: 1.18,
    specs: { height: '280mm', weight: '1040g', cap: 'Reinforced Grip' },
  },
];

export const FAQS = [
  {
    q: 'What makes IONA different from regular water?',
    a: 'IONA combines subterranean natural mineral water with proprietary micro-ionisation for optimal pH 8.5+ alkalinity and superior absorption.',
  },
  {
    q: 'Is IONA alkaline and ionised?',
    a: 'Yes. IONA achieves stability through electrolytic ionisation and balanced organic electrolytes (magnesium, potassium, calcium) that maintain cellular harmony.',
  },
  {
    q: 'What is the exact pH level of IONA?',
    a: 'IONA is calibrated to a stable pH range of 8.5 to 8.8, helping to neutralize dietary acidity.',
  },
  {
    q: 'Where does IONA source its water from?',
    a: 'Our source is a protected artesian glacial aquifer, naturally filtered through mineral-rich subterranean stone.',
  },
  {
    q: 'Is the bottle recyclable and BPA-free?',
    a: 'Every IONA bottle is crafted from 100% recyclable, BPA-free, food-grade PET resin.',
  },
  {
    q: 'Can I subscribe for scheduled deliveries?',
    a: 'Yes. The IONA Reserve membership provides automated monthly cases and exclusive member batch access.',
  },
];
