'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const repositoryRoot = join(__dirname, '..');
const appSource = readFileSync(join(repositoryRoot, 'app.js'), 'utf8');
const auditSource = readFileSync(join(repositoryRoot, 'docs', 'source-audit.md'), 'utf8');

const auditedTasks = [
  ['a-main-entry', 'Click the Point A main choke.', '2:12:53', 7973],
  [
    'a-left-mega-door',
    'Click the doorway where the bottom-left mega route opens toward the Point A choke.',
    '2:27:45',
    8865
  ],
  [
    'a-left-mega-room-entry',
    'Click the bottom-left staircase leading into the mega room.',
    '2:13:05',
    7985
  ],
  [
    'a-right-rotation-entry',
    'Click where the right-side rotation leaves the Point A choke.',
    '2:13:54',
    8034
  ],
  [
    'a-right-rotation-route',
    'Trace the right-side rotation from the Point A choke toward the right-side high ground.',
    '2:13:54',
    8034
  ],
  [
    'a-right-high-ground',
    'Click the right-side high ground above the Point A choke.',
    '2:14:00',
    8040
  ],
  [
    'a-roll-tech-landing',
    'Click the roll-tech destination on the right-side high ground.',
    '2:14:07',
    8047
  ],
  [
    'a-right-mega-entry',
    'Click the stairs leading down to the right-side mega flank.',
    '2:15:05',
    8105
  ],
  [
    'a-right-mega-flank',
    'Click the mega-flank position reached after dropping down the stairs.',
    '2:15:08',
    8108
  ]
];

function taskTuples(source) {
  return [...source.matchAll(
    /['"](a-[^'"]+)['"],\s*['"]([^'"]+)['"],\s*youtubeSourceAt\(['"]([^'"]+)['"],\s*(\d+)\)/g
  )].map((match) => [match[1], match[2], match[3], Number(match[4])]);
}

test('all annotation prompts match the audited IDs, text, and timestamps', () => {
  assert.deepEqual(taskTuples(appSource), auditedTasks);
});

test('unsupported prompt claims cannot silently return', () => {
  for (const source of [appSource, auditSource]) {
    assert.doesNotMatch(source, /mega health pack/i);
    assert.doesNotMatch(source, /exits behind Point A/i);
  }
});

test('the source audit covers every current task and records ID rollover policy', () => {
  for (const [taskId, prompt, timestamp] of auditedTasks) {
    assert.ok(auditSource.includes(`| \`${taskId}\` |`));
    assert.ok(auditSource.includes(`| ${prompt} | ${timestamp} |`));
  }
  assert.match(
    auditSource,
    /Task IDs were changed when unsupported semantics changed so old annotations cannot silently carry over\./
  );
});
