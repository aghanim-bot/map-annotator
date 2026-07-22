(function (root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AnnotationModel = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  function parseAnnotationRows(rows) {
    return new Map(rows.map((row) => [row.task_id, row.points]));
  }

  function seedRouteDrafts(savedAnnotations) {
    return new Map(
      [...savedAnnotations].map(([taskId, points]) => [
        taskId,
        points.map((point) => ({ ...point }))
      ])
    );
  }

  function buildAnnotationPayload(set, taskId, points, updatedAt) {
    return {
      map_id: set.mapId,
      map_version: set.mapVersion,
      hero_id: set.heroId,
      mode_id: set.modeId,
      task_id: taskId,
      points,
      updated_at: updatedAt
    };
  }

  function appendWaypoint(points, point) {
    return [...points, point];
  }

  function undoLastWaypoint(points) {
    return points.slice(0, -1);
  }

  function hasMinimumPoints(points, minimum) {
    return points.length >= minimum;
  }

  function normalizeAnnotationTool(tool) {
    return tool === 'route' ? 'route' : 'point';
  }

  function svgPolylinePoints(points) {
    const coordinate = (value) => String(Number((value * 100).toFixed(6)));
    return points.map((point) => `${coordinate(point.x)},${coordinate(point.y)}`).join(' ');
  }

  function setRouteOverlayHidden(routeOverlay, hidden) {
    if (hidden) routeOverlay.setAttribute('hidden', '');
    else routeOverlay.removeAttribute('hidden');
  }

  function taskMetadata(task) {
    const declared = task[3] || {};
    const kind = declared.kind === 'route' ? 'route' : 'point';
    const declaredMinimum = Number.isInteger(declared.minPoints) ? declared.minPoints : 0;
    return {
      kind,
      minPoints: kind === 'route' ? Math.max(2, declaredMinimum) : 1
    };
  }

  function selectionCapabilities(set) {
    const canAnnotate = set.imageryStatus === 'ready' && typeof set.mapImage === 'string';
    return {
      canAnnotate,
      canLoadImage: canAnnotate,
      canFetchRows: canAnnotate,
      canSave: canAnnotate,
      canClickMap: canAnnotate
    };
  }

  return {
    appendWaypoint,
    buildAnnotationPayload,
    hasMinimumPoints,
    normalizeAnnotationTool,
    parseAnnotationRows,
    seedRouteDrafts,
    selectionCapabilities,
    setRouteOverlayHidden,
    svgPolylinePoints,
    taskMetadata,
    undoLastWaypoint
  };
});
