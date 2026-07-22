'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { join } = require('node:path');

test('Pillow renderer fixture tests pass', { timeout: 120_000 }, () => {
  const result = spawnSync(
    'uv',
    [
      'run',
      '--offline',
      '--with',
      'pillow',
      'python3',
      '-m',
      'unittest',
      'discover',
      '-s',
      'test',
      '-p',
      'test_renderer.py'
    ],
    {
      cwd: join(__dirname, '..'),
      encoding: 'utf8',
      timeout: 110_000,
      env: { ...process.env, UV_CACHE_DIR: join('/tmp', 'map-annotator-uv-cache') }
    }
  );

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
});
