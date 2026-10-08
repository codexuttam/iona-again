import React, { useEffect, useState } from 'react';

interface OpeningSceneProps {
  onComplete: () => void;
}

export default function OpeningScene({ onComplete }: OpeningSceneProps) {
  const [phase, setPhase] = useState<'darkness' | 'fog' | 'drop' | 'ripple' | 'reveal' | 'finished'>('darkness');

  useEffect(() => {
    // Stage 1: Absolute Darkness (0ms to 400ms)
    const t1 = setTimeout(() => setPhase('fog'), 400);

    // Stage 2: Fog appears, single droplet falls (400ms to 1400ms)
    const t2 = setTimeout(() => setPhase('drop'), 900);

    // Stage 3: Droplet hits invisible water, ripples expand (1400ms to 2400ms)
    const t3 = setTimeout(() => setPhase('ripple'), 1600);

    // Stage 4: Ripple dissolves into Hero world (2400ms to 3200ms)
    const t4 = setTimeout(() => setPhase('reveal'), 2300);

    // Stage 5: Complete transition
    const t5 = setTimeout(() => {
      setPhase('finished');
      onComplete();
    }, 3200);

    // Instant bypass on scroll, touch, or click
    const handleBypass = () => {
      setPhase('finished');
      onComplete();
    };

    window.addEventListener('wheel', handleBypass, { once: true });
    window.addEventListener('touchstart', handleBypass, { once: true });
    window.addEventListener('click', handleBypass, { once: true });
    window.addEventListener('keydown', handleBypass, { once: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener('wheel', handleBypass);
      window.removeEventListener('touchstart', handleBypass);
      window.removeEventListener('click', handleBypass);
      window.removeEventListener('keydown', handleBypass);
    };
  }, [onComplete]);

  if (phase === 'finished') return null;

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center transition-opacity duration-1000 ease-out ${
        phase === 'reveal' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#03070A' }}
    >
      {/* Fog Materialization */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === 'fog' || phase === 'drop' || phase === 'ripple' ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(137, 180, 212, 0.15) 0%, rgba(10, 21, 28, 0.4) 50%, transparent 80%)',
        }}
      />

      {/* Falling Single Droplet */}
      {(phase === 'drop' || phase === 'ripple') && (
        <div
          className={`absolute w-3.5 h-4.5 rounded-full shadow-[0_0_12px_rgba(220,232,237,0.8)] transition-all ease-in ${
            phase === 'drop'
              ? 'top-[15%] opacity-100 duration-700'
              : 'top-[52%] opacity-0 scale-150 duration-150'
          }`}
          style={{
            background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #89B4D4 60%, #101C24 100%)',
            boxShadow: '0 0 16px rgba(220, 232, 237, 0.9)',
          }}
        />
      )}

      {/* Ripple Rings on Invisible Water Impact */}
      {(phase === 'ripple' || phase === 'reveal') && (
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          {/* Ring 1 */}
          <div className="absolute rounded-full border border-white/70 animate-ripple-expand-1" />
          {/* Ring 2 */}
          <div className="absolute rounded-full border border-[#89B4D4]/60 animate-ripple-expand-2" />
          {/* Ring 3 */}
          <div className="absolute rounded-full border border-white/30 animate-ripple-expand-3" />

          {/* Impact Caustic Flash */}
          <div className="w-16 h-16 rounded-full bg-white/40 blur-md animate-ping" />
        </div>
      )}

      {/* Atmospheric text hint before reveal */}
      <div
        className={`absolute bottom-16 text-center tracking-[0.4em] text-[10px] uppercase font-light text-white/40 transition-opacity duration-700 ${
          phase === 'fog' || phase === 'drop' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>DARKNESS &bull; WATER &bull; WORLD</span>
      </div>
    </div>
  );
}
