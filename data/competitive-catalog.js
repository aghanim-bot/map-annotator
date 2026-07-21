(function (root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.CompetitiveCatalog = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  const SOURCE_RETRIEVAL_CUTOFF = '2026-07-21';
  const MAP_SOURCE_URL_PREFIX = 'https://overwatch.fandom.com/wiki/';
  const NO_POSITION_CLAIM_NOTE =
    'This task requests human selection and encodes no position claim.';

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    for (const child of Object.values(value)) deepFreeze(child);
    return Object.freeze(value);
  }

  function slug(value) {
    return value
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function mapSourceUrl(mapName) {
    const wikiTitle = encodeURIComponent(mapName.replace(/ /g, '_')).replace(/'/g, '%27');
    return `${MAP_SOURCE_URL_PREFIX}${wikiTitle}`;
  }

  const HERO_DEFINITIONS = [
    {
      id: 'cassidy',
      name: 'Cassidy',
      officialUrl: 'https://overwatch.blizzard.com/en-us/heroes/cassidy/',
      tasks: [
        ['covered-firing-position', 'point', 'a covered firing position'],
        ['short-main-to-side-rotation', 'route', 'a short main-to-side rotation'],
        ['fallback-corner', 'point', 'a fallback corner']
      ]
    },
    {
      id: 'hanzo',
      name: 'Hanzo',
      officialUrl: 'https://overwatch.blizzard.com/en-us/heroes/hanzo/',
      tasks: [
        ['wall-climb-accessible-perch', 'point', 'a wall-climb-accessible perch'],
        ['sonic-arrow-scouting-surface', 'point', 'a Sonic Arrow scouting surface'],
        ['retreat-route', 'route', 'a retreat route']
      ]
    },
    {
      id: 'tracer',
      name: 'Tracer',
      officialUrl: 'https://overwatch.blizzard.com/en-us/heroes/tracer/',
      tasks: [
        ['flank-to-staging-route', 'route', 'a flank-to-staging route'],
        ['staging-corner', 'point', 'a staging corner'],
        ['exit-route-toward-health-pack-area', 'route', 'an exit route toward a health-pack area']
      ]
    }
  ];

  const CONTROL_MAPS = {
    'Antarctic Peninsula': ['Icebreaker', 'Labs', 'Sublevel'],
    Busan: ['Downtown', 'MEKA Base', 'Sanctuary'],
    Ilios: ['Lighthouse', 'Ruins', 'Well'],
    'Lijiang Tower': ['Control Center', 'Garden', 'Night Market'],
    Nepal: ['Sanctum', 'Shrine', 'Village'],
    Oasis: ['City Center', 'Gardens', 'University'],
    Samoa: ['Beach', 'Downtown', 'Volcano']
  };

  const ESCORT_MAPS = [
    'Circuit Royal',
    'Dorado',
    'Havana',
    'Junkertown',
    'Rialto',
    'Route 66',
    'Shambali Monastery',
    'Watchpoint: Gibraltar'
  ];

  const FLASHPOINT_MAPS = {
    Aatlis: ['Station', 'Garden', 'Town Center', 'Bazaar', 'Resort'],
    'New Junk City': ['Arena', 'The Ducts', 'Refinery', 'Junkyard', 'Bomb Flats'],
    Suravasa: ['Market', 'Garden', 'Palace', 'Temple', 'Ruins']
  };

  const HYBRID_MAPS = [
    'Blizzard World',
    'Eichenwalde',
    'Hollywood',
    "King's Row",
    'Midtown',
    'Neon Junction',
    'Numbani',
    'Paraíso'
  ];

  const PUSH_MAPS = ['Colosseo', 'Esperança', 'New Queen Street', 'Runasapi'];
  const ESCORT_PHASES = [
    'attack-checkpoint-1',
    'attack-checkpoint-2',
    'attack-checkpoint-3',
    'defense-checkpoint-1',
    'defense-checkpoint-2',
    'defense-checkpoint-3'
  ];
  const HYBRID_PHASES = [
    'attack-point-a',
    'defense-point-a',
    'attack-checkpoint-1',
    'attack-checkpoint-2',
    'defense-checkpoint-1',
    'defense-checkpoint-2'
  ];
  const PUSH_PHASES = [
    'neutral-opening',
    'side-a-before-forward-spawn',
    'side-a-after-forward-spawn',
    'side-b-before-forward-spawn',
    'side-b-after-forward-spawn'
  ];

  function evidenceFor(hero, mapUrl) {
    return {
      type: 'textual',
      status: 'unverified-collection-prompt',
      claimSupport: 'none',
      heroUrl: hero.officialUrl,
      mapUrl,
      sourceRetrievalCutoff: SOURCE_RETRIEVAL_CUTOFF,
      note: NO_POSITION_CLAIM_NOTE
    };
  }

  function generateTasks(modeId, mapId, mapName, phaseId, phaseName, mapUrl) {
    const context = `${mapName} — ${phaseName}`;
    return deepFreeze(HERO_DEFINITIONS.flatMap((hero) =>
      hero.tasks.map(([taskKind, annotationKind, target]) => ({
        id: `${modeId}.${mapId}.${phaseId}.${hero.id}.${taskKind}`,
        heroId: hero.id,
        heroName: hero.name,
        kind: annotationKind,
        taskKind,
        prompt: `For ${context}, select ${target}.`,
        evidence: evidenceFor(hero, mapUrl)
      }))
    ));
  }

  function generateMap(modeId, mapName, phases) {
    const mapId = slug(mapName);
    const sourceUrl = mapSourceUrl(mapName);
    return deepFreeze({
      id: mapId,
      name: mapName,
      modeId,
      sourceUrl,
      phases: phases.map((phaseName) => {
        const phaseId = slug(phaseName);
        return {
          id: phaseId,
          name: phaseName,
          tasks: generateTasks(modeId, mapId, mapName, phaseId, phaseName, sourceUrl)
        };
      })
    });
  }

  function generateCatalog() {
    const modes = [
      {
        id: 'control',
        name: 'Control',
        maps: Object.entries(CONTROL_MAPS).map(([name, phases]) =>
          generateMap('control', name, phases)
        )
      },
      {
        id: 'escort',
        name: 'Escort',
        maps: ESCORT_MAPS.map((name) => generateMap('escort', name, ESCORT_PHASES))
      },
      {
        id: 'flashpoint',
        name: 'Flashpoint',
        maps: Object.entries(FLASHPOINT_MAPS).map(([name, phases]) =>
          generateMap('flashpoint', name, phases)
        )
      },
      {
        id: 'hybrid',
        name: 'Hybrid',
        maps: HYBRID_MAPS.map((name) => generateMap('hybrid', name, HYBRID_PHASES))
      },
      {
        id: 'push',
        name: 'Push',
        maps: PUSH_MAPS.map((name) => generateMap('push', name, PUSH_PHASES))
      }
    ];

    return deepFreeze({
      id: 'competitive-role-queue-5v5-2026-07-21',
      name: 'Competitive Role Queue 5v5',
      sourceRetrievalCutoff: SOURCE_RETRIEVAL_CUTOFF,
      heroes: HERO_DEFINITIONS.map(({ id, name, officialUrl }) => ({ id, name, officialUrl })),
      modes
    });
  }

  function validateCatalog(catalog) {
    const errors = [];
    const ids = new Set();
    const allowedKinds = new Set(['point', 'route']);
    const addId = (id) => {
      if (ids.has(id)) errors.push(`Duplicate semantic ID: ${id}`);
      ids.add(id);
    };

    for (const mode of catalog.modes || []) {
      for (const map of mode.maps || []) {
        const expectedMapUrl = mapSourceUrl(map.name || '');
        if (map.sourceUrl !== expectedMapUrl || !map.sourceUrl.startsWith(MAP_SOURCE_URL_PREFIX)) {
          errors.push(`Invalid map source URL: ${map.id || map.name || 'unknown map'}`);
        }
        for (const phase of map.phases || []) {
          for (const task of phase.tasks || []) {
            addId(task.id);
            if (!allowedKinds.has(task.kind)) errors.push(`Invalid task kind: ${task.id}`);
            if (!task.evidence || !['textual', 'mixed'].includes(task.evidence.type)) {
              errors.push(`Invalid evidence type: ${task.id}`);
            }
            if (task.evidence?.status !== 'unverified-collection-prompt') {
              errors.push(`Invalid evidence status: ${task.id}`);
            }
            if (task.evidence?.claimSupport !== 'none') {
              errors.push(`Invalid evidence claim support: ${task.id}`);
            }
            if (task.evidence?.sourceRetrievalCutoff !== SOURCE_RETRIEVAL_CUTOFF) {
              errors.push(`Invalid evidence cutoff: ${task.id}`);
            }
            if (task.evidence?.mapUrl !== map.sourceUrl ||
                !task.evidence?.mapUrl?.startsWith(MAP_SOURCE_URL_PREFIX)) {
              errors.push(`Invalid evidence map URL: ${task.id}`);
            }
            if (!/^https:\/\/overwatch\.blizzard\.com\/en-us\/heroes\/[a-z0-9-]+\/$/.test(
              task.evidence?.heroUrl || ''
            )) {
              errors.push(`Invalid evidence hero URL: ${task.id}`);
            }
            if ('coordinates' in task || 'points' in task || 'x' in task || 'y' in task) {
              errors.push(`Task contains coordinates: ${task.id}`);
            }
          }
        }
      }
    }
    return deepFreeze({ valid: errors.length === 0, errors });
  }

  const catalog = generateCatalog();

  return deepFreeze({
    SOURCE_RETRIEVAL_CUTOFF,
    catalog,
    deepFreeze,
    generateCatalog,
    generateMap,
    generateTasks,
    mapSourceUrl,
    slug,
    validateCatalog
  });
});
