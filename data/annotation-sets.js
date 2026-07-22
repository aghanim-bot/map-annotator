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

  const youtube = (videoId, seconds, detail) => ({
    label: 'YouTube',
    detail,
    url: `https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`
  });
  const point = { kind: 'point', minPoints: 1 };
  const route = { kind: 'route', minPoints: 2 };

  // Every row below is backed by a PASS or NARROW visual finding in docs/.
  const auditedTasks = {
    'busan:cassidy': [[
      'control.busan.cassidy.meka-base-raised-ring-5749',
      'On Busan: MEKA Base, click the raised interior ring/walkway beside the central pillar where Cassidy looks over the lower objective-side lane.',
      youtube('z4G6Svb1eRM', '5749.28', 'Top 500 Cassidy Coaching · uploaded 2025-09-12 · visual audit 2026-07-21 · 1:35:49.28'), point
    ]],
    'ilios:cassidy': [[
      'control.ilios.cassidy.lighthouse-pillar-room-3431',
      'On Ilios: Lighthouse, click the compact ground-floor room with the central pillar and two exterior openings identified for Cassidy.',
      youtube('z4G6Svb1eRM', '3431.44', 'Top 500 Cassidy Coaching · uploaded 2025-09-12 · visual audit 2026-07-21 · 57:11.44'), point
    ]],
    'lijiang-tower:cassidy': [[
      'control.lijiang-tower.cassidy.garden-curved-bridge-9413',
      'On Lijiang Tower: Garden, click the curved bridge position where Cassidy aims toward the circular gate and adjacent courtyard.',
      youtube('EYlDMi5BOtM', '9413.76', 'GM Cassidy Coaching · visual audit 2026-07-21 · 2:36:53.76'), point
    ]],
    'nepal:cassidy': [[
      'control.nepal.cassidy.village-wooden-bridge-2000',
      'On Nepal: Village, click the wooden-railed bridge position where Cassidy looks across the central red-building lane.',
      youtube('Gh4Mwp-jxcU', '2000.44', 'Coach fully explains 3 GM Cassidy Wins · visual audit 2026-07-21 · 33:20.44'), point
    ]],
    'oasis:cassidy': [[
      'control.oasis.cassidy.gardens-blue-arched-doorway-9307',
      'On Oasis: Gardens, click the blue-lit interior arched doorway where Cassidy fires toward the objective-side exterior.',
      youtube('TZCgTBOMESs', '9307.92', 'GM Cassidy Coaching · visual audit 2026-07-21 · 2:35:07.92'), point
    ]],
    'samoa:cassidy': [[
      'control.samoa.cassidy.volcano-blue-hallway-3754',
      'On Samoa: Volcano, click the blue-lit interior hallway position where Cassidy angles through the point-side opening.',
      youtube('CrcdZyqoDkc', '3754.88', 'Top 500 Cassidy Coaching · uploaded 2026-01-31 · visual audit 2026-07-21 · 1:02:34.88'), point
    ]],
    'dorado:cassidy': [[
      'escort.dorado.cassidy.covered-bridge-overlook-6763',
      'On Dorado, click the covered elevated bridge position with rectangular openings overlooking the payload street for Cassidy.',
      youtube('L2vOzXuMsFc', '6763.679', 'GM Cassidy Coaching · visual audit 2026-07-21 · 1:52:43.679'), point
    ]],
    'havana:cassidy': [[
      'escort.havana.cassidy.green-trimmed-upper-window-5058',
      'On Havana, click the unbarred green-trimmed upper window where Cassidy faces the mural and payload street.',
      youtube('L2vOzXuMsFc', '5058.4', 'GM Cassidy Coaching · visual audit 2026-07-21 · 1:24:18.4'), point
    ]],
    'shambali-monastery:cassidy': [[
      'escort.shambali-monastery.cassidy.tower-elevated-opening-2180',
      'On Shambali Monastery, click the tower-side elevated opening/ledge identified as Cassidy\'s atomic angle over the lower roofs and road.',
      youtube('I-YOtByLoUw', '2180.88', 'Top 500 Cassidy Coaching w/ Arc · uploaded 2025-10-24 · visual audit 2026-07-21 · 36:20.88'), point
    ]],
    'suravasa:cassidy': [[
      'flashpoint.suravasa.cassidy.purple-trimmed-arched-opening-10132',
      'On Suravasa, click the sheltered purple-trimmed interior arched opening where Cassidy aims into the sunlit exterior lane.',
      youtube('qUFgnR8il4Q', '10132.16', 'Top 500 Cassidy Coaching · uploaded 2025-11-24 · visual audit 2026-07-21 · 2:48:52.16'), point
    ]],
    'kings-row:cassidy': [[
      'hybrid.kings-row.cassidy.red-walled-stair-upper-opening-2357',
      "On King's Row, click the upper opening reached by Cassidy through the right-side red-walled doorway and its staircase.",
      youtube('L2vOzXuMsFc', '2357.359', 'GM Cassidy Coaching · visual audit 2026-07-21 · 39:17.359'), point
    ]],
    'midtown:cassidy': [[
      'hybrid.midtown.cassidy.green-lit-utility-room-9952',
      'On Midtown, click the utility room entered from the sidewalk through the green-lit side doorway beside the taxi for Cassidy.',
      youtube('L2vOzXuMsFc', '9952.8', 'GM Cassidy Coaching · visual audit 2026-07-21 · 2:45:52.8'), point
    ]],
    'numbani:cassidy': [[
      'hybrid.numbani.cassidy.axiom-blue-doorframe-447',
      'On Numbani, click the recessed blue-interior AXIOM doorframe where Cassidy sights down the payload street.',
      youtube('L2vOzXuMsFc', '447.52', 'GM Cassidy Coaching · visual audit 2026-07-21 · 7:27.52'), point
    ]],
    'colosseo:cassidy': [[
      'push.colosseo.cassidy.blue-lit-window-main-street-931',
      'On Colosseo, click the blue-lit rectangular window where Cassidy looks onto the curved main street.',
      youtube('EYlDMi5BOtM', '931.839', 'GM Cassidy Coaching · visual audit 2026-07-21 · 15:31.839'), point
    ]],
    'esperanca:cassidy': [[
      'push.esperanca.cassidy.arch-side-bridge-terrace-1016',
      'On Esperança, click the elevated stone bridge/terrace beside the large arch where Cassidy looks down onto the robot lane.',
      youtube('Gyp2fLNBgUs', '1016.92', 'Coach fully explains 3 T500 Cassidy Wins · visual audit 2026-07-21 · 16:56.92'), point
    ]],
    'new-queen-street:cassidy': [[
      'push.new-queen-street.cassidy.bus-side-elevated-facade-1448',
      'On New Queen Street, click the elevated facade/ledge marked above the bus-side curved street for Cassidy.',
      youtube('CrcdZyqoDkc', '1448.32', 'Top 500 Cassidy Coaching · uploaded 2026-01-31 · visual audit 2026-07-21 · 24:08.32'), point
    ]],
    'runasapi:cassidy': [[
      'push.runasapi.cassidy.moda-textil-side-doorway-12570',
      'On Runasapi, click the MODA TEXTIL side-room doorway that the Cassidy source specifically says not to use as this flank.',
      youtube('EYlDMi5BOtM', '12570.319', 'GM Cassidy Coaching · visual audit 2026-07-21 · 3:29:30.319'), point
    ]],

    'nepal:hanzo': [[
      'control.nepal.hanzo.shrine-temple-steps-lane-2678',
      'On Nepal: Shrine, click the stone-step position beside the red temple wall where Hanzo looks toward the snowy lane.',
      youtube('ZFjzANTx17U', '2678.4', 'Hanzo Educational Unranked To Champion · visual audit 2026-07-21 · 44:38.4'), point
    ]],
    'esperanca:hanzo': [[
      'push.esperanca.hanzo.red-facade-street-corner-4333',
      'On Esperança, click the outside corner of the red facade where Hanzo looks into the adjacent street.',
      youtube('ZFjzANTx17U', '4333.04', 'Hanzo Educational Unranked To Champion · visual audit 2026-07-21 · 1:12:13.04'), point
    ], [
      'push.esperanca.hanzo.stone-terrace-road-sightline-4496',
      'On Esperança, click the elevated stone steps/terrace where Hanzo looks down the roadway.',
      youtube('ZFjzANTx17U', '4496.08', 'Hanzo Educational Unranked To Champion · visual audit 2026-07-21 · 1:14:56.08'), point
    ], [
      'push.esperanca.hanzo.interior-stair-landing-4885',
      'On Esperança, click the visible interior stair/landing position identified for Hanzo.',
      youtube('ZFjzANTx17U', '4885.199', 'Hanzo Educational Unranked To Champion · visual audit 2026-07-21 · 1:21:25.199'), point
    ]],
    'new-queen-street:hanzo': [[
      'push.new-queen-street.hanzo.curved-parapet-main-lane-6141',
      'On New Queen Street, click the curved elevated parapet where Hanzo overlooks the broad main lane.',
      youtube('ZFjzANTx17U', '6141.36', 'Hanzo Educational Unranked To Champion · visual audit 2026-07-21 · 1:42:21.36'), point
    ]],

    'shambali-monastery:tracer': [[
      'escort.shambali-monastery.tracer.rock-wall-window-angle-1324',
      'On Shambali Monastery, click the narrow irregular rock-wall opening above the lower cobbled passage where Tracer looks toward the red-lit doorway.',
      youtube('PrG4IvMNOYI', '1324.73', 'SHAMBALI MAP GUIDE (for noobs or pros!) · uploaded 2023-02-10 · visual audit 2026-07-21 · 22:04.73'), point
    ], [
      'escort.shambali-monastery.tracer.snow-road-to-upper-balcony-route-116',
      'On Shambali Monastery, trace the shown Tracer route from the snowy road beside the red building, around its back side, through the rear doorway and interior stairs, to the upper red room/balcony.',
      youtube('PrG4IvMNOYI', '116.64', 'SHAMBALI MAP GUIDE (for noobs or pros!) · uploaded 2023-02-10 · visual audit 2026-07-21 · 1:56.64'), route
    ], [
      'escort.shambali-monastery.tracer.green-room-to-mini-pack-route-1443',
      'On Shambali Monastery, trace the shown Tracer route from the green interior doorway beside the rail track, along the track-side edge into the lower stone passage, to the glowing blue mini health pack on the far stone ledge.',
      youtube('PrG4IvMNOYI', '1443.77', 'SHAMBALI MAP GUIDE (for noobs or pros!) · uploaded 2023-02-10 · visual audit 2026-07-21 · 24:03.77'), route
    ]]
  };

  const heroNames = { cassidy: 'Cassidy', hanzo: 'Hanzo', tracer: 'Tracer' };
  const titleCase = (value) => value.replace(/(^|-)([a-z])/g, (_, prefix, letter) =>
    `${prefix ? ' ' : ''}${letter.toUpperCase()}`);

  const annotationSets = readyMaps.flatMap(({ mapId, mapName, modeId }) =>
    Object.entries(heroNames).flatMap(([heroId, heroName]) => {
      const tasks = auditedTasks[`${mapId}:${heroId}`];
      if (!tasks) return [];
      return [{
        mapId,
        mapVersion: '2026-07-22-r2',
        mapName,
        mapImage: `./maps/${mapId}-2026-07-22-r2.webp`,
        heroId,
        heroName,
        modeId,
        modeName: titleCase(modeId),
        tasks
      }];
    })
  );

  return { mapPool, readyMaps, pendingMaps, annotationSets };
});
