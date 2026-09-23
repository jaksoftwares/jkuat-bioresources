ALTER TABLE microorganisms
  ADD COLUMN IF NOT EXISTS display_order integer;

UPDATE microorganisms
SET taxonomic_information = jsonb_set(
  COALESCE(taxonomic_information, '{}'::jsonb),
  '{jkuat_number}',
  to_jsonb(COALESCE(
    source_metadata->>'jkuat_number',
    source_metadata->'source_values'->>'column_5',
    CONCAT('JKUAT-', display_order)
  )),
  true
)
WHERE COALESCE(taxonomic_information->>'jkuat_number', '') = '';