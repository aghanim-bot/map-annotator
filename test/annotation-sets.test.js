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

test('retains 30 pool records while gating audited sets to ready imagery', () => {
  assert.equal(mapPool.length, 30);
  assert.equal(new Set(mapPool.map(({ mapId }) => mapId)).size, 30);
  assert.equal(readyMaps.length, 17);
  assert.equal(pendingMaps.length, 13);
  assert.ok(readyMaps.every(({ imageryStatus }) => imageryStatus === 'ready'));
  assert.ok(pendingMaps.every(({ imageryStatus }) => imageryStatus === 'pending'));
  assert.deepEqual(pendingMaps.map(({ mapName }) => mapName).sort(), expectedPendingNames.sort());
  assert.equal(new Set(annotationSets.map(({ mapId }) => mapId)).size, 17);
  assert.deepEqual([...new Set(annotationSets.map(({ heroName }) => heroName))], ['Cassidy', 'Hanzo', 'Tracer']);
  assert.equal(annotationSets.length, 21);
  assert.equal(annotationSets.flatMap(({ tasks }) => tasks).length, 25);

  const expectedSetTaskCounts = {
    'busan:cassidy': 1, 'ilios:cassidy': 1, 'lijiang-tower:cassidy': 1,
    'nepal:cassidy': 1, 'oasis:cassidy': 1, 'samoa:cassidy': 1,
    'dorado:cassidy': 1, 'havana:cassidy': 1, 'shambali-monastery:cassidy': 1,
    'suravasa:cassidy': 1, 'kings-row:cassidy': 1, 'midtown:cassidy': 1,
    'numbani:cassidy': 1, 'colosseo:cassidy': 1, 'esperanca:cassidy': 1,
    'new-queen-street:cassidy': 1, 'runasapi:cassidy': 1,
    'nepal:hanzo': 1, 'esperanca:hanzo': 3, 'new-queen-street:hanzo': 1,
    'shambali-monastery:tracer': 3
  };
  assert.deepEqual(
    Object.fromEntries(annotationSets.map((set) => [`${set.mapId}:${set.heroId}`, set.tasks.length])),
    expectedSetTaskCounts
  );

  const expectedDimensions = {
    cassidy: { maps: 17, tasks: 17 },
    hanzo: { maps: 3, tasks: 5 },
    tracer: { maps: 1, tasks: 3 }
  };
  for (const [heroId, expected] of Object.entries(expectedDimensions)) {
    const sets = annotationSets.filter((set) => set.heroId === heroId);
    assert.equal(sets.length, expected.maps, `${heroId} map count`);
    assert.equal(sets.flatMap(({ tasks }) => tasks).length, expected.tasks, `${heroId} task count`);
  }
  assert.deepEqual(
    annotationSets.filter(({ heroId }) => heroId === 'hanzo').map(({ mapId }) => mapId).sort(),
    ['esperanca', 'nepal', 'new-queen-street']
  );
  assert.deepEqual(
    annotationSets.filter(({ heroId }) => heroId === 'tracer').map(({ mapId }) => mapId),
    ['shambali-monastery']
  );
  assert.ok(readyMaps.every((map) =>
    annotationSets.some(({ mapId, heroId }) => mapId === map.mapId && heroId === 'cassidy')));
  assert.ok(annotationSets.every((set) => readyMaps.some(({ mapId }) => mapId === set.mapId)));
});

test('uses only timestamped evidence sources, new semantics, and valid task metadata', () => {
  const ids = [];
  const productionAudit = readFileSync(
    join(repositoryRoot, 'docs', 'production-prompt-audit-2026-07-22.md'),
    'utf8'
  );
  const oldSemanticIds = [
    'visible-long-sightline', 'visible-corner-cover', 'cover-to-sightline-route',
    'alternate-cover-route', 'visible-elevated-edge', 'visible-scouting-surface',
    'ground-to-elevation-route', 'elevated-reposition-route', 'visible-side-corner',
    'visible-open-crossing-edge', 'side-lane-route', 'cover-chain-route'
  ];
  const blindGenericWording = /(?:good angle|good flank|select as cover|visible side lane|visibly open sightline)/i;
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
      assert.ok(source && typeof source === 'object');
      assert.equal(typeof source.label, 'string');
      assert.equal(typeof source.detail, 'string');
      assert.equal(typeof source.url, 'string');
      assert.match(source.url, /^(?:https:\/\/(?:www\.)?youtube\.com\/watch\?v=[A-Za-z0-9_-]+&t=\d+(?:\.\d+)?s|https:\/\/(?:www\.)?reddit\.com\/)/);
      if (source.url.includes('youtube.com/')) assert.match(source.url, /&t=\d+(?:\.\d+)?s$/);
      assert.doesNotMatch(prompt, blindGenericWording);
      assert.ok(!oldSemanticIds.some((semanticId) => id.endsWith(`.${semanticId}`)));
      assert.ok(metadata.kind === 'point' || metadata.kind === 'route');
      assert.equal(metadata.minPoints, metadata.kind === 'route' ? 2 : 1);
      assert.ok(productionAudit.includes(`| \`${id}\` |`), `${id} missing from production audit`);
    }
  }
  assert.equal(ids.length, 25);
  assert.equal(new Set(ids).size, 25);
  assert.equal(ids.filter((id) => id.includes('.cassidy.')).length, 17);
  assert.equal(ids.filter((id) => id.includes('.hanzo.')).length, 5);
  assert.equal(ids.filter((id) => id.includes('.tracer.')).length, 3);
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
