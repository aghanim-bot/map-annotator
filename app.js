'use strict';

const {
  appendWaypoint,
  buildAnnotationPayload,
  hasMinimumPoints,
  parseAnnotationRows,
  seedRouteDrafts,
  setRouteOverlayHidden,
  svgPolylinePoints,
  taskMetadata,
  undoLastWaypoint
} = window.AnnotationModel;

const API =
  'https://anycors.sirstoke.me/' +
  'https://postgrest.sirstoke.me/map_annotations';

const TALE_VIDEO = 'https://www.youtube.com/watch?v=CrcdZyqoDkc';
const youtubeSourceAt = (timestamp, seconds) => ({
  label: 'YouTube',
  detail: timestamp,
  url: `${TALE_VIDEO}&t=${seconds}s`
});

// Add another object for each map revision, hero, and mode combination.
const annotationSets = [
  {
    mapId: 'blizzard-world',
    mapVersion: '2025-11-18',
    mapName: 'Blizzard World',
    mapImage: './maps/blizzard-world-2025-11-18.webp',
    heroId: 'cassidy',
    heroName: 'Cassidy',
    modeId: 'attack',
    modeName: 'Attack',
    tasks: [
      ['a-main-entry', 'Click the Point A main choke.', youtubeSourceAt('2:12:53', 7973)],
      [
        'a-left-mega-door',
        'Click the doorway where the bottom-left mega route opens toward the Point A choke.',
        youtubeSourceAt('2:27:45', 8865)
      ],
      [
        'a-left-mega-pack',
        'Click the mega health pack at the top of the bottom-left stairs.',
        youtubeSourceAt('2:13:05', 7985)
      ],
      [
        'a-right-rotation-entry',
        'Click where the right-side rotation leaves the Point A choke.',
        youtubeSourceAt('2:13:54', 8034)
      ],
      [
        'a-right-rotation-route',
        'Trace the right-side rotation from the Point A choke toward the right-side high ground.',
        youtubeSourceAt('2:13:54', 8034),
        { kind: 'route', minPoints: 2 }
      ],
      [
        'a-right-high-ground',
        'Click the right-side high ground above the Point A choke.',
        youtubeSourceAt('2:14:00', 8040)
      ],
      [
        'a-roll-tech-landing',
        'Click the roll-tech landing point on the right-side high ground.',
        youtubeSourceAt('2:14:07', 8047)
      ],
      [
        'a-right-mega-entry',
        'Click the stairs leading down to the right-side mega flank.',
        youtubeSourceAt('2:15:05', 8105)
      ],
      [
        'a-right-mega-exit',
        'Click where the right-side mega flank exits behind Point A.',
        youtubeSourceAt('2:15:08', 8108)
      ]
    ]
  }
];

const ui = {
  map: document.querySelector('#map-select'),
  hero: document.querySelector('#hero-select'),
  mode: document.querySelector('#mode-select'),
  progress: document.querySelector('#progress'),
  prompt: document.querySelector('#task-prompt'),
  source: document.querySelector('#task-source'),
  stage: document.querySelector('#map-stage'),
  image: document.querySelector('#map-image'),
  marker: document.querySelector('#marker'),
  routeOverlay: document.querySelector('#route-overlay'),
  routeLine: document.querySelector('#route-line'),
  routeMarkers: document.querySelector('#route-markers'),
  routeActions: document.querySelector('#route-actions'),
  undoRoute: document.querySelector('#undo-route-button'),
  saveRoute: document.querySelector('#save-route-button'),
  previous: document.querySelector('#previous-button'),
  next: document.querySelector('#next-button'),
  status: document.querySelector('#status')
};

let activeSet;
let taskIndex = 0;
let savedAnnotations = new Map();
let routeDrafts = new Map();
let ready = false;
let busy = false;

const mapKey = (set) => `${set.mapId}:${set.mapVersion}`;

function fillSelect(select, pairs) {
  const oldValue = select.value;
  const options = [...new Map(pairs)].map(([value, label]) => new Option(label, value));
  select.replaceChildren(...options);
  if (options.some((option) => option.value === oldValue)) select.value = oldValue;
}

function setsForMap() {
  return annotationSets.filter((set) => mapKey(set) === ui.map.value);
}

function setsForHero() {
  return setsForMap().filter((set) => set.heroId === ui.hero.value);
}

function fillMaps() {
  fillSelect(
    ui.map,
    annotationSets.map((set) => [mapKey(set), `${set.mapName} · ${set.mapVersion}`])
  );
}

function fillHeroes() {
  fillSelect(
    ui.hero,
    setsForMap().map((set) => [set.heroId, set.heroName])
  );
}

function fillModes() {
  fillSelect(
    ui.mode,
    setsForHero().map((set) => [set.modeId, set.modeName])
  );
}

