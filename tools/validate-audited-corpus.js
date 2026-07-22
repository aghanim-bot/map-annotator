'use strict';

const assert = require('node:assert/strict');
const {
  annotationSets,
  auditedTasks,
  mapPool,
  pendingMaps,
  readyMaps
} = require('../data/annotation-sets.js');

const heroes = ['cassidy', 'hanzo', 'tracer'];
const sourcePattern = /^(?:https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+&t=\d+(?:\.\d+)?s|https:\/\/www\.reddit\.com\/r\/[A-Za-z0-9_]+\/comments\/[A-Za-z0-9]+\/[A-Za-z0-9_-]+\/[A-Za-z0-9]+\/?)$/;
const ids = [];

for (const { mapId } of mapPool) {
  const counts = heroes.map((heroId) => {
    const tasks = auditedTasks[`${mapId}:${heroId}`];
    assert.equal(tasks.length, 3, `${mapId}:${heroId}`);
    for (const [id, , source] of tasks) {
      ids.push(id);
      assert.match(source.url, sourcePattern, `${id} source`);
    }
    return `${heroId}=3`;
  });
  process.stdout.write(`${mapId} ${counts.join(' ')}\n`);
}

assert.equal(Object.keys(auditedTasks).length, 90);
assert.equal(ids.length, 270);
assert.equal(new Set(ids).size, 270);
assert.equal(readyMaps.length, 17);
assert.equal(pendingMaps.length, 13);
assert.equal(annotationSets.length, 51);
assert.equal(annotationSets.flatMap(({ tasks }) => tasks).length, 153);
assert.ok(pendingMaps.every(({ mapId }) => !annotationSets.some((set) => set.mapId === mapId)));

process.stdout.write('TOTAL keys=90 tasks=270 uniqueIds=270 ready=17 pending=13 liveSets=51 liveTasks=153\n');
