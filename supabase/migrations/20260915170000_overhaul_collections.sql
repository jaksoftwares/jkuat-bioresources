-- Migration: Overhaul Collections Schema (Phase 1)
-- Description: Updates the microorganisms, herbarium_specimens, and plants tables to support the deep metadata structures defined in JKUAT Metadata_ii.xlsx.
-- Using JSONB columns for grouped metadata allows for exact alignment with the TypeScript interfaces while maintaining high performance via GIN indexes.

-- 1. OVERHAUL MICROORGANISMS
ALTER TABLE microorganisms
  ADD COLUMN IF NOT EXISTS taxonomic_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS details_of_isolation JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS pathogenicity_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS availability_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS cbd_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS growth_related_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS preservation_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS identification_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS special_feature_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS depositor_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS morphological_identification JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS molecular_identification JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS biochemical_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Create GIN indexes for fast searching within the JSONB structures
CREATE INDEX IF NOT EXISTS idx_microorganisms_taxonomic ON microorganisms USING GIN (taxonomic_information);
CREATE INDEX IF NOT EXISTS idx_microorganisms_isolation ON microorganisms USING GIN (details_of_isolation);


-- 2. OVERHAUL HERBARIUM SPECIMENS
ALTER TABLE herbarium_specimens
  ADD COLUMN IF NOT EXISTS taxonomic_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS collection_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS specimen_details JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS identification_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS storage_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_herbarium_taxonomic ON herbarium_specimens USING GIN (taxonomic_information);
CREATE INDEX IF NOT EXISTS idx_herbarium_collection ON herbarium_specimens USING GIN (collection_information);


-- 3. OVERHAUL PLANTS
ALTER TABLE plants
  ADD COLUMN IF NOT EXISTS taxonomic_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS accession_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS origin_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS botanical_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS conservation_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS utilization_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS cultivation_information JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS conservation_status JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_plants_taxonomic ON plants USING GIN (taxonomic_information);
CREATE INDEX IF NOT EXISTS idx_plants_accession ON plants USING GIN (accession_information);
