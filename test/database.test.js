'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { readFileSync } = require('node:fs');
const { spawnSync } = require('node:child_process');
const { join } = require('node:path');

const root = join(__dirname, '..');
const schemaPath = join(root, 'sql', 'schema.sql');
const migrationPath = join(root, 'sql', 'migrate-points-jsonb.sql');

test('repository SQL defines the fresh schema and idempotent JSONB migration', () => {
  const schema = readFileSync(schemaPath, 'utf8');
  const migration = readFileSync(migrationPath, 'utf8');

  assert.match(schema, /CREATE SCHEMA IF NOT EXISTS api/i);
  assert.match(schema, /points\s+jsonb\s+NOT NULL/i);
  assert.match(schema, /PRIMARY KEY\s*\(map_id,\s*map_version,\s*hero_id,\s*mode_id,\s*task_id\)/i);
  assert.match(schema, /GRANT USAGE ON SCHEMA api TO web_anon/i);
  assert.match(schema, /GRANT SELECT, INSERT, UPDATE ON api\.map_annotations TO web_anon/i);
  assert.match(migration, /ALTER TABLE api\.map_annotations/i);
  assert.match(migration, /ADD COLUMN IF NOT EXISTS points jsonb/i);
  assert.match(migration, /jsonb_build_array\s*\(jsonb_build_object/i);
  assert.match(migration, /DROP COLUMN IF EXISTS x/i);
  assert.match(migration, /DROP COLUMN IF EXISTS y/i);
  assert.match(migration, /NOTIFY pgrst, 'reload schema'/i);
});

const dockerCheck = spawnSync('docker', ['info'], { encoding: 'utf8' });
const dockerAvailable = dockerCheck.status === 0;
const dockerSkip = dockerAvailable
  ? false
  : `Docker unavailable: ${(dockerCheck.stderr || dockerCheck.stdout || 'docker info failed').trim()}`;

test(
  'migrates old rows and enforces point and route JSONB in PostgreSQL',
  { skip: dockerSkip, timeout: 120_000 },
  (t) => {
    const container = `map-annotator-test-${process.pid}-${randomUUID().slice(0, 8)}`;
    const started = spawnSync(
      'docker',
      [
        'run',
        '--detach',
        '--rm',
        '--name',
        container,
        '-e',
        'POSTGRES_PASSWORD=test',
        '-e',
        'POSTGRES_DB=annotations_test',
        'postgres:17-alpine'
      ],
      { encoding: 'utf8', timeout: 90_000 }
    );
    assert.equal(started.status, 0, started.stderr || started.stdout);
    t.after(() => spawnSync('docker', ['rm', '--force', container], { encoding: 'utf8' }));

    const waitBuffer = new Int32Array(new SharedArrayBuffer(4));
    const readyDeadline = Date.now() + 30_000;
    while (Date.now() < readyDeadline) {
      const ready = spawnSync('docker', ['exec', container, 'pg_isready', '-U', 'postgres']);
      if (ready.status === 0) break;
      Atomics.wait(waitBuffer, 0, 0, 250);
    }

    function psql(sql, database = 'annotations_test') {
      return spawnSync(
        'docker',
        [
          'exec',
          '-i',
          container,
          'psql',
          '-X',
          '--no-psqlrc',
          '-v',
          'ON_ERROR_STOP=1',
          '-U',
          'postgres',
          '-d',
          database,
          '-At'
        ],
        { input: sql, encoding: 'utf8' }
      );
    }

    function expectSql(sql) {
      const result = psql(sql);
      assert.equal(result.status, 0, result.stderr || result.stdout);
      return result.stdout.trim();
    }

    function rejectSql(sql) {
      const result = psql(sql);
      assert.notEqual(result.status, 0, `SQL unexpectedly succeeded: ${sql}`);
      assert.match(result.stderr, /map_annotations_points_valid|check constraint/i);
    }

    const oldSchema = `
      CREATE ROLE web_anon NOLOGIN;
      CREATE SCHEMA api;
      CREATE TABLE api.map_annotations (
        map_id text NOT NULL,
        map_version text NOT NULL,
        hero_id text NOT NULL,
        mode_id text NOT NULL,
        task_id text NOT NULL,
        x double precision NOT NULL,
        y double precision NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (map_id, map_version, hero_id, mode_id, task_id)
      );
      GRANT USAGE ON SCHEMA api TO web_anon;
      GRANT SELECT, INSERT, UPDATE ON api.map_annotations TO web_anon;
      INSERT INTO api.map_annotations
        (map_id, map_version, hero_id, mode_id, task_id, x, y)
      VALUES
        ('blizzard-world', '2025-11-18', 'cassidy', 'attack', 'a-main-entry', 0.1, 0.2),
        ('blizzard-world', '2025-11-18', 'cassidy', 'attack', 'a-left-mega-door', 0.3, 0.4);
    `;
    expectSql(oldSchema);

    const migration = readFileSync(migrationPath, 'utf8');
    expectSql(migration);
    expectSql(migration);

    const preserved = JSON.parse(
      expectSql(`
        SELECT jsonb_agg(
          jsonb_build_object('task_id', task_id, 'points', points)
          ORDER BY task_id
        )
        FROM api.map_annotations;
      `)
    );
    assert.deepEqual(preserved, [
      { task_id: 'a-left-mega-door', points: [{ x: 0.3, y: 0.4 }] },
      { task_id: 'a-main-entry', points: [{ x: 0.1, y: 0.2 }] }
    ]);
    assert.equal(
      expectSql(`
        SELECT count(*) = 0
        FROM information_schema.columns
        WHERE table_schema = 'api'
          AND table_name = 'map_annotations'
          AND column_name IN ('x', 'y');
      `),
      't'
    );
    assert.equal(
      expectSql(`SELECT has_table_privilege('web_anon', 'api.map_annotations', 'select,insert,update');`),
      't'
    );
    assert.equal(expectSql(`SELECT has_schema_privilege('web_anon', 'api', 'usage');`), 't');

    expectSql(`
      INSERT INTO api.map_annotations
        (map_id, map_version, hero_id, mode_id, task_id, points)
      VALUES
        ('blizzard-world', '2025-11-18', 'cassidy', 'attack', 'a-right-rotation-route',
         '[{"x": 0.2, "y": 0.3}, {"x": 0.5, "y": 0.6}, {"x": 0.8, "y": 0.7}]');
    `);
    assert.deepEqual(
      JSON.parse(
        expectSql(`
          SELECT points FROM api.map_annotations
          WHERE task_id = 'a-right-rotation-route';
        `)
      ),
      [
        { x: 0.2, y: 0.3 },
        { x: 0.5, y: 0.6 },
        { x: 0.8, y: 0.7 }
      ]
    );

    const insertPrefix = `
      INSERT INTO api.map_annotations
        (map_id, map_version, hero_id, mode_id, task_id, points)
      VALUES ('map', 'version', 'hero', 'mode',`;
    rejectSql(`${insertPrefix} 'empty', '[]');`);
    rejectSql(`${insertPrefix} 'extra-key', '[{"x": 0.1, "y": 0.2, "z": 0.3}]');`);
    rejectSql(`${insertPrefix} 'wrong-type', '[{"x": "0.1", "y": 0.2}]');`);
    rejectSql(`${insertPrefix} 'missing-y', '[{"x": 0.1}]');`);
    rejectSql(`${insertPrefix} 'out-of-range', '[{"x": 1.01, "y": 0.2}]');`);

    expectSql('CREATE DATABASE fresh_schema;', 'postgres');
    const freshSchema = readFileSync(schemaPath, 'utf8');
    const freshResult = psql(freshSchema, 'fresh_schema');
    assert.equal(freshResult.status, 0, freshResult.stderr || freshResult.stdout);
  }
);
