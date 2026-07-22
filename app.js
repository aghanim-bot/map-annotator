'use strict';

const {
  appendWaypoint,
  buildAnnotationPayload,
  hasMinimumPoints,
  normalizeAnnotationTool,
  parseAnnotationRows,
  seedRouteDrafts,
  selectionCapabilities,
  setRouteOverlayHidden,
  svgPolylinePoints,
  undoLastWaypoint
} = window.AnnotationModel;
const { mapPool, pendingMaps, annotationSets } = window.AnnotationSets;

const API =
  'https://anycors.sirstoke.me/' +
  'https://postgrest.sirstoke.me/map_annotations';

const ui = {
  map: document.querySelector('#map-select'),
  hero: document.querySelector('#hero-select'),
  mode: document.querySelector('#mode-select'),
  progress: document.querySelector('#progress'),
  prompt: document.querySelector('#task-prompt'),
  source: document.querySelector('#task-source'),
  stage: document.querySelector('#map-stage'),
  image: document.querySelector('#map-image'),
  placeholder: document.querySelector('#map-placeholder'),
  marker: document.querySelector('#marker'),
  routeOverlay: document.querySelector('#route-overlay'),
  routeLine: document.querySelector('#route-line'),
  routeMarkers: document.querySelector('#route-markers'),
  routeActions: document.querySelector('#route-actions'),
  undoRoute: document.querySelector('#undo-route-button'),
  saveRoute: document.querySelector('#save-route-button'),
  annotationTools: [...document.querySelectorAll('input[name="annotation-tool"]')],
  previous: document.querySelector('#previous-button'),
  next: document.querySelector('#next-button'),
  status: document.querySelector('#status')
};

document.querySelector('#imagery-availability').textContent =
  `${mapPool.length} prompt-ready maps · ${mapPool.length - pendingMaps.length} annotation-ready · ` +
  `${pendingMaps.length} awaiting current overhead captures`;

