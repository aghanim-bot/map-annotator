'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync, statSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const repositoryRoot = join(__dirname, '..');
const modulePath = join(repositoryRoot, 'data', 'annotation-sets.js');
const auditedTasksPath = join(repositoryRoot, 'data', 'audited-tasks.js');
const { mapPool, readyMaps, pendingMaps, auditedTasks, annotationSets } = require(modulePath);

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
  vm.runInNewContext(readFileSync(auditedTasksPath, 'utf8'), context);
  vm.runInNewContext(readFileSync(modulePath, 'utf8'), context);
  assert.equal(context.AnnotationSets.annotationSets.length, annotationSets.length);
  assert.equal(context.AnnotationSets.mapPool.length, mapPool.length);
  assert.equal(context.AnnotationSets.pendingMaps.length, pendingMaps.length);
});

test('stages exactly three audited prompts per canonical map and hero while gating live sets to ready imagery', () => {
  assert.equal(mapPool.length, 30);
  assert.equal(new Set(mapPool.map(({ mapId }) => mapId)).size, 30);
  assert.equal(readyMaps.length, 17);
  assert.equal(pendingMaps.length, 13);
  assert.ok(readyMaps.every(({ imageryStatus }) => imageryStatus === 'ready'));
  assert.ok(pendingMaps.every(({ imageryStatus }) => imageryStatus === 'pending'));
  assert.deepEqual(pendingMaps.map(({ mapName }) => mapName).sort(), expectedPendingNames.sort());
  const canonicalHeroes = {
    cassidy: 'Cassidy',
    hanzo: 'Hanzo',
    tracer: 'Tracer'
  };
  const canonicalMapIds = mapPool.map(({ mapId }) => mapId).sort();
  const canonicalKeys = canonicalMapIds.flatMap((mapId) =>
    Object.keys(canonicalHeroes).map((heroId) => `${mapId}:${heroId}`)).sort();
  assert.deepEqual(Object.keys(auditedTasks).sort(), canonicalKeys);
  assert.equal(Object.keys(auditedTasks).length, 90);
  assert.equal(Object.values(auditedTasks).flat().length, 270);
  assert.ok(Object.values(auditedTasks).every((tasks) => tasks.length === 3));

  assert.deepEqual(
    [...new Set(annotationSets.map(({ mapId }) => mapId))].sort(),
    readyMaps.map(({ mapId }) => mapId).sort()
  );
  assert.deepEqual(
    [...new Set(annotationSets.map(({ heroId }) => heroId))].sort(),
    Object.keys(canonicalHeroes).sort()
  );
  assert.equal(annotationSets.length, 17 * 3);
  assert.equal(annotationSets.flatMap(({ tasks }) => tasks).length, 17 * 3 * 3);
  assert.ok(annotationSets.every(({ mapId }) => readyMaps.some((map) => map.mapId === mapId)));
  assert.ok(pendingMaps.every(({ mapId }) => !annotationSets.some((set) => set.mapId === mapId)));

  for (const { mapId, mapName } of mapPool) {
    for (const [heroId, heroName] of Object.entries(canonicalHeroes)) {
      assert.equal(auditedTasks[`${mapId}:${heroId}`].length, 3, `${mapName} ${heroName} audit count`);
      const sets = annotationSets.filter((set) => set.mapId === mapId && set.heroId === heroId);
      assert.equal(sets.length, readyMaps.some((map) => map.mapId === mapId) ? 1 : 0);
    }
  }
});

