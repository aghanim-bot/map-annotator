'use strict';

const API =
  'https://anycors.sirstoke.me/' +
  'https://postgrest.sirstoke.me/map_annotations';

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
      ['a-main-entry', 'Click the Point A main entrance/choke.'],
      ['a-left-mega-door', 'Click the left-side doorway used to poke Sigma out of the choke.'],
      ['a-left-mega-pack', 'Click the mega health pack on the bottom-left staircase route.'],
      ['a-right-rotation-entry', 'Click where Cassidy leaves main to begin the right-side rotation.'],
      ['a-right-high-ground', 'Click the right-side high ground reached by stairs or roll tech.'],
      ['a-roll-tech-landing', 'Click the roll-tech landing point on the right-side high ground.'],
      ['a-right-mega-entry', 'Click the entrance to the right-side mega-room flank.'],
      ['a-right-mega-exit', 'Click where the right-side mega-room flank exits into the fight.']
    ]
  }
];

const ui = {
  map: document.querySelector('#map-select'),
  hero: document.querySelector('#hero-select'),
  mode: document.querySelector('#mode-select'),
  progress: document.querySelector('#progress'),
  prompt: document.querySelector('#task-prompt'),
  stage: document.querySelector('#map-stage'),
  image: document.querySelector('#map-image'),
  marker: document.querySelector('#marker'),
  previous: document.querySelector('#previous-button'),
  next: document.querySelector('#next-button'),
  status: document.querySelector('#status')
};

let activeSet;
let taskIndex = 0;
let savedPoints = new Map();
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

function updateControls() {
  const disabled = !ready || busy;
  ui.stage.setAttribute('aria-disabled', disabled);
  ui.previous.disabled = disabled || taskIndex === 0;
  ui.next.disabled = disabled || taskIndex === activeSet.tasks.length - 1;
  ui.map.disabled = busy;
  ui.hero.disabled = busy;
  ui.mode.disabled = busy;
}

function renderTask() {
  const [taskId, prompt] = activeSet.tasks[taskIndex];
  ui.progress.textContent = `Point ${taskIndex + 1} of ${activeSet.tasks.length}`;
  ui.prompt.textContent = prompt;
  showMarker(savedPoints.get(taskId));
  updateControls();
}

function rowsUrl() {
  const url = new URL(API);
  url.searchParams.set('map_id', `eq.${activeSet.mapId}`);
  url.searchParams.set('map_version', `eq.${activeSet.mapVersion}`);
  url.searchParams.set('hero_id', `eq.${activeSet.heroId}`);
  url.searchParams.set('mode_id', `eq.${activeSet.modeId}`);
  url.searchParams.set('select', 'task_id,x,y');
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
  savedPoints = new Map();
  ready = false;
  busy = true;
  renderTask();
  setStatus('Loading saved points…');

  try {
    const rowsRequest = fetch(rowsUrl(), { headers: { Accept: 'application/json' } }).then(
      (response) => {
        if (!response.ok) throw new Error(`Load failed (${response.status}).`);
        return response.json();
      }
    );
    const [rows] = await Promise.all([rowsRequest, loadImage()]);
    savedPoints = new Map(
      rows.map((row) => [row.task_id, { x: Number(row.x), y: Number(row.y) }])
    );
    const firstUnsaved = activeSet.tasks.findIndex(([taskId]) => !savedPoints.has(taskId));
    const savedCount = activeSet.tasks.filter(([taskId]) => savedPoints.has(taskId)).length;
    taskIndex = firstUnsaved < 0 ? 0 : firstUnsaved;
    ready = true;
    busy = false;
    renderTask();
    setStatus(`${savedCount} of ${activeSet.tasks.length} points saved.`);
  } catch (error) {
    console.error(error);
    busy = false;
    renderTask();
    setStatus('Could not load saved points. Reload the page to try again.', 'error');
  }
}

async function savePoint(point) {
  const taskId = activeSet.tasks[taskIndex][0];
  const url = new URL(API);
  url.searchParams.set('on_conflict', 'map_id,map_version,hero_id,mode_id,task_id');
  busy = true;
  showMarker(point);
  updateControls();
  setStatus('Saving…');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({
        map_id: activeSet.mapId,
        map_version: activeSet.mapVersion,
        hero_id: activeSet.heroId,
        mode_id: activeSet.modeId,
        task_id: taskId,
        x: point.x,
        y: point.y,
        updated_at: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error(`Save failed (${response.status}).`);

    savedPoints.set(taskId, point);
    if (taskIndex < activeSet.tasks.length - 1) taskIndex += 1;
    busy = false;
    renderTask();
    setStatus('Saved', 'success');
  } catch (error) {
    console.error(error);
    busy = false;
    renderTask();
    setStatus('Save failed — click the map to try again.', 'error');
  }
}

ui.stage.addEventListener('click', (event) => {
  if (!ready || busy) return;
  const rect = ui.stage.getBoundingClientRect();
  const clamp = (number) => Math.max(0, Math.min(1, number));
  void savePoint({
    x: clamp((event.clientX - rect.left) / rect.width),
    y: clamp((event.clientY - rect.top) / rect.height)
  });
});

ui.previous.addEventListener('click', () => {
  taskIndex -= 1;
  renderTask();
  setStatus(savedPoints.has(activeSet.tasks[taskIndex][0]) ? 'Saved point' : 'Not saved');
});

ui.next.addEventListener('click', () => {
  taskIndex += 1;
  renderTask();
  setStatus(savedPoints.has(activeSet.tasks[taskIndex][0]) ? 'Saved point' : 'Not saved');
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
