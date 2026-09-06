import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import { dimensions, fieldForms, formForTopic } from '../data/dimensions.ts';
import { regions, topics } from '../data/atlas.ts';
import { createMathForm, disposeForm } from './math-forms.ts';

test('all 47 fields belong to exactly one dimension and have a 3D form', () => {
  const ids = dimensions.flatMap(d => d.fields);
  assert.equal(ids.length, regions.length);
  assert.equal(new Set(ids).size, regions.length);
  for (const field of regions) {
    assert.ok(ids.includes(field.id), field.id);
    assert.ok(fieldForms[field.id], field.id);
  }
});

test('every form has finite vertices, fits the scene, and disposes its resources', () => {
  const kinds = new Set([...Object.values(fieldForms), ...topics.map(t => formForTopic(t.id, fieldForms[t.fieldId]))]);
  for (const kind of kinds) {
    const form = createMathForm(kind, '#528f84');
    const geometries = new Set(), materials = new Set();
    let triangles = 0, disposedGeometries = 0, disposedMaterials = 0;
    form.traverse(object => {
      if (object.geometry) {
        const positions = object.geometry.getAttribute('position');
        assert.ok(positions.count > 0, kind);
        for (const value of positions.array) assert.ok(Number.isFinite(value), kind);
        geometries.add(object.geometry);
        if (object.isMesh) triangles += (object.geometry.index?.count ?? positions.count) / 3 * (object.isInstancedMesh ? object.count : 1);
      }
      if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
    });
    const box = new THREE.Box3().setFromObject(form);
    assert.ok(!box.isEmpty(), kind);
    assert.ok(box.getSize(new THREE.Vector3()).length() < 8, kind);
    assert.ok(triangles < 12000, `${kind}: ${triangles} triangles`);
    for (const geometry of geometries) geometry.addEventListener('dispose', () => disposedGeometries++);
    for (const material of materials) material.addEventListener('dispose', () => disposedMaterials++);
    disposeForm(form);
    assert.equal(disposedGeometries, geometries.size, kind);
    assert.equal(disposedMaterials, materials.size, kind);
  }
});
