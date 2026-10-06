import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createIonaBottle, BottleInstance } from './IonaBottle';
import { createWaterWave, WaterWaveInstance } from './WaterSurface';
import { createWaterSphere, WaterSphereInstance } from './WaterSphere';
import { createEnvironmentAtmosphere, EnvironmentAtmosphere } from './BubblesAndParticles';
import { lerp } from '../../lib/utils';
import envMapUrl from '../../assets/images/underwater_ambient_env_1791133503549.jpg';
import { useTheme } from '../../context/ThemeContext';

interface SceneProps {
  scrollProgress: number;
  activeSectionIndex: number;
  selectedBottleIndex?: number;
  onBottleInteract?: (isInteracting: boolean) => void;
}

export default function Scene({
  scrollProgress,
  activeSectionIndex: _activeSectionIndex,
  selectedBottleIndex = 1,
}: SceneProps) {
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const sceneElementsRef = useRef<{
    scene?: THREE.Scene;
    ambientLight?: THREE.AmbientLight;
    mainKeyLight?: THREE.DirectionalLight;
    rimLight?: THREE.DirectionalLight;
    bottomDeepLight?: THREE.PointLight;
    topSoftSpot?: THREE.SpotLight;
    mainBottle?: BottleInstance;
    bottle250?: BottleInstance;
    bottle1L?: BottleInstance;
    waterWave?: WaterWaveInstance;
    waterSphere?: WaterSphereInstance;
    atmosphere?: EnvironmentAtmosphere;
  }>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive drag state
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Scene & Fog Setup
    const isInitialLight = themeRef.current === 'light';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isInitialLight ? '#F4F8FA' : '#030709');
    scene.fog = new THREE.FogExp2(isInitialLight ? '#F4F8FA' : '#030709', isInitialLight ? 0.018 : 0.075);

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // 4. Natural Luxury Lighting (Glacial daylight + diamond specular key)
    const ambientLight = new THREE.AmbientLight(isInitialLight ? '#FFFFFF' : '#0E181F', isInitialLight ? 2.2 : 1.8);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight('#FFFFFF', isInitialLight ? 3.0 : 2.4);
    mainKeyLight.position.set(3.5, 4.5, 4.0);
    mainKeyLight.castShadow = !isMobile;
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(isInitialLight ? '#B0E6F4' : '#D2E7ED', isInitialLight ? 2.6 : 2.2);
    rimLight.position.set(-3, 2, -2.5);
    scene.add(rimLight);

    const bottomDeepLight = new THREE.PointLight(isInitialLight ? '#D2EEF5' : '#081218', 1.2, 15);
    bottomDeepLight.position.set(0, -3, 2);
    scene.add(bottomDeepLight);

    const topSoftSpot = new THREE.SpotLight('#FFFFFF', isInitialLight ? 3.2 : 2.5, 24, Math.PI / 3.8, 0.6, 1);
    topSoftSpot.position.set(0, 7.5, 2);
    scene.add(topSoftSpot);

    // 5. Environment Map (Texture Loader)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      envMapUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      },
      undefined,
      () => {
        // Fallback gracefully if load fails
      }
    );

    // 6. Objects & Entities
    // Main Hero Bottle (Faceted Crystal Bottle with pixel-perfect aspect ratio)
    const mainBottle: BottleInstance = createIonaBottle({ initialTheme: themeRef.current });
    scene.add(mainBottle.group);

    // Secondary bottles for Section 07 (Product Range showcase) and Section 08
    const bottle250: BottleInstance = createIonaBottle({ heightScale: 0.75, radiusScale: 0.88, initialTheme: themeRef.current });
    const bottle1L: BottleInstance = createIonaBottle({ heightScale: 1.25, radiusScale: 1.12, initialTheme: themeRef.current });
    bottle250.setScale(0.55);
    bottle1L.setScale(0.55);
    bottle250.group.position.set(-1.75, -0.68, 0);
    bottle1L.group.position.set(1.75, -0.32, 0);
    bottle250.group.visible = false;
    bottle1L.group.visible = false;
    scene.add(bottle250.group);
    scene.add(bottle1L.group);

    // Water wave in background
    const waterWave: WaterWaveInstance = createWaterWave();
    scene.add(waterWave.mesh);

    // Section 03 Water Sphere
    const waterSphere: WaterSphereInstance = createWaterSphere();
    scene.add(waterSphere.group);

    // Underwater particles, bubbles, rays
    const atmosphere: EnvironmentAtmosphere = createEnvironmentAtmosphere();
    scene.add(atmosphere.bubblesGroup);
    scene.add(atmosphere.particlesField);
    scene.add(atmosphere.energyRibbon);
    scene.add(atmosphere.lightRays);

    // Save references for reactive theme updates
    sceneElementsRef.current = {
      scene,
      ambientLight,
      mainKeyLight,
      rimLight,
      bottomDeepLight,
      topSoftSpot,
      mainBottle,
      bottle250,
      bottle1L,
      waterWave,
      waterSphere,
      atmosphere,
    };

    // Apply active theme immediately to the 3D scene
    applyThemeToScene(themeRef.current);

    setIsReady(true);

    // 7. Mouse & Touch Interactions
    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current.x = normX * 0.35;
      mouseTarget.current.y = normY * 0.25;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;
        manualRotation.current.y += deltaX * 0.008;
        manualRotation.current.x += deltaY * 0.008;
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Allow drag rotation primarily around Section 06/Bottle or anywhere when hovering
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.current.y;
        manualRotation.current.y += deltaX * 0.008;
        manualRotation.current.x += deltaY * 0.008;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 8. Resize Handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 9. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let currentCamX = 0;
    let currentCamY = 0;
    let currentCamZ = 5.8;
    let currentLookAtX = 0;
    let currentLookAtY = 0;
    let currentLookAtZ = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const p = scrollProgressRef.current;

      // Smooth mouse lerp
      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.06);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.06);

      // Damp manual rotation back toward 0 gently when not dragging
      if (!isDraggingRef.current) {
        manualRotation.current.x = lerp(manualRotation.current.x, 0, 0.02);
      }

      // Camera Choreography interpolation based on scrollProgress p (0 to 1)
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 5.8;
      let targetLookAtX = 0;
      let targetLookAtY = 0;
      let targetLookAtZ = 0;

      // Bottle Transform targets
      let targetBottleX = 0;
      let targetBottleY = 0;
      let targetBottleZ = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let targetRotZ = 0;
      let targetScale = isMobile ? 0.8 : 1.0;

      // Targets for secondary bottles (bottle250 and bottle1L)
      let targetBottle250X = -1.75;
      let targetBottle250Y = -0.68;
      let targetBottle250Z = 0;
      let targetBottle1LX = 1.75;
      let targetBottle1LY = -0.32;
      let targetBottle1LZ = 0;
      let targetSecondaryScale = 0.55;

      // Multi-bottle visibility flag for Section 07 and 08
      let showMultiBottles = false;

      // Check section element positions for pinpoint accurate scroll choreography
      const processEl = document.getElementById('process');
      const bottleEl = document.getElementById('bottle');
      const rangeEl = document.getElementById('range');
      const questionsEl = document.getElementById('questions');
      const ultimateEl = document.getElementById('ultimate-hydration');

      let processFraction = -1;
      if (processEl) {
        const pRect = processEl.getBoundingClientRect();
        if (pRect.top <= window.innerHeight * 0.8 && pRect.bottom >= window.innerHeight * 0.2) {
          const totalDistance = pRect.height + window.innerHeight * 0.6;
          const current = (window.innerHeight * 0.8) - pRect.top;
          processFraction = Math.min(1, Math.max(0, current / totalDistance));
        }
      }

      const rangeRect = rangeEl?.getBoundingClientRect();
      const bottleRect = bottleEl?.getBoundingClientRect();
      const questionsRect = questionsEl?.getBoundingClientRect();
      const ultimateRect = ultimateEl?.getBoundingClientRect();

      if (rangeRect && rangeRect.top <= window.innerHeight * 0.6) {
        // Section 07 & 08: PRODUCT RANGE & QUESTIONS / ULTIMATE HYDRATION
        showMultiBottles = true;

        const isUltimateSection = ultimateRect && ultimateRect.top <= window.innerHeight * 0.75;
        const aspect = camera.aspect;
        const isMobileView = aspect < 0.95 || window.innerWidth < 768;

        // Dynamic scale and spacing ensuring all 3 bottles fit completely on any screen
        const multiScale = isMobileView ? 0.36 : (aspect < 1.3 ? 0.44 : 0.48);
        const spacingX = isMobileView ? Math.min(0.85, aspect * 1.05) : (aspect < 1.3 ? 1.4 : 1.7);

        // Ground baseline aligned so all 3 bottle bottoms rest on the exact same plane
        const baseY = isUltimateSection ? -0.85 : -0.75;

        targetCamX = 0;
        targetCamY = isUltimateSection ? 0.05 : (questionsRect && questionsRect.top <= window.innerHeight * 0.5 ? 0.0 : -0.05);
        targetCamZ = isMobileView ? 7.2 : 6.4;

        // Center Bottle (Main 750ML, hScale = 1.0)
        targetBottleX = 0;
        targetBottleY = baseY + 1.69 * 1.0 * multiScale;
        targetBottleZ = selectedBottleIndex === 1 || selectedBottleIndex === 2 ? 0.3 : 0;
        targetRotX = 0.02;
        targetRotY = time * 0.06;
        targetRotZ = 0;
        targetScale = multiScale;

        // Left Bottle (250ML, hScale = 0.72)
        targetBottle250X = -spacingX;
        targetBottle250Y = baseY + 1.69 * 0.72 * multiScale;
        targetBottle250Z = selectedBottleIndex === 0 ? 0.3 : 0;

        // Right Bottle (1L, hScale = 1.28)
        targetBottle1LX = spacingX;
        targetBottle1LY = baseY + 1.69 * 1.28 * multiScale;
        targetBottle1LZ = selectedBottleIndex === 3 ? 0.3 : 0;

        targetSecondaryScale = multiScale;
      } else if (bottleRect && bottleRect.top <= window.innerHeight * 0.5) {
        // Section 06: OUR BOTTLE SHOWCASE (Full 360 Vessel Inspection)
        const bTotal = bottleRect.height || window.innerHeight;
        const bProgress = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - bottleRect.top) / bTotal));
        targetCamX = lerp(-0.35, 0.0, bProgress);
        targetCamY = 0.0;
        targetCamZ = lerp(5.4, 4.9, bProgress);

        targetBottleX = lerp(0.35, 0.0, bProgress);
        targetBottleY = 0.0;
        targetBottleZ = 0;

        targetRotX = 0.04;
        targetRotY = 2.5 + bProgress * Math.PI + time * 0.06;
        targetRotZ = 0.0;
        targetScale = isMobile ? 0.62 : 0.72;
      } else if (processFraction >= 0) {
        // Section 05: THE IONA PROCESS (PROVENANCE)
        targetCamX = lerp(0.2, -0.05, processFraction);
        targetCamY = 0.0;
        targetCamZ = 5.6;

        targetBottleX = isMobile ? 0 : 0.48;
        targetBottleY = 0.0;
        targetBottleZ = 0;

        targetRotX = 0.05;
        targetRotY = 0.6 + processFraction * (Math.PI * 2) + time * 0.04;
        targetRotZ = -0.03;
        targetScale = isMobile ? 0.60 : 0.68;
      } else {
        // Sections 01 - 04 (Hero through Resonance)
        if (p < 0.12) {
          // Section 01: HERO - Full bottle completely framed with elegant margins
          const t = p / 0.12;
          targetCamX = lerp(0, 0.15, t);
          targetCamY = 0.0;
          targetCamZ = lerp(6.2, 5.8, t);

          targetBottleX = lerp(0.95, 1.15, t);
          targetBottleY = 0.0;
          targetBottleZ = 0;

          targetRotX = 0.03;
          targetRotY = -0.15 + time * 0.03;
          targetRotZ = -0.02;
          targetScale = isMobile ? 0.62 : 0.70;
        } else if (p < 0.25) {
          // Section 02: PHILOSOPHY (STILLNESS)
          const t = (p - 0.12) / 0.13;
          targetCamX = lerp(0.15, -0.6, t);
          targetCamY = 0.05;
          targetCamZ = lerp(5.8, 5.6, t);

          targetBottleX = lerp(1.15, 1.25, t);
          targetBottleY = 0.0;
          targetBottleZ = 0;

          targetRotX = 0.04;
          targetRotY = lerp(-0.15, 0.3, t) + time * 0.03;
          targetRotZ = -0.02;
          targetScale = isMobile ? 0.62 : 0.70;
        } else if (p < 0.38) {
          // Section 03: EQUILIBRIUM (STONE & ALKALINE BALANCE)
          const t = (p - 0.25) / 0.13;
          targetCamX = lerp(-0.6, -0.85, t);
          targetCamY = 0.05;
          targetCamZ = lerp(5.6, 5.4, t);

          targetBottleX = lerp(1.25, 0.95, t);
          targetBottleY = 0.0;
          targetBottleZ = 0;

          targetRotX = 0.04;
          targetRotY = 0.4 + time * 0.03;
          targetRotZ = -0.02;
          targetScale = isMobile ? 0.62 : 0.70;
        } else {
          // Section 04: RESONANCE (MOLECULAR HARMONY)
          const t = Math.min(1, Math.max(0, (p - 0.38) / 0.12));
          targetCamX = lerp(-0.85, 0.65, t);
          targetCamY = 0.05;
          targetCamZ = lerp(5.4, 5.2, t);

          targetBottleX = lerp(0.95, -0.85, t);
          targetBottleY = 0.0;
          targetBottleZ = 0;

          targetRotX = 0.04;
          targetRotY = 0.8 + time * 0.03;
          targetRotZ = 0.02;
          targetScale = isMobile ? 0.62 : 0.70;
        }
      }

      // Smooth camera interpolation
      currentCamX = lerp(currentCamX, targetCamX + mouseCurrent.current.x * 0.4, 0.05);
      currentCamY = lerp(currentCamY, targetCamY + mouseCurrent.current.y * 0.4, 0.05);
      currentCamZ = lerp(currentCamZ, targetCamZ, 0.05);
      camera.position.set(currentCamX, currentCamY, currentCamZ);

      currentLookAtX = lerp(currentLookAtX, targetLookAtX, 0.05);
      currentLookAtY = lerp(currentLookAtY, targetLookAtY, 0.05);
      currentLookAtZ = lerp(currentLookAtZ, targetLookAtZ, 0.05);
      camera.lookAt(currentLookAtX, currentLookAtY, currentLookAtZ);

      // Smooth Bottle interpolation
      mainBottle.group.position.x = lerp(mainBottle.group.position.x, targetBottleX, 0.06);
      mainBottle.group.position.y = lerp(
        mainBottle.group.position.y,
        targetBottleY + Math.sin(time * 1.2) * (showMultiBottles ? 0.025 : 0.04),
        0.06
      );
      mainBottle.group.position.z = lerp(mainBottle.group.position.z, targetBottleZ, 0.06);

      // Add mouse drag manual rotation + gentle mouse follow
      mainBottle.group.rotation.x = lerp(
        mainBottle.group.rotation.x,
        targetRotX + mouseCurrent.current.y * 0.5 + manualRotation.current.x,
        0.06
      );
      mainBottle.group.rotation.y = lerp(
        mainBottle.group.rotation.y,
        targetRotY + mouseCurrent.current.x * 0.6 + manualRotation.current.y,
        0.06
      );
      mainBottle.group.rotation.z = lerp(mainBottle.group.rotation.z, targetRotZ, 0.06);

      mainBottle.setScale(targetScale);
      mainBottle.update(time, p);

      // Update secondary range bottles
      bottle250.group.visible = showMultiBottles;
      bottle1L.group.visible = showMultiBottles;
      if (showMultiBottles) {
        bottle250.group.position.x = lerp(bottle250.group.position.x, targetBottle250X, 0.06);
        bottle250.group.position.y = lerp(
          bottle250.group.position.y,
          targetBottle250Y + Math.sin(time * 1.2 + 0.6) * 0.025,
          0.06
        );
        bottle250.group.position.z = lerp(bottle250.group.position.z, targetBottle250Z, 0.06);
        bottle250.group.rotation.x = lerp(bottle250.group.rotation.x, targetRotX + mouseCurrent.current.y * 0.25, 0.06);
        bottle250.group.rotation.y = lerp(
          bottle250.group.rotation.y,
          time * 0.11 + mouseCurrent.current.x * 0.35 + manualRotation.current.y * 0.5,
          0.06
        );
        bottle250.group.rotation.z = lerp(bottle250.group.rotation.z, 0, 0.06);
        bottle250.setScale(targetSecondaryScale);
        bottle250.update(time, p);

        bottle1L.group.position.x = lerp(bottle1L.group.position.x, targetBottle1LX, 0.06);
        bottle1L.group.position.y = lerp(
          bottle1L.group.position.y,
          targetBottle1LY + Math.sin(time * 1.2 + 1.2) * 0.025,
          0.06
        );
        bottle1L.group.position.z = lerp(bottle1L.group.position.z, targetBottle1LZ, 0.06);
        bottle1L.group.rotation.x = lerp(bottle1L.group.rotation.x, targetRotX + mouseCurrent.current.y * 0.25, 0.06);
        bottle1L.group.rotation.y = lerp(
          bottle1L.group.rotation.y,
          time * 0.09 + mouseCurrent.current.x * 0.35 + manualRotation.current.y * 0.5,
          0.06
        );
        bottle1L.group.rotation.z = lerp(bottle1L.group.rotation.z, 0, 0.06);
        bottle1L.setScale(targetSecondaryScale);
        bottle1L.update(time, p);
      }

      // Update background water wave
      waterWave.update(time, p);

      // Update water sphere
      waterSphere.update(time, p);

      // Update atmosphere (bubbles, particles, rays)
      atmosphere.update(time, p);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  const applyThemeToScene = (currentTheme: 'light' | 'dark') => {
    const el = sceneElementsRef.current;
    if (!el.scene) return;
    const isLight = currentTheme === 'light';

    el.scene.background = new THREE.Color(isLight ? '#F4F8FA' : '#030709');
    el.scene.fog = new THREE.FogExp2(isLight ? '#F4F8FA' : '#030709', isLight ? 0.018 : 0.075);

    if (el.ambientLight) {
      el.ambientLight.color.set(isLight ? '#FFFFFF' : '#0E181F');
      el.ambientLight.intensity = isLight ? 2.2 : 1.8;
    }
    if (el.mainKeyLight) {
      el.mainKeyLight.color.set('#FFFFFF');
      el.mainKeyLight.intensity = isLight ? 3.0 : 2.4;
    }
    if (el.rimLight) {
      el.rimLight.color.set(isLight ? '#B0E6F4' : '#D2E7ED');
      el.rimLight.intensity = isLight ? 2.6 : 2.2;
    }
    if (el.bottomDeepLight) {
      el.bottomDeepLight.color.set(isLight ? '#D2EEF5' : '#081218');
      el.bottomDeepLight.intensity = isLight ? 1.2 : 1.2;
    }
    if (el.topSoftSpot) {
      el.topSoftSpot.intensity = isLight ? 3.2 : 2.5;
    }

    el.mainBottle?.setTheme(currentTheme);
    el.bottle250?.setTheme(currentTheme);
    el.bottle1L?.setTheme(currentTheme);
    el.waterWave?.setTheme(currentTheme);
    el.waterSphere?.setTheme(currentTheme);
    el.atmosphere?.setTheme(currentTheme);
  };

  // Re-apply whenever user toggles light / dark theme
  useEffect(() => {
    applyThemeToScene(theme);
  }, [theme]);

  // Update bottle size selection when user clicks a size in ProductRange
  useEffect(() => {
    // Subtly highlighted when selected
  }, [selectedBottleIndex]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      style={{ touchAction: 'pan-y' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />
      {!isReady && (
        <div className="absolute inset-0 bg-[var(--theme-bg)] transition-opacity duration-1000 pointer-events-none" />
      )}
    </div>
  );
}
