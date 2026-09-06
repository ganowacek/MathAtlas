import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import type { FormKind } from '@/app/data/dimensions';

// Deterministic id -> 32-bit seed (FNV-1a), so the same field/topic id always renders the same shape.
export function seedFromId(id: string): number {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) || 1;
}

function mulberry32(seed: number) {
  let a = seed >>> 0 || 1;
  return function rand() {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createMathForm(kind: FormKind, color: string, variant = 0, seed = 0) {
  const rand = mulberry32(seed);
  const between = (min: number, max: number) => min + rand() * (max - min);
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.37, metalness: 0.16, side: THREE.DoubleSide });
  const pale = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).lerp(new THREE.Color('#f4f6f3'), 0.6), roughness: 0.55, metalness: 0.05 });
  const wire = new THREE.LineBasicMaterial({ color: new THREE.Color(color).multiplyScalar(0.65), transparent: true, opacity: 0.32 });

  function mesh(geometry: THREE.BufferGeometry, position = new THREE.Vector3(), mat = material) {
    const object = new THREE.Mesh(geometry, mat);
    object.position.copy(position);
    group.add(object);
    return object;
  }
  function tube(points: THREE.Vector3[], radius = 0.045, closed = false, mat = material) {
    return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, closed), Math.min(240, points.length * 2), radius, 7, closed), undefined, mat);
  }
  function surface(fn: (u: number, v: number, target: THREE.Vector3) => void) {
    const geometry = new ParametricGeometry(fn, 40, 24);
    mesh(geometry);
    const gridSurface = new ParametricGeometry(fn, 18, 12);
    const grid = new THREE.LineSegments(new THREE.WireframeGeometry(gridSurface), wire);
    gridSurface.dispose();
    group.add(grid);
  }
  function instances(geometry: THREE.BufferGeometry, positions: THREE.Vector3[], scales?: THREE.Vector3[]) {
    const object = new THREE.InstancedMesh(geometry, material, positions.length);
    const matrix = new THREE.Matrix4();
    positions.forEach((p, i) => {
      matrix.compose(p, new THREE.Quaternion(), scales?.[i] ?? new THREE.Vector3(1, 1, 1));
      object.setMatrixAt(i, matrix);
      object.setColorAt(i, new THREE.Color(color).lerp(new THREE.Color('#fafbf7'), (i % 5) * 0.06));
    });
    group.add(object);
  }
  function segments(points: THREE.Vector3[]) {
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.72 })));
  }

  if (kind === 'mobius') {
    const majorRadius = between(0.85, 1.35), width = between(0.9, 1.55);
    surface((u, v, p) => {
      const a = u * Math.PI * 2;
      const w = (v - 0.5) * width;
      p.set((majorRadius + w * Math.cos(a / 2)) * Math.cos(a), w * Math.sin(a / 2), (majorRadius + w * Math.cos(a / 2)) * Math.sin(a));
    });
    group.rotation.set(0.55 + between(-0.25, 0.25), -0.25 + between(-0.25, 0.25), 0.15 + between(-0.2, 0.2));
  } else if (kind === 'wave' || kind === 'saddle' || kind === 'gaussian' || kind === 'helicoid') {
    const waveAmp = between(0.32, 0.9), waveFreqX = between(1.1, 3.1), waveFreqZ = between(0.85, 2.7);
    const saddleK = between(0.24, 0.52), saddleAsym = between(0.6, 1.5);
    const gaussianAmp = between(1.5, 2.7), gaussianSpread = between(0.95, 1.9), gaussianOffset = between(0.5, 0.8);
    const helicoidTurns = between(2.1, 3.9), helicoidRadius = between(1.15, 1.85), helicoidHeight = between(1.8, 3.0);
    surface((u, v, p) => {
      const x = (u - 0.5) * 3.1, z = (v - 0.5) * 3.1;
      if (kind === 'helicoid') {
        const angle = u * Math.PI * helicoidTurns;
        p.set(v * helicoidRadius * Math.cos(angle), (u - 0.5) * helicoidHeight, v * helicoidRadius * Math.sin(angle));
      } else {
        const y = kind === 'wave' ? waveAmp * Math.sin(x * waveFreqX + variant * 0.2) * Math.cos(z * waveFreqZ)
          : kind === 'saddle' ? (x * x - z * z * saddleAsym) * saddleK
          : gaussianAmp * Math.exp(-(x * x + z * z) * gaussianSpread) - gaussianOffset;
        p.set(x, y, z);
      }
    });
    group.rotation.set(between(-0.22, 0.22), between(-0.55, 0.55), between(-0.22, 0.22));
  } else if (kind === 'torus') {
    const majorR = between(0.8, 1.25), tubeR = between(0.28, 0.48);
    const torus = mesh(new THREE.TorusGeometry(majorR, tubeR, 24, 64));
    torus.rotation.set(0.7 + between(-0.3, 0.3), 0.2 + between(-0.3, 0.3), between(-0.2, 0.2));
  } else if (kind === 'rings') {
    const ringCount = Math.floor(between(2, 5));
    const radius = between(0.9, 1.25);
    for (let i = 0; i < ringCount; i++) {
      const ring = mesh(new THREE.TorusGeometry(radius, 0.06 + i * 0.015, 10, 72), undefined, i === 1 ? pale : material);
      ring.rotation.set(i * 0.8 + 0.3 + between(-0.3, 0.3), i * 1.15 + between(-0.3, 0.3), i * 0.4 + between(-0.2, 0.2));
    }
    mesh(new THREE.IcosahedronGeometry(between(0.22, 0.38), 1));
  } else if (kind === 'solids' || kind === 'crystal') {
    // Rotating a mesh inflates its world-space AABB toward its LOCAL box's corner distance
    // (up to r*sqrt(3) for a polyhedron with vertices on the axes), not just its radius — so
    // these ranges stay well under the radius that would make an unrotated shape hit the
    // scene's size budget.
    const coreRadius = kind === 'solids' ? between(0.75, 1.05) : between(1.0, 1.3);
    const core = mesh(kind === 'solids' ? new THREE.IcosahedronGeometry(coreRadius, 0) : new THREE.OctahedronGeometry(coreRadius, 0));
    core.rotation.set(0.3 + between(-0.15, 0.15), 0.2 + between(-0.15, 0.15), 0.2 + between(-0.15, 0.15));
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry), new THREE.LineBasicMaterial({ color: '#f7faf8' }));
    outline.rotation.copy(core.rotation); group.add(outline);
    if (kind === 'solids') {
      const satelliteOffset = between(1.05, 1.4);
      mesh(new THREE.TetrahedronGeometry(between(0.42, 0.62)), new THREE.Vector3(-satelliteOffset, between(-0.45, -0.15), between(0, 0.3)), pale).rotation.y = between(0.2, 0.8);
      mesh(new THREE.DodecahedronGeometry(between(0.44, 0.62)), new THREE.Vector3(satelliteOffset, between(0, 0.3), between(0, 0.2)), pale);
    } else {
      const boxSize = between(1.5, 1.85);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(boxSize, boxSize, boxSize)), new THREE.LineBasicMaterial({ color }));
      edges.rotation.y = Math.PI / 4 + between(-0.2, 0.2);
      group.add(edges);
      mesh(new THREE.OctahedronGeometry(between(0.25, 0.36)), new THREE.Vector3(0, between(1.25, 1.55), 0), pale);
    }
  } else if (kind === 'helix' || kind === 'lorenz') {
    if (kind === 'helix') {
      const radius = between(0.6, 0.9), turns = between(3, 5), height = between(2.6, 3.4), tubeRadius = between(0.06, 0.09);
      const strands: THREE.Vector3[][] = [[], []];
      for (let i = 0; i <= 120; i++) {
        const a = i / 120 * Math.PI * turns;
        for (let j = 0; j < 2; j++) strands[j].push(new THREE.Vector3(Math.cos(a + j * Math.PI) * radius, i / 120 * height - height / 2, Math.sin(a + j * Math.PI) * radius));
      }
      tube(strands[0], tubeRadius);
      tube(strands[1], tubeRadius, false, pale);
      segments(strands[0].filter((_, i) => i % 8 === 0).flatMap((p, i) => [p, strands[1][i * 8]]));
    } else {
      // Lorenz is chaotic: a different starting point yields a wholly different-looking
      // trajectory on the same attractor, so uniqueness comes from initial conditions
      // rather than from perturbing sigma/rho/beta (which risks the trace escaping the
      // scaled bounding box the renderer assumes).
      const startX = between(0.05, 0.25), tubeRadius = between(0.018, 0.03);
      let x = startX, y = 0, z = 0;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < 2600; i++) {
        const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - 8 / 3 * z;
        x += dx * 0.005; y += dy * 0.005; z += dz * 0.005;
        if (i > 400 && i % 4 === 0) points.push(new THREE.Vector3(x / 14, (z - 25) / 14, y / 14));
      }
      tube(points, tubeRadius);
    }
  } else if (kind === 'network' || kind === 'tree') {
    const points: THREE.Vector3[] = [];
    const edges: THREE.Vector3[] = [];
    if (kind === 'tree') {
      const depth = Math.floor(between(3, 6));
      const spreadX = between(2.6, 3.6), verticalStep = between(0.6, 0.9), topY = between(0.9, 1.3);
      for (let d = 0; d < depth; d++) {
        for (let j = 0; j < 2 ** d; j++) {
          const p = new THREE.Vector3((j - (2 ** d - 1) / 2) * spreadX / 2 ** d, topY - d * verticalStep, Math.sin(j * 1.8) * 0.35);
          points.push(p);
          if (d) edges.push(p, points[2 ** (d - 1) - 1 + Math.floor(j / 2)]);
        }
      }
    } else {
      const nodeCount = Math.floor(between(12, 21));
      const radius = between(1.2, 1.5), connectDist = between(1.2, 1.6);
      for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount), theta = i * 2.39996;
        points.push(new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)));
      }
      points.forEach((p, i) => points.forEach((q, j) => { if (j > i && p.distanceTo(q) < connectDist) edges.push(p, q); }));
    }
    instances(new THREE.IcosahedronGeometry(0.13, 1), points);
    segments(edges);
  } else if (kind === 'prime' || kind === 'histogram' || kind === 'integral') {
    const points: THREE.Vector3[] = [], scales: THREE.Vector3[] = [];
    if (kind === 'prime') {
      const limit = Math.floor(between(70, 130)), angleStep = between(0.5, 0.7), radiusScale = between(0.11, 0.16), heightDivisor = between(58, 75);
      for (let n = 2; n < limit; n++) {
        let prime = true;
        for (let d = 2; d * d <= n; d++) if (n % d === 0) prime = false;
        if (!prime) continue;
        const a = n * angleStep, r = Math.sqrt(n) * radiusScale, h = 0.2 + n / heightDivisor;
        points.push(new THREE.Vector3(Math.cos(a) * r, h / 2 - 0.7, Math.sin(a) * r));
        scales.push(new THREE.Vector3(0.18, h, 0.18));
      }
    } else {
      const barCount = Math.floor(between(13, 22)), step = between(0.13, 0.19);
      const half = (barCount - 1) / 2;
      const gaussianK = between(1.4, 2.0), sineFreq = between(1.6, 2.4), sineAmp = between(0.5, 0.8);
      for (let i = 0; i < barCount; i++) {
        const x = (i - half) * step;
        const h = kind === 'histogram' ? 2 * Math.exp(-x * x * gaussianK) + 0.08 : 1 + sineAmp * Math.sin(x * sineFreq);
        points.push(new THREE.Vector3(x, h / 2 - 0.85, 0));
        scales.push(new THREE.Vector3(0.13, h, 1.05));
      }
    }
    instances(new THREE.BoxGeometry(1, 1, 1), points, scales);
  } else {
    const spacing = between(0.55, 0.9), boxSize = between(0.2, 0.42);
    const points: THREE.Vector3[] = [], edges: THREE.Vector3[] = [];
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) points.push(new THREE.Vector3(x * spacing, y * spacing, z * spacing));
    points.forEach((p, i) => points.forEach((q, j) => { if (j > i && Math.abs(p.distanceTo(q) - spacing) < 0.01) edges.push(p, q); }));
    instances(new THREE.BoxGeometry(boxSize, boxSize, boxSize), points);
    segments(edges);
    group.rotation.set(between(-0.5, 0.5), 0.4 + between(-0.9, 0.9), between(-0.5, 0.5));
  }
  // Unused branch materials must not accumulate when entering another dimension.
  const used = new Set<THREE.Material>();
  group.traverse(object => {
    if ('material' in object) {
      const mats = object.material as THREE.Material | THREE.Material[];
      (Array.isArray(mats) ? mats : [mats]).forEach(mat => used.add(mat));
    }
  });
  for (const mat of [material, pale, wire]) if (!used.has(mat)) mat.dispose();
  return group;
}

export function disposeForm(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  root.traverse(object => {
    if ('geometry' in object) geometries.add(object.geometry as THREE.BufferGeometry);
    if ('material' in object) {
      const value = object.material as THREE.Material | THREE.Material[];
      (Array.isArray(value) ? value : [value]).forEach(mat => materials.add(mat));
    }
    if (object instanceof THREE.InstancedMesh) object.dispose();
  });
  geometries.forEach(geometry => geometry.dispose());
  materials.forEach(material => material.dispose());
}
