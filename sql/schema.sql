BEGIN;

CREATE SCHEMA IF NOT EXISTS api;

CREATE OR REPLACE FUNCTION api.map_annotation_points_are_valid(candidate jsonb)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
PARALLEL SAFE
AS $function$
DECLARE
  waypoint jsonb;
  waypoint_x numeric;
  waypoint_y numeric;
BEGIN
  IF candidate IS NULL OR jsonb_typeof(candidate) <> 'array' THEN
    RETURN false;
  END IF;

  IF jsonb_array_length(candidate) = 0 THEN
    RETURN false;
  END IF;

  FOR waypoint IN SELECT value FROM jsonb_array_elements(candidate)
  LOOP
    IF jsonb_typeof(waypoint) <> 'object' THEN
      RETURN false;
    END IF;

    IF NOT (waypoint ? 'x')
       OR NOT (waypoint ? 'y')
       OR (SELECT count(*) FROM jsonb_object_keys(waypoint)) <> 2 THEN
      RETURN false;
    END IF;

    IF jsonb_typeof(waypoint -> 'x') <> 'number'
       OR jsonb_typeof(waypoint -> 'y') <> 'number' THEN
      RETURN false;
    END IF;

    BEGIN
      waypoint_x := (waypoint ->> 'x')::numeric;
      waypoint_y := (waypoint ->> 'y')::numeric;
    EXCEPTION
      WHEN invalid_text_representation OR numeric_value_out_of_range THEN
        RETURN false;
    END;

    IF waypoint_x < 0 OR waypoint_x > 1 OR waypoint_y < 0 OR waypoint_y > 1 THEN
      RETURN false;
    END IF;
  END LOOP;

  RETURN true;
END;
$function$;

CREATE TABLE api.map_annotations (
  map_id text NOT NULL,
  map_version text NOT NULL,
  hero_id text NOT NULL,
  mode_id text NOT NULL,
  task_id text NOT NULL,
  points jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT map_annotations_pkey
    PRIMARY KEY (map_id, map_version, hero_id, mode_id, task_id),
  CONSTRAINT map_annotations_points_valid
    CHECK (api.map_annotation_points_are_valid(points))
);

GRANT USAGE ON SCHEMA api TO web_anon;
GRANT SELECT, INSERT, UPDATE ON api.map_annotations TO web_anon;

NOTIFY pgrst, 'reload schema';
COMMIT;
