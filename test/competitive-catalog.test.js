'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const api = require('../data/competitive-catalog.js');
const { catalog } = api;

const expectedMaps = {
  control: [
    'Antarctic Peninsula', 'Busan', 'Ilios', 'Lijiang Tower', 'Nepal', 'Oasis', 'Samoa'
  ],
  escort: [
    'Circuit Royal', 'Dorado', 'Havana', 'Junkertown', 'Rialto', 'Route 66',
    'Shambali Monastery', 'Watchpoint: Gibraltar'
  ],
  flashpoint: ['Aatlis', 'New Junk City', 'Suravasa'],
  hybrid: [
    'Blizzard World', 'Eichenwalde', 'Hollywood', "King's Row", 'Midtown',
    'Neon Junction', 'Numbani', 'Paraíso'
  ],
  push: ['Colosseo', 'Esperança', 'New Queen Street', 'Runasapi']
};

const controlPhases = {
  'Antarctic Peninsula': ['Icebreaker', 'Labs', 'Sublevel'],
  Busan: ['Downtown', 'MEKA Base', 'Sanctuary'],
  Ilios: ['Lighthouse', 'Ruins', 'Well'],
  'Lijiang Tower': ['Control Center', 'Garden', 'Night Market'],
  Nepal: ['Sanctum', 'Shrine', 'Village'],
  Oasis: ['City Center', 'Gardens', 'University'],
  Samoa: ['Beach', 'Downtown', 'Volcano']
};

const sharedPhases = {
  escort: [
    'attack-checkpoint-1', 'attack-checkpoint-2', 'attack-checkpoint-3',
    'defense-checkpoint-1', 'defense-checkpoint-2', 'defense-checkpoint-3'
  ],
  hybrid: [
    'attack-point-a', 'defense-point-a', 'attack-checkpoint-1',
    'attack-checkpoint-2', 'defense-checkpoint-1', 'defense-checkpoint-2'
  ],
  push: [
    'neutral-opening', 'side-a-before-forward-spawn', 'side-a-after-forward-spawn',
    'side-b-before-forward-spawn', 'side-b-after-forward-spawn'
  ]
};

const flashpointPhases = {
  Aatlis: ['Station', 'Garden', 'Town Center', 'Bazaar', 'Resort'],
  'New Junk City': ['Arena', 'The Ducts', 'Refinery', 'Junkyard', 'Bomb Flats'],
  Suravasa: ['Market', 'Garden', 'Palace', 'Temple', 'Ruins']
};

const modes = catalog.modes;
const maps = modes.flatMap((mode) => mode.maps);
const phases = maps.flatMap((map) => map.phases);
const tasks = phases.flatMap((phase) => phase.tasks);

test('exports the dated catalog to CommonJS and a browser global', () => {
  assert.equal(api.SOURCE_RETRIEVAL_CUTOFF, '2026-07-21');
  assert.equal(catalog.id, 'competitive-role-queue-5v5-2026-07-21');

  const source = readFileSync(join(__dirname, '..', 'data', 'competitive-catalog.js'), 'utf8');
  const context = vm.createContext({});
  vm.runInContext(source, context);
  assert.equal(context.CompetitiveCatalog.catalog.id, catalog.id);
});

test('contains exactly the scoped modes, maps, phases, heroes, and tasks', () => {
  assert.deepEqual(modes.map(({ id }) => id), ['control', 'escort', 'flashpoint', 'hybrid', 'push']);
  assert.equal(maps.length, 30);
  assert.equal(phases.length, 152);
  assert.equal(tasks.length, 1368);
  assert.deepEqual(catalog.heroes.map(({ name }) => name), ['Cassidy', 'Hanzo', 'Tracer']);

  for (const mode of modes) {
    assert.deepEqual(mode.maps.map(({ name }) => name), expectedMaps[mode.id]);
  }
  assert.deepEqual(
    Object.fromEntries(modes.map((mode) => [mode.id, mode.maps.length])),
    { control: 7, escort: 8, flashpoint: 3, hybrid: 8, push: 4 }
  );
  assert.deepEqual(
    Object.fromEntries(modes.map((mode) => [
      mode.id,
      mode.maps.reduce((count, map) => count + map.phases.length, 0)
    ])),
    { control: 21, escort: 48, flashpoint: 15, hybrid: 48, push: 20 }
  );
});

test('uses every exact canonical or stable neutral phase name', () => {
  for (const map of modes.find(({ id }) => id === 'control').maps) {
    assert.deepEqual(map.phases.map(({ name }) => name), controlPhases[map.name]);
  }
  for (const map of modes.find(({ id }) => id === 'flashpoint').maps) {
    assert.deepEqual(map.phases.map(({ name }) => name), flashpointPhases[map.name]);
  }
  for (const modeId of ['escort', 'hybrid', 'push']) {
    for (const map of modes.find(({ id }) => id === modeId).maps) {
      assert.deepEqual(map.phases.map(({ name }) => name), sharedPhases[modeId]);
      assert.deepEqual(map.phases.map(({ id }) => id), sharedPhases[modeId]);
    }
  }
  assert.doesNotMatch(JSON.stringify(sharedPhases.push), /north|south|red|blue/i);
});

