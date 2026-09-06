'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { dimensions, fieldForms, formForTopic, type FormKind } from '@/app/data/dimensions';
import { regions, topics, type Relationship } from '@/app/data/atlas';

export type WorldSelection = { kind: 'dimension' | 'region' | 'topic'; id: string };
export type WorldCommands = { zoom: (factor: number) => void; reset: () => void; view: (type: 'front' | 'top' | 'perspective') => void };
type Props = {
  dimensionId: string | null;
  fieldId: string;
  spread: number;
  rotating: boolean;
  wireframe: boolean;
  dark: boolean;
  visibleIds: Set<string>;
  selectedId?: string;
  pathIds: Set<string>;
  relationships: Relationship[];
  onSelect: (selection: WorldSelection) => void;
  commands: RefObject<WorldCommands | null>;
};

export default function MathWorlds(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  const update = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => { latest.current = props; update.current?.(); }, [props]);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const container = host.current!;

    async function mount() {
      const [THREE, { OrbitControls }, { createMathForm, disposeForm, seedFromId }] = await Promise.all([
        import('three'), import('three/addons/controls/OrbitControls.js'), import('@/app/lib/math-forms'),
      ]);
      if (cancelled) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor('#e9eeec', 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      renderer.domElement.setAttribute('aria-label', 'Interactive 3D mathematical dimensions');
      renderer.domElement.tabIndex = 0;
      container.appendChild(renderer.domElement);
      const labels = document.createElement('div');
      labels.className = 'world-labels';
      container.appendChild(labels);
      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight('#ffffff', '#98a9ad', 2.7));
      const key = new THREE.DirectionalLight('#fff9ef', 3.5);
      key.position.set(-4, 8, 7); scene.add(key);
      const rim = new THREE.DirectionalLight('#d6e9ff', 2);
      rim.position.set(5, 3, -6); scene.add(rim);
      const camera = new THREE.OrthographicCamera(-10, 10, 7, -7, 0.1, 200);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.12;
      controls.minZoom = 0.45; controls.maxZoom = 5;
      controls.maxPolarAngle = Math.PI * 0.88;
      controls.autoRotateSpeed = 0.45;
      controls.listenToKeyEvents(renderer.domElement);
      const root = new THREE.Group(); scene.add(root);
      type Item = { object: import('three').Group; target: import('three').Vector3; label: HTMLButtonElement; selection: WorldSelection; topicId?: string; labelPoint: import('three').Vector3 };
      let items: Item[] = [];
      let hero: import('three').Group | undefined;
      let lines: import('three').LineSegments | undefined;
      let sceneKey = '';
      let aspect = 1;
      let columns = 4;
      let fitHeight = 12;
      let spread = latest.current.spread;
      let frame: number | undefined;
      let lastTime = 0;
      let disposed = false;
      let previousWireframe = false;
      let samplePixels = true;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const projected = new THREE.Vector3();
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      let pointerStart = { x: 0, y: 0 };
      const canvas = renderer.domElement;

      function invalidate() {
        if (!disposed && frame === undefined && !document.hidden) frame = requestAnimationFrame(draw);
      }

      function home(type: 'front' | 'top' | 'perspective' = 'perspective') {
        camera.zoom = 1;
        controls.target.set(0, 0, 0);
        if (type === 'front') camera.position.set(0, 0.01, 30);
        else if (type === 'top') camera.position.set(0, 30, 0.01);
        else camera.position.set(0, 19, 28);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        controls.update(); invalidate();
      }

      function addItem(kind: FormKind, color: string, title: string, selection: WorldSelection, index: number, detail: string) {
        const object = createMathForm(kind, color, index, seedFromId(selection.id));
        object.userData.selection = selection;
        root.add(object);
        const label = document.createElement('button');
        label.type = 'button'; label.className = 'world-label';
        label.setAttribute('aria-label', `Open ${title}`);
        const name = document.createElement('span'); name.textContent = title;
        const sub = document.createElement('small'); sub.textContent = detail;
        label.appendChild(name); label.appendChild(sub);
        label.addEventListener('click', () => latest.current.onSelect(selection));
        labels.appendChild(label);
        items.push({ object, target: new THREE.Vector3(), label, selection, topicId: selection.kind === 'topic' ? selection.id : undefined, labelPoint: new THREE.Vector3() });
      }

      function rebuild() {
        for (const item of items) item.label.remove();
        disposeForm(root); root.clear(); items = []; hero = undefined; lines = undefined;
        const state = latest.current;
        const dimension = dimensions.find(d => d.id === state.dimensionId);
        if (!dimension) {
          dimensions.forEach((d, i) => addItem(d.form, d.color, d.name, { kind: 'dimension', id: d.id }, i, `${d.fields.length} fields`));
        } else {
          const field = regions.find(r => r.id === state.fieldId);
          const kind = field ? fieldForms[field.id] : dimension.form;
          hero = createMathForm(kind, dimension.color, 0, seedFromId(field ? field.id : dimension.id));
          hero.userData.selection = field ? { kind: 'region', id: field.id } : { kind: 'dimension', id: dimension.id };
          root.add(hero);
          if (field) {
            topics.filter(t => t.fieldId === field.id).forEach((t, i) => addItem(formForTopic(t.id, kind), dimension.color, t.name, { kind: 'topic', id: t.id }, i, t.difficulty));
          } else {
            dimension.fields.forEach((id, i) => {
              const field = regions.find(r => r.id === id)!;
              addItem(fieldForms[id], dimension.color, field.name, { kind: 'region', id }, i, `${topics.filter(t => t.fieldId === id).length} topics`);
            });
          }
        }
        previousWireframe = !state.wireframe;
        layout(); home();
      }

      function layout() {
        const count = items.length;
        const rows = Math.ceil(count / columns);
        items.forEach((item, i) => {
          const row = Math.floor(i / columns);
          const rowCount = Math.min(columns, count - row * columns);
          item.target.set((i % columns - (rowCount - 1) / 2) * 4.3, 0, (row - (rows - 1) / 2) * 6.2);
        });
        fitHeight = Math.max(7.5, rows * 4.3 + 1.4, Math.min(count, columns) * 4.7 / aspect);
        camera.left = -fitHeight * aspect / 2; camera.right = fitHeight * aspect / 2;
        camera.top = fitHeight / 2; camera.bottom = -fitHeight / 2;
        camera.updateProjectionMatrix();
        invalidate();
      }

      function updateScene() {
        const state = latest.current;
        samplePixels = true;
        const nextKey = `${state.dimensionId}:${state.fieldId}`;
        if (nextKey !== sceneKey) { sceneKey = nextKey; spread = state.spread; rebuild(); }
        controls.autoRotate = state.rotating && !reduceMotion.matches;
        if (previousWireframe !== state.wireframe) {
          root.traverse(object => {
            if (object instanceof THREE.Mesh) {
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach(mat => { if (mat instanceof THREE.MeshStandardMaterial) mat.wireframe = state.wireframe; });
            }
          });
          previousWireframe = state.wireframe;
        }
        for (const item of items) {
          const matches = item.topicId ? state.visibleIds.has(item.topicId) : topics.some(t => state.visibleIds.has(t.id) && (item.selection.kind === 'dimension' ? dimensions.find(d => d.id === item.selection.id)!.fields.includes(t.fieldId) : t.fieldId === item.selection.id));
          item.object.visible = matches;
          item.label.dataset.filtered = String(!matches);
          item.label.classList.toggle('selected', item.selection.id === state.selectedId);
          item.label.classList.toggle('in-path', !!item.topicId && state.pathIds.has(item.topicId));
        }
        if (lines) { root.remove(lines); disposeForm(lines); lines = undefined; }
        const byId = new Map(items.filter(item => item.topicId).map(item => [item.topicId!, item]));
        const points: import('three').Vector3[] = [];
        state.relationships.forEach(rel => {
          const a = byId.get(rel.sourceId), b = byId.get(rel.targetId);
          if (a?.object.visible && b?.object.visible) points.push(a.target, b.target);
        });
        if (points.length) {
          lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: state.dark ? '#9fd6c8' : '#819694', transparent: true, opacity: state.dark ? 0.55 : 0.4 }));
          root.add(lines);
        }
        invalidate();
      }

      function draw(time: number) {
        frame = undefined;
        if (disposed || document.hidden) return;
        const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.05); lastTime = time;
        const target = latest.current.spread;
        spread = reduceMotion.matches ? target : THREE.MathUtils.damp(spread, target, 10, delta);
        if (Math.abs(spread - target) < 0.001) spread = target;
        const focused = !!latest.current.dimensionId;
        const expansion = focused ? spread : 1;
        const zoomedHeight = focused ? THREE.MathUtils.lerp(5.8, fitHeight, expansion) : fitHeight;
        camera.top = zoomedHeight / 2; camera.bottom = -zoomedHeight / 2;
        camera.left = -zoomedHeight * aspect / 2; camera.right = zoomedHeight * aspect / 2;
        camera.updateProjectionMatrix();
        if (hero) { hero.scale.setScalar(Math.max(0.001, 1.25 * (1 - expansion))); hero.visible = expansion < 0.98; }
        items.forEach(item => {
          item.object.position.copy(item.target).multiplyScalar(expansion);
          item.object.scale.setScalar(focused ? Math.max(0.001, expansion * 0.82) : 0.86);
        });
        if (lines) { lines.scale.setScalar(expansion); lines.visible = expansion > 0.65; }
        const changed = controls.update(delta);
        renderer.render(scene, camera);
        const rect = container.getBoundingClientRect();
        const positioned = items.map(item => {
          item.labelPoint.copy(item.object.position).add(new THREE.Vector3(0, -1.25, 0.9));
          projected.copy(item.labelPoint).project(camera);
          const x = (projected.x * 0.5 + 0.5) * rect.width, y = (-projected.y * 0.5 + 0.5) * rect.height;
          const culled = !item.object.visible || expansion < 0.7 || projected.z < -1 || projected.z > 1 || x < 20 || x > rect.width - 20 || y < 0 || y > rect.height - 35;
          return { item, x, y, culled };
        });
        // Labels are placed by independent 3D projection with no shared layout pass, so
        // nearby dimensions/fields can project to overlapping screen positions as the
        // camera moves. Declutter greedily, giving the selected item priority so it never
        // gets suppressed by a neighbor.
        const LABEL_HALF_WIDTH = 55, LABEL_HEIGHT = 40, LABEL_GAP = 4;
        const placedRects: { x0: number; y0: number; x1: number; y1: number }[] = [];
        [...positioned]
          .sort((a, b) => Number(b.item.selection.id === latest.current.selectedId) - Number(a.item.selection.id === latest.current.selectedId))
          .forEach(entry => {
            if (entry.culled) return;
            const x0 = entry.x - LABEL_HALF_WIDTH, x1 = entry.x + LABEL_HALF_WIDTH;
            const y0 = entry.y - LABEL_GAP, y1 = entry.y + LABEL_HEIGHT + LABEL_GAP;
            const overlapping = placedRects.some(r => x0 < r.x1 && x1 > r.x0 && y0 < r.y1 && y1 > r.y0);
            if (overlapping) { entry.culled = true; return; }
            placedRects.push({ x0, y0, x1, y1 });
          });
        positioned.forEach(({ item, x, y, culled }) => {
          item.label.hidden = culled;
          item.label.style.transform = `translate(${x}px, ${y}px) translate(-50%, 0)`;
        });
        // Expose inexpensive render counters for local performance regression checks.
        container.dataset.drawCalls = String(renderer.info.render.calls);
        container.dataset.triangles = String(renderer.info.render.triangles);
        container.dataset.renderCount = String(Number(container.dataset.renderCount ?? 0) + 1);
        container.dataset.camera = camera.position.toArray().map(v => v.toFixed(2)).join(',');
        if (process.env.NODE_ENV === 'development' && samplePixels && spread === target) {
          const gl = renderer.getContext(), pixels = new Uint8Array(canvas.width * canvas.height * 4);
          gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
          let colored = 0;
          for (let x = 1; x < 16; x++) for (let y = 1; y < 16; y++) {
            const offset = (Math.floor(canvas.height * y / 16) * canvas.width + Math.floor(canvas.width * x / 16)) * 4;
            if (pixels[offset + 3] > 32) colored++;
          }
          container.dataset.visiblePixelSamples = String(colored);
          samplePixels = false;
        }
        if (changed || controls.autoRotate || spread !== target) invalidate();
      }

      function pointerDown(event: PointerEvent) { pointerStart = { x: event.clientX, y: event.clientY }; }
      function click(event: MouseEvent) {
        if (Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5) return;
        const rect = canvas.getBoundingClientRect();
        pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(root.children, true).find(h => {
          let node: import('three').Object3D | null = h.object;
          while (node && node !== root) { if (!node.visible) return false; node = node.parent; }
          return true;
        });
        let object: import('three').Object3D | null = hit?.object ?? null;
        while (object && !object.userData.selection) object = object.parent;
        if (object?.userData.selection) latest.current.onSelect(object.userData.selection as WorldSelection);
      }
      const resize = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        if (!width || !height) return;
        aspect = width / height; columns = width < 500 ? 2 : aspect > 1.45 ? 4 : 3;
        renderer.setSize(width, height); layout(); updateScene();
      });
      const lost = (event: Event) => { event.preventDefault(); setStatus('error'); };
      const visibility = () => { if (document.hidden && frame !== undefined) { cancelAnimationFrame(frame); frame = undefined; } else invalidate(); };
      controls.addEventListener('change', invalidate);
      canvas.addEventListener('pointerdown', pointerDown);
      canvas.addEventListener('click', click);
      canvas.addEventListener('webglcontextlost', lost);
      document.addEventListener('visibilitychange', visibility);
      resize.observe(container);
      latest.current.commands.current = { zoom(factor) { camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, 0.45, 5); camera.updateProjectionMatrix(); invalidate(); }, reset: () => home(), view: home };
      update.current = updateScene;
      updateScene(); setStatus('ready');
      cleanup = () => {
        disposed = true;
        if (frame !== undefined) cancelAnimationFrame(frame);
        resize.disconnect(); controls.dispose(); disposeForm(root); renderer.dispose();
        canvas.removeEventListener('pointerdown', pointerDown); canvas.removeEventListener('click', click); canvas.removeEventListener('webglcontextlost', lost);
        document.removeEventListener('visibilitychange', visibility);
        canvas.remove(); labels.remove(); update.current = null; latest.current.commands.current = null;
      };
    }
    void mount().catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return <div className="world-stage" ref={host}>
    {status === 'loading' && <div className="scene-status"><span className="loading-ring" />Opening dimensions</div>}
    {status === 'error' && <div className="scene-status"><strong>3D is unavailable in this browser.</strong><span>Your fields and topics are still available in the explorer.</span><button onClick={() => window.location.reload()}>Reload view</button></div>}
  </div>;
}
