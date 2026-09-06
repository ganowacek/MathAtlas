export const initialCamera = { x: -75, y: -105, scale: 0.45 };

type Point = { x: number; y: number };

export function createAtlasCamera(
  svg: SVGSVGElement,
  world: SVGGElement,
  minimap: SVGRectElement,
) {
  let camera = { ...initialCamera };
  let frame: number | undefined;
  let viewport = { width: svg.clientWidth, height: svg.clientHeight };
  const pointers = new Map<number, Point>();
  let origin: Point | undefined;
  let moved = false;

  const draw = () => {
    frame = undefined;
    world.setAttribute('transform', `translate(${camera.x} ${camera.y}) scale(${camera.scale})`);
    minimap.setAttribute('x', String(-camera.x / camera.scale));
    minimap.setAttribute('y', String(-camera.y / camera.scale));
    minimap.setAttribute('width', String(viewport.width / camera.scale));
    minimap.setAttribute('height', String(viewport.height / camera.scale));
  };

  // Camera changes never enter React state; coalesce input to one draw per frame.
  const schedule = () => {
    if (frame === undefined) frame = requestAnimationFrame(draw);
  };

  const zoomAt = (scale: number, anchor: Point, previousAnchor = anchor) => {
    const nextScale = Math.min(1.5, Math.max(0.22, scale));
    camera = {
      scale: nextScale,
      x: anchor.x - ((previousAnchor.x - camera.x) / camera.scale) * nextScale,
      y: anchor.y - ((previousAnchor.y - camera.y) / camera.scale) * nextScale,
    };
    schedule();
  };

  const localPoint = (point: Point) => {
    const rect = svg.getBoundingClientRect();
    return { x: point.x - rect.left, y: point.y - rect.top };
  };

  const wheel = (event: WheelEvent) => {
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.height : 1;
    zoomAt(
      camera.scale - event.deltaY * unit * 0.0007,
      localPoint({ x: event.clientX, y: event.clientY }),
    );
  };

  const pointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    if (pointers.size === 0) {
      moved = false;
      origin = { x: event.clientX, y: event.clientY };
    }
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  };

  const pointerMove = (event: PointerEvent) => {
    const previous = pointers.get(event.pointerId);
    if (!previous) return;
    const point = { x: event.clientX, y: event.clientY };
    if (!moved && pointers.size === 1 && origin && Math.hypot(point.x - origin.x, point.y - origin.y) < 4) return;
    moved = true;
    svg.style.cursor = 'grabbing';
    // Capture only after movement, so a stationary click still targets its topic.
    if (!svg.hasPointerCapture(event.pointerId)) svg.setPointerCapture(event.pointerId);
    const other = [...pointers.entries()].find(([id]) => id !== event.pointerId)?.[1];
    if (other) {
      const oldDistance = Math.hypot(previous.x - other.x, previous.y - other.y);
      const distance = Math.hypot(point.x - other.x, point.y - other.y);
      const center = localPoint({ x: (point.x + other.x) / 2, y: (point.y + other.y) / 2 });
      const oldCenter = localPoint({ x: (previous.x + other.x) / 2, y: (previous.y + other.y) / 2 });
      zoomAt(camera.scale * (oldDistance > 0 ? distance / oldDistance : 1), center, oldCenter);
    } else {
      camera = { ...camera, x: camera.x + point.x - previous.x, y: camera.y + point.y - previous.y };
      schedule();
    }
    pointers.set(event.pointerId, point);
  };

  const pointerEnd = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    if (pointers.size === 0) svg.style.cursor = '';
  };

  const click = (event: MouseEvent) => {
    if (moved) {
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }
  };

  const resize = new ResizeObserver(([entry]) => {
    viewport = { width: entry.contentRect.width, height: entry.contentRect.height };
    schedule();
  });
  resize.observe(svg);
  svg.addEventListener('wheel', wheel, { passive: false });
  svg.addEventListener('pointerdown', pointerDown);
  svg.addEventListener('pointermove', pointerMove);
  svg.addEventListener('lostpointercapture', pointerEnd);
  svg.addEventListener('click', click, true);
  window.addEventListener('pointerup', pointerEnd);
  window.addEventListener('pointercancel', pointerEnd);
  schedule();

  return {
    zoom(delta: number) {
      zoomAt(camera.scale + delta, { x: viewport.width / 2, y: viewport.height / 2 });
    },
    reset() {
      camera = { ...initialCamera };
      schedule();
    },
    focus(point: Point) {
      const scale = Math.max(camera.scale, 0.62);
      camera = { scale, x: viewport.width / 2 - point.x * scale, y: viewport.height / 2 - point.y * scale };
      schedule();
    },
    dispose() {
      if (frame !== undefined) cancelAnimationFrame(frame);
      resize.disconnect();
      svg.removeEventListener('wheel', wheel);
      svg.removeEventListener('pointerdown', pointerDown);
      svg.removeEventListener('pointermove', pointerMove);
      svg.removeEventListener('lostpointercapture', pointerEnd);
      svg.removeEventListener('click', click, true);
      window.removeEventListener('pointerup', pointerEnd);
      window.removeEventListener('pointercancel', pointerEnd);
      for (const id of pointers.keys()) {
        if (svg.hasPointerCapture(id)) svg.releasePointerCapture(id);
      }
      pointers.clear();
      svg.style.cursor = '';
    },
  };
}
