import React, { useEffect, useState } from 'react';

export default function AtmosphericLight() {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let currentX = 50;
    let currentY = 50;
    let targetX = 50;
    let targetY = 50;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        targetX = Math.min(100, Math.max(0, 50 + e.gamma * 1.2));
        targetY = Math.min(100, Math.max(0, 50 + (e.beta - 45) * 1.2));
      }
    };

    const lerp = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setCoords({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    rafId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary ice-blue subtle overhead beam */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-25 transition-transform duration-75"
        style={{
          transform: `translate(${coords.x * 0.4}vw, ${coords.y * 0.3}vh)`,
          background:
            'radial-gradient(circle, rgba(137, 180, 212, 0.35) 0%, rgba(30, 60, 80, 0.15) 40%, transparent 75%)',
        }}
      />
      {/* Secondary cold teal caustic edge highlight */}
      <div
        className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(74, 158, 179, 0.3) 0%, rgba(10, 25, 35, 0.1) 50%, transparent 80%)',
        }}
      />
    </div>
  );
}
