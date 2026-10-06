import * as THREE from 'three';

export interface EnvironmentAtmosphere {
  bubblesGroup: THREE.Group;
  particlesField: THREE.Points;
  energyRibbon: THREE.Points;
  lightRays: THREE.Group;
  update: (time: number, scrollProgress: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export function createEnvironmentAtmosphere(): EnvironmentAtmosphere {
  // 1. Floating Underwater Bubbles (Foreground & Midground)
  const bubblesGroup = new THREE.Group();
  bubblesGroup.name = 'ambient-bubbles';

  const bubbleCount = 70;
  const bubbleGeo = new THREE.SphereGeometry(1, 14, 14);
  const bubbleMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#DDFEFF'),
    roughness: 0.05,
    transmission: 0.94,
    ior: 1.15,
    transparent: true,
    opacity: 0.65,
    reflectivity: 0.9,
  });

  const bubbleData: { mesh: THREE.Mesh; speed: number; wobbleX: number; wobbleZ: number; baseY: number; rangeY: number }[] = [];

  for (let i = 0; i < bubbleCount; i++) {
    const mesh = new THREE.Mesh(bubbleGeo, bubbleMat);
    // Depth distribution: some very close to camera (Z: 2..5), some midground (Z: -2..2), some far (Z: -6..-2)
    const isForeground = i < 15;
    const r = isForeground ? 0.06 + Math.random() * 0.12 : 0.02 + Math.random() * 0.05;
    mesh.scale.set(r, r, r);

    const x = (Math.random() - 0.5) * 14;
    const baseY = -5 + Math.random() * 10;
    const z = isForeground ? 2.5 + Math.random() * 2.5 : -5 + Math.random() * 7;
    
    mesh.position.set(x, baseY, z);
    bubblesGroup.add(mesh);

    bubbleData.push({
      mesh,
      speed: 0.3 + Math.random() * 0.7,
      wobbleX: 0.5 + Math.random() * 1.5,
      wobbleZ: 0.5 + Math.random() * 1.5,
      baseY,
      rangeY: 12,
    });
  }

  // 2. Background Deep Particles
  const pCount = 1200;
  const pGeometry = new THREE.BufferGeometry();
  const pPositions = new Float32Array(pCount * 3);
  const pBasePositions = new Float32Array(pCount * 3);
  const pColors = new Float32Array(pCount * 3);

  const c1 = new THREE.Color('#8EA8B3');
  const c2 = new THREE.Color('#D5E9EE');
  const c3 = new THREE.Color('#FFFFFF');

  for (let i = 0; i < pCount; i++) {
    const x = (Math.random() - 0.5) * 22;
    const y = (Math.random() - 0.5) * 16;
    const z = -8 + Math.random() * 14;

    pPositions[i * 3] = x;
    pPositions[i * 3 + 1] = y;
    pPositions[i * 3 + 2] = z;

    pBasePositions[i * 3] = x;
    pBasePositions[i * 3 + 1] = y;
    pBasePositions[i * 3 + 2] = z;

    const rnd = Math.random();
    const col = rnd < 0.5 ? c1 : rnd < 0.85 ? c2 : c3;
    pColors[i * 3] = col.r;
    pColors[i * 3 + 1] = col.g;
    pColors[i * 3 + 2] = col.b;
  }

  pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  pGeometry.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

  const pMaterial = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particlesField = new THREE.Points(pGeometry, pMaterial);

  // 3. Glacial Mist Stream (Gentle helical drift around Section 04)
  const ribbonCount = 800;
  const ribbonGeo = new THREE.BufferGeometry();
  const ribbonPos = new Float32Array(ribbonCount * 3);
  const ribbonColors = new Float32Array(ribbonCount * 3);

  for (let i = 0; i < ribbonCount; i++) {
    const t = (i / ribbonCount) * Math.PI * 4;
    const r = 0.8 + Math.sin(t * 2) * 0.25;
    ribbonPos[i * 3] = Math.cos(t) * r + 0.6;
    ribbonPos[i * 3 + 1] = (i / ribbonCount - 0.5) * 4;
    ribbonPos[i * 3 + 2] = Math.sin(t) * r - 1.2;

    ribbonColors[i * 3] = 0.7; // R
    ribbonColors[i * 3 + 1] = 0.85; // G (mist)
    ribbonColors[i * 3 + 2] = 0.95; // B
  }

