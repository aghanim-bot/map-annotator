'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync, statSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const repositoryRoot = join(__dirname, '..');
const modulePath = join(repositoryRoot, 'data', 'annotation-sets.js');
const { mapPool, readyMaps, pendingMaps, annotationSets } = require(modulePath);

const expectedPendingNames = [
  'Aatlis',
  'Antarctic Peninsula',
  'Blizzard World',
  'Circuit Royal',
  'Eichenwalde',
  'Hollywood',
  'Junkertown',
  'Neon Junction',
  'New Junk City',
  'Paraíso',
  'Rialto',
  'Route 66',
  'Watchpoint: Gibraltar'
];

test('exports the same annotation sets to CommonJS and browsers', () => {
  const context = {};
  vm.runInNewContext(readFileSync(modulePath, 'utf8'), context);
  assert.equal(context.AnnotationSets.annotationSets.length, annotationSets.length);
  assert.equal(context.AnnotationSets.mapPool.length, mapPool.length);
  assert.equal(context.AnnotationSets.pendingMaps.length, pendingMaps.length);
});

test('retains 30 pool records while gating sets to 17 ready maps', () => {
  assert.equal(mapPool.length, 30);
  assert.equal(new Set(mapPool.map(({ mapId }) => mapId)).size, 30);
  assert.equal(readyMaps.length, 17);
  assert.equal(pendingMaps.length, 13);
  assert.ok(readyMaps.every(({ imageryStatus }) => imageryStatus === 'ready'));
  assert.ok(pendingMaps.every(({ imageryStatus }) => imageryStatus === 'pending'));
  assert.deepEqual(pendingMaps.map(({ mapName }) => mapName).sort(), expectedPendingNames.sort());
  assert.equal(new Set(annotationSets.map(({ mapId }) => mapId)).size, 17);
  assert.deepEqual(
    [...new Set(annotationSets.map(({ heroName }) => heroName))],
    ['Cassidy', 'Hanzo', 'Tracer']
  );
  assert.equal(annotationSets.length, 51);
  assert.ok(annotationSets.every(({ tasks }) => tasks.length === 4));
  assert.equal(annotationSets.flatMap(({ tasks }) => tasks).length, 204);
  for (const map of readyMaps) {
    const mapSets = annotationSets.filter(({ mapId }) => mapId === map.mapId);
    assert.equal(mapSets.length, 3);
    assert.ok(mapSets.every(({ tasks }) => tasks.length === 4));
  }
});

test('references only existing nonempty r2 map images and valid task metadata', () => {
  const ids = [];
  for (const set of annotationSets) {
    assert.equal(set.mapVersion, '2026-07-22-r2');
    assert.equal(set.mapImage, `./maps/${set.mapId}-2026-07-22-r2.webp`);
    const imagePath = join(repositoryRoot, set.mapImage);
    assert.equal(existsSync(imagePath), true, imagePath);
    assert.ok(statSync(imagePath).size > 0, imagePath);

    for (const [id, prompt, source, metadata] of set.tasks) {
      ids.push(id);
      assert.match(id, /^(control|escort|flashpoint|hybrid|push)\.[a-z0-9-]+\.(cassidy|hanzo|tracer)\.[a-z0-9-]+$/);
      assert.ok(prompt.includes(set.mapName));
      assert.match(prompt, new RegExp(set.heroName));
      assert.equal(source, null);
      assert.ok(metadata.kind === 'point' || metadata.kind === 'route');
      assert.equal(metadata.minPoints, metadata.kind === 'route' ? 2 : 1);
    }
  }
  assert.equal(new Set(ids).size, 204);
  const source = readFileSync(modulePath, 'utf8');
  assert.doesNotMatch(source, /`\.\/maps\/\$\{mapId\}-2026-07-22\.webp`/);
});

test('removes catalog files, scripts, and UI while retaining annotator controls', () => {
  const index = readFileSync(join(repositoryRoot, 'index.html'), 'utf8');
  assert.equal(existsSync(join(repositoryRoot, 'data', 'competitive-catalog.js')), false);
  assert.equal(existsSync(join(repositoryRoot, 'catalog-browser.js')), false);
  assert.doesNotMatch(index, /competitive catalog|catalog-/i);
  assert.doesNotMatch(index, /competitive-catalog\.js|catalog-browser\.js/);
  for (const id of ['map-select', 'hero-select', 'mode-select', 'previous-button', 'next-button']) {
    assert.match(index, new RegExp(`id="${id}"`));
  }
  assert.match(index, /human judgments/i);
  assert.match(index, /not audited recommendations/i);
  assert.match(index, /imagery-availability/);
  const app = readFileSync(join(repositoryRoot, 'app.js'), 'utf8');
  assert.match(app, /maps ready/);
  assert.match(app, /awaiting current overhead captures/);
});
