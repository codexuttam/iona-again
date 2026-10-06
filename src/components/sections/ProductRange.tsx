import { useState } from 'react';
import { Check, Box } from 'lucide-react';
import { PRODUCT_SIZES } from '../../lib/constants';
import { useTheme } from '../../context/ThemeContext';
import crystalLightUrl from '../../assets/images/iona_bottle_crystal.png';
import crystalDarkUrl from '../../assets/images/iona_bottle_crystal_dark.png';

interface ProductRangeProps {
  selectedSizeIndex: number;
  onSelectSize: (index: number) => void;
  onReserveCase?: (size: string) => void;
}

export default function ProductRange({
  selectedSizeIndex,
  onSelectSize,
  onReserveCase,
}: ProductRangeProps) {
  const [reservedSize, setReservedSize] = useState<string | null>(null);
  const { isLight } = useTheme();

  const bottleImg = isLight ? crystalLightUrl : crystalDarkUrl;

  const handleReserve = (size: string) => {
    setReservedSize(size);
    if (onReserveCase) {
      onReserveCase(size);
    }
    setTimeout(() => setReservedSize(null), 3500);
  };

  const bottleHeights = ['h-32', 'h-40', 'h-48', 'h-56'];

  return (
    <section
      id="range"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 pointer-events-none select-none z-10 py-24"
    >
      {/* Top Header */}
      <div className="max-w-xl pointer-events-auto">

        {/* Heading */}
        <h2 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[var(--theme-text-primary)] leading-[1.0] text-luminous-heading">
          <span className="block font-light">
            Curated vessels
          </span>
          <span className="block italic text-accent-highlight font-normal">
            for every
          </span>
          <span className="block font-light opacity-95">
            setting.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-8 text-sm sm:text-base text-[var(--theme-text-secondary)] font-light tracking-wide leading-relaxed text-editorial-body">
          Four calibrated silhouettes sharing the same architectural purity. Allocated in limited quarterly releases for private residences and curated hospitality.
        </p>
      </div>

      {/* Product Size Selector Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pointer-events-auto max-w-6xl">
        {PRODUCT_SIZES.map((prod, idx) => {
          const isSelected = selectedSizeIndex === idx;
          const isJustReserved = reservedSize === prod.size;

          return (
            <div
              key={prod.size}
              onClick={() => onSelectSize(idx)}
              className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between card-luxury-glass group ${
                isSelected
                  ? 'border-[var(--theme-border-highlight)] ring-2 ring-[var(--theme-border-highlight)]/40 translate-y-[-6px]'
                  : 'hover:translate-y-[-2px]'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-luxury text-3xl sm:text-4xl font-light text-[var(--theme-text-primary)] tracking-tight">
                    {prod.size}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] font-medium">
                    {prod.tag}
                  </span>
                </div>

                <div className="text-xs font-serif-luxury tracking-widest text-[var(--theme-text-primary)] mt-1 uppercase font-medium">
                  {prod.name}
                </div>

                {/* 3D Bottle Visual Representation */}
                <div className="my-5 flex items-center justify-center h-56 relative overflow-hidden rounded-xl bg-gradient-to-b from-transparent via-[var(--theme-border-subtle)]/30 to-transparent">
                  <img
                    src={bottleImg}
                    alt={`IONA ${prod.size} Crystal Bottle`}
                    className={`object-contain transition-transform duration-500 drop-shadow-xl ${bottleHeights[idx]} ${
                      isSelected ? 'scale-105' : 'group-hover:scale-105 opacity-90'
                    }`}
                  />
                  {isSelected && (
                    <div className="absolute inset-x-8 bottom-2 h-1 bg-[var(--theme-text-accent)]/50 blur-sm rounded-full" />
                  )}
                </div>

                <p className="text-xs text-[var(--theme-text-secondary)] font-light mt-1 leading-relaxed">
                  {prod.description}
                </p>

                {/* Specs */}
                <div className="mt-4 pt-3 border-t border-[var(--theme-border-subtle)] space-y-1 text-[11px] font-mono text-[var(--theme-text-muted)]">
                  <div className="flex justify-between">
                    <span>Height:</span>
                    <span className="text-[var(--theme-text-primary)] font-medium">{prod.specs.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Filled Weight:</span>
                    <span className="text-[var(--theme-text-primary)] font-medium">{prod.specs.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Closure:</span>
                    <span className="text-[var(--theme-text-primary)] font-medium">{prod.specs.cap}</span>
                  </div>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReserve(prod.size);
                }}
                className={`mt-6 w-full py-2.5 px-4 rounded-full text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isJustReserved
                    ? 'bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-hover-text)] font-medium'
                    : isSelected
                    ? 'border border-[var(--theme-border-strong)] bg-[var(--theme-pill-hover-bg)] text-[var(--theme-pill-hover-text)] shadow-sm'
                    : 'border border-[var(--theme-border-medium)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-border-strong)] hover:text-[var(--theme-text-primary)]'
                }`}
              >
                {isJustReserved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ORDER REQUESTED</span>
                  </>
                ) : (
                  <>
                    <Box className="w-3.5 h-3.5" />
                    <span>ORDER CASE</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Case Allocation Notice */}
      {reservedSize && (
        <div className="fixed bottom-16 right-8 z-50 p-4 rounded-xl card-luxury-glass text-[var(--theme-text-primary)] shadow-2xl animate-in slide-in-from-bottom duration-300 pointer-events-auto border border-[var(--theme-border-highlight)]">
          <div className="flex items-center gap-2 text-xs font-serif-luxury text-[var(--theme-text-primary)] font-medium">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Order requested for {reservedSize} Case.</span>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)] font-light mt-1">
            Our team will reach out with your order and delivery details.
          </p>
        </div>
      )}
    </section>
  );
}