test('generates three normalized open-ended tasks for each hero in every phase', () => {
  const expectedKinds = {
    cassidy: ['covered-firing-position', 'short-main-to-side-rotation', 'fallback-corner'],
    hanzo: ['wall-climb-accessible-perch', 'sonic-arrow-scouting-surface', 'retreat-route'],
    tracer: ['flank-to-staging-route', 'staging-corner', 'exit-route-toward-health-pack-area']
  };

  for (const phase of phases) {
    assert.equal(phase.tasks.length, 9);
    for (const [heroId, kinds] of Object.entries(expectedKinds)) {
      const heroTasks = phase.tasks.filter((task) => task.heroId === heroId);
      assert.equal(heroTasks.length, 3);
      assert.deepEqual(heroTasks.map(({ taskKind }) => taskKind), kinds);
      assert.ok(heroTasks.every(({ prompt }) => prompt.startsWith('For ') && prompt.includes(', select ')));
    }
  }
  assert.ok(tasks.every(({ kind }) => kind === 'point' || kind === 'route'));
});

test('uses globally unique stable semantic task IDs', () => {
  const ids = tasks.map(({ id }) => id);
  assert.equal(new Set(ids).size, 1368);
  for (const id of ids) {
    assert.match(id, /^(control|escort|flashpoint|hybrid|push)\.[a-z0-9-]+\.[a-z0-9-]+\.(cassidy|hanzo|tracer)\.[a-z0-9-]+$/);
  }
});

test('attaches complete evidence metadata without coordinate claims', () => {
  assert.equal(new Set(maps.map(({ sourceUrl }) => sourceUrl)).size, 30);
  for (const map of maps) {
    assert.match(map.sourceUrl, /^https:\/\/overwatch\.fandom\.com\/wiki\/.+/);
    for (const task of map.phases.flatMap((phase) => phase.tasks)) {
      assert.ok(task.evidence.type === 'textual' || task.evidence.type === 'mixed');
      assert.equal(task.evidence.status, 'unverified-collection-prompt');
      assert.equal(task.evidence.claimSupport, 'none');
      assert.match(task.evidence.heroUrl, /^https:\/\/overwatch\.blizzard\.com\/en-us\/heroes\//);
      assert.equal(task.evidence.mapUrl, map.sourceUrl);
      assert.match(task.evidence.mapUrl, /^https:\/\/overwatch\.fandom\.com\/wiki\/.+/);
      assert.equal(task.evidence.sourceRetrievalCutoff, '2026-07-21');
      assert.equal(
        task.evidence.note,
        'This task requests human selection and encodes no position claim.'
      );
      for (const key of ['coordinates', 'points', 'x', 'y', 'latitude', 'longitude']) {
        assert.equal(key in task, false);
      }
      assert.doesNotMatch(JSON.stringify(task), /"(?:x|y)"\s*:/);
    }
  }
  assert.equal(
    maps.find(({ name }) => name === "King's Row").sourceUrl,
    'https://overwatch.fandom.com/wiki/King%27s_Row'
  );
  assert.equal(
    maps.find(({ name }) => name === 'Watchpoint: Gibraltar').sourceUrl,
    'https://overwatch.fandom.com/wiki/Watchpoint%3A_Gibraltar'
  );
  assert.equal(
    maps.find(({ name }) => name === 'Paraíso').sourceUrl,
    'https://overwatch.fandom.com/wiki/Para%C3%ADso'
  );
});

test('catalog data and generator results are deeply immutable without shared mutation', () => {
  assert.ok(Object.isFrozen(api));
  assert.ok(Object.isFrozen(catalog));
  assert.ok(Object.isFrozen(catalog.heroes));
  assert.ok(Object.isFrozen(modes[0].maps[0].phases[0].tasks[0].evidence));

  const regenerated = api.generateCatalog();
  assert.notStrictEqual(regenerated, catalog);
  assert.notStrictEqual(regenerated.modes, catalog.modes);
  assert.notStrictEqual(regenerated.modes[0].maps[0], catalog.modes[0].maps[0]);
  assert.notStrictEqual(
    regenerated.modes[0].maps[0].phases[0].tasks[0].evidence,
    catalog.modes[0].maps[0].phases[0].tasks[0].evidence
  );
  assert.throws(() => catalog.modes.push({}), TypeError);
  assert.throws(() => { catalog.modes[0].name = 'Changed'; }, TypeError);
  assert.equal(regenerated.modes[0].name, 'Control');
});

test('validator accepts the immutable generated catalog', () => {
  assert.deepEqual(api.validateCatalog(catalog), { valid: true, errors: [] });
});

test('validator rejects evidence presented as audited or supported', () => {
  const audited = structuredClone(catalog);
  audited.modes[0].maps[0].phases[0].tasks[0].evidence.status = 'audited';
  assert.equal(api.validateCatalog(audited).valid, false);

  const supported = structuredClone(catalog);
  supported.modes[0].maps[0].phases[0].tasks[0].evidence.claimSupport = 'supported';
  assert.equal(api.validateCatalog(supported).valid, false);
});

test('validator rejects missing or non-map-specific evidence URLs', () => {
  const invalidMapSource = structuredClone(catalog);
  invalidMapSource.modes[0].maps[0].sourceUrl = 'https://overwatch.fandom.com/wiki/';
  assert.equal(api.validateCatalog(invalidMapSource).valid, false);

  const invalidMapEvidence = structuredClone(catalog);
  delete invalidMapEvidence.modes[0].maps[0].phases[0].tasks[0].evidence.mapUrl;
  assert.equal(api.validateCatalog(invalidMapEvidence).valid, false);

  const invalidHeroEvidence = structuredClone(catalog);
  delete invalidHeroEvidence.modes[0].maps[0].phases[0].tasks[0].evidence.heroUrl;
  assert.equal(api.validateCatalog(invalidHeroEvidence).valid, false);

  const nonSpecificHeroEvidence = structuredClone(catalog);
  nonSpecificHeroEvidence.modes[0].maps[0].phases[0].tasks[0].evidence.heroUrl =
    'https://overwatch.blizzard.com/en-us/heroes/';
  assert.equal(api.validateCatalog(nonSpecificHeroEvidence).valid, false);
});
