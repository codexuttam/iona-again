import * as THREE from 'three';

export interface WaterWaveInstance {
  mesh: THREE.Mesh;
  update: (time: number, scrollProgress: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export function createWaterWave(): WaterWaveInstance {
  // A wide flowing undulating plane behind the bottle
  const geometry = new THREE.PlaneGeometry(16, 12, 64, 64);
  
  // Custom glass-water material catching cyan rim lights
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#06232D'),
    emissive: new THREE.Color('#04141D'),
    roughness: 0.1,
    metalness: 0.15,
    transmission: 0.85,
    ior: 1.33,
    transparent: true,
    opacity: 0.75,
    wireframe: false,
    side: THREE.DoubleSide,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -0.5, -2.2);
  mesh.rotation.x = -Math.PI * 0.12;

  const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
  const originalPositions = positionAttribute.array.slice() as Float32Array;

  const update = (time: number, scrollProgress: number) => {
    const pos = positionAttribute.array as Float32Array;
    const count = positionAttribute.count;

    // Fluid procedural wave distortion
    const speed = 0.8;
    const waveFreq = 0.8;
    const scrollWaveAmp = 0.4 + scrollProgress * 0.3;

    for (let i = 0; i < count; i++) {
      const u = originalPositions[i * 3];
      const v = originalPositions[i * 3 + 1];

      // Swirling ocean wave equations
      const wave1 = Math.sin(u * waveFreq + time * speed) * Math.cos(v * waveFreq * 0.8 + time * speed * 0.7);
      const wave2 = Math.sin(u * 1.5 - time * 0.5) * 0.3;
      const wave3 = Math.cos(Math.hypot(u, v) * 1.2 - time * 1.1) * 0.25;

      pos[i * 3 + 2] = originalPositions[i * 3 + 2] + (wave1 + wave2 + wave3) * scrollWaveAmp;
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    // Subtle sway with scroll
    mesh.rotation.z = Math.sin(time * 0.2) * 0.05 + (scrollProgress - 0.2) * 0.15;
    mesh.position.y = -0.5 + Math.sin(time * 0.4) * 0.1 - scrollProgress * 0.8;
  };

  const setTheme = (theme: 'light' | 'dark') => {
    if (theme === 'light') {
      material.color.set('#D2EBF3');
      material.emissive.set('#000000');
      material.roughness = 0.04;
      material.transmission = 0.92;
      material.opacity = 0.35;
    } else {
      material.color.set('#06232D');
      material.emissive.set('#04141D');
      material.roughness = 0.1;
      material.transmission = 0.85;
      material.opacity = 0.75;
    }
  };

  return { mesh, update, setTheme };
}