let activeSet;
let taskIndex = 0;
let savedAnnotations = new Map();
let routeDrafts = new Map();
let ready = false;
let busy = false;
let selectionGeneration = 0;
let annotationTool = 'point';

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
  const capabilities = selectionCapabilities(activeSet);
  const annotationDisabled = !ready || busy || !capabilities.canAnnotate;
  const task = currentTask();
  const routePoints = annotationTool === 'route' ? ensureRouteDraft(task[0]) : [];
  ui.stage.setAttribute('aria-disabled', annotationDisabled);
  ui.previous.disabled = busy || taskIndex === 0;
  ui.next.disabled = busy || taskIndex === activeSet.tasks.length - 1;
  ui.undoRoute.disabled = annotationDisabled || routePoints.length === 0;
  ui.saveRoute.disabled = annotationDisabled || !hasMinimumPoints(routePoints, 2);
  ui.map.disabled = busy;
  ui.hero.disabled = busy;
  ui.mode.disabled = busy;
  ui.annotationTools.forEach((control) => {
    control.disabled = busy;
  });
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
  ui.progress.textContent = `Prompt ${taskIndex + 1} of ${activeSet.tasks.length}`;
  ui.prompt.textContent = prompt;
  renderSource(source);
  ui.routeActions.hidden = annotationTool !== 'route' || !selectionCapabilities(activeSet).canAnnotate;
  if (annotationTool === 'route') {
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

function loadImage(set) {
  ui.image.alt = `${set.mapName} map image`;
  return new Promise((resolve, reject) => {
    ui.image.onload = resolve;
    ui.image.onerror = () => reject(new Error('Map image failed to load.'));
    ui.image.src = set.mapImage;
    if (ui.image.complete) {
      ui.image.naturalWidth ? resolve() : reject(new Error('Map image failed to load.'));
    }
  });
}

async function loadSelection() {
  const generation = ++selectionGeneration;
  activeSet = selectedSet();
  taskIndex = 0;
  savedAnnotations = new Map();
  routeDrafts = new Map();
  const capabilities = selectionCapabilities(activeSet);
  ready = false;
  busy = capabilities.canAnnotate;
  ui.image.onload = null;
  ui.image.onerror = null;
  ui.image.removeAttribute('src');
  ui.image.alt = '';
  ui.image.hidden = true;
  ui.placeholder.hidden = capabilities.canLoadImage;
  ui.stage.dataset.imageryStatus = activeSet.imageryStatus;
  showMarker(null);
  showRoute([]);
  renderTask();

  if (!capabilities.canFetchRows) {
    setStatus('Overhead map capture pending. Browse prompts and sources while annotation is locked.');
    return;
  }

  setStatus('Loading saved annotations…');

  try {
    const rowsRequest = fetch(rowsUrl(), { headers: { Accept: 'application/json' } }).then(
      (response) => {
        if (!response.ok) throw new Error(`Load failed (${response.status}).`);
        return response.json();
      }
    );
    const [rows] = await Promise.all([rowsRequest, loadImage(activeSet)]);
    if (generation !== selectionGeneration) return;
    savedAnnotations = parseAnnotationRows(rows);
    routeDrafts = seedRouteDrafts(savedAnnotations);
    const firstUnsaved = activeSet.tasks.findIndex(([taskId]) => !savedAnnotations.has(taskId));
    const savedCount = activeSet.tasks.filter(([taskId]) => savedAnnotations.has(taskId)).length;
    taskIndex = firstUnsaved < 0 ? 0 : firstUnsaved;
    ready = true;
    busy = false;
    ui.image.hidden = false;
    renderTask();
    setStatus(`${savedCount} of ${activeSet.tasks.length} annotations saved.`);
  } catch (error) {
    if (generation !== selectionGeneration) return;
    console.error(error);
    busy = false;
    renderTask();
    setStatus('Could not load saved annotations. Reload the page to try again.', 'error');
  }
}

async function saveAnnotation(points, advance) {
  if (!ready || busy || !selectionCapabilities(activeSet).canSave) return;
  const task = currentTask();
  const taskId = task[0];
  const url = new URL(API);
  url.searchParams.set('on_conflict', 'map_id,map_version,hero_id,mode_id,task_id');
  busy = true;
  if (annotationTool === 'point') showMarker(points[0]);
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
    routeDrafts.set(
      taskId,
      points.map((point) => ({ ...point }))
    );
    if (advance && taskIndex < activeSet.tasks.length - 1) taskIndex += 1;
    busy = false;
    renderTask();
    setStatus('Annotation saved', 'success');
  } catch (error) {
    console.error(error);
    busy = false;
    renderTask();
    setStatus(
      annotationTool === 'route'
        ? 'Save failed — press Save route to try again.'
        : 'Save failed — click the map to try again.',
      'error'
    );
  }
}

ui.stage.addEventListener('click', (event) => {
  if (!ready || busy || !selectionCapabilities(activeSet).canClickMap) return;
  const rect = ui.stage.getBoundingClientRect();
  const clamp = (number) => Math.max(0, Math.min(1, number));
  const point = {
    x: clamp((event.clientX - rect.left) / rect.width),
    y: clamp((event.clientY - rect.top) / rect.height)
  };
  const task = currentTask();
  if (annotationTool === 'route') {
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
  if (!ready || busy || !selectionCapabilities(activeSet).canAnnotate) return;
  const task = currentTask();
  const draft = undoLastWaypoint(ensureRouteDraft(task[0]));
  routeDrafts.set(task[0], draft);
  renderTask();
  setStatus(`${draft.length} waypoint${draft.length === 1 ? '' : 's'} in the route draft.`);
});

ui.saveRoute.addEventListener('click', () => {
  if (!ready || busy || !selectionCapabilities(activeSet).canSave) return;
  const task = currentTask();
  const draft = ensureRouteDraft(task[0]);
  if (!hasMinimumPoints(draft, 2)) {
    setStatus('Add at least 2 waypoints before saving.', 'error');
    return;
  }
  void saveAnnotation(draft, true);
});

function taskStatus() {
  if (!selectionCapabilities(activeSet).canAnnotate) {
    return 'Overhead map capture pending. Prompts and sources remain available.';
  }
  const task = currentTask();
  if (annotationTool === 'point') {
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

function selectAnnotationTool(tool) {
  annotationTool = normalizeAnnotationTool(tool);
  ui.annotationTools.forEach((control) => {
    control.checked = control.value === annotationTool;
  });
  renderTask();
  setStatus(taskStatus());
}

ui.annotationTools.forEach((control) => {
  control.addEventListener('change', () => {
    if (control.checked) selectAnnotationTool(control.value);
  });
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
