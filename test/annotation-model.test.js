'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const model = require('../annotation-model.js');
const appSource = readFileSync(join(__dirname, '..', 'app.js'), 'utf8');

test('parses JSONB annotation rows without losing waypoint order', () => {
  const rows = [
    { task_id: 'point-task', points: [{ x: 0.1, y: 0.2 }] },
    {
      task_id: 'route-task',
      points: [
        { x: 0.25, y: 0.3 },
        { x: 0.7, y: 0.8 }
      ]
    }
  ];

  assert.deepEqual([...model.parseAnnotationRows(rows)], [
    ['point-task', [{ x: 0.1, y: 0.2 }]],
    [
      'route-task',
      [
        { x: 0.25, y: 0.3 },
        { x: 0.7, y: 0.8 }
      ]
    ]
  ]);
});

test('reseeds a route draft created before saved annotations load', () => {
  let routeDrafts = new Map([['route-task', []]]);
  const loadingDrafts = routeDrafts;
  const savedAnnotations = model.parseAnnotationRows([
    {
      task_id: 'route-task',
      points: [
        { x: 0.25, y: 0.3 },
        { x: 0.7, y: 0.8 }
      ]
    }
  ]);

  routeDrafts = model.seedRouteDrafts(savedAnnotations);

  assert.notStrictEqual(routeDrafts, loadingDrafts);
  assert.deepEqual(routeDrafts.get('route-task'), [
    { x: 0.25, y: 0.3 },
    { x: 0.7, y: 0.8 }
  ]);
});

test('builds single-point upsert payloads with a points array', () => {
  const payload = model.buildAnnotationPayload(
    {
      mapId: 'blizzard-world',
      mapVersion: '2025-11-18',
      heroId: 'cassidy',
      modeId: 'attack'
    },
    'a-main-entry',
    [{ x: 0.1, y: 0.2 }],
    '2026-07-21T12:00:00.000Z'
  );

  assert.deepEqual(payload, {
    map_id: 'blizzard-world',
    map_version: '2025-11-18',
    hero_id: 'cassidy',
    mode_id: 'attack',
    task_id: 'a-main-entry',
    points: [{ x: 0.1, y: 0.2 }],
    updated_at: '2026-07-21T12:00:00.000Z'
  });
  assert.equal('x' in payload, false);
  assert.equal('y' in payload, false);
});

test('appends route waypoints in click order and undoes only the last', () => {
  const original = [{ x: 0.1, y: 0.2 }];
  const afterSecondClick = model.appendWaypoint(original, { x: 0.3, y: 0.4 });
  const afterThirdClick = model.appendWaypoint(afterSecondClick, { x: 0.5, y: 0.6 });

  assert.deepEqual(original, [{ x: 0.1, y: 0.2 }]);
  assert.deepEqual(afterThirdClick, [
    { x: 0.1, y: 0.2 },
    { x: 0.3, y: 0.4 },
    { x: 0.5, y: 0.6 }
  ]);
  assert.deepEqual(model.undoLastWaypoint(afterThirdClick), [
    { x: 0.1, y: 0.2 },
    { x: 0.3, y: 0.4 }
  ]);
  assert.deepEqual(model.undoLastWaypoint([]), []);
});

test('requires the configured minimum number of route waypoints', () => {
  assert.equal(model.hasMinimumPoints([], 2), false);
  assert.equal(model.hasMinimumPoints([{ x: 0.1, y: 0.2 }], 2), false);
  assert.equal(
    model.hasMinimumPoints(
      [
        { x: 0.1, y: 0.2 },
        { x: 0.3, y: 0.4 }
      ],
      2
    ),
    true
  );
});

test('generates deterministic SVG polyline coordinates from normalized points', () => {
  assert.equal(
    model.svgPolylinePoints([
      { x: 0.1, y: 0.2 },
      { x: 0.375, y: 0.456789 },
      { x: 1, y: 0 }
    ]),
    '10,20 37.5,45.6789 100,0'
  );
  assert.equal(model.svgPolylinePoints([]), '');
});

test('toggles the SVG route overlay hidden attribute without property reflection', () => {
  const attributes = new Map([['hidden', '']]);
  const routeOverlay = {
    hidden: true,
    hasAttribute: (name) => attributes.has(name),
    removeAttribute: (name) => attributes.delete(name),
    setAttribute: (name, value) => attributes.set(name, String(value))
  };

  model.setRouteOverlayHidden(routeOverlay, false);

  assert.equal(routeOverlay.hasAttribute('hidden'), false);
  assert.equal(routeOverlay.hidden, true, 'the helper must not rely on SVG.hidden reflection');

  model.setRouteOverlayHidden(routeOverlay, true);

  assert.equal(routeOverlay.hasAttribute('hidden'), true);

  const showRouteSource = appSource.match(/function showRoute\(points\) \{[\s\S]*?\n\}/)?.[0];
  assert.ok(showRouteSource, 'showRoute must remain statically inspectable');
  assert.match(
    showRouteSource,
    /setRouteOverlayHidden\(ui\.routeOverlay, points\.length === 0\)/
  );
  assert.match(showRouteSource, /ui\.routeMarkers\.hidden = points\.length === 0/);
  assert.doesNotMatch(showRouteSource, /ui\.routeOverlay\.hidden/);
});

test('defaults existing task metadata to point and honors explicit route metadata', () => {
  assert.deepEqual(model.taskMetadata(['existing-id', 'Prompt', { url: 'source' }]), {
    kind: 'point',
    minPoints: 1
  });
  assert.deepEqual(
    model.taskMetadata([
      'route-id',
      'Trace the route.',
      { url: 'source' },
      { kind: 'route', minPoints: 2 }
    ]),
    { kind: 'route', minPoints: 2 }
  );
});

test('clamps an explicit route minimum to at least two waypoints', () => {
  assert.deepEqual(
    model.taskMetadata([
      'route-id',
      'Trace the route.',
      { url: 'source' },
      { kind: 'route', minPoints: 1 }
    ]),
    { kind: 'route', minPoints: 2 }
  );
});