function selectedSet() {
  return setsForHero().find((set) => set.modeId === ui.mode.value);
}

function setStatus(message, tone = '') {
  ui.status.textContent = message;
  ui.status.dataset.tone = tone;
}

function showMarker(point) {
  ui.marker.hidden = !point;
  if (point) {
    ui.marker.style.left = `${point.x * 100}%`;
    ui.marker.style.top = `${point.y * 100}%`;
  }
}

function currentTask() {
  return activeSet.tasks[taskIndex];
}

function ensureRouteDraft(taskId) {
  if (!routeDrafts.has(taskId)) {
    const saved = savedAnnotations.get(taskId) || [];
    routeDrafts.set(
      taskId,
      saved.map((point) => ({ ...point }))
    );
  }
  return routeDrafts.get(taskId);
}

function showRoute(points) {
  setRouteOverlayHidden(ui.routeOverlay, points.length === 0);
  ui.routeLine.setAttribute('points', svgPolylinePoints(points));
  ui.routeMarkers.hidden = points.length === 0;
  ui.routeMarkers.replaceChildren(
    ...points.map((point, index) => {
      const marker = document.createElement('span');
      marker.className = 'route-marker';
      marker.style.left = `${point.x * 100}%`;
      marker.style.top = `${point.y * 100}%`;
      marker.textContent = String(index + 1);
      return marker;
    })
  );
}

function updateControls() {
  const disabled = !ready || busy;
  const task = currentTask();
  const metadata = taskMetadata(task);
  const routePoints = metadata.kind === 'route' ? ensureRouteDraft(task[0]) : [];
  ui.stage.setAttribute('aria-disabled', disabled);
  ui.previous.disabled = disabled || taskIndex === 0;
  ui.next.disabled = disabled || taskIndex === activeSet.tasks.length - 1;
  ui.undoRoute.disabled = disabled || routePoints.length === 0;
  ui.saveRoute.disabled = disabled || !hasMinimumPoints(routePoints, metadata.minPoints);
  ui.map.disabled = busy;
  ui.hero.disabled = busy;
  ui.mode.disabled = busy;
}

function renderSource(source) {
  if (!source) {
    ui.source.hidden = true;
    ui.source.removeAttribute('href');
    ui.source.removeAttribute('aria-label');
    ui.source.textContent = '';
    return;
  }

  const sourceText = [source.label || 'Source', source.detail].filter(Boolean).join(' · ');
  ui.source.href = source.url;
  ui.source.textContent = `View source: ${sourceText} ↗`;
  ui.source.setAttribute('aria-label', `Open ${sourceText} in a new tab`);
  ui.source.hidden = false;
}

function renderTask() {
  const task = currentTask();
  const [taskId, prompt, source] = task;
  const metadata = taskMetadata(task);
  ui.progress.textContent = `Prompt ${taskIndex + 1} of ${activeSet.tasks.length}`;
  ui.prompt.textContent = prompt;
  renderSource(source);
  ui.routeActions.hidden = metadata.kind !== 'route';
  if (metadata.kind === 'route') {
    showMarker(null);
    showRoute(ensureRouteDraft(taskId));
  } else {
    const points = savedAnnotations.get(taskId) || [];
    showMarker(points[0]);
    showRoute([]);
  }
  updateControls();
}

function rowsUrl() {
  const url = new URL(API);
  url.searchParams.set('map_id', `eq.${activeSet.mapId}`);
  url.searchParams.set('map_version', `eq.${activeSet.mapVersion}`);
  url.searchParams.set('hero_id', `eq.${activeSet.heroId}`);
  url.searchParams.set('mode_id', `eq.${activeSet.modeId}`);
  url.searchParams.set('select', 'task_id,points');
  return url;
}

function loadImage() {
  ui.image.alt = `${activeSet.mapName} overhead map`;
  return new Promise((resolve, reject) => {
    ui.image.onload = resolve;
    ui.image.onerror = () => reject(new Error('Map image failed to load.'));
    ui.image.src = activeSet.mapImage;
    if (ui.image.complete) {
      ui.image.naturalWidth ? resolve() : reject(new Error('Map image failed to load.'));
    }
  });
}

