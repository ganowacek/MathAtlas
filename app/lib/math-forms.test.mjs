import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import { dimensions, fieldForms, formForTopic } from '../data/dimensions.ts';
import { regions, topics } from '../data/atlas.ts';
import { createMathForm, disposeForm, seedFromId } from './math-forms.ts';

// Cheap order-sensitive hash over every rendered vertex (and instance transform), so two
// forms that differ in any geometric parameter produce different fingerprints.
function fingerprint(form) {
  let hash = 2166136261;
  const mix = n => { hash = (hash ^ (n | 0)) >>> 0; hash = Math.imul(hash, 16777619) >>> 0; };
  form.traverse(object => {
    if (!object.geometry) return;
    const positions = object.geometry.getAttribute('position');
    for (const value of positions.array) mix(Math.round(value * 1000));
    if (object.isInstancedMesh) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < object.count; i++) {
        object.getMatrixAt(i, matrix);
        for (const value of matrix.elements) mix(Math.round(value * 1000));
      }
    }
  });
  return hash;
}

// Shared invariants every rendered form must hold, regardless of which seed produced it:
// finite geometry, fits the camera's bounding volume, stays within the triangle budget, and
// disposes every geometry/material it allocated. Disposes `form` as a side effect.
function assertHealthyForm(form, label) {
  const geometries = new Set(), materials = new Set();
  let triangles = 0, disposedGeometries = 0, disposedMaterials = 0;
  form.traverse(object => {
    if (object.geometry) {
      const positions = object.geometry.getAttribute('position');
      assert.ok(positions.count > 0, label);
      for (const value of positions.array) assert.ok(Number.isFinite(value), label);
      geometries.add(object.geometry);
      if (object.isMesh) triangles += (object.geometry.index?.count ?? positions.count) / 3 * (object.isInstancedMesh ? object.count : 1);
    }
    if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
  });
  const box = new THREE.Box3().setFromObject(form);
  assert.ok(!box.isEmpty(), label);
  assert.ok(box.getSize(new THREE.Vector3()).length() < 8, label);
  assert.ok(triangles < 12000, `${label}: ${triangles} triangles`);
  for (const geometry of geometries) geometry.addEventListener('dispose', () => disposedGeometries++);
  for (const material of materials) material.addEventListener('dispose', () => disposedMaterials++);
  disposeForm(form);
  assert.equal(disposedGeometries, geometries.size, label);
  assert.equal(disposedMaterials, materials.size, label);
}

test('all 47 fields belong to exactly one dimension and have a 3D form', () => {
  const ids = dimensions.flatMap(d => d.fields);
  assert.equal(ids.length, regions.length);
  assert.equal(new Set(ids).size, regions.length);
  for (const field of regions) {
    assert.ok(ids.includes(field.id), field.id);
    assert.ok(fieldForms[field.id], field.id);
  }
});

test('every form kind has finite vertices, fits the scene, and disposes its resources', () => {
  const kinds = new Set([...Object.values(fieldForms), ...topics.map(t => formForTopic(t.id, fieldForms[t.fieldId]))]);
  for (const kind of kinds) assertHealthyForm(createMathForm(kind, '#528f84'), kind);
});

test('every field renders a shape unique among all 47 fields, and stays within budget', () => {
  const fingerprints = new Map();
  for (const field of regions) {
    const form = createMathForm(fieldForms[field.id], '#528f84', 0, seedFromId(field.id));
    const print = fingerprint(form);
    const collision = fingerprints.get(print);
    assert.ok(!collision, `${field.id} renders identically to ${collision}`);
    fingerprints.set(print, field.id);
    assertHealthyForm(form, field.id);
  }
});

test('every topic renders a shape unique among its own field\'s topics and hero, and stays within budget', () => {
  for (const field of regions) {
    const kind = fieldForms[field.id];
    const fingerprints = new Map();
    const heroForm = createMathForm(kind, '#528f84', 0, seedFromId(field.id));
    fingerprints.set(fingerprint(heroForm), field.id);
    assertHealthyForm(heroForm, field.id);
    topics.filter(t => t.fieldId === field.id).forEach((topic, index) => {
      const form = createMathForm(formForTopic(topic.id, kind), '#528f84', index, seedFromId(topic.id));
      const print = fingerprint(form);
      const collision = fingerprints.get(print);
      assert.ok(!collision, `${topic.id} renders identically to ${collision} within ${field.id}`);
      fingerprints.set(print, topic.id);
      assertHealthyForm(form, `${field.id}:${topic.id}`);
    });
  }
});
