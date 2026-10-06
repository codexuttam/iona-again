import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createEnvironmentAtmosphere } from './experience/BubblesAndParticles';
import { createWaterWave } from './experience/WaterSurface';

export default function ThreeBackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Renderer with high visual fidelity
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 1. Dynamic Undulating 3D Water Caustic Wave
    const waterWave = createWaterWave();
    waterWave.setTheme('dark');
    waterWave.mesh.position.set(0, -0.8, -3.2);
    waterWave.mesh.scale.set(1.4, 1.4, 1.4);
    scene.add(waterWave.mesh);

    // 2. Ambient Floating Bubbles & Deep Particle Atmosphere
    const atmosphere = createEnvironmentAtmosphere();
    atmosphere.setTheme('dark');
    scene.add(atmosphere.bubblesGroup);
    scene.add(atmosphere.particlesField);

    // 3. Dynamic Interactive Lights
    const ambientLight = new THREE.AmbientLight('#081118', 1.2);
    scene.add(ambientLight);

    // Interactive mouse-tracking light
    const mouseLight = new THREE.PointLight('#7DEAF0', 3.5, 12, 1.2);
    mouseLight.position.set(0, 0, 3);
    scene.add(mouseLight);

    // Deep cyan rim accent
    const rimLight = new THREE.DirectionalLight('#20BFD3', 2.0);
    rimLight.position.set(-4, 3, -1);
    scene.add(rimLight);

    // Silver specular fill
    const silverLight = new THREE.DirectionalLight('#E2F4F8', 1.8);
    silverLight.position.set(4, -2, 2);
    scene.add(silverLight);

    // Mouse & Scroll Tracking State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Update interactive light position
      mouseLight.position.x = mouse.x * 4;
      mouseLight.position.y = mouse.y * 3;
      mouseLight.intensity = 2.8 + Math.sin(elapsedTime * 2) * 0.7;

      // Camera parallax
      camera.position.x = mouse.x * 0.6;
      camera.position.y = mouse.y * 0.4 - scrollProgress * 1.5;
      camera.lookAt(0, -scrollProgress * 1.5, 0);

      // Update 3D water wave mesh physics
      waterWave.update(elapsedTime, scrollProgress);
      waterWave.mesh.rotation.z = Math.sin(elapsedTime * 0.3) * 0.08 + mouse.x * 0.05;

      // Update atmosphere bubbles & particles
      atmosphere.update(elapsedTime, scrollProgress);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Dynamic 3D WebGL Caustic & Fluid Background Canvas */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000 overflow-hidden"
      />

      {/* Floating Organic Glow Blooms */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-[20%] left-[10%] w-[650px] h-[650px] rounded-full bg-[#112430]/35 blur-[160px] animate-pulse-glow"
        />
        <div
          className="absolute top-[45%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#0D2533]/30 blur-[150px] animate-float-slow"
        />
        <div
          className="absolute bottom-[5%] left-[25%] w-[700px] h-[700px] rounded-full bg-[#081822]/40 blur-[170px]"
        />
      </div>
    </>
  );
}
