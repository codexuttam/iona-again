import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Sequence stages
    const t1 = setTimeout(() => setPhase(1), 300); // 01 Environment & tiny particles
    const t2 = setTimeout(() => setPhase(2), 900); // 02 Light sweep
    const t3 = setTimeout(() => setPhase(3), 1600); // 03 Bottle emerges
    const t4 = setTimeout(() => {
      setPhase(4);
      onComplete();
    }, 2400); // Complete & reveal DOM typography

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (phase >= 4) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--theme-bg)] transition-opacity duration-1000 ${
        phase === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Light sweep beam */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-border-strong)]/20 to-transparent -translate-x-full transition-transform duration-1000 ease-out ${
          phase >= 2 ? 'translate-x-full' : ''
        }`}
      />

      {/* Center minimalist monogram & pulse */}
      <div className="relative flex flex-col items-center">
        <div className="font-serif-luxury text-3xl sm:text-5xl font-light tracking-[0.35em] text-[var(--theme-text-primary)]">
          I O N A
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.35em] text-[var(--theme-text-muted)]">
            {phase === 0 && 'BORN FROM SILENCE'}
            {phase === 1 && 'FILTERED THROUGH STONE'}
            {phase === 2 && 'BALANCED BY NATURE'}
            {phase >= 3 && 'ELEMENTAL STILLNESS'}
          </span>
        </div>
      </div>
    </div>
  );
}
