import * as THREE from 'three';

export interface WaterSphereInstance {
  group: THREE.Group;
  sphereMesh: THREE.Mesh;
  particlesGroup: THREE.Group;
  update: (time: number, scrollProgress: number) => void;
  setVisible: (visible: boolean) => void;
  setOpacity: (opacity: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export function createWaterSphere(): WaterSphereInstance {
  const group = new THREE.Group();
  group.name = 'water-sphere-group';

  // Radius ~1.4 - ethereal transparent water sphere
  const sphereGeo = new THREE.SphereGeometry(1.4, 48, 48);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFFFFF'),
    roughness: 0.02,
    metalness: 0.02,
    transmission: 0.98,
    ior: 1.25,
    thickness: 0.4,
    transparent: true,
    opacity: 0.0, // starts invisible, revealed at Section 03
    reflectivity: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    attenuationColor: new THREE.Color('#D8F2F8'),
    attenuationDistance: 8.0,
    depthWrite: false,
  });

  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  group.add(sphereMesh);

  // Floating internal mineral particles inside the water sphere
  const particlesGroup = new THREE.Group();
  const particleCount = 45;
  const pGeo = new THREE.SphereGeometry(0.02, 8, 8);
  const pMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#00A2BD'),
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
  });

  const pData: { mesh: THREE.Mesh; speed: number; orbitR: number; phi: number; theta: number }[] = [];

  for (let i = 0; i < particleCount; i++) {
    const mesh = new THREE.Mesh(pGeo, pMat);
    const orbitR = 0.25 + Math.random() * 0.95;
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * Math.PI * 2;

    mesh.position.set(
      orbitR * Math.sin(phi) * Math.cos(theta),
      orbitR * Math.cos(phi),
      orbitR * Math.sin(phi) * Math.sin(theta)
    );

    particlesGroup.add(mesh);
    pData.push({
      mesh,
      speed: 0.25 + Math.random() * 0.4,
      orbitR,
      phi,
      theta,
    });
  }
  group.add(particlesGroup);

  // Positioned slightly offset so the 3D bottle is in front and clearly visible
  group.position.set(1.2, 0.0, -0.3);

  let activeTheme: 'light' | 'dark' = 'light';

  const update = (time: number, scrollProgress: number) => {
    // Gentle pulsation and wobble
    const pulse = 1 + Math.sin(time * 1.5) * 0.02;
    sphereMesh.scale.set(pulse, 1 / pulse, pulse);

    // Orbit particles inside
    pData.forEach((p, idx) => {
      p.theta += p.speed * 0.015;
      p.phi += Math.sin(time * 0.5 + idx) * 0.005;
      p.mesh.position.x = p.orbitR * Math.sin(p.phi) * Math.cos(p.theta);
      p.mesh.position.y = p.orbitR * Math.cos(p.phi);
      p.mesh.position.z = p.orbitR * Math.sin(p.phi) * Math.sin(p.theta);
    });

    // Active strictly around Section 03 (scroll 0.25 to 0.40)
    const sStart = 0.24;
    const sPeak = 0.32;
    const sEnd = 0.40;

    let targetAlpha = 0;
    if (scrollProgress >= sStart && scrollProgress <= sEnd) {
      if (scrollProgress < sPeak) {
        targetAlpha = (scrollProgress - sStart) / (sPeak - sStart);
      } else {
        targetAlpha = 1 - (scrollProgress - sPeak) / (sEnd - sPeak);
      }
    }

    const maxSphereAlpha = activeTheme === 'light' ? 0.35 : 0.55;
    sphereMat.opacity = Math.max(0, Math.min(maxSphereAlpha, targetAlpha * maxSphereAlpha));
    pMat.opacity = Math.max(0, Math.min(0.7, targetAlpha * 0.7));
    group.visible = targetAlpha > 0.01;
  };

  const setVisible = (v: boolean) => {
    group.visible = v;
  };

  const setOpacity = (op: number) => {
    sphereMat.opacity = op;
    pMat.opacity = op;
  };

  const setTheme = (theme: 'light' | 'dark') => {
    activeTheme = theme;
    if (theme === 'light') {
      sphereMat.color.set('#FFFFFF');
      sphereMat.attenuationColor.set('#D8F2F8');
      pMat.color.set('#00A2BD');
    } else {
      sphereMat.color.set('#7DEAF0');
      sphereMat.attenuationColor.set('#083E50');
      pMat.color.set('#20BFD3');
    }
  };

  return { group, sphereMesh, particlesGroup, update, setVisible, setOpacity, setTheme };
}
