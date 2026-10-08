import React, { useEffect, useRef } from 'react';

interface ParticleFieldProps {
  count?: number;
  interactive?: boolean;
}

export default function ParticleField({
  count = 60,
  interactive = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const particles = Array.from({ length: Math.min(count, 35) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.0 + 0.4, // Microscopic droplet size
      vx: (Math.random() - 0.5) * 0.1,
      vy: Math.random() * 0.25 + 0.08, // Slow downward gravity / drift
      alpha: Math.random() * 0.25 + 0.05, // Very soft translucent mist
      sway: Math.random() * 1.5 + 0.5,
      swaySpeed: Math.random() * 0.01 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const draw = () => {
      time += 0.015;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(time * p.swaySpeed + p.phase) * 0.2 + p.vx;

        // Interactive gentle air current shift
        if (interactive && mouseRef.current.x > 0) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 0.6;
            p.y += (dy / dist) * force * 0.6;
          }
        }

        // Loop vertically (water droplets fall downward like fine mist)
        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft translucent cold water droplet
        ctx.fillStyle = `rgba(200, 225, 240, ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [count, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 block opacity-80"
    />
  );
}
