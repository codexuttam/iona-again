import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createEnvironmentAtmosphere } from './BubblesAndParticles';
import { createWaterWave } from './WaterSurface';

gsap.registerPlugin(ScrollTrigger);

interface ThreeMasterSceneProps {
  onSceneChange?: (sceneIndex: number) => void;
}

export default function ThreeMasterScene({ onSceneChange }: ThreeMasterSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < 768;

    // 1. WebGL Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#03070A');
    scene.fog = new THREE.FogExp2('#03070A', 0.045);

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    // 3. High-Fidelity WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight('#08131C', 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#E6F7FA', 3.2);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#7DEAF0', 4.0);
    rimLight.position.set(-4.0, 3.0, -2.5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight('#20BFD3', 2.4, 16);
    fillLight.position.set(0, -1.8, 3.2);
    scene.add(fillLight);

    const interactiveCursorLight = new THREE.PointLight('#E2F4F8', 1.8, 10);
    interactiveCursorLight.position.set(0, 0, 3.5);
    scene.add(interactiveCursorLight);

    const textureLoader = new THREE.TextureLoader();

    // ========================================================
    // 5. 3D MOUNTAIN ENVIRONMENT (Curved Panoramic Depth Plane at z = -13.0)
    // ========================================================
    const mountainTex = textureLoader.load('/images/iona_dark_mountains.jpg');
    mountainTex.colorSpace = THREE.SRGBColorSpace;
    mountainTex.wrapS = THREE.ClampToEdgeWrapping;
    mountainTex.wrapT = THREE.ClampToEdgeWrapping;

    // Curved panoramic geometry for cinematic immersion
    const mountainGeo = new THREE.CylinderGeometry(15, 15, 12, 36, 16, true, Math.PI * 0.72, Math.PI * 0.56);
    // Invert faces inwards toward camera
    mountainGeo.scale(-1, 1, 1);

    const mountainMat = new THREE.MeshStandardMaterial({
      map: mountainTex,
      roughness: 0.95,
      metalness: 0.05,
      side: THREE.BackSide,
    });
    const mountainMesh = new THREE.Mesh(mountainGeo, mountainMat);
    mountainMesh.position.set(0, 0.4, 0);
    scene.add(mountainMesh);

    // Subtle drifting atmospheric mist planes between mountains and foreground
    const mistGeo = new THREE.PlaneGeometry(18, 5, 8, 8);
    const mistMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#0A1A24'),
      transparent: true,
      opacity: 0.35,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mistLayer1 = new THREE.Mesh(mistGeo, mistMat);
    mistLayer1.position.set(-2, 0.2, -9.0);
    scene.add(mistLayer1);

    const mistLayer2 = new THREE.Mesh(mistGeo, mistMat);
    mistLayer2.position.set(2, -0.6, -7.5);
    mistLayer2.scale.set(0.9, 0.8, 1);
    scene.add(mistLayer2);

    // ========================================================
    // 6. 3D WATERFALL & BASALT WET ROCK LAYER (Depth Plane at z = -5.8)
    // ========================================================
    const rockTex = textureLoader.load('/images/iona_black_rock_water.jpg');
    rockTex.colorSpace = THREE.SRGBColorSpace;
    const rockGeo = new THREE.PlaneGeometry(14, 8, 16, 16);
    const rockMat = new THREE.MeshStandardMaterial({
      map: rockTex,
      transparent: true,
      opacity: 0.45,
      roughness: 0.22,
      metalness: 0.2,
      depthWrite: false,
    });
    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.position.set(0, -0.8, -5.8);
    scene.add(rockMesh);

    // ========================================================
    // 7. DYNAMIC UNDULATING 3D WATER SURFACE (z = -2.2)
    // ========================================================
    const waterWave = createWaterWave();
    waterWave.setTheme('dark');
    waterWave.mesh.position.set(0, -1.3, -2.2);
    waterWave.mesh.scale.set(1.5, 1.5, 1.5);
    scene.add(waterWave.mesh);

    // ========================================================
    // 8. 3D ATMOSPHERIC BUBBLES & IONIZED PARTICLES
    // ========================================================
    const atmosphere = createEnvironmentAtmosphere();
    atmosphere.setTheme('dark');
    scene.add(atmosphere.bubblesGroup);
    scene.add(atmosphere.particlesField);

    // ========================================================
    // 9. THE EXACT 3D IONA PRODUCT BOTTLE ASSEMBLY
    // ========================================================
    const bottleGroup = new THREE.Group();
    bottleGroup.name = 'iona-master-3d-bottle';

    const bottleTex = textureLoader.load('/iona_bottle_master.png');
    bottleTex.colorSpace = THREE.SRGBColorSpace;
    bottleTex.minFilter = THREE.LinearMipmapLinearFilter;
    bottleTex.magFilter = THREE.LinearFilter;
    bottleTex.anisotropy = 16;

    // A) Front Physical Glass Face
    const bottlePlaneGeo = new THREE.PlaneGeometry(1.4, 2.1);
    const bottleMatFront = new THREE.MeshPhysicalMaterial({
      map: bottleTex,
      transparent: true,
      roughness: 0.05,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transmission: 0.35,
      ior: 1.52,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const bottleMeshFront = new THREE.Mesh(bottlePlaneGeo, bottleMatFront);
    bottleMeshFront.position.z = 0.04;
    bottleGroup.add(bottleMeshFront);

    // B) Back Physical Glass Face (Refractive Internal Thickness)
    const bottleMatBack = new THREE.MeshPhysicalMaterial({
      map: bottleTex,
      transparent: true,
      roughness: 0.08,
      metalness: 0.02,
      clearcoat: 0.8,
      transmission: 0.5,
      ior: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
      opacity: 0.75,
    });
    const bottleMeshBack = new THREE.Mesh(bottlePlaneGeo, bottleMatBack);
    bottleMeshBack.position.z = -0.04;
    bottleMeshBack.scale.set(0.97, 0.97, 1);
    bottleGroup.add(bottleMeshBack);

    // C) 3D Faceted Crystal Rim Chamfers (Catches Specular Glints when turning)
    const facetPrismGeo = new THREE.CylinderGeometry(0.38, 0.44, 2.05, 8, 1, true);
    const facetPrismMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#DDF4F8'),
      roughness: 0.02,
      transmission: 0.95,
      ior: 1.54,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const facetPrism = new THREE.Mesh(facetPrismGeo, facetPrismMat);
    facetPrism.position.y = -0.02;
    bottleGroup.add(facetPrism);

    // D) 3D Precision Knurled Metal Cap Mesh
    const capGeo = new THREE.CylinderGeometry(0.24, 0.245, 0.24, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0A141A'),
      roughness: 0.2,
      metalness: 0.88,
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.set(0, 0.96, 0);
    bottleGroup.add(capMesh);

    // Embossed Cap Rim Disc
    const capRimGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.03, 32);
    const capRimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7DEAF0'),
      roughness: 0.3,
      metalness: 0.9,
    });
    const capRim = new THREE.Mesh(capRimGeo, capRimMat);
    capRim.position.set(0, 0.85, 0);
    bottleGroup.add(capRim);

    // E) 3D Internal Rising Micro-Droplets inside the bottle
    const internalDropletsGroup = new THREE.Group();
    const dropletGeo = new THREE.SphereGeometry(0.016, 8, 8);
    const dropletMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7DEAF0'),
      transparent: true,
      opacity: 0.65,
    });
    const dropletMeshes: { mesh: THREE.Mesh; speed: number; seed: number }[] = [];
    for (let i = 0; i < 22; i++) {
      const dm = new THREE.Mesh(dropletGeo, dropletMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.24;
      dm.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5 - 0.1,
        Math.sin(angle) * radius * 0.25
      );
      internalDropletsGroup.add(dm);
      dropletMeshes.push({
        mesh: dm,
        speed: 0.15 + Math.random() * 0.35,
        seed: Math.random() * 10,
      });
    }
    bottleGroup.add(internalDropletsGroup);

    // F) 3D Specular Caustic Floor Projection beneath the bottle
    const causticFloorGeo = new THREE.PlaneGeometry(1.8, 0.9);
    const causticFloorMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7DEAF0'),
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const causticFloor = new THREE.Mesh(causticFloorGeo, causticFloorMat);
    causticFloor.rotation.x = -Math.PI / 2;
    causticFloor.position.y = -1.06;
    bottleGroup.add(causticFloor);

    // Initial positioning in 3D space
    bottleGroup.position.set(isMobile ? 0 : 1.15, 0, 0);
    bottleGroup.scale.set(isMobile ? 0.95 : 1.15, isMobile ? 0.95 : 1.15, 1);
    scene.add(bottleGroup);

    // ========================================================
    // 10. MOUSE & DRAG INTERACTION STATE
    // ========================================================
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    let dragRotation = { x: 0, y: 0 };
    const mousePos = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseDown = (e: MouseEvent) => {
      // Allow drag to spin bottle
      isDragging = true;
      previousMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - previousMouse.x;
        const deltaY = e.clientY - previousMouse.y;
        dragRotation.y += deltaX * 0.009;
        dragRotation.x = THREE.MathUtils.clamp(dragRotation.x + deltaY * 0.006, -0.4, 0.4);
        previousMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMouse.x;
        const deltaY = e.touches[0].clientY - previousMouse.y;
        dragRotation.y += deltaX * 0.009;
        dragRotation.x = THREE.MathUtils.clamp(dragRotation.x + deltaY * 0.006, -0.4, 0.4);
        previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // ========================================================
    // 11. GSAP SCROLLTRIGGER & 3D CAMERA CHOREOGRAPHY
    // ========================================================
    const sceneTargets = [
      // 00 / 01 - Hero: Bottle on right, floating gracefully, misty mountains
      {
        camX: 0, camY: 0, camZ: 4.9,
        bottleX: isMobile ? 0 : 1.15, bottleY: 0, bottleZ: 0,
        rotX: 0.03, rotY: -0.22, rotZ: 0,
        scale: isMobile ? 0.95 : 1.15,
        keyIntensity: 3.2,
      },
      // 02 - Cap Close-Up: Macro 3D camera dolly into the top cap & seal
      {
        camX: isMobile ? 0 : 0.35, camY: 0.95, camZ: 2.35,
        bottleX: isMobile ? 0 : -0.05, bottleY: -0.15, bottleZ: 0,
        rotX: 0.08, rotY: 0.05, rotZ: 0,
        scale: 1.25,
        keyIntensity: 3.6,
      },
      // 03 - Ionized: Bottle glides left, tilts in 3D (12.6 degrees)
      {
        camX: 0, camY: 0, camZ: 4.8,
        bottleX: isMobile ? 0 : -1.15, bottleY: 0, bottleZ: 0,
        rotX: 0.02, rotY: 0.48, rotZ: 0.22,
        scale: 1.05,
        keyIntensity: 3.5,
      },
      // 04 - Alkaline pH 8.5+: Centers and performs full 360° spin in 3D space
      {
        camX: 0, camY: 0, camZ: 4.9,
        bottleX: 0, bottleY: 0, bottleZ: 0,
        rotX: 0.04, rotY: Math.PI * 2, rotZ: 0,
        scale: 1.15,
        keyIntensity: 4.2, // Pristine radiant light surge
      },
      // 05 - Clean & Pure: Glides right, sparkling facets
      {
        camX: 0, camY: 0, camZ: 4.8,
        bottleX: isMobile ? 0 : 1.15, bottleY: 0, bottleZ: 0,
        rotX: 0.02, rotY: -0.18, rotZ: -0.06,
        scale: 1.05,
        keyIntensity: 3.4,
      },
      // 06 - Minerals: Glides left, floats above black wet rock
      {
        camX: 0, camY: 0.05, camZ: 4.8,
        bottleX: isMobile ? 0 : -1.15, bottleY: 0, bottleZ: 0,
        rotX: 0.05, rotY: 0.35, rotZ: 0.04,
        scale: 1.05,
        keyIntensity: 3.2,
      },
      // 07 - Higher Standard: Centers, majestic stance
      {
        camX: 0, camY: 0, camZ: 4.9,
        bottleX: 0, bottleY: 0, bottleZ: 0,
        rotX: 0.02, rotY: 0.08, rotZ: 0,
        scale: 1.12,
        keyIntensity: 3.4,
      },
      // 08 - Spotlight Cap: High-angle dolly into cap crest
      {
        camX: isMobile ? 0 : -0.28, camY: 0.88, camZ: 2.45,
        bottleX: isMobile ? 0 : 0.1, bottleY: -0.2, bottleZ: 0,
        rotX: 0.12, rotY: -0.15, rotZ: 0,
        scale: 1.25,
        keyIntensity: 3.8,
      },
      // 09 - Brighter Tomorrow: Glides left, opposite 3D tilt
      {
        camX: 0, camY: 0, camZ: 4.8,
        bottleX: isMobile ? 0 : -1.15, bottleY: 0, bottleZ: 0,
        rotX: 0.02, rotY: -0.38, rotZ: -0.22,
        scale: 1.05,
        keyIntensity: 3.4,
      },
      // 10 - Product Pack: Center presentation, pulled slightly back
      {
        camX: 0, camY: 0, camZ: 5.1,
        bottleX: 0, bottleY: -0.05, bottleZ: -0.1,
        rotX: 0.02, rotY: 0, rotZ: 0,
        scale: 1.05,
        keyIntensity: 3.2,
      },
      // 11 - Waterfall: Descends towards undulating water surface
      {
        camX: 0, camY: -0.35, camZ: 4.7,
        bottleX: isMobile ? 0 : -1.05, bottleY: -0.45, bottleZ: 0.1,
        rotX: 0.06, rotY: 0.25, rotZ: 0.05,
        scale: 1.08,
        keyIntensity: 3.5,
      },
      // 12 - Crystal Facets: Macro zoom into faceted glass waist
      {
        camX: isMobile ? 0 : 0.15, camY: -0.1, camZ: 2.25,
        bottleX: isMobile ? 0 : 0.08, bottleY: -0.15, bottleZ: 0,
        rotX: 0.04, rotY: 0.45, rotZ: 0,
        scale: 1.35,
        keyIntensity: 4.0,
      },
      // 13 - Underwater & Closing: Submerged in deep teal volume
      {
        camX: 0, camY: -0.3, camZ: 5.0,
        bottleX: 0, bottleY: -0.25, bottleZ: 0.15,
        rotX: 0.03, rotY: 0.12, rotZ: 0,
        scale: 0.98,
        keyIntensity: 2.8,
      },
    ];

    let currentProgress = 0;
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      currentProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 12. Main 60FPS / 120FPS Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const p = currentProgress; // 0.0 to 1.0

      // Mouse lerping
      mousePos.x += (mousePos.targetX - mousePos.x) * 0.05;
      mousePos.y += (mousePos.targetY - mousePos.y) * 0.05;

      // Damp drag rotation back slowly when released
      if (!isDragging) {
        dragRotation.x = THREE.MathUtils.lerp(dragRotation.x, 0, 0.03);
      }

      // Update cursor light
      interactiveCursorLight.position.x = mousePos.x * 3.5;
      interactiveCursorLight.position.y = mousePos.y * 2.5;

      // Calculate which segment we are in
      const numSegments = sceneTargets.length - 1;
      const scaledP = p * numSegments;
      const index = Math.min(Math.floor(scaledP), numSegments - 1);
      const frac = scaledP - index;

      const currentTarget = sceneTargets[index];
      const nextTarget = sceneTargets[Math.min(index + 1, numSegments)];

      // Interpolate targets
      const targetCamX = THREE.MathUtils.lerp(currentTarget.camX, nextTarget.camX, frac);
      const targetCamY = THREE.MathUtils.lerp(currentTarget.camY, nextTarget.camY, frac);
      const targetCamZ = THREE.MathUtils.lerp(currentTarget.camZ, nextTarget.camZ, frac);

      const targetBottleX = THREE.MathUtils.lerp(currentTarget.bottleX, nextTarget.bottleX, frac);
      const targetBottleY = THREE.MathUtils.lerp(currentTarget.bottleY, nextTarget.bottleY, frac);
      const targetBottleZ = THREE.MathUtils.lerp(currentTarget.bottleZ, nextTarget.bottleZ, frac);

      const targetRotX = THREE.MathUtils.lerp(currentTarget.rotX, nextTarget.rotX, frac);
      const targetRotY = THREE.MathUtils.lerp(currentTarget.rotY, nextTarget.rotY, frac);
      const targetRotZ = THREE.MathUtils.lerp(currentTarget.rotZ, nextTarget.rotZ, frac);

      const targetScale = THREE.MathUtils.lerp(currentTarget.scale, nextTarget.scale, frac);
      const targetKeyIntensity = THREE.MathUtils.lerp(currentTarget.keyIntensity, nextTarget.keyIntensity, frac);

      keyLight.intensity = THREE.MathUtils.lerp(keyLight.intensity, targetKeyIntensity, 0.06);

      // Camera position with mouse parallax
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX + mousePos.x * 0.35, 0.06);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY + mousePos.y * 0.25, 0.06);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.06);
      camera.lookAt(targetCamX, targetCamY, 0);

      // Bottle smooth 3D position
      bottleGroup.position.x = THREE.MathUtils.lerp(bottleGroup.position.x, targetBottleX, 0.07);
      bottleGroup.position.y = THREE.MathUtils.lerp(
        bottleGroup.position.y,
        targetBottleY + Math.sin(time * 1.4) * 0.035, // Gentle harmonic breathing
        0.07
      );
      bottleGroup.position.z = THREE.MathUtils.lerp(bottleGroup.position.z, targetBottleZ, 0.07);

      // Bottle smooth 3D rotation: combines scroll targets, user 360° drag, and mouse tilt
      bottleGroup.rotation.x = THREE.MathUtils.lerp(
        bottleGroup.rotation.x,
        targetRotX + dragRotation.x - mousePos.y * 0.12,
        0.07
      );
      bottleGroup.rotation.y = THREE.MathUtils.lerp(
        bottleGroup.rotation.y,
        targetRotY + dragRotation.y + mousePos.x * 0.18 + Math.sin(time * 0.5) * 0.04,
        0.07
      );
      bottleGroup.rotation.z = THREE.MathUtils.lerp(bottleGroup.rotation.z, targetRotZ, 0.07);

      const currentScale = THREE.MathUtils.lerp(bottleGroup.scale.x, targetScale, 0.07);
      bottleGroup.scale.set(currentScale, currentScale, 1);

      // Animate internal rising micro-droplets
      for (let i = 0; i < dropletMeshes.length; i++) {
        const item = dropletMeshes[i];
        item.mesh.position.y += item.speed * 0.008;
        item.mesh.position.x += Math.sin(time * 2 + item.seed) * 0.001;
        if (item.mesh.position.y > 0.82) {
          item.mesh.position.y = -0.95;
        }
      }

      // 3D Mountain & Mist true parallax in WebGL space
      mountainMesh.position.x = mousePos.x * 0.6;
      mountainMesh.position.y = 0.4 + mousePos.y * 0.4;
      mountainMesh.rotation.y = -mousePos.x * 0.03;

      mistLayer1.position.x = -2 + Math.sin(time * 0.2) * 0.8 + mousePos.x * 0.4;
      mistLayer2.position.x = 2 - Math.sin(time * 0.15) * 0.6 - mousePos.x * 0.3;

      rockMesh.position.x = -mousePos.x * 0.3;
      rockMesh.position.y = -0.8 - mousePos.y * 0.2;

      // Update 3D water wave physics
      waterWave.update(time, p);

      // Update 3D floating bubbles and particles
      atmosphere.update(time, p);

      renderer.render(scene, camera);
    };

    animate();

    // 13. Window Resize Handler
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0 select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      title="Drag horizontally to rotate 3D IONA bottle 360°"
    />
  );
}