async function loadSelection() {
  activeSet = selectedSet();
  taskIndex = 0;
  savedAnnotations = new Map();
  routeDrafts = new Map();
  ready = false;
  busy = true;
  renderTask();
  setStatus('Loading saved annotations…');

  try {
    const rowsRequest = fetch(rowsUrl(), { headers: { Accept: 'application/json' } }).then(
      (response) => {
        if (!response.ok) throw new Error(`Load failed (${response.status}).`);
        return response.json();
      }
    );
    const [rows] = await Promise.all([rowsRequest, loadImage()]);
    savedAnnotations = parseAnnotationRows(rows);
    routeDrafts = seedRouteDrafts(savedAnnotations);
    const firstUnsaved = activeSet.tasks.findIndex(([taskId]) => !savedAnnotations.has(taskId));
    const savedCount = activeSet.tasks.filter(([taskId]) => savedAnnotations.has(taskId)).length;
    taskIndex = firstUnsaved < 0 ? 0 : firstUnsaved;
    ready = true;
    busy = false;
    renderTask();
    setStatus(`${savedCount} of ${activeSet.tasks.length} annotations saved.`);
  } catch (error) {
    console.error(error);
    busy = false;
    renderTask();
    setStatus('Could not load saved annotations. Reload the page to try again.', 'error');
  }
}

async function saveAnnotation(points, advance) {
  const task = currentTask();
  const taskId = task[0];
  const metadata = taskMetadata(task);
  const url = new URL(API);
  url.searchParams.set('on_conflict', 'map_id,map_version,hero_id,mode_id,task_id');
  busy = true;
  if (metadata.kind === 'point') showMarker(points[0]);
  updateControls();
  setStatus('Saving…');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(
        buildAnnotationPayload(activeSet, taskId, points, new Date().toISOString())
      )
    });
    if (!response.ok) throw new Error(`Save failed (${response.status}).`);

    savedAnnotations.set(
      taskId,
      points.map((point) => ({ ...point }))
    );
    if (metadata.kind === 'route') {
      routeDrafts.set(
        taskId,
        points.map((point) => ({ ...point }))
      );
    }
    if (advance && taskIndex < activeSet.tasks.length - 1) taskIndex += 1;
    busy = false;
    renderTask();
    setStatus('Annotation saved', 'success');
  } catch (error) {
    console.error(error);
    busy = false;
    renderTask();
    setStatus(
      metadata.kind === 'route'
        ? 'Save failed — press Save route to try again.'
        : 'Save failed — click the map to try again.',
      'error'
    );
  }
}

ui.stage.addEventListener('click', (event) => {
  if (!ready || busy) return;
  const rect = ui.stage.getBoundingClientRect();
  const clamp = (number) => Math.max(0, Math.min(1, number));
  const point = {
    x: clamp((event.clientX - rect.left) / rect.width),
    y: clamp((event.clientY - rect.top) / rect.height)
  };
  const task = currentTask();
  const metadata = taskMetadata(task);
  if (metadata.kind === 'route') {
    const draft = appendWaypoint(ensureRouteDraft(task[0]), point);
    routeDrafts.set(task[0], draft);
    renderTask();
    setStatus(
      `${draft.length} waypoint${draft.length === 1 ? '' : 's'} added. Press Save route when complete.`
    );
  } else {
    void saveAnnotation([point], true);
  }
});

ui.undoRoute.addEventListener('click', () => {
  const task = currentTask();
  const draft = undoLastWaypoint(ensureRouteDraft(task[0]));
  routeDrafts.set(task[0], draft);
  renderTask();
  setStatus(`${draft.length} waypoint${draft.length === 1 ? '' : 's'} in the route draft.`);
});

ui.saveRoute.addEventListener('click', () => {
  const task = currentTask();
  const metadata = taskMetadata(task);
  const draft = ensureRouteDraft(task[0]);
  if (!hasMinimumPoints(draft, metadata.minPoints)) {
    setStatus(`Add at least ${metadata.minPoints} waypoints before saving.`, 'error');
    return;
  }
  void saveAnnotation(draft, true);
});

function taskStatus() {
  const task = currentTask();
  const metadata = taskMetadata(task);
  if (metadata.kind === 'point') {
    return savedAnnotations.has(task[0]) ? 'Saved annotation' : 'Annotation not saved';
  }

  const draft = ensureRouteDraft(task[0]);
  const saved = savedAnnotations.get(task[0]);
  const count = `${draft.length} waypoint${draft.length === 1 ? '' : 's'}`;
  if (!saved) return `${count} in an unsaved route.`;
  return JSON.stringify(draft) === JSON.stringify(saved)
    ? `Saved route loaded for editing · ${count}.`
    : `Unsaved route edits · ${count}.`;
}

ui.previous.addEventListener('click', () => {
  taskIndex -= 1;
  renderTask();
  setStatus(taskStatus());
});

ui.next.addEventListener('click', () => {
  taskIndex += 1;
  renderTask();
  setStatus(taskStatus());
});

ui.map.addEventListener('change', () => {
  fillHeroes();
  fillModes();
  void loadSelection();
});

ui.hero.addEventListener('change', () => {
  fillModes();
  void loadSelection();
});

ui.mode.addEventListener('change', loadSelection);

fillMaps();
fillHeroes();
fillModes();
void loadSelection();
