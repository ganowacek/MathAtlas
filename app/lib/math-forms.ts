import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import type { FormKind } from '@/app/data/dimensions';

export function createMathForm(kind: FormKind, color: string, variant = 0) {
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
    surface((u, v, p) => {
      const a = u * Math.PI * 2;
      const w = (v - 0.5) * 1.2;
      p.set((1.1 + w * Math.cos(a / 2)) * Math.cos(a), w * Math.sin(a / 2), (1.1 + w * Math.cos(a / 2)) * Math.sin(a));
    });
    group.rotation.set(0.55, -0.25, 0.15);
  } else if (kind === 'wave' || kind === 'saddle' || kind === 'gaussian' || kind === 'helicoid') {
    surface((u, v, p) => {
      const x = (u - 0.5) * 3.1, z = (v - 0.5) * 3.1;
      if (kind === 'helicoid') {
        const angle = u * Math.PI * 3;
        p.set(v * 1.5 * Math.cos(angle), (u - 0.5) * 2.4, v * 1.5 * Math.sin(angle));
      } else {
        const y = kind === 'wave' ? 0.57 * Math.sin(x * 2 + variant * 0.2) * Math.cos(z * 1.6)
          : kind === 'saddle' ? (x * x - z * z) * 0.38
          : 2.1 * Math.exp(-(x * x + z * z) * 1.4) - 0.65;
        p.set(x, y, z);
      }
    });
  } else if (kind === 'torus') {
    const torus = mesh(new THREE.TorusGeometry(1, 0.4, 24, 64));
    torus.rotation.set(0.7, 0.2, 0);
  } else if (kind === 'rings') {
    for (let i = 0; i < 3; i++) {
      const ring = mesh(new THREE.TorusGeometry(1.05, 0.065 + i * 0.015, 10, 72), undefined, i === 1 ? pale : material);
      ring.rotation.set(i * 0.8 + 0.3, i * 1.15, i * 0.4);
    }
    mesh(new THREE.IcosahedronGeometry(0.3, 1));
  } else if (kind === 'solids' || kind === 'crystal') {
    const core = mesh(kind === 'solids' ? new THREE.IcosahedronGeometry(0.9, 0) : new THREE.OctahedronGeometry(1.35, 0));
    core.rotation.set(0.3, 0.2, 0.2);
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry), new THREE.LineBasicMaterial({ color: '#f7faf8' }));
    outline.rotation.copy(core.rotation); group.add(outline);
    if (kind === 'solids') {
      mesh(new THREE.TetrahedronGeometry(0.52), new THREE.Vector3(-1.25, -0.3, 0.15), pale).rotation.y = 0.5;
      mesh(new THREE.DodecahedronGeometry(0.53), new THREE.Vector3(1.2, 0.15, 0.1), pale);
    } else {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 1.8, 1.8)), new THREE.LineBasicMaterial({ color }));
      edges.rotation.y = Math.PI / 4;
      group.add(edges);
      mesh(new THREE.OctahedronGeometry(0.35), new THREE.Vector3(0, 1.6, 0), pale);
    }
  } else if (kind === 'helix' || kind === 'lorenz') {
    if (kind === 'helix') {
      const strands: THREE.Vector3[][] = [[], []];
      for (let i = 0; i <= 120; i++) {
        const a = i / 120 * Math.PI * 4;
        for (let j = 0; j < 2; j++) strands[j].push(new THREE.Vector3(Math.cos(a + j * Math.PI) * 0.75, i / 120 * 3 - 1.5, Math.sin(a + j * Math.PI) * 0.75));
      }
      tube(strands[0], 0.075);
      tube(strands[1], 0.075, false, pale);
      segments(strands[0].filter((_, i) => i % 8 === 0).flatMap((p, i) => [p, strands[1][i * 8]]));
    } else {
      let x = 0.1, y = 0, z = 0;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < 2600; i++) {
        const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - 8 / 3 * z;
        x += dx * 0.005; y += dy * 0.005; z += dz * 0.005;
        if (i > 400 && i % 4 === 0) points.push(new THREE.Vector3(x / 14, (z - 25) / 14, y / 14));
      }
      tube(points, 0.024);
    }
  } else if (kind === 'network' || kind === 'tree') {
    const points: THREE.Vector3[] = [];
    const edges: THREE.Vector3[] = [];
    if (kind === 'tree') {
      for (let depth = 0; depth < 4; depth++) {
        for (let j = 0; j < 2 ** depth; j++) {
          const p = new THREE.Vector3((j - (2 ** depth - 1) / 2) * 3.1 / 2 ** depth, 1.1 - depth * 0.75, Math.sin(j * 1.8) * 0.35);
          points.push(p);
          if (depth) edges.push(p, points[2 ** (depth - 1) - 1 + Math.floor(j / 2)]);
        }
      }
    } else {
      for (let i = 0; i < 16; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / 16), theta = i * 2.39996;
        points.push(new THREE.Vector3(1.35 * Math.sin(phi) * Math.cos(theta), 1.35 * Math.cos(phi), 1.35 * Math.sin(phi) * Math.sin(theta)));
      }
      points.forEach((p, i) => points.forEach((q, j) => { if (j > i && p.distanceTo(q) < 1.4) edges.push(p, q); }));
    }
    instances(new THREE.IcosahedronGeometry(0.13, 1), points);
    segments(edges);
  } else if (kind === 'prime' || kind === 'histogram' || kind === 'integral') {
    const points: THREE.Vector3[] = [], scales: THREE.Vector3[] = [];
    if (kind === 'prime') {
      for (let n = 2; n < 100; n++) {
        let prime = true;
        for (let d = 2; d * d <= n; d++) if (n % d === 0) prime = false;
        if (!prime) continue;
        const a = n * 0.6, r = Math.sqrt(n) * 0.14, h = 0.2 + n / 65;
        points.push(new THREE.Vector3(Math.cos(a) * r, h / 2 - 0.7, Math.sin(a) * r));
        scales.push(new THREE.Vector3(0.18, h, 0.18));
      }
    } else {
      for (let i = 0; i < 17; i++) {
        const x = (i - 8) * 0.16;
        const h = kind === 'histogram' ? 2 * Math.exp(-x * x * 1.7) + 0.08 : 1 + 0.6 * Math.sin(x * 2);
        points.push(new THREE.Vector3(x, h / 2 - 0.85, 0));
        scales.push(new THREE.Vector3(0.13, h, 1.05));
      }
    }
    instances(new THREE.BoxGeometry(1, 1, 1), points, scales);
  } else {
    const points: THREE.Vector3[] = [], edges: THREE.Vector3[] = [];
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) points.push(new THREE.Vector3(x * 0.8, y * 0.8, z * 0.8));
    points.forEach((p, i) => points.forEach((q, j) => { if (j > i && Math.abs(p.distanceTo(q) - 0.8) < 0.01) edges.push(p, q); }));
    instances(new THREE.BoxGeometry(0.32, 0.32, 0.32), points);
    segments(edges);
    group.rotation.y = 0.4;
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
