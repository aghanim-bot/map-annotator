'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const { catalog } = require('../data/competitive-catalog.js');
const browser = require('../catalog-browser.js');

const index = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

class Element {
  constructor(tagName = 'div') {
    this.tagName = tagName;
    this.value = '';
    this.textContent = '';
    this.children = [];
    this.attributes = {};
    this.listeners = {};
  }

  replaceChildren(...children) {
    this.children = children;
    if (children.length && children[0].tagName === 'option') this.value = children[0].value;
  }

  append(...children) { this.children.push(...children); }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(type, listener) { this.listeners[type] = listener; }
  dispatch(type) { this.listeners[type](); }
}

function documentFixture() {
  const ids = [
    'catalog-map-select', 'catalog-hero-select', 'catalog-phase-select', 'catalog-mode',
    'catalog-phase', 'catalog-prompts', 'catalog-map-source', 'catalog-hero-source'
  ];
  const elements = Object.fromEntries(ids.map((id) => [id, new Element()]));
  return {
    elements,
    document: {
      createElement: (tagName) => new Element(tagName),
      querySelector: (selector) => elements[selector.slice(1)] || null
    }
  };
}

test('index exposes the catalog before its distinct browser integration', () => {
  assert.match(index, /<script src="\.\/data\/competitive-catalog\.js" defer><\/script>/);
  assert.match(index, /<script src="\.\/catalog-browser\.js" defer><\/script>/);
  assert.ok(index.indexOf('competitive-catalog.js') < index.indexOf('catalog-browser.js'));
  assert.match(index, /id="catalog-map-select"/);
  assert.match(index, /id="catalog-hero-select"/);
  assert.match(index, /id="catalog-phase-select"/);
  assert.match(index, /Open-ended human annotation prompts/);
  assert.match(index, /Collection prompt — human selection required/);
});

test('browser makes all 30 maps and all three heroes selectable', () => {
  const fixture = documentFixture();
  assert.equal(browser.initialize(fixture.document, catalog), true);
  assert.equal(fixture.elements['catalog-map-select'].children.length, 30);
  assert.deepEqual(
    fixture.elements['catalog-hero-select'].children.map(({ textContent }) => textContent),
    ['Cassidy', 'Hanzo', 'Tracer']
  );
});

test('every visible selection renders exactly three tasks and its metadata sources', () => {
  for (const { mode, map } of browser.mapEntries(catalog)) {
    for (const hero of catalog.heroes) {
      for (const phase of map.phases) {
        const current = browser.selection(catalog, map.id, hero.id, phase.id);
        assert.equal(current.tasks.length, 3);
        assert.equal(current.mode.name, mode.name);
        assert.equal(current.phase.name, phase.name);
        assert.ok(current.tasks.every((task) => task.heroId === hero.id));
        assert.ok(current.tasks.every((task) => task.evidence.mapUrl === map.sourceUrl));
        assert.ok(current.tasks.every((task) => task.evidence.heroUrl === hero.officialUrl));
      }
    }
  }

  const fixture = documentFixture();
  browser.initialize(fixture.document, catalog);
  const prompts = fixture.elements['catalog-prompts'];
  assert.equal(prompts.children.length, 3);
  assert.ok(prompts.children.every((item) => item.children.length === 2));
  assert.match(fixture.elements['catalog-map-source'].href, /^https:\/\//);
  assert.match(fixture.elements['catalog-hero-source'].href, /^https:\/\//);
});

test('collection UI makes no audited recommendation or coordinate-support claim', () => {
  const collectionMarkup = index.slice(index.indexOf('<section class="catalog-section"'));
  assert.doesNotMatch(collectionMarkup, /audited recommendation/i);
  assert.doesNotMatch(collectionMarkup, /coordinates? (?:are )?(?:supported|verified)/i);
  assert.doesNotMatch(collectionMarkup, /evidence[- ]supported/i);
  assert.match(collectionMarkup, /does not\s+provide map imagery or saved locations/);
});
