import { useState, useEffect } from 'react';

export function useParallax(damping = 0.06) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Range: -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Gamma: -90 to 90 (left to right tilt)
        // Beta: -180 to 180 (front to back tilt, nominal ~45 deg viewing angle)
        targetX = Math.max(-1, Math.min(1, e.gamma / 30));
        targetY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * damping;
      currentY += (targetY - currentY) * damping;
      setOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      cancelAnimationFrame(rafId);
    };
  }, [damping]);

  return offset;
}
