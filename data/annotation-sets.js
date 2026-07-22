(function (root, factory) {
  'use strict';

  const auditedTasks = typeof module === 'object' && module.exports
    ? require('./audited-tasks.js')
    : root && root.AuditedTasks;
  const api = factory(auditedTasks);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AnnotationSets = api;
})(typeof globalThis === 'object' ? globalThis : this, function (auditedTasks) {
  'use strict';

  if (!auditedTasks) throw new Error('AuditedTasks must be loaded before annotation-sets.js');

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
  const heroNames = { cassidy: 'Cassidy', hanzo: 'Hanzo', tracer: 'Tracer' };
  const titleCase = (value) => value.replace(/(^|-)([a-z])/g, (_, prefix, letter) =>
    `${prefix ? ' ' : ''}${letter.toUpperCase()}`);

  const annotationSets = readyMaps.flatMap(({ mapId, mapName, modeId }) =>
    Object.entries(heroNames).map(([heroId, heroName]) => ({
      mapId,
      mapVersion: '2026-07-22-r2',
      mapName,
      mapImage: `./maps/${mapId}-2026-07-22-r2.webp`,
      heroId,
      heroName,
      modeId,
      modeName: titleCase(modeId),
      tasks: auditedTasks[`${mapId}:${heroId}`]
    }))
  );

  return { mapPool, readyMaps, pendingMaps, auditedTasks, annotationSets };
});
