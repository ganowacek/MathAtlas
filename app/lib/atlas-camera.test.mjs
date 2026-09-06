import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createAtlasCamera } from './atlas-camera.ts';

function harness(t) {
  const frames = new Map();
  let nextFrame = 0;
  let onResize;
  const windowTarget = new EventTarget();
  t.mock.method(globalThis, 'requestAnimationFrame', (callback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  });
  t.mock.method(globalThis, 'cancelAnimationFrame', (id) => frames.delete(id));
  t.mock.method(globalThis, 'ResizeObserver', function (callback) {
    onResize = callback;
    return { observe() {}, disconnect() {} };
  });
  const previousWindow = globalThis.window;
  globalThis.window = windowTarget;
  const attributes = new Map();
  const minimapAttributes = new Map();
  const captured = new Set();
  const svg = Object.assign(new EventTarget(), {
    clientWidth: 800, clientHeight: 600, style: {},
    getBoundingClientRect: () => ({ left: 100, top: 50 }),
    hasPointerCapture: (id) => captured.has(id),
    setPointerCapture: (id) => captured.add(id),
    releasePointerCapture: (id) => captured.delete(id),
  });
  let draws = 0;
  const camera = createAtlasCamera(svg, {
    setAttribute: (name, value) => { draws++; attributes.set(name, value); },
  }, { setAttribute: (name, value) => minimapAttributes.set(name, value) });
  t.after(() => {
    camera.dispose();
    globalThis.window = previousWindow;
  });
  return {
    camera, frames, attributes, minimapAttributes, captured,
    draws: () => draws,
    resize: (width, height) => onResize([{ contentRect: { width, height } }]),
    flush() {
      const pending = [...frames.values()];
      frames.clear();
      for (const callback of pending) callback();
    },
    event(type, props = {}) {
      const event = Object.assign(new Event(type, { cancelable: true }), {
        pointerId: 1, button: 0, clientX: 300, clientY: 250,
        deltaY: 0, deltaMode: 0, ...props,
      });
      (type === 'pointerup' || type === 'pointercancel' ? windowTarget : svg).dispatchEvent(event);
      return event;
    },
    transform() { return attributes.get('transform').match(/-?\d+(?:\.\d+)?/g).map(Number); },
  };
}

// Browser-only globals are stubbed per test and restored by the test runner.
globalThis.requestAnimationFrame = () => 0;
globalThis.cancelAnimationFrame = () => {};
globalThis.ResizeObserver = class {};

test('bursts of pointer input draw once, retaining every movement', (t) => {
  const h = harness(t);
  h.flush();
  h.event('pointerdown');
  for (let i = 1; i <= 240; i++) h.event('pointermove', { clientX: 300 + i });
  assert.equal(h.frames.size, 1);
  assert.equal(h.draws(), 1);
  h.flush();
  assert.deepEqual(h.transform(), [165, -105, 0.45]);
  assert.equal(h.draws(), 2);
  h.event('pointerup');
  assert.equal(h.captured.size, 0);
  assert.equal(h.event('click').defaultPrevented, true);
  h.event('pointerdown');
  h.event('pointermove', { clientX: 301 });
  h.event('pointerup');
  assert.equal(h.event('click').defaultPrevented, false);
});

test('wheel zoom preserves its anchor and respects both scale limits', (t) => {
  const h = harness(t);
  h.flush();
  const before = h.transform();
  assert.equal(h.event('wheel', { deltaY: -100 }).defaultPrevented, true);
  h.flush();
  const after = h.transform();
  assert.ok(Math.abs((200 - before[0]) / before[2] - (200 - after[0]) / after[2]) < 1e-9);
  assert.ok(Math.abs((200 - before[1]) / before[2] - (200 - after[1]) / after[2]) < 1e-9);
  h.event('wheel', { deltaY: -100000 });
  h.flush();
  assert.equal(h.transform()[2], 1.5);
  h.event('wheel', { deltaY: 100000 });
  h.flush();
  assert.equal(h.transform()[2], 0.22);
});

test('pinch and cancellation release capture without leaving a stuck drag', (t) => {
  const h = harness(t);
  h.flush();
  h.event('pointerdown', { clientX: 200 });
  h.event('pointerdown', { pointerId: 2, clientX: 400 });
  h.event('pointermove', { pointerId: 2, clientX: 600 });
  h.flush();
  assert.equal(h.transform()[2], 0.9);
  h.event('pointercancel', { pointerId: 2 });
  h.event('pointercancel');
  h.event('pointermove', { clientX: 800 });
  assert.equal(h.frames.size, 0);
  assert.equal(h.captured.size, 0);
});

test('resize updates minimap dimensions, focus centers, and disposal cancels queued work', (t) => {
  const h = harness(t);
  h.resize(400, 300);
  h.camera.focus({ x: 1200, y: 1000 });
  h.flush();
  const [x, y, scale] = h.transform();
  assert.equal(x + 1200 * scale, 200);
  assert.equal(y + 1000 * scale, 150);
  assert.equal(Number(h.minimapAttributes.get('width')), 400 / scale);
  assert.equal(Number(h.minimapAttributes.get('height')), 300 / scale);
  h.camera.reset();
  h.flush();
  assert.deepEqual(h.transform(), [-75, -105, 0.45]);
  h.camera.zoom(0.1);
  h.camera.dispose();
  assert.equal(h.frames.size, 0);
  h.event('wheel', { deltaY: 100 });
  assert.equal(h.frames.size, 0);
});
