import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const windFilterRef = useRef<BiquadFilterNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Procedural gentle glacial wind & stream audio synthesis
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        // Pink noise filtering for natural wind/water rush
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.76160 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        noiseSourceRef.current = noise;

        // Lowpass resonance to simulate mountain wind & cold stream
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        windFilterRef.current = filter;

        // Gain control - quiet, subtle, atmospheric
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNodeRef.current = gain;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
      } else {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      aria-label="Toggle ambient sound"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-3.5 py-2 bg-[#05090C]/80 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 group cursor-pointer"
    >
      {isPlaying ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-[#89B4D4] animate-ping" />
          <Volume2 className="w-3.5 h-3.5 text-[#89B4D4]" />
          <span className="text-[10px] tracking-[0.25em] text-[#DCE8ED] font-light uppercase">
            AMBIENCE ON
          </span>
        </>
      ) : (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <VolumeX className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors" />
          <span className="text-[10px] tracking-[0.25em] text-white/40 group-hover:text-white/70 font-light uppercase transition-colors">
            SOUND OFF
          </span>
        </>
      )}
    </button>
  );
}
