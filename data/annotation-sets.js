(function (root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AnnotationSets = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  const mapPool = [
    ['antarctic-peninsula', 'Antarctic Peninsula', 'control', 'pending'],
    ['busan', 'Busan', 'control', 'ready'],
    ['ilios', 'Ilios', 'control', 'ready'],
    ['lijiang-tower', 'Lijiang Tower', 'control', 'ready'],
    ['nepal', 'Nepal', 'control', 'ready'],
    ['oasis', 'Oasis', 'control', 'ready'],
    ['samoa', 'Samoa', 'control', 'ready'],
    ['circuit-royal', 'Circuit Royal', 'escort', 'pending'],
    ['dorado', 'Dorado', 'escort', 'ready'],
    ['havana', 'Havana', 'escort', 'ready'],
    ['junkertown', 'Junkertown', 'escort', 'pending'],
    ['rialto', 'Rialto', 'escort', 'pending'],
    ['route-66', 'Route 66', 'escort', 'pending'],
    ['shambali-monastery', 'Shambali Monastery', 'escort', 'ready'],
    ['watchpoint-gibraltar', 'Watchpoint: Gibraltar', 'escort', 'pending'],
    ['aatlis', 'Aatlis', 'flashpoint', 'pending'],
    ['new-junk-city', 'New Junk City', 'flashpoint', 'pending'],
    ['suravasa', 'Suravasa', 'flashpoint', 'ready'],
    ['blizzard-world', 'Blizzard World', 'hybrid', 'pending'],
    ['eichenwalde', 'Eichenwalde', 'hybrid', 'pending'],
    ['hollywood', 'Hollywood', 'hybrid', 'pending'],
    ['kings-row', "King's Row", 'hybrid', 'ready'],
    ['midtown', 'Midtown', 'hybrid', 'ready'],
    ['neon-junction', 'Neon Junction', 'hybrid', 'pending'],
    ['numbani', 'Numbani', 'hybrid', 'ready'],
    ['paraiso', 'Paraíso', 'hybrid', 'pending'],
    ['colosseo', 'Colosseo', 'push', 'ready'],
    ['esperanca', 'Esperança', 'push', 'ready'],
    ['new-queen-street', 'New Queen Street', 'push', 'ready'],
    ['runasapi', 'Runasapi', 'push', 'ready']
  ].map(([mapId, mapName, modeId, imageryStatus]) => ({
    mapId, mapName, modeId, imageryStatus
  }));

  const readyMaps = mapPool.filter(({ imageryStatus }) => imageryStatus === 'ready');
  const pendingMaps = mapPool.filter(({ imageryStatus }) => imageryStatus === 'pending');

  const heroes = [
    ['cassidy', 'Cassidy', [
      ['visible-long-sightline', 'Click a location on {map} where Cassidy could use a long, visibly unobstructed sightline.', 'point'],
      ['visible-corner-cover', 'Click a visible corner on {map} that a Cassidy player could select as cover.', 'point'],
      ['cover-to-sightline-route', 'Trace a route on {map} for Cassidy from visible cover to a visibly open sightline.', 'route'],
      ['alternate-cover-route', 'Trace an alternate Cassidy route on {map} between two visible pieces of cover.', 'route']
    ]],
    ['hanzo', 'Hanzo', [
      ['visible-elevated-edge', 'Click a visibly elevated ledge or platform on {map} that a Hanzo player could select.', 'point'],
      ['visible-scouting-surface', 'Click a visible wall or floor area on {map} that Hanzo could select for a scouting shot.', 'point'],
      ['ground-to-elevation-route', 'Trace a Hanzo route on {map} from visible ground level toward a visible elevated area.', 'route'],
      ['elevated-reposition-route', 'Trace a Hanzo repositioning route on {map} between visibly connected elevated areas.', 'route']
    ]],
    ['tracer', 'Tracer', [
      ['visible-side-corner', 'Click a visible side-lane corner on {map} that a Tracer player could select for staging.', 'point'],
      ['visible-open-crossing-edge', 'Click the edge of a visible open crossing on {map} that Tracer could select before crossing.', 'point'],
      ['side-lane-route', 'Trace a Tracer route on {map} through a visibly connected side lane.', 'route'],
      ['cover-chain-route', 'Trace a Tracer route on {map} between at least two visible pieces of cover.', 'route']
    ]]
  ];

  const titleCase = (value) => value.replace(/(^|-)([a-z])/g, (_, prefix, letter) =>
    `${prefix ? ' ' : ''}${letter.toUpperCase()}`);

  const annotationSets = readyMaps.flatMap(({ mapId, mapName, modeId }) =>
    heroes.map(([heroId, heroName, prompts]) => ({
      mapId,
      mapVersion: '2026-07-22-r2',
      mapName,
      mapImage: `./maps/${mapId}-2026-07-22-r2.webp`,
      heroId,
      heroName,
      modeId,
      modeName: titleCase(modeId),
      tasks: prompts.map(([semanticId, prompt, kind]) => [
        `${modeId}.${mapId}.${heroId}.${semanticId}`,
        prompt.replace('{map}', mapName),
        null,
        { kind, minPoints: kind === 'route' ? 2 : 1 }
      ])
    }))
  );

  return { mapPool, readyMaps, pendingMaps, annotationSets };
});
