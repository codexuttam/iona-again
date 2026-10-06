import * as THREE from 'three';

export interface BottleInstance {
  group: THREE.Group;
  bottleBody: THREE.Mesh;
  waterMesh: THREE.Mesh;
  capMesh: THREE.Mesh;
  labelMesh: THREE.Mesh;
  bubblesGroup: THREE.Group;
  dropletsGroup: THREE.Group;
  update: (time: number, scrollProgress: number) => void;
  setScale: (scale: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Generates the complete 360° cylindrical wrapper texture with haute horlogerie hot-stamp detailing
export function createBottleWrapperTexture(theme: 'light' | 'dark'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isLight = theme === 'light';
    const primaryColor = isLight ? '#071015' : '#FFFFFF';
    const secondaryColor = isLight ? '#223844' : '#E2F4F8';
    const mutedColor = isLight ? '#4B6776' : '#88A9B8';
    const goldAccent = isLight ? '#007A94' : '#6DE2E8';
    const platinumLine = isLight ? 'rgba(0, 122, 148, 0.4)' : 'rgba(109, 226, 232, 0.6)';
    const facetLine = isLight ? 'rgba(7, 16, 21, 0.08)' : 'rgba(255, 255, 255, 0.12)';

    // ==========================================
    // 1. FRONT WRAPPER (Center at X = 1024)
    // ==========================================
    const fCenter = 1024;

    // Outer Geometric Diamond Guilloché Filigree
    ctx.strokeStyle = facetLine;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    // Prismatic diamond chevrons
    ctx.moveTo(fCenter - 420, 140);
    ctx.lineTo(fCenter, 40);
    ctx.lineTo(fCenter + 420, 140);

    ctx.moveTo(fCenter - 420, 140);
    ctx.lineTo(fCenter - 260, 500);
    ctx.lineTo(fCenter - 420, 860);

    ctx.moveTo(fCenter + 420, 140);
    ctx.lineTo(fCenter + 260, 500);
    ctx.lineTo(fCenter + 420, 860);

    ctx.moveTo(fCenter - 420, 860);
    ctx.lineTo(fCenter, 960);
    ctx.lineTo(fCenter + 420, 860);
    ctx.stroke();

    // Twin Hot-Stamped Hairlines
    ctx.strokeStyle = platinumLine;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(fCenter - 300, 175);
    ctx.lineTo(fCenter + 300, 175);
    ctx.moveTo(fCenter - 300, 835);
    ctx.lineTo(fCenter + 300, 835);
    ctx.stroke();

    // Micro-Diamond Crest at Top
    ctx.strokeStyle = goldAccent;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(fCenter, 155);
    ctx.lineTo(fCenter + 8, 165);
    ctx.lineTo(fCenter, 175);
    ctx.lineTo(fCenter - 8, 165);
    ctx.closePath();
    ctx.stroke();

    // Glacial Coordinates & Provenance Header
    ctx.fillStyle = mutedColor;
    ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '14px';
    ctx.fillText('46° 30\' N · 08° 14\' E · GLACIAL STRATA', fCenter + 7, 220);

    ctx.font = '300 20px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '12px';
    ctx.fillText('PREHISTORIC ARTESIAN RESERVE', fCenter + 6, 255);

    // MONOLITHIC LOGO "I O N A"
    ctx.save();
    if (isLight) {
      ctx.shadowColor = 'rgba(0, 30, 45, 0.12)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
    } else {
      ctx.shadowColor = 'rgba(109, 226, 232, 0.45)';
      ctx.shadowBlur = 16;
    }

    ctx.fillStyle = primaryColor;
    ctx.font = '400 170px "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '32px';
    ctx.fillText('I O N A', fCenter + 16, 475);
    ctx.restore();

    // Inner hairline divider beneath IONA
    ctx.strokeStyle = platinumLine;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(fCenter - 140, 510);
    ctx.lineTo(fCenter + 140, 510);
    ctx.stroke();

    // Sub-brand: ALKALINE · IONISED
    ctx.fillStyle = secondaryColor;
    ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '16px';
    ctx.fillText('ALKALINE  ·  IONISED', fCenter + 8, 555);

    ctx.fillStyle = mutedColor;
    ctx.font = '300 21px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '10px';
    ctx.fillText('PREMIUM ARTESIAN WATER', fCenter + 5, 595);

    // Elemental Specs Capsule
    ctx.strokeStyle = isLight ? 'rgba(7, 16, 21, 0.15)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(fCenter - 180, 640, 360, 46, 23);
    ctx.stroke();

    ctx.fillStyle = secondaryColor;
    ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('380M GRANITE  ·  pH 8.5', fCenter + 3, 669);

    // Luxury Manifesto Tagline: WATER REIMAGINED.
    ctx.fillStyle = goldAccent;
    ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '14px';
    ctx.fillText('WATER REIMAGINED.', fCenter + 7, 755);

    // Micro-Diamond Crest at Bottom
    ctx.strokeStyle = goldAccent;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(fCenter, 825);
    ctx.lineTo(fCenter + 8, 835);
    ctx.lineTo(fCenter, 845);
    ctx.lineTo(fCenter - 8, 835);
    ctx.closePath();
    ctx.stroke();

    // ==========================================
    // 2. BACK WRAPPER (Center at X = 0 / 2048)
    // ==========================================
    const drawBackContent = (bCenter: number) => {
      // Top header
      ctx.fillStyle = mutedColor;
      ctx.font = '400 17px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '8px';
      ctx.fillText('IONA BOTTLING SPECIFICATION', bCenter, 205);

      // Certification border box
      ctx.strokeStyle = platinumLine;
      ctx.lineWidth = 1;
      ctx.strokeRect(bCenter - 190, 240, 380, 96);

      ctx.fillStyle = primaryColor;
      ctx.font = '500 21px "Cormorant Garamond", Georgia, serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('380M NATURAL AQUIFER STRATA', bCenter, 280);

      ctx.fillStyle = mutedColor;
      ctx.font = '300 15px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('FILTERED BY CENTURIES OF ALPINE GRANITE', bCenter, 310);

      // Detailed Elemental Mineral Analysis
      ctx.fillStyle = secondaryColor;
      ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('CALCIUM (Ca²⁺) .................... 24 mg/L', bCenter, 400);
      ctx.fillText('MAGNESIUM (Mg²⁺) ............... 12 mg/L', bCenter, 435);
      ctx.fillText('POTASSIUM (K⁺) ...................... 4 mg/L', bCenter, 470);
      ctx.fillText('SILICA (SiO₂) .......................... 18 mg/L', bCenter, 505);
      ctx.fillText('NATURAL pH BALANCE ......... 8.5', bCenter, 540);
      ctx.fillText('TOTAL DISSOLVED SOLIDS ..... 110 mg/L', bCenter, 575);

      // Minimalist Luxury Barcode
      ctx.fillStyle = primaryColor;
      const barY = 635;
      const barH = 50;
      for (let b = -130; b < 130; b += 5) {
        if ((b * 41 + 13) % 7 !== 0) {
          ctx.fillRect(bCenter + b, barY, 2, barH);
        }
      }

      ctx.fillStyle = mutedColor;
      ctx.font = '400 14px monospace';
      ctx.letterSpacing = '5px';
      ctx.fillText('750 ML  ·  25.4 FL OZ', bCenter, 725);
      ctx.fillText('PRODUCT OF SWISS ALPS  ·  LIMITED VINTAGE', bCenter, 755);
    };

    drawBackContent(0);
    drawBackContent(2048);

    // ==========================================
    // 3. SIDES (X = 512 & 1536)
    // ==========================================
    [512, 1536].forEach((sX) => {
      ctx.strokeStyle = facetLine;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sX, 100);
      ctx.lineTo(sX, 900);
      ctx.stroke();

      ctx.fillStyle = mutedColor;
      ctx.save();
      ctx.translate(sX, 500);
      ctx.rotate(-Math.PI / 2);
      ctx.font = '400 14px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '10px';
      ctx.textAlign = 'center';
      ctx.fillText('IONA · SUBTERRANEAN PURITY', 0, 0);
      ctx.restore();
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  return texture;
}

export const wrapperLightTexture = createBottleWrapperTexture('light');
export const wrapperDarkTexture = createBottleWrapperTexture('dark');

if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => {
    wrapperLightTexture.needsUpdate = true;
    wrapperDarkTexture.needsUpdate = true;
  });
}

// Dual-layer luxury contact shadow + caustic ground refraction
function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 1. Soft caustic ring
    const causticGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 220);
    causticGrad.addColorStop(0, 'rgba(0, 150, 190, 0.18)');
    causticGrad.addColorStop(0.4, 'rgba(0, 150, 190, 0.08)');
    causticGrad.addColorStop(0.7, 'rgba(0, 150, 190, 0.02)');
    causticGrad.addColorStop(1, 'rgba(0, 150, 190, 0)');
    ctx.fillStyle = causticGrad;
    ctx.fillRect(0, 0, 512, 512);

    // 2. Heavy obsidian contact core
    const coreGrad = ctx.createRadialGradient(256, 256, 10, 256, 256, 170);
    coreGrad.addColorStop(0, 'rgba(4, 18, 28, 0.75)');
    coreGrad.addColorStop(0.3, 'rgba(4, 18, 28, 0.45)');
    coreGrad.addColorStop(0.65, 'rgba(4, 18, 28, 0.12)');
    coreGrad.addColorStop(1, 'rgba(4, 18, 28, 0)');
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, 512, 512);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const contactShadowTexture = createContactShadowTexture();

