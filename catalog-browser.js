(function (root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.CatalogBrowser = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  function mapEntries(catalog) {
    return catalog.modes.flatMap((mode) =>
      mode.maps.map((map) => ({ mode, map }))
    );
  }

  function selection(catalog, mapId, heroId, phaseId) {
    const entry = mapEntries(catalog).find(({ map }) => map.id === mapId);
    if (!entry) return null;
    const hero = catalog.heroes.find(({ id }) => id === heroId);
    const phase = entry.map.phases.find(({ id }) => id === phaseId);
    if (!hero || !phase) return null;
    return {
      mode: entry.mode,
      map: entry.map,
      hero,
      phase,
      tasks: phase.tasks.filter((task) => task.heroId === hero.id)
    };
  }

  function fillSelect(document, select, items) {
    const previous = select.value;
    const options = items.map(({ value, label }) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      return option;
    });
    select.replaceChildren(...options);
    if (items.some(({ value }) => value === previous)) select.value = previous;
  }

  function initialize(document, catalog) {
    const ui = {
      map: document.querySelector('#catalog-map-select'),
      hero: document.querySelector('#catalog-hero-select'),
      phaseSelect: document.querySelector('#catalog-phase-select'),
      mode: document.querySelector('#catalog-mode'),
      phase: document.querySelector('#catalog-phase'),
      prompts: document.querySelector('#catalog-prompts'),
      mapSource: document.querySelector('#catalog-map-source'),
      heroSource: document.querySelector('#catalog-hero-source')
    };
    if (Object.values(ui).some((element) => !element)) return false;

    const entries = mapEntries(catalog);
    fillSelect(document, ui.map, entries.map(({ mode, map }) => ({
      value: map.id,
      label: `${map.name} · ${mode.name}`
    })));
    fillSelect(document, ui.hero, catalog.heroes.map((hero) => ({
      value: hero.id,
      label: hero.name
    })));

    function selectedEntry() {
      return entries.find(({ map }) => map.id === ui.map.value);
    }

    function fillPhases() {
      fillSelect(document, ui.phaseSelect, selectedEntry().map.phases.map((phase) => ({
        value: phase.id,
        label: phase.name
      })));
    }

    function render() {
      const current = selection(catalog, ui.map.value, ui.hero.value, ui.phaseSelect.value);
      ui.mode.textContent = current.mode.name;
      ui.phase.textContent = current.phase.name;
      ui.prompts.replaceChildren(...current.tasks.map((task) => {
        const item = document.createElement('li');
        const prompt = document.createElement('p');
        const kind = document.createElement('span');
        prompt.textContent = task.prompt;
        kind.className = 'catalog-task-kind';
        kind.textContent = task.kind === 'route' ? 'Route selection' : 'Point selection';
        item.append(prompt, kind);
        return item;
      }));
      ui.mapSource.href = current.tasks[0].evidence.mapUrl;
      ui.mapSource.setAttribute('aria-label', `Open source information for ${current.map.name}`);
      ui.heroSource.href = current.tasks[0].evidence.heroUrl;
      ui.heroSource.setAttribute('aria-label', `Open source information for ${current.hero.name}`);
    }

    ui.map.addEventListener('change', () => {
      fillPhases();
      render();
    });
    ui.hero.addEventListener('change', render);
    ui.phaseSelect.addEventListener('change', render);
    fillPhases();
    render();
    return true;
  }

  if (typeof document === 'object' && typeof window === 'object') {
    const catalog = window.CompetitiveCatalog && window.CompetitiveCatalog.catalog;
    if (catalog) initialize(document, catalog);
  }

  return Object.freeze({ initialize, mapEntries, selection });
});