test('uses only timestamped evidence sources, new semantics, and valid task metadata', () => {
  const ids = [];
  const auditReports = ['cassidy', 'hanzo', 'tracer'].map((heroId) =>
    readFileSync(join(repositoryRoot, 'docs', `${heroId}-270-expansion-audit.md`), 'utf8'));
  const oldSemanticIds = [
    'visible-long-sightline', 'visible-corner-cover', 'cover-to-sightline-route',
    'alternate-cover-route', 'visible-elevated-edge', 'visible-scouting-surface',
    'ground-to-elevation-route', 'elevated-reposition-route', 'visible-side-corner',
    'visible-open-crossing-edge', 'side-lane-route', 'cover-chain-route'
  ];
  const blindGenericWording = /(?:select (?:a|the) place|good angle|wide angle|generic cover|good flank|generic flank|generic side[ -]lane|(?:select|choose|mark|click|find) (?:a |an |the )?(?:cover|flank|side[ -]lane)\b|select as cover|visible side lane|visibly open sightline)/i;
  const canonicalEvidenceUrl = /^(?:https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+&t=\d+(?:\.\d+)?s|https:\/\/www\.reddit\.com\/r\/[A-Za-z0-9_]+\/comments\/[A-Za-z0-9]+\/[A-Za-z0-9_-]+\/[A-Za-z0-9]+\/?)$/;
  for (const set of annotationSets) {
    assert.equal(set.mapVersion, '2026-07-22-r2');
    assert.equal(set.mapImage, `./maps/${set.mapId}-2026-07-22-r2.webp`);
    const imagePath = join(repositoryRoot, set.mapImage);
    assert.equal(existsSync(imagePath), true, imagePath);
    assert.ok(statSync(imagePath).size > 0, imagePath);

  }

  for (const [key, tasks] of Object.entries(auditedTasks)) {
    const [mapId, heroId] = key.split(':');
    const map = mapPool.find((entry) => entry.mapId === mapId);
    const heroName = { cassidy: 'Cassidy', hanzo: 'Hanzo', tracer: 'Tracer' }[heroId];
    for (const [id, prompt, source, metadata] of tasks) {
      ids.push(id);
      assert.match(id, /^(control|escort|flashpoint|hybrid|push)\.[a-z0-9-]+\.(cassidy|hanzo|tracer)\.[a-z0-9-]+$/);
      assert.ok(prompt.includes(map.mapName));
      assert.match(prompt, new RegExp(heroName));
      assert.ok(source && typeof source === 'object');
      assert.equal(typeof source.label, 'string');
      assert.equal(typeof source.detail, 'string');
      assert.match(source.detail, /Exact evidence:\s*\S/);
      assert.match(source.detail, /Audit finding:\s*\S/);
      assert.equal(typeof source.url, 'string');
      assert.match(source.url, canonicalEvidenceUrl);
      if (source.url.includes('youtube.com/')) assert.match(source.url, /&t=\d+(?:\.\d+)?s$/);
      assert.doesNotMatch(prompt, blindGenericWording);
      assert.ok(!oldSemanticIds.some((semanticId) => id.endsWith(`.${semanticId}`)));
      assert.ok(metadata.kind === 'point' || metadata.kind === 'route');
      assert.equal(metadata.minPoints, metadata.kind === 'route' ? 2 : 1);
      if (metadata.kind === 'point') assert.match(prompt, /\bclick\b/i, `${id} must identify a concrete point`);
      if (metadata.kind === 'route') {
        assert.match(prompt, /\btrace\b.*\bfrom\b.*\bto\b/i, `${id} must identify a bounded route`);
      }
      assert.ok(auditReports.some((report) => report.includes(source.url)), `${id} source missing from audit reports`);
    }
  }
  assert.equal(ids.length, 270);
  assert.equal(new Set(ids).size, 270);
  for (const heroId of ['cassidy', 'hanzo', 'tracer']) {
    assert.equal(ids.filter((id) => id.includes(`.${heroId}.`)).length, 90);
  }
  const source = readFileSync(modulePath, 'utf8');
  assert.doesNotMatch(source, /`\.\/maps\/\$\{mapId\}-2026-07-22\.webp`/);
  assert.doesNotMatch(source, /source:\s*null|,\s*null,|visible-long-sightline|alternate-cover-route/);
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
  assert.match(index, /human placement judgments/i);
  assert.match(index, /identify audited source locations/i);
  assert.match(index, /do not imply unsupported recommendations/i);
  assert.match(index, /imagery-availability/);
  const app = readFileSync(join(repositoryRoot, 'app.js'), 'utf8');
  assert.match(app, /maps ready/);
  assert.match(app, /awaiting current overhead captures/);
});
