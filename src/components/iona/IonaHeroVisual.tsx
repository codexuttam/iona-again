import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface IonaHeroVisualProps {
  onOpenReserve?: () => void;
  // Extensibility hook: allow a real GLB URL in the future without changing the scene
  bottleModelUrl?: string;
}

export default function IonaHeroVisual({ onOpenReserve, bottleModelUrl }: IonaHeroVisualProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [timelineProgress, setTimelineProgress] = useState(0.0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // ========================================================
    // 1. SCENE & CAMERA SETUP
    // ========================================================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#03070A');
    scene.fog = new THREE.FogExp2('#03070A', 0.055);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ========================================================
    // 2. CINEMATIC ENVIRONMENT LIGHTING RIG
    // ========================================================
    // Cold moonlight / nocturnal icy blue ambient light
    const ambientLight = new THREE.AmbientLight('#081420', 1.8);
    scene.add(ambientLight);

    // Primary directional moonlight
    const moonKeyLight = new THREE.DirectionalLight('#D6EDF8', 3.4);
    moonKeyLight.position.set(3.8, 5.0, 3.5);
    scene.add(moonKeyLight);

    // Cool silver-ice rim light (accents the bottle silhouettes & rock highlights)
    const rimLight = new THREE.DirectionalLight('#A7C8DC', 3.8);
    rimLight.position.set(-4.5, 3.2, -2.0);
    scene.add(rimLight);

    // Wet rock specular fill
    const rockSpecularLight = new THREE.PointLight('#72B5D8', 2.0, 12);
    rockSpecularLight.position.set(0.6, -1.2, 1.8);
    scene.add(rockSpecularLight);

    // Interactive mouse glint point light
    const cursorGlintLight = new THREE.PointLight('#FFFFFF', 1.5, 8);
    cursorGlintLight.position.set(1.4, 0.2, 2.8);
    scene.add(cursorGlintLight);

    const textureLoader = new THREE.TextureLoader();

    // ========================================================
    // 3. LAYER 1: FAR MOUNTAINS & NOCTURNAL SKY (z = -7.5)
    // ========================================================
    const bgGroup = new THREE.Group();
    scene.add(bgGroup);

    const bgTex = textureLoader.load('/images/iona_clean_env_flawless.jpg');
    bgTex.colorSpace = THREE.SRGBColorSpace;
    bgTex.minFilter = THREE.LinearMipmapLinearFilter;
    bgTex.magFilter = THREE.LinearFilter;

    // Wide perspective plane for distant mountains
    const bgGeo = new THREE.PlaneGeometry(16.5, 8.2);
    const bgMat = new THREE.MeshBasicMaterial({
      map: bgTex,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.set(0, 0.35, -7.5);
    bgGroup.add(bgMesh);

    // ========================================================
    // 4. LAYER 2 & 3: ATMOSPHERIC DRIFTING MOUNTAIN FOG (z = -4.5, -2.5)
    // ========================================================
    const fogGroup = new THREE.Group();
    scene.add(fogGroup);

    const fogTex = textureLoader.load('/images/iona_fog_cloud.png');
    fogTex.colorSpace = THREE.SRGBColorSpace;

    const fogGeo1 = new THREE.PlaneGeometry(12, 4.2);
    const fogMat1 = new THREE.MeshBasicMaterial({
      map: fogTex,
      transparent: true,
      opacity: 0.0,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const fogMesh1 = new THREE.Mesh(fogGeo1, fogMat1);
    fogMesh1.position.set(0.8, -0.2, -4.5);
    fogGroup.add(fogMesh1);

    const fogGeo2 = new THREE.PlaneGeometry(9, 3.0);
    const fogMat2 = new THREE.MeshBasicMaterial({
      map: fogTex,
      transparent: true,
      opacity: 0.0,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const fogMesh2 = new THREE.Mesh(fogGeo2, fogMat2);
    fogMesh2.position.set(-1.2, -0.6, -2.5);
    fogGroup.add(fogMesh2);

    // ========================================================
    // 5. LAYER 4: FOREGROUND WET BLACK ROCKS (z = -0.6)
    // ========================================================
    const fgRockGroup = new THREE.Group();
    scene.add(fgRockGroup);

    const fgRockTex = textureLoader.load('/images/iona_fg_rocks.png');
    fgRockTex.colorSpace = THREE.SRGBColorSpace;
    fgRockTex.minFilter = THREE.LinearMipmapLinearFilter;

    const fgRockGeo = new THREE.PlaneGeometry(7.6, 3.8);
    const fgRockMat = new THREE.MeshStandardMaterial({
      map: fgRockTex,
      transparent: true,
      opacity: 0.0,
      roughness: 0.35,
      metalness: 0.15,
      depthWrite: false,
    });
    const fgRockMesh = new THREE.Mesh(fgRockGeo, fgRockMat);
    // Positioned grounded in foreground
    fgRockMesh.position.set(0.0, -0.85, -0.6);
    fgRockGroup.add(fgRockMesh);

    // ========================================================
    // 6. LAYER 5: BELIEVABLE CASCADING WATERFALL OVER ROCK (z = -0.45)
    // ========================================================
    const waterfallGroup = new THREE.Group();
    scene.add(waterfallGroup);

    const waterFlowTex = textureLoader.load('/images/iona_water_flow_seamless.png');
    waterFlowTex.wrapS = THREE.RepeatWrapping;
    waterFlowTex.wrapT = THREE.RepeatWrapping;

    // Custom WebGL Waterfall Shader
    const waterfallUniforms = {
      uTime: { value: 0 },
      uFlowTexture: { value: waterFlowTex },
      uOpacity: { value: 0.0 },
      uLightColor: { value: new THREE.Color('#D6EDF8') },
      uDeepColor: { value: new THREE.Color('#0A1926') },
      uFoamColor: { value: new THREE.Color('#FFFFFF') },
    };

    const waterfallVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;

      void main() {
        vUv = uv;
        vNormal = normalMatrix * normal;
        
        // Gentle undulating cascade surface
        vec3 pos = position;
        pos.z += sin(pos.y * 8.0 + uTime * 4.0) * 0.015;
        vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const waterfallFragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform sampler2D uFlowTexture;
      uniform float uOpacity;
      uniform vec3 uLightColor;
      uniform vec3 uDeepColor;
      uniform vec3 uFoamColor;

      void main() {
        // Continuous downward water cascade flow
        vec2 flowUv1 = vec2(vUv.x * 1.2, vUv.y * 2.2 - uTime * 0.95);
        vec2 flowUv2 = vec2(vUv.x * 1.8 + 0.3, vUv.y * 3.0 - uTime * 1.35);

        vec4 tex1 = texture2D(uFlowTexture, flowUv1);
        vec4 tex2 = texture2D(uFlowTexture, flowUv2);

        // Churning turbulent water mixing
        float waterTurbulence = (tex1.r * 0.6 + tex2.r * 0.4);
        float foamFactor = smoothstep(0.48, 0.88, waterTurbulence);

        // Base cold mountain water color
        vec3 col = mix(uDeepColor, uLightColor, waterTurbulence * 0.7);
        // Foaming white crests tumbling over rocks
        col = mix(col, uFoamColor, foamFactor * 0.92);

        // Specular moonlight glint
        vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
        vec3 viewDir = normalize(-vPosition);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(vNormal, halfDir), 0.0), 24.0) * 0.6;
        col += spec * uLightColor;

        // Soft edge transitions at top of ledge and bottom splash pool
        float edgeAlpha = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
        edgeAlpha *= smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);

        float finalAlpha = (0.75 + foamFactor * 0.25) * edgeAlpha * uOpacity;

        gl_FragColor = vec4(col, finalAlpha);
      }
    `;

    const waterfallMat = new THREE.ShaderMaterial({
      uniforms: waterfallUniforms,
      vertexShader: waterfallVertexShader,
      fragmentShader: waterfallFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    // Angled waterfall plane cascading down rock ledge
    const waterfallGeo = new THREE.PlaneGeometry(1.6, 1.1, 16, 16);
    const waterfallMesh = new THREE.Mesh(waterfallGeo, waterfallMat);
    // Align with waterfall channel in reference
    waterfallMesh.position.set(0.2, -1.05, -0.45);
    waterfallMesh.rotation.set(-0.25, 0.15, -0.08);
    waterfallGroup.add(waterfallMesh);

    // Secondary waterfall spray & droplet impact particle system
    const sprayCount = 45;
    const sprayGeo = new THREE.BufferGeometry();
    const sprayPositions = new Float32Array(sprayCount * 3);
    const sprayVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < sprayCount; i++) {
      sprayPositions[i * 3 + 0] = 0.2 + (Math.random() - 0.5) * 1.2;
      sprayPositions[i * 3 + 1] = -1.2 + Math.random() * 0.4;
      sprayPositions[i * 3 + 2] = -0.3 + (Math.random() - 0.5) * 0.3;
      sprayVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: Math.random() * 0.012 + 0.004,
        z: Math.random() * 0.006,
      });
    }

    sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPositions, 3));
    const sprayMat = new THREE.PointsMaterial({
      color: new THREE.Color('#D8EDF8'),
      size: 0.024,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprayPoints = new THREE.Points(sprayGeo, sprayMat);
    waterfallGroup.add(sprayPoints);

    // ========================================================
    // 7. LAYER 6: THE EXACT IONA BOTTLE (PREMIUM 2.5D PRESENTATION)
    // Architected with modularity for GLB drop-in replacement!
    // ========================================================
    const bottleContainer = new THREE.Group();
    bottleContainer.name = 'iona-bottle-master-container';
    scene.add(bottleContainer);

    // Exact bottle position grounded on wet rock ledge (right/center of composition)
    bottleContainer.position.set(1.42, -0.22, 0.4);

    // Contact shadow and wet rock reflection beneath the bottle
    const shadowTex = textureLoader.load('/images/iona_bottle_shadow.png');
    const shadowGeo = new THREE.PlaneGeometry(1.4, 0.7);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -1.38, -0.05);
    shadowMesh.rotation.x = -Math.PI / 2.2;
    bottleContainer.add(shadowMesh);

    // Load the EXACT photographic IONA bottle asset
    const bottleTex = textureLoader.load('/images/iona_bottle_cutout.png');
    bottleTex.colorSpace = THREE.SRGBColorSpace;
    bottleTex.minFilter = THREE.LinearMipmapLinearFilter;
    bottleTex.magFilter = THREE.LinearFilter;
    bottleTex.anisotropy = 16;

    // Premium 2.5D Glass Material with dynamic light sweep & facet glints
    const bottleUniforms = {
      uBottleTexture: { value: bottleTex },
      uTime: { value: 0 },
      uSweepPos: { value: -0.5 },
      uLightGlint: { value: 0.0 },
      uMouseNorm: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: 0.0 },
      uRimLightColor: { value: new THREE.Color('#A7C8DC') },
    };

    const bottleVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vNormal = normalMatrix * normal;
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const bottleFragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform sampler2D uBottleTexture;
      uniform float uTime;
      uniform float uSweepPos;
      uniform float uLightGlint;
      uniform vec2 uMouseNorm;
      uniform float uOpacity;
      uniform vec3 uRimLightColor;

      void main() {
        vec4 baseColor = texture2D(uBottleTexture, vUv);
        if (baseColor.a < 0.01) discard;

        // 1. Facet Light Sweep: Travelling gleam across geometric crystal cuts
        float sweepCoord = (vUv.x * 0.65 + vUv.y * 0.55);
        float sweepDist = abs(sweepCoord - uSweepPos);
        float sweepHighlight = exp(-sweepDist * sweepDist * 40.0) * 0.42;

        // 2. Facet-specific specular glint responding to mouse position
        float mouseInteraction = exp(-distance(vUv, vec2(0.5 + uMouseNorm.x * 0.25, 0.5 + uMouseNorm.y * 0.25)) * 4.5);
        float specularGlint = mouseInteraction * uLightGlint * 0.35;

        // 3. Volumetric Cold Rim Light (silhouettes the bottle against dark background)
        float rimEdge = pow(abs(vUv.x - 0.5) * 2.0, 3.2);
        vec3 rimGlow = uRimLightColor * rimEdge * 0.45;

        // 4. Subtle crystal dispersion/tint on facet highlights
        vec3 highlightColor = vec3(0.95, 0.98, 1.0) * (sweepHighlight + specularGlint);

        vec3 finalRgb = baseColor.rgb + highlightColor + rimGlow;
        float finalA = baseColor.a * uOpacity;

        gl_FragColor = vec4(finalRgb, finalA);
      }
    `;

    // 2.5D Snug geometry matching exact cropped bottle aspect ratio (~467 / 1510)
    const bottleGeo = new THREE.PlaneGeometry(0.85, 2.75);

    const bottleMat = new THREE.ShaderMaterial({
      uniforms: bottleUniforms,
      vertexShader: bottleVertexShader,
      fragmentShader: bottleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const bottleMesh = new THREE.Mesh(bottleGeo, bottleMat);
    bottleMesh.position.set(0, 0, 0);
    bottleContainer.add(bottleMesh);

    // Internal refraction back plane (provides 3D stereoscopic depth)
    const backPlaneGeo = new THREE.PlaneGeometry(0.83, 2.7);
    const backPlaneMat = new THREE.MeshBasicMaterial({
      map: bottleTex,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      color: new THREE.Color('#89B4D4'),
    });
    const backPlaneMesh = new THREE.Mesh(backPlaneGeo, backPlaneMat);
    backPlaneMesh.position.set(0, 0, -0.06);
    backPlaneMesh.scale.set(0.98, 0.98, 1);
    bottleContainer.add(backPlaneMesh);

    // ========================================================
    // 8. LAYER 7: FOREGROUND MICRO-DROPLETS & MOISTURE (z = 0.8)
    // (Tiny, soft, sparse, slow — disappearing into environment)
    // ========================================================
    const dropletCount = 30;
    const dropletGeo = new THREE.BufferGeometry();
    const dropletPositions = new Float32Array(dropletCount * 3);
    const dropletSizes = new Float32Array(dropletCount);

    for (let i = 0; i < dropletCount; i++) {
      dropletPositions[i * 3 + 0] = (Math.random() - 0.5) * 6.5;
      dropletPositions[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      dropletPositions[i * 3 + 2] = 0.2 + Math.random() * 1.2;
      dropletSizes[i] = 0.015 + Math.random() * 0.02;
    }

    dropletGeo.setAttribute('position', new THREE.BufferAttribute(dropletPositions, 3));
    const dropletMat = new THREE.PointsMaterial({
      color: new THREE.Color('#D6EDF8'),
      size: 0.02,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const dropletField = new THREE.Points(dropletGeo, dropletMat);
    scene.add(dropletField);

    // ========================================================
    // 9. ANIMATION, INTERACTION, AND CAMERA CINEMATICS
    // ========================================================
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = normX;
      mouse.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Skip timeline on interaction
    const handleSkipIntro = () => {
      setIsIntroComplete(true);
    };
    window.addEventListener('keydown', handleSkipIntro, { once: true });
    window.addEventListener('click', handleSkipIntro, { once: true });

    // ========================================================
    // 10. MAIN RENDER & TIMELINE LOOP
    // ========================================================
    let clock = new THREE.Clock();
    let animFrameId: number;
    let introTimer = 0;
    const INTRO_DURATION = 3.6; // 3.6 seconds to seamlessly execute the 0.00 -> 1.00 timeline

    const render = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Timeline Progression (0.00 to 1.00)
      if (!isIntroComplete) {
        introTimer += delta;
        const progress = Math.min(introTimer / INTRO_DURATION, 1.0);
        setTimelineProgress(progress);
        if (progress >= 1.0) {
          setIsIntroComplete(true);
        }
      } else {
        setTimelineProgress(1.0);
      }

      // Read current effective timeline value
      const t = isIntroComplete ? 1.0 : Math.min(introTimer / INTRO_DURATION, 1.0);

      // Smooth damping (lerp) for mouse & scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      // ======================================================
      // TIMELINE STAGE VALUES (0.00 to 1.00)
      // 0.00: Pure black
      // 0.10: Fog appears
      // 0.20: Mountains emerge
      // 0.30: Foreground black rock visible
      // 0.40: Waterfall begins appearing
      // 0.50: Bottle emerges from darkness
      // 0.60: Bottle facets catch light
      // 0.70: IONA typography appears
      // 0.80: WATER, REIMAGINED. appears
      // 0.90: Pillars appear
      // 1.00: Full composition
      // ======================================================
      const fogAlpha = Math.max(0, Math.min(1, (t - 0.1) / 0.25));
      const mtnAlpha = Math.max(0, Math.min(1, (t - 0.2) / 0.25));
      const rockAlpha = Math.max(0, Math.min(1, (t - 0.3) / 0.25));
      const waterAlpha = Math.max(0, Math.min(1, (t - 0.4) / 0.25));
      const bottleAlpha = Math.max(0, Math.min(1, (t - 0.5) / 0.25));
      const glintFactor = Math.max(0, Math.min(1, (t - 0.6) / 0.25));

      // Update Material Opacities based on Timeline
      bgMat.opacity = mtnAlpha;
      fogMat1.opacity = fogAlpha * 0.42;
      fogMat2.opacity = fogAlpha * 0.35;
      fgRockMat.opacity = rockAlpha;
      waterfallUniforms.uOpacity.value = waterAlpha;
      sprayMat.opacity = waterAlpha * 0.55;
      bottleUniforms.uOpacity.value = bottleAlpha;
      backPlaneMat.opacity = bottleAlpha * 0.45;
      shadowMat.opacity = bottleAlpha * 0.85;
      dropletMat.opacity = rockAlpha * 0.4;

      // Waterfall Continuous Downward Flow
      waterfallUniforms.uTime.value = elapsed;

      // Animate Waterfall Spray Particles
      const sprayPosAttr = sprayGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sprayCount; i++) {
        let py = sprayPosAttr.getY(i);
        let px = sprayPosAttr.getX(i);
        let pz = sprayPosAttr.getZ(i);

        py += sprayVelocities[i].y;
        px += sprayVelocities[i].x;
        pz += sprayVelocities[i].z;

        // Reset spray loop
        if (py > -0.85) {
          py = -1.25;
          px = 0.2 + (Math.random() - 0.5) * 1.2;
          pz = -0.3 + (Math.random() - 0.5) * 0.3;
        }

        sprayPosAttr.setXYZ(i, px, py, pz);
      }
      sprayPosAttr.needsUpdate = true;

      // Light Sweep traversing the faceted glass cuts
      // Periodically sweeps diagonally across the bottle (every 5 seconds)
      const sweepCycle = (elapsed * 0.35) % 2.5;
      bottleUniforms.uSweepPos.value = sweepCycle - 0.7;
      bottleUniforms.uLightGlint.value = glintFactor * (0.8 + Math.sin(elapsed * 2.0) * 0.2);
      bottleUniforms.uMouseNorm.value.set(mouse.x, mouse.y);
      bottleUniforms.uTime.value = elapsed;

      // Drifting Atmospheric Valley Fog
      fogMesh1.position.x = 0.8 + Math.sin(elapsed * 0.08) * 0.4;
      fogMesh2.position.x = -1.2 + Math.cos(elapsed * 0.06) * 0.35;

      // Subtle slow floating/breathing physics on the bottle
      const breathFloat = Math.sin(elapsed * 1.2) * 0.015;
      bottleMesh.position.y = breathFloat;
      backPlaneMesh.position.y = breathFloat;

      // Bottle Interactive Counter-Tilt (Subtle 3D Perspective)
      bottleContainer.rotation.y = -mouse.x * 0.07;
      bottleContainer.rotation.x = mouse.y * 0.04;

      // Scroll-based Dolly & Depth Transition toward Bottle and Cap
      const heroHeight = window.innerHeight * 1.2;
      const scrollProgress = Math.max(0, Math.min(1.0, scrollY / (heroHeight || 800)));

      // 1. Camera slowly moves toward bottle
      const dollyZ = scrollProgress * 1.85; // Moves from 4.4 down to ~2.55
      const panX = scrollProgress * 0.85; // Gently shifts focus toward bottle on right
      const panY = scrollProgress * 0.18;

      // 2. Mountains shift with depth (auto perspective in Three.js + subtle layer shift)
      bgMesh.position.x = -panX * 0.25;

      // 3. Fog moves across frame
      fogMesh1.position.x = 0.8 + Math.sin(elapsed * 0.08) * 0.4 - scrollProgress * 0.8;
      fogMesh2.position.x = -1.2 + Math.cos(elapsed * 0.06) * 0.35 + scrollProgress * 0.6;

      // 4. Waterfall continues flowing (handled via uTime uniform)
      
      // 5. Bottle subtly changes position / scale / orientation
      const bottleScrollScale = 1.0 + scrollProgress * 0.12;
      bottleContainer.scale.set(bottleScrollScale, bottleScrollScale, bottleScrollScale);

      // 6. Bottle facets catch moving light on scroll
      const activeSweep = (sweepCycle - 0.7) + scrollProgress * 0.6;
      bottleUniforms.uSweepPos.value = activeSweep;

      // 7. 3D Cinematic Camera Parallax & Dolly System
      camera.position.x = mouse.x * (0.28 * (1.0 - scrollProgress * 0.5)) + panX;
      camera.position.y = mouse.y * (0.15 * (1.0 - scrollProgress * 0.5)) + panY;
      camera.position.z = 4.4 - dollyZ;
      camera.lookAt(panX * 0.85, -0.1 + panY * 0.6, 0.4);

      // Interactive Specular Glint Cursor Light tracking
      cursorGlintLight.position.x = 1.42 + mouse.x * 1.5;
      cursorGlintLight.position.y = -0.22 + mouse.y * 1.2;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleSkipIntro);
      window.removeEventListener('click', handleSkipIntro);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [bottleModelUrl, isIntroComplete]);

  // Derived timeline opacities for text reveals
  const titleIonaOpacity = Math.max(0, Math.min(1, (timelineProgress - 0.7) / 0.15));
  const titleWaterOpacity = Math.max(0, Math.min(1, (timelineProgress - 0.8) / 0.12));
  const pillarsOpacity = Math.max(0, Math.min(1, (timelineProgress - 0.9) / 0.1));

  return (
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#03070A] select-none">
      {/* 1. MASTER WEBGL CANVAS CONTAINER */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />

      {/* 2. REFINED EDITORIAL OVERLAY — MATCHES CAMPAIGN REFERENCE EXACTLY */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col justify-between py-24 md:py-28 pointer-events-none">
        {/* Top Spacer for Clean Navigation Breathing Room */}
        <div className="h-6" />

        {/* Hero Left Content Block (Editorial Asymmetry) */}
        <div className="max-w-xl pointer-events-auto">
          {/* I O N A Monogram (Thin, Uppercase, Ultra-Wide Tracking, Modern Sans) */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.45em] text-white leading-none font-sans mb-4 transition-opacity duration-700"
            style={{ opacity: isIntroComplete ? 1 : titleIonaOpacity }}
          >
            I O N A
          </h1>

          {/* WATER, REIMAGINED. (Clean Uppercase Sans-Serif, Wide Tracking — NO SERIF) */}
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl font-normal tracking-[0.32em] text-[#E8ECEF] uppercase mb-10 transition-opacity duration-700"
            style={{ opacity: isIntroComplete ? 1 : titleWaterOpacity }}
          >
            WATER, REIMAGINED.
          </p>

          {/* PURER | SMARTER | CLEANER | BRIGHTER — EXACT CAMPAIGN STORYBOARD PILLARS */}
          <div
            className="space-y-3 transition-opacity duration-700"
            style={{ opacity: isIntroComplete ? 1 : pillarsOpacity }}
          >
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-[0.38em] text-[#89B4D4]/90 font-light uppercase">
              <span>PURER</span>
              <span className="text-white/20 font-thin">|</span>
              <span>SMARTER</span>
              <span className="text-white/20 font-thin">|</span>
              <span>CLEANER</span>
              <span className="text-white/20 font-thin">|</span>
              <span>BRIGHTER</span>
            </div>

            {/* FOR A HIGHER TOMORROW. */}
            <p className="text-[10px] sm:text-xs tracking-[0.42em] text-[#6C7E8A] font-light uppercase">
              FOR A HIGHER TOMORROW.
            </p>
          </div>
        </div>

        {/* Bottom Editorial Bar: Telemetry & Reserve Action */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] tracking-[0.35em] text-[#6C7E8A] uppercase gap-4 pointer-events-auto transition-opacity duration-1000"
          style={{ opacity: isIntroComplete ? 1 : pillarsOpacity }}
        >
          <div className="flex items-center space-x-6 sm:space-x-8">
            <span>
              ORIGIN: <strong className="text-white/80 font-normal">GLACIAL SOURCE</strong>
            </span>
            <span>
              VESSEL: <strong className="text-white/80 font-normal">FACETED CRYSTAL</strong>
            </span>
            <span>
              STATUS: <strong className="text-white/80 font-normal">ALKALINE pH 8.5+</strong>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenReserve}
              className="text-[10px] tracking-[0.35em] text-white/90 hover:text-white uppercase transition-all py-1.5 px-3 border border-white/20 hover:border-white/70 hover:bg-white/5 cursor-pointer"
            >
              RESERVE BOTTLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
