import React, { useEffect, useRef } from 'react';

interface FogLayerProps {
  density?: number;
  speed?: number;
  tint?: string;
  className?: string;
}

export default function FogLayer({
  density = 1,
  speed = 0.5,
  className = '',
}: FogLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Fog cloud entities
    const cloudCount = Math.floor(18 * density);
    const clouds = Array.from({ length: cloudCount }, () => ({
      x: Math.random() * width * 1.5 - width * 0.25,
      y: Math.random() * height * 0.9 + height * 0.05,
      radius: Math.random() * 280 + 180,
      vx: (Math.random() * 0.15 + 0.05) * speed,
      vy: (Math.random() * 0.04 - 0.02) * speed,
      baseAlpha: Math.random() * 0.05 + 0.02,
      pulseSpeed: Math.random() * 0.0015 + 0.0008,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < clouds.length; i++) {
        const c = clouds[i];
        c.x += c.vx;
        c.y += c.vy;

        // Wrap around horizontally
        if (c.x - c.radius > width) {
          c.x = -c.radius;
        }

        const alpha =
          c.baseAlpha * (1 + 0.25 * Math.sin(time * c.pulseSpeed * 100 + c.pulsePhase));

        const gradient = ctx.createRadialGradient(
          c.x,
          c.y,
          0,
          c.x,
          c.y,
          c.radius
        );

        // Cold blue and charcoal mist gradient
        gradient.addColorStop(0, `rgba(180, 215, 230, ${alpha * 1.3})`);
        gradient.addColorStop(0.4, `rgba(30, 55, 75, ${alpha * 0.8})`);
        gradient.addColorStop(0.8, `rgba(10, 21, 28, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(3, 7, 10, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed]);

  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 mix-blend-screen"
      />
    </div>
  );
}
