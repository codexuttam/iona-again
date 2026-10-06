import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { createIonaBottle, BottleInstance } from './experience/IonaBottle';
import { RotateCcw, Sparkles } from 'lucide-react';

interface ThreeBottleCanvasProps {
  lightingMode?: 'glacier' | 'midnight' | 'silver';
  activeFeatureId?: string;
  onSelectFeature?: (id: string) => void;
}

export default function ThreeBottleCanvas({
  lightingMode = 'glacier',
  activeFeatureId = 'facets',
  onSelectFeature,
}: ThreeBottleCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<BottleInstance | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const lightsRef = useRef<{
    keyLight: THREE.DirectionalLight;
    rimLight: THREE.DirectionalLight;
    fillLight: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
  } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number>(750);
  const rotationVelocity = useRef({ x: 0, y: 0.003 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight('#081118', 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#DDF4F8', 3.0);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#89B4D4', 4.5);
    rimLight.position.set(-3, 2, -2.5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight('#7DEAF0', 2.0, 10);
    fillLight.position.set(0, -1.5, 2.5);
    scene.add(fillLight);

    lightsRef.current = { keyLight, rimLight, fillLight, ambientLight };

    // Procedural 3D IONA Bottle
    const bottle = createIonaBottle('dark');
    bottleRef.current = bottle;
    bottle.group.position.set(0, -0.2, 0);
    bottle.setScale(1.15);
    scene.add(bottle.group);

    // Subtle initial rotation
    bottle.group.rotation.y = 0.35;

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update inner bubbles & condensation
      bottle.update(elapsedTime, 0);

      // Inertial auto-spin when not interacting
      if (!isDragging) {
        bottle.group.rotation.y += rotationVelocity.current.y;
        bottle.group.rotation.x = THREE.MathUtils.lerp(bottle.group.rotation.x, 0, 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle Lighting Preset Shifts
  useEffect(() => {
    if (!lightsRef.current) return;
    const { keyLight, rimLight, fillLight } = lightsRef.current;

    if (lightingMode === 'glacier') {
      gsap.to(rimLight.color, { r: 0.54, g: 0.71, b: 0.83, duration: 0.8 });
      gsap.to(fillLight.color, { r: 0.49, g: 0.92, b: 0.94, duration: 0.8 });
      gsap.to(keyLight, { intensity: 3.2, duration: 0.8 });
    } else if (lightingMode === 'midnight') {
      gsap.to(rimLight.color, { r: 0.15, g: 0.35, b: 0.45, duration: 0.8 });
      gsap.to(fillLight.color, { r: 0.05, g: 0.2, b: 0.3, duration: 0.8 });
      gsap.to(keyLight, { intensity: 2.2, duration: 0.8 });
    } else if (lightingMode === 'silver') {
      gsap.to(rimLight.color, { r: 0.85, g: 0.9, b: 0.95, duration: 0.8 });
      gsap.to(fillLight.color, { r: 0.8, g: 0.85, b: 0.9, duration: 0.8 });
      gsap.to(keyLight, { intensity: 4.0, duration: 0.8 });
    }
  }, [lightingMode]);

  // Size changes animation
  const handleSizeChange = (size: number, scaleFactor: number) => {
    setSelectedSize(size);
    if (bottleRef.current) {
      gsap.to(bottleRef.current.group.scale, {
        x: scaleFactor,
        y: scaleFactor,
        z: scaleFactor,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  // Drag Interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !bottleRef.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    bottleRef.current.group.rotation.y += deltaX * 0.008;
    bottleRef.current.group.rotation.x = THREE.MathUtils.clamp(
      bottleRef.current.group.rotation.x + deltaY * 0.005,
      -0.4,
      0.4
    );

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetRotation = () => {
    if (bottleRef.current) {
      gsap.to(bottleRef.current.group.rotation, {
        x: 0,
        y: 0.35,
        z: 0,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div className="relative w-full h-[550px] lg:h-[620px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Left 3D Interactive Telemetry Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-[#05090C]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[9px] tracking-ultra text-[#89B4D4] uppercase font-mono">
        <span className="w-2 h-2 rounded-full bg-[#89B4D4] animate-ping" />
        <span>THREE.JS 3D PROCEDURAL SHADER · 360° DRAG TO ROTATE</span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        <button
          onClick={resetRotation}
          className="p-2 bg-[#05090C]/80 backdrop-blur-md border border-white/10 hover:border-white/40 text-white/70 hover:text-white transition-colors"
          title="Reset 3D Rotation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Size Switcher */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-[#05090C]/85 backdrop-blur-md p-1 border border-white/10 text-[10px] tracking-ultra uppercase text-white font-mono">
        <span className="px-2 text-[#6C7A89] hidden sm:inline">VESSEL SIZE:</span>
        <button
          onClick={() => handleSizeChange(330, 0.95)}
          className={`px-3 py-1.5 transition-colors ${
            selectedSize === 330 ? 'bg-white text-black font-bold' : 'hover:text-white text-white/60'
          }`}
        >
          330 ML
        </button>
        <button
          onClick={() => handleSizeChange(500, 1.05)}
          className={`px-3 py-1.5 transition-colors ${
            selectedSize === 500 ? 'bg-white text-black font-bold' : 'hover:text-white text-white/60'
          }`}
        >
          500 ML
        </button>
        <button
          onClick={() => handleSizeChange(750, 1.15)}
          className={`px-3 py-1.5 transition-colors ${
            selectedSize === 750 ? 'bg-white text-black font-bold' : 'hover:text-white text-white/60'
          }`}
        >
          750 ML
        </button>
      </div>
    </div>
  );
}