export function createIonaBottle(options?: {
  heightScale?: number;
  radiusScale?: number;
  initialTheme?: 'light' | 'dark';
}): BottleInstance {
  const group = new THREE.Group();
  group.name = 'iona-3d-crystal-bottle';

  const hScale = options?.heightScale ?? 1.0;
  const rScale = options?.radiusScale ?? 1.0;
  let activeTheme = options?.initialTheme ?? 'light';

  // Centering container for 3D rotation around its geometric center
  const container = new THREE.Group();
  container.name = 'bottle-pivot-container';
  group.add(container);

  // Exact bespoke bottle proportions
  const bottleHeight = 3.65 * hScale;
  const bodyRadius = 0.58 * rScale;
  const bodyHeight = bottleHeight * 0.74;
  const neckRadius = bodyRadius * 0.38;
  const neckHeight = bottleHeight * 0.18;
  const capHeight = bottleHeight * 0.10;

  // Center pivot point offset
  const centerOffsetY = -(neckHeight + capHeight) * 0.5;

  const isInitialLight = activeTheme === 'light';

  // ========================================================
  // 1. BESPOKE SOLID HEAVY CRYSTAL BASE & FLINT GLASS BODY
  // ========================================================
  const points: THREE.Vector2[] = [];
  // Solid thick base with internal curved demi-punt
  points.push(new THREE.Vector2(0, -bodyHeight * 0.5));
  points.push(new THREE.Vector2(bodyRadius * 0.88, -bodyHeight * 0.5));
  points.push(new THREE.Vector2(bodyRadius * 0.98, -bodyHeight * 0.5 + 0.08));
  points.push(new THREE.Vector2(bodyRadius, -bodyHeight * 0.5 + 0.18));
  // Straight cylindrical crystal body
  points.push(new THREE.Vector2(bodyRadius, bodyHeight * 0.36));
  // Multi-radius diamond shoulder curve
  points.push(new THREE.Vector2(bodyRadius * 0.96, bodyHeight * 0.42));
  points.push(new THREE.Vector2(bodyRadius * 0.76, bodyHeight * 0.49));
  points.push(new THREE.Vector2(neckRadius * 1.08, bodyHeight * 0.5 + neckHeight * 0.25));
  // Polished Neck & Lip
  points.push(new THREE.Vector2(neckRadius, bodyHeight * 0.5 + neckHeight));
  points.push(new THREE.Vector2(neckRadius * 1.09, bodyHeight * 0.5 + neckHeight + 0.04));
  points.push(new THREE.Vector2(neckRadius * 1.02, bodyHeight * 0.5 + neckHeight + 0.08));

  const latheGeometry = new THREE.LatheGeometry(points, 64);
  latheGeometry.computeVertexNormals();

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(isInitialLight ? '#FFFFFF' : '#0B1C26'),
    metalness: 0.02,
    roughness: isInitialLight ? 0.02 : 0.06,
    transmission: isInitialLight ? 0.95 : 0.82,
    ior: 1.58, // Dense luxury optical flint glass
    thickness: 1.4, // Substantial physical crystal refraction
    transparent: true,
    opacity: 0.97,
    reflectivity: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    attenuationColor: new THREE.Color(isInitialLight ? '#DEF3F8' : '#052835'),
    attenuationDistance: 1.8,
    side: THREE.DoubleSide,
    depthWrite: false,
    depthTest: true,
  });

  const bottleBody = new THREE.Mesh(latheGeometry, glassMaterial);
  bottleBody.position.y = centerOffsetY;
  bottleBody.castShadow = true;
  bottleBody.receiveShadow = true;
  container.add(bottleBody);

  // ========================================================
  // 2. INNER WATER COLUMN (With Thick Heavy Glass Base Clearance)
  // ========================================================
  const innerPoints: THREE.Vector2[] = [];
  const innerRadius = bodyRadius - 0.038;
  const innerBaseY = -bodyHeight * 0.5 + 0.26; // 0.26 thick solid glass bottom base
  const innerTopY = bodyHeight * 0.5 + neckHeight * 0.65;

  innerPoints.push(new THREE.Vector2(0, innerBaseY));
  innerPoints.push(new THREE.Vector2(innerRadius * 0.85, innerBaseY + 0.03));
  innerPoints.push(new THREE.Vector2(innerRadius, innerBaseY + 0.12));
  innerPoints.push(new THREE.Vector2(innerRadius, bodyHeight * 0.35));
  innerPoints.push(new THREE.Vector2(innerRadius * 0.88, bodyHeight * 0.44));
  innerPoints.push(new THREE.Vector2(neckRadius - 0.035, innerTopY));
  innerPoints.push(new THREE.Vector2(0, innerTopY));

  const waterLathe = new THREE.LatheGeometry(innerPoints, 48);
  waterLathe.computeVertexNormals();

  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(isInitialLight ? '#EDF8FB' : '#041B26'),
    metalness: 0.0,
    roughness: 0.015,
    transmission: isInitialLight ? 0.94 : 0.86,
    ior: 1.333, // Pure water
    thickness: 1.1,
    transparent: true,
    opacity: isInitialLight ? 0.65 : 0.85,
    clearcoat: 0.9,
    clearcoatRoughness: 0.02,
    depthWrite: false,
  });

  const waterMesh = new THREE.Mesh(waterLathe, waterMaterial);
  waterMesh.position.y = centerOffsetY;
  container.add(waterMesh);

  // ========================================================
  // 3. COMPLETE 360° CYLINDRICAL WRAPPER SLEEVE
  // ========================================================
  const wrapperGeo = new THREE.CylinderGeometry(
    bodyRadius + 0.004,
    bodyRadius + 0.004,
    bodyHeight * 0.74,
    64,
    1,
    true,
    -Math.PI,
    Math.PI * 2
  );

  const wrapperMat = new THREE.MeshStandardMaterial({
    map: isInitialLight ? wrapperLightTexture : wrapperDarkTexture,
    transparent: true,
    opacity: 1.0,
    roughness: 0.04,
    metalness: 0.02,
    side: THREE.DoubleSide,
    depthWrite: false,
    depthTest: true,
  });

  const wrapperMesh = new THREE.Mesh(wrapperGeo, wrapperMat);
  wrapperMesh.position.y = centerOffsetY - bodyHeight * 0.03;
  container.add(wrapperMesh);

  // ========================================================
  // 4. BESPOKE MULTI-TIER TITANIUM CAP & PLATINUM COLLAR
  // ========================================================
  const capGroup = new THREE.Group();
  capGroup.position.y = centerOffsetY + bodyHeight * 0.5 + neckHeight + capHeight * 0.45;

  // Main Anodized Obsidian Titanium Cap
  const capGeo = new THREE.CylinderGeometry(neckRadius * 1.12, neckRadius * 1.12, capHeight, 48);
  const capMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isInitialLight ? '#101518' : '#060A0D'),
    metalness: 0.94,
    roughness: 0.16,
  });
  const capMesh = new THREE.Mesh(capGeo, capMat);
  capGroup.add(capMesh);

  // Top Sunburst Medallion
  const medallionGeo = new THREE.CylinderGeometry(neckRadius * 0.95, neckRadius * 0.95, 0.015, 32);
  const medallionMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isInitialLight ? '#222B30' : '#141C22'),
    metalness: 0.98,
    roughness: 0.08,
  });
  const medallionMesh = new THREE.Mesh(medallionGeo, medallionMat);
  medallionMesh.position.y = capHeight * 0.5 + 0.008;
  capGroup.add(medallionMesh);

  // Polished Platinum Collar Ring
  const collarGeo = new THREE.CylinderGeometry(neckRadius * 1.14, neckRadius * 1.14, capHeight * 0.18, 48);
  const collarMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isInitialLight ? '#E2E8F0' : '#FFFFFF'),
    metalness: 0.98,
    roughness: 0.06,
  });
  const collarMesh = new THREE.Mesh(collarGeo, collarMat);
  collarMesh.position.y = -capHeight * 0.45;
  capGroup.add(collarMesh);

  container.add(capGroup);

  // ========================================================
  // 5. INTERNAL 3D MICRO-BUBBLES
  // ========================================================
  const bubblesGroup = new THREE.Group();
  const bubbleCount = 42;
  const bubbleGeo = new THREE.SphereGeometry(1, 8, 8);
  const bubbleMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(isInitialLight ? '#7CE0EF' : '#7DEAF0'),
    roughness: 0.02,
    transmission: 0.96,
    transparent: true,
    opacity: isInitialLight ? 0.82 : 0.92,
    ior: 1.25,
    depthWrite: false,
  });

  const bubbleInstances: { mesh: THREE.Mesh; speed: number; seed: number; baseY: number }[] = [];

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    const radius = 0.012 + Math.random() * 0.024;
    bubble.scale.set(radius, radius, radius);

    const r = Math.random() * (innerRadius * 0.72);
    const theta = Math.random() * Math.PI * 2;
    const bubbleX = Math.cos(theta) * r;
    const bubbleZ = Math.sin(theta) * r;
    const travelH = innerTopY - innerBaseY;
    const baseY = centerOffsetY + innerBaseY + 0.1 + Math.random() * (travelH - 0.2);

    bubble.position.set(bubbleX, baseY, bubbleZ);
    bubblesGroup.add(bubble);

    bubbleInstances.push({
      mesh: bubble,
      speed: 0.16 + Math.random() * 0.35,
      seed: Math.random() * 10,
      baseY,
    });
  }
  container.add(bubblesGroup);

  // ========================================================
  // 6. EXTERIOR PRISTINE WATER CONDENSATION DROPLETS
  // ========================================================
  const dropletsGroup = new THREE.Group();
  const dropletCount = 24;
  const dropGeo = new THREE.SphereGeometry(1, 10, 10);
  const dropMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(isInitialLight ? '#E8FAFF' : '#FFFFFF'),
    roughness: 0.02,
    transmission: 0.98,
    transparent: true,
    opacity: 0.88,
    ior: 1.333,
    depthWrite: false,
  });

  const dropInstances: { mesh: THREE.Mesh; angle: number; speed: number; baseY: number }[] = [];

  for (let i = 0; i < dropletCount; i++) {
    const drop = new THREE.Mesh(dropGeo, dropMat);
    const dScale = 0.012 + Math.random() * 0.024;
    drop.scale.set(dScale, dScale * 1.35, dScale * 0.45);

    const angle = Math.random() * Math.PI * 2;
    const baseY = centerOffsetY - bodyHeight * 0.38 + Math.random() * (bodyHeight * 0.74);
    drop.position.x = Math.cos(angle) * (bodyRadius + 0.008);
    drop.position.z = Math.sin(angle) * (bodyRadius + 0.008);
    drop.position.y = baseY;

    dropletsGroup.add(drop);
    dropInstances.push({
      mesh: drop,
      angle,
      speed: 0.02 + Math.random() * 0.05,
      baseY,
    });
  }
  container.add(dropletsGroup);

  // ========================================================
  // 7. SPECULAR DIAMOND SPARKLE GLINTS
  // ========================================================
  const glintsGroup = new THREE.Group();
  const glintGeo = new THREE.PlaneGeometry(0.24, 0.24);
  const createSparkleCanvas = (): THREE.CanvasTexture => {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const gctx = c.getContext('2d');
    if (gctx) {
      const grad = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(180, 235, 255, 0.8)');
      grad.addColorStop(0.5, 'rgba(120, 210, 240, 0.25)');
      grad.addColorStop(1, 'rgba(120, 210, 240, 0)');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 128, 128);

      // Star cross flare
      gctx.strokeStyle = '#FFFFFF';
      gctx.lineWidth = 1.5;
      gctx.beginPath();
      gctx.moveTo(64, 8);
      gctx.lineTo(64, 120);
      gctx.moveTo(8, 64);
      gctx.lineTo(120, 64);
      gctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  const sparkleTex = createSparkleCanvas();
  const glintMat = new THREE.MeshBasicMaterial({
    map: sparkleTex,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const glintPositions = [
    { x: -bodyRadius * 0.92, y: centerOffsetY + bodyHeight * 0.44, z: bodyRadius * 0.35, phase: 0 },
    { x: bodyRadius * 0.88, y: centerOffsetY + bodyHeight * 0.40, z: bodyRadius * 0.45, phase: 2.1 },
    { x: -bodyRadius * 0.75, y: centerOffsetY - bodyHeight * 0.46, z: bodyRadius * 0.55, phase: 4.2 },
    { x: bodyRadius * 0.82, y: centerOffsetY - bodyHeight * 0.44, z: bodyRadius * 0.48, phase: 1.3 },
  ];

  const glintMeshes: { mesh: THREE.Mesh; phase: number }[] = [];
  glintPositions.forEach((gp) => {
    const gm = new THREE.Mesh(glintGeo, glintMat);
    gm.position.set(gp.x, gp.y, gp.z);
    glintsGroup.add(gm);
    glintMeshes.push({ mesh: gm, phase: gp.phase });
  });
  container.add(glintsGroup);

  // ========================================================
  // 8. DECOUPLED GROUND PEDESTAL SHADOW & CAUSTIC POOL
  // ========================================================
  const shadowGeo = new THREE.PlaneGeometry(bodyRadius * 3.6, bodyRadius * 2.4);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: contactShadowTexture,
    transparent: true,
    opacity: isInitialLight ? 0.42 : 0.75,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.set(0, centerOffsetY - bodyHeight * 0.5 - 0.01, 0);
  group.add(shadowMesh);

  // Frame Animation Loop
  const update = (time: number, _scrollProgress: number) => {
    // Animate inner bubbles rising
    bubbleInstances.forEach((b) => {
      const topLimit = centerOffsetY + innerTopY * 0.95;
      const bottomLimit = centerOffsetY + innerBaseY + 0.05;
      const travelRange = topLimit - bottomLimit;

      const newY = bottomLimit + (((b.baseY - bottomLimit) + time * b.speed) % travelRange);
      b.mesh.position.y = newY;
      b.mesh.position.x += Math.sin(time * 2 + b.seed) * 0.0005;
      b.mesh.position.z += Math.cos(time * 2 + b.seed) * 0.0005;
    });

    // Animate condensation droplets trickling down
    dropInstances.forEach((d) => {
      const topLimit = centerOffsetY + bodyHeight * 0.35;
      const bottomLimit = centerOffsetY - bodyHeight * 0.4;
      const travelRange = topLimit - bottomLimit;

      let newY = bottomLimit + (((d.baseY - bottomLimit) - time * d.speed) % travelRange);
      if (newY < bottomLimit) {
        newY += travelRange;
      }
      d.mesh.position.y = newY;
    });

    // Animate sparkling glints on crystal bevels
    glintMeshes.forEach((g) => {
      const pulse = Math.sin(time * 3 + g.phase);
      const intensity = Math.max(0, pulse * pulse * pulse);
      g.mesh.scale.setScalar(0.7 + intensity * 0.8);
      g.mesh.rotation.z = time * 0.8 + g.phase;
    });
  };

  const setScale = (scale: number) => {
    group.scale.set(scale, scale, scale);
  };

  const setTheme = (theme: 'light' | 'dark') => {
    activeTheme = theme;
    const isLight = theme === 'light';

    if (isLight) {
      glassMaterial.color.set('#FFFFFF');
      glassMaterial.roughness = 0.02;
      glassMaterial.transmission = 0.95;
      glassMaterial.attenuationColor.set('#DEF3F8');

      waterMaterial.color.set('#EDF8FB');
      waterMaterial.opacity = 0.65;

      wrapperMat.map = wrapperLightTexture;
      wrapperMat.needsUpdate = true;

      capMat.color.set('#101518');
      medallionMat.color.set('#222B30');
      collarMat.color.set('#E2E8F0');

      bubbleMat.color.set('#7CE0EF');
      glintMat.opacity = 0.65;
      shadowMat.opacity = 0.42;
    } else {
      glassMaterial.color.set('#0B1C26');
      glassMaterial.roughness = 0.06;
      glassMaterial.transmission = 0.82;
      glassMaterial.attenuationColor.set('#052835');

      waterMaterial.color.set('#041B26');
      waterMaterial.opacity = 0.85;

      wrapperMat.map = wrapperDarkTexture;
      wrapperMat.needsUpdate = true;

      capMat.color.set('#060A0D');
      medallionMat.color.set('#141C22');
      collarMat.color.set('#FFFFFF');

      bubbleMat.color.set('#7DEAF0');
      glintMat.opacity = 0.85;
      shadowMat.opacity = 0.75;
    }
  };

  const labelMesh = wrapperMesh;

  return {
    group,
    bottleBody,
    waterMesh,
    capMesh,
    labelMesh,
    bubblesGroup,
    dropletsGroup,
    update,
    setScale,
    setTheme,
  };
}