  ribbonGeo.setAttribute('position', new THREE.BufferAttribute(ribbonPos, 3));
  ribbonGeo.setAttribute('color', new THREE.BufferAttribute(ribbonColors, 3));

  const ribbonMat = new THREE.PointsMaterial({
    size: 0.025,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const energyRibbon = new THREE.Points(ribbonGeo, ribbonMat);

  // 4. God Rays / Caustic Light Shafts from the water surface
  const lightRays = new THREE.Group();
  const rayGeo = new THREE.ConeGeometry(3.5, 14, 24, 1, true);
  const rayMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#20BFD3'),
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  for (let r = 0; r < 4; r++) {
    const ray = new THREE.Mesh(rayGeo, rayMat);
    ray.position.set(-2 + r * 1.5, 5.5, -2 + (r % 2) * 1.5);
    ray.rotation.z = 0.15 - r * 0.08;
    ray.rotation.x = 0.2;
    lightRays.add(ray);
  }

  const update = (time: number, scrollProgress: number) => {
    // 1. Update bubbles rising with natural sinusoidal drift
    bubbleData.forEach((b) => {
      const pos = b.mesh.position;
      const bottom = -6;
      const top = 6;
      const height = top - bottom;

      pos.y = bottom + (((b.baseY - bottom) + time * b.speed * (1 + scrollProgress * 0.8)) % height);
      pos.x += Math.sin(time * b.wobbleX + b.baseY) * 0.003;
      pos.z += Math.cos(time * b.wobbleZ + b.baseY) * 0.003;
    });

    // 2. Animate background particles drifting slowly
    const posArr = pGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pCount; i++) {
      const idx = i * 3;
      const bx = pBasePositions[idx];
      const by = pBasePositions[idx + 1];

      posArr[idx] = bx + Math.sin(time * 0.5 + by) * 0.25;
      posArr[idx + 1] = by + Math.cos(time * 0.3 + bx) * 0.25 - (scrollProgress * 1.5) % 16;
    }
    pGeometry.attributes.position.needsUpdate = true;

    // 3. Animate electric energy ribbon for Section 04
    // Active between scroll ~0.42 to 0.60
    const sStart = 0.42;
    const sPeak = 0.52;
    const sEnd = 0.64;

    let ribbonAlpha = 0;
    if (scrollProgress >= sStart && scrollProgress <= sEnd) {
      if (scrollProgress < sPeak) {
        ribbonAlpha = (scrollProgress - sStart) / (sPeak - sStart);
      } else {
        ribbonAlpha = 1 - (scrollProgress - sPeak) / (sEnd - sPeak);
      }
    }
    ribbonMat.opacity = Math.max(0, Math.min(0.28, ribbonAlpha * 0.28));
    energyRibbon.rotation.y = time * 0.5;
    energyRibbon.rotation.x = Math.sin(time * 0.3) * 0.15;

    // 4. Subtle pulsation of light rays
    rayMat.opacity = 0.05 + Math.sin(time * 0.8) * 0.02 + scrollProgress * 0.03;
  };

  const setTheme = (theme: 'light' | 'dark') => {
    if (theme === 'light') {
      bubbleMat.color.set('#B6EBF2');
      bubbleMat.opacity = 0.55;
      pMaterial.opacity = 0.42;
      pMaterial.blending = THREE.NormalBlending;
      rayMat.color.set('#008DA5');
      rayMat.opacity = 0.03;
    } else {
      bubbleMat.color.set('#DDFEFF');
      bubbleMat.opacity = 0.65;
      pMaterial.opacity = 0.65;
      pMaterial.blending = THREE.AdditiveBlending;
      rayMat.color.set('#B8EDF8');
      rayMat.opacity = 0.06;
    }
  };

  return { bubblesGroup, particlesField, energyRibbon, lightRays, update, setTheme };
}
