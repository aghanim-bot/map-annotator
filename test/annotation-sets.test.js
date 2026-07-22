'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync, statSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const repositoryRoot = join(__dirname, '..');
const modulePath = join(repositoryRoot, 'data', 'annotation-sets.js');
const { annotationSets } = require(modulePath);

test('exports the same annotation sets to CommonJS and browsers', () => {
  const context = {};
  vm.runInNewContext(readFileSync(modulePath, 'utf8'), context);
  assert.equal(context.AnnotationSets.annotationSets.length, annotationSets.length);
});

test('defines exactly 30 maps, three heroes, 90 sets, and 360 tasks', () => {
  assert.equal(new Set(annotationSets.map(({ mapId }) => mapId)).size, 30);
  assert.deepEqual(
    [...new Set(annotationSets.map(({ heroName }) => heroName))],
    ['Cassidy', 'Hanzo', 'Tracer']
  );
  assert.equal(annotationSets.length, 90);
  assert.ok(annotationSets.every(({ tasks }) => tasks.length === 4));
  assert.equal(annotationSets.flatMap(({ tasks }) => tasks).length, 360);
});

test('uses every dated nonempty map image and valid task metadata', () => {
  const ids = [];
  for (const set of annotationSets) {
    assert.equal(set.mapVersion, '2026-07-22');
    assert.equal(set.mapImage, `./maps/${set.mapId}-2026-07-22.webp`);
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
  assert.equal(new Set(ids).size, 360);
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
});
