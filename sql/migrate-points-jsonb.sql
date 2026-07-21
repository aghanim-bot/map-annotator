BEGIN;

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

ALTER TABLE api.map_annotations
  ADD COLUMN IF NOT EXISTS points jsonb;

DO $migration$
DECLARE
  has_x boolean;
  has_y boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'api'
      AND table_name = 'map_annotations'
      AND column_name = 'x'
  ) INTO has_x;

  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'api'
      AND table_name = 'map_annotations'
      AND column_name = 'y'
  ) INTO has_y;

  IF has_x AND has_y THEN
    EXECUTE $backfill$
      UPDATE api.map_annotations
      SET points = jsonb_build_array(jsonb_build_object('x', x, 'y', y))
      WHERE points IS NULL
    $backfill$;
  ELSIF EXISTS (SELECT 1 FROM api.map_annotations WHERE points IS NULL) THEN
    RAISE EXCEPTION 'cannot backfill points because the legacy x/y columns are missing';
  END IF;
END;
$migration$;

ALTER TABLE api.map_annotations
  ALTER COLUMN points SET NOT NULL,
  DROP CONSTRAINT IF EXISTS map_annotations_points_valid;

ALTER TABLE api.map_annotations
  ADD CONSTRAINT map_annotations_points_valid
  CHECK (api.map_annotation_points_are_valid(points));

ALTER TABLE api.map_annotations
  DROP COLUMN IF EXISTS x,
  DROP COLUMN IF EXISTS y;

NOTIFY pgrst, 'reload schema';
COMMIT;
