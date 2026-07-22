'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const repositoryRoot = join(__dirname, '..');
const deployScriptPath = join(repositoryRoot, 'deploy', 'update-static.sh');
const indexPath = join(repositoryRoot, 'index.html');
const { annotationSets } = require('../data/annotation-sets.js');
const mapSlugs = [...new Set(annotationSets.map(({ mapId }) => mapId))];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function createDeploymentFixture(t) {
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'map-annotator-deployment-'));
  t.after(() => rmSync(temporaryRoot, { recursive: true, force: true }));

  const sourceRepository = join(temporaryRoot, 'source');
  mkdirSync(join(sourceRepository, 'maps'), { recursive: true });
  mkdirSync(join(sourceRepository, 'data'), { recursive: true });
  writeFileSync(
    join(sourceRepository, 'index.html'),
    [
      '<!doctype html>',
      '<link rel="stylesheet" href="./style.css">',
      '<script src="./annotation-model.js" defer></script>',
      '<script src="./data/annotation-sets.js" defer></script>',
      '<script src="./app.js" defer></script>'
    ].join('\n')
  );
  writeFileSync(join(sourceRepository, 'style.css'), 'new-style\n');
  writeFileSync(join(sourceRepository, 'annotation-model.js'), 'new-model\n');
  writeFileSync(join(sourceRepository, 'data', 'annotation-sets.js'), 'new-sets\n');
  writeFileSync(join(sourceRepository, 'app.js'), 'new-app\n');
  for (const slug of mapSlugs) {
    writeFileSync(join(sourceRepository, 'maps', `${slug}-2026-07-22-r2.webp`), `${slug}\n`);
  }
  writeFileSync(join(sourceRepository, 'maps', 'legacy-2026-07-22.webp'), 'must not publish\n');

  run('git', ['init', '--initial-branch=main'], { cwd: sourceRepository });
  run('git', ['config', 'user.name', 'Deployment Test'], { cwd: sourceRepository });
  run('git', ['config', 'user.email', 'deployment-test@example.invalid'], {
    cwd: sourceRepository
  });
  run('git', ['add', '.'], { cwd: sourceRepository });
  run('git', ['commit', '-m', 'fixture'], { cwd: sourceRepository });
  const commit = run('git', ['rev-parse', 'HEAD'], { cwd: sourceRepository });

  const staticRoot = join(temporaryRoot, 'static');
  const publicDirectory = join(staticRoot, 'map-annotator');
  mkdirSync(publicDirectory, { recursive: true });
  writeFileSync(join(publicDirectory, 'index.html'), 'old-index\n');
  writeFileSync(join(publicDirectory, 'style.older.css'), 'older-style\n');
  writeFileSync(join(publicDirectory, 'app.older.js'), 'older-app\n');

  return {
    commit,
    publicDirectory,
    sourceRepository,
    staticRoot,
    temporaryRoot
  };
}

