-- Consolidate microorganism metadata into the grouped JSONB model.
-- Every legacy value is copied before duplicate flat columns are removed.

ALTER TABLE microorganisms
  ADD COLUMN IF NOT EXISTS media JSONB NOT NULL DEFAULT '{"images": [], "documents": []}'::jsonb;

-- These objects reference the retired flat identity columns.
DROP VIEW IF EXISTS public.v_microorganism_storage;
DROP INDEX IF EXISTS public.idx_micro_sci_name;
DROP INDEX IF EXISTS public.idx_micro_strain;

UPDATE microorganisms
SET
  taxonomic_information = jsonb_strip_nulls(
    jsonb_build_object(
      'scientific_name', COALESCE(taxonomic_information->>'scientific_name', scientific_name),
      'type_of_organism', COALESCE(taxonomic_information->>'type_of_organism', 'Other'),
      'genus', COALESCE(taxonomic_information->>'genus', scientific_name, 'Unknown'),
      'species', COALESCE(taxonomic_information->>'species', ''),
      'is_type_strain', COALESCE((taxonomic_information->>'is_type_strain')::boolean, false),
      'strain_number', COALESCE(taxonomic_information->>'strain_number', strain_code, LEFT(id::text, 8))
    ) || taxonomic_information
  ),
  details_of_isolation = jsonb_strip_nulls(
    jsonb_build_object(
      'source_of_isolation', COALESCE(details_of_isolation->>'source_of_isolation', source_isolated_from, 'Unknown'),
      'isolated_by', COALESCE(details_of_isolation->>'isolated_by', 'Unknown'),
      'country', COALESCE(details_of_isolation->>'country', 'Unknown')
    ) || details_of_isolation
  ),
  pathogenicity_information = jsonb_build_object(
    'is_pathogenic', COALESCE((pathogenicity_information->>'is_pathogenic')::boolean, false),
    'pathogenic_to_human', COALESCE((pathogenicity_information->>'pathogenic_to_human')::boolean, false),
    'pathogenic_to_plant', COALESCE((pathogenicity_information->>'pathogenic_to_plant')::boolean, false),
    'pathogenic_to_animal', COALESCE((pathogenicity_information->>'pathogenic_to_animal')::boolean, false),
    'biohazard_group', CASE WHEN pathogenicity_information->>'biohazard_group' IN ('1', '2', '3', '4') THEN pathogenicity_information->>'biohazard_group' ELSE '1' END
  ) || pathogenicity_information,
  growth_related_information = jsonb_strip_nulls(
    jsonb_build_object(
      'growth_medium_name', COALESCE(growth_related_information->>'growth_medium_name', growth_medium, 'Unknown'),
      'optimum_temperature_celsius', COALESCE(growth_related_information->'optimum_temperature_celsius', to_jsonb(optimum_temperature)),
      'ph_range', COALESCE(growth_related_information->>'ph_range', CONCAT(COALESCE(min_ph::text, ''), '-', COALESCE(max_ph::text, ''))),
      'oxygen_requirement', COALESCE(growth_related_information->>'oxygen_requirement', 'Unknown')
    ) || growth_related_information
  ),
  special_feature_information = jsonb_strip_nulls(
    jsonb_build_object(
      'important_properties_applications', COALESCE(special_feature_information->>'important_properties_applications', characteristics),
      'legacy_experiment_details', COALESCE(special_feature_information->>'legacy_experiment_details', experiment_details)
    ) || special_feature_information
  ),
  biochemical_information = CASE
    WHEN enzymatic_activity IS NULL THEN COALESCE(biochemical_information, '{}'::jsonb)
    ELSE jsonb_set(COALESCE(biochemical_information, '{}'::jsonb), '{results,legacy_enzymatic_activity}', to_jsonb(enzymatic_activity), true)
  END,
  media = jsonb_build_object(
    'images', CASE WHEN jsonb_array_length(COALESCE(media->'images', '[]'::jsonb)) > 0 THEN media->'images' ELSE COALESCE(microscopy_images, '[]'::jsonb) END,
    'documents', COALESCE(media->'documents', supporting_docs, '[]'::jsonb)
  );

ALTER TABLE microorganisms
  DROP COLUMN IF EXISTS scientific_name,
  DROP COLUMN IF EXISTS strain_code,
  DROP COLUMN IF EXISTS source_isolated_from,
  DROP COLUMN IF EXISTS optimum_temperature,
  DROP COLUMN IF EXISTS min_ph,
  DROP COLUMN IF EXISTS max_ph,
  DROP COLUMN IF EXISTS growth_medium,
  DROP COLUMN IF EXISTS characteristics,
  DROP COLUMN IF EXISTS enzymatic_activity,
  DROP COLUMN IF EXISTS researcher_id,
  DROP COLUMN IF EXISTS experiment_details,
  DROP COLUMN IF EXISTS date_stored,
  DROP COLUMN IF EXISTS microscopy_images,
  DROP COLUMN IF EXISTS supporting_docs;

-- Keep the storage API stable while deriving identity from the canonical model.
CREATE VIEW public.v_microorganism_storage AS
SELECT
  m.id,
  m.taxonomic_information->>'scientific_name' AS scientific_name,
  m.taxonomic_information->>'strain_number' AS strain_code,
  f.code AS fridge_code,
  s.code AS shelf_code,
  tr.code AS tray_code,
  p.code AS partition_code,
  tt.tube_label
FROM microorganisms m
LEFT JOIN lab_test_tubes tt ON m.id = tt.microorganism_id
LEFT JOIN lab_partitions p ON tt.partition_id = p.id
LEFT JOIN lab_trays tr ON p.tray_id = tr.id
LEFT JOIN lab_shelves s ON tr.shelf_id = s.id
LEFT JOIN lab_fridges f ON s.fridge_id = f.id;

CREATE INDEX IF NOT EXISTS idx_microorganisms_taxonomic ON microorganisms USING GIN (taxonomic_information);