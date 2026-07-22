'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const model = require('../annotation-model.js');
const appSource = readFileSync(join(root, 'app.js'), 'utf8');
const index = readFileSync(join(root, 'index.html'), 'utf8');

test('annotation geometry follows the explicit operator tool and not prompt metadata', () => {
  assert.equal(model.normalizeAnnotationTool('point'), 'point');
  assert.equal(model.normalizeAnnotationTool('route'), 'route');
  assert.equal(model.normalizeAnnotationTool('unexpected'), 'point');

  assert.match(index, /<fieldset[^>]*id="annotation-tool"/);
  assert.match(index, /<input[^>]*name="annotation-tool"[^>]*value="point"[^>]*checked/);
  assert.match(index, /<input[^>]*name="annotation-tool"[^>]*value="route"/);

  assert.match(appSource, /let annotationTool = 'point';/);
  assert.match(appSource, /function selectAnnotationTool\(tool\)/);
  assert.match(appSource, /annotationTool = normalizeAnnotationTool\(tool\)/);
  assert.doesNotMatch(appSource, /annotationTool\s*=\s*taskMetadata/);
  assert.doesNotMatch(appSource, /annotationTool\s*=.*currentTask/);
  assert.doesNotMatch(appSource, /taskMetadata/);
  assert.match(appSource, /if \(annotationTool === 'route'\) \{[\s\S]*appendWaypoint/);
  assert.match(appSource, /hasMinimumPoints\(draft, 2\)/);
  assert.match(appSource, /saveAnnotation\(draft, true\)/);
  assert.match(appSource, /saveAnnotation\(\[point\], true\)/);
});