function updaterEnvironment(fixture, extra = {}) {
  return {
    ...process.env,
    STATIC_ROOT: fixture.staticRoot,
    REPO_URL: fixture.sourceRepository,
    BRANCH: 'main',
    ...extra
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test('repository index uses unversioned source assets for local serving', () => {
  const index = readFileSync(indexPath, 'utf8');

  assert.match(index, /href="\.\/style\.css"/);
  assert.match(index, /src="\.\/annotation-model\.js"/);
  assert.match(index, /src="\.\/data\/annotation-sets\.js"/);
  assert.match(index, /src="\.\/app\.js"/);
  assert.doesNotMatch(
    index,
    /(?:style\.css|annotation-model\.js|annotation-sets\.js|app\.js)\?/
  );
});

test('publishes an index atomically only after its commit-versioned assets exist', (t) => {
  const fixture = createDeploymentFixture(t);
  const wrapperDirectory = join(fixture.temporaryRoot, 'bin');
  const observationPath = join(fixture.temporaryRoot, 'publication-observation');
  mkdirSync(wrapperDirectory);
  const mvWrapper = join(wrapperDirectory, 'mv');
  writeFileSync(
    mvWrapper,
    `#!/bin/sh
previous=
destination=
for argument in "$@"; do
    previous=$destination
    destination=$argument
done
case $destination in
    */map-annotator/index.html)
        [ "$(cat "$destination")" = "old-index" ] || exit 91
        for map_slug in $MAP_SLUGS; do
            [ -s "$(dirname "$destination")/maps/$map_slug-2026-07-22-r2.webp" ] || exit 93
        done
        references=$(sed -n \\
            -e 's/.*href="\\.\\/\\([^\"]*\\)".*/\\1/p' \\
            -e 's/.*src="\\.\\/\\([^\"]*\\)".*/\\1/p' \\
            "$previous")
        for reference in $references; do
            [ -f "$(dirname "$destination")/$reference" ] || exit 92
            printf '%s\\n' "$reference" >> "$PUBLISH_OBSERVATION"
        done
        ;;
esac
exec /usr/bin/mv "$@"
`
  );
  chmodSync(mvWrapper, 0o755);

  const result = spawnSync('sh', [deployScriptPath], {
    encoding: 'utf8',
    env: updaterEnvironment(fixture, {
      PATH: `${wrapperDirectory}:${process.env.PATH}`,
      PUBLISH_OBSERVATION: observationPath,
      MAP_SLUGS: mapSlugs.join(' ')
    })
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  const expectedAssets = [
    `style.${fixture.commit}.css`,
    `annotation-model.${fixture.commit}.js`,
    `annotation-sets.${fixture.commit}.js`,
    `app.${fixture.commit}.js`
  ];
  const publishedIndex = readFileSync(join(fixture.publicDirectory, 'index.html'), 'utf8');
  for (const asset of expectedAssets) {
    assert.match(publishedIndex, new RegExp(`(?:href|src)="\\./${escapeRegExp(asset)}"`));
    assert.equal(readFileSync(join(fixture.publicDirectory, asset), 'utf8').startsWith('new-'), true);
  }
  assert.deepEqual(readFileSync(observationPath, 'utf8').trim().split('\n'), expectedAssets);
  for (const slug of mapSlugs) {
    assert.equal(
      readFileSync(join(fixture.publicDirectory, 'maps', `${slug}-2026-07-22-r2.webp`), 'utf8'),
      `${slug}\n`
    );
  }
  assert.equal(
    readFileSync(join(fixture.sourceRepository, 'maps', 'legacy-2026-07-22.webp'), 'utf8'),
    'must not publish\n'
  );
  assert.throws(() => readFileSync(join(fixture.publicDirectory, 'maps', 'legacy-2026-07-22.webp')));
  assert.equal(readFileSync(join(fixture.publicDirectory, 'style.older.css'), 'utf8'), 'older-style\n');
  assert.equal(readFileSync(join(fixture.publicDirectory, 'app.older.js'), 'utf8'), 'older-app\n');
});

test('keeps the installed index unchanged when a versioned asset install fails', (t) => {
  const fixture = createDeploymentFixture(t);
  const wrapperDirectory = join(fixture.temporaryRoot, 'bin');
  mkdirSync(wrapperDirectory);
  const installWrapper = join(wrapperDirectory, 'install');
  writeFileSync(
    installWrapper,
    `#!/bin/sh
destination=
for argument in "$@"; do
    destination=$argument
done
case $(basename "$destination") in
    app.${fixture.commit}.js) exit 89 ;;
esac
exec /usr/bin/install "$@"
`
  );
  chmodSync(installWrapper, 0o755);

  const result = spawnSync('sh', [deployScriptPath], {
    encoding: 'utf8',
    env: updaterEnvironment(fixture, { PATH: `${wrapperDirectory}:${process.env.PATH}` })
  });

  assert.equal(result.status, 89, result.stderr || result.stdout);
  assert.equal(readFileSync(join(fixture.publicDirectory, 'index.html'), 'utf8'), 'old-index\n');
  assert.equal(
    readFileSync(join(fixture.publicDirectory, 'style.older.css'), 'utf8'),
    'older-style\n'
  );
});
