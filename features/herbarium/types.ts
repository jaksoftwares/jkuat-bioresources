export interface TaxonomicInformation {
  family: string;
  genus: string;
  species: string;
  author_citation?: string;
  infraspecific_rank?: "subsp." | "var." | "forma";
  infraspecific_epithet?: string;
  synonyms?: string[];
  local_names?: string[];
}

export interface CollectionInformation {
  collector_name: string;
  collection_number: string;
  additional_collectors?: string[];
  collection_date: string; // ISO date string
  country: string;
  county?: string;
  locality_description: string;
  gps_coordinates?: string;
  elevation_meters?: number;
  habitat_description?: string;
}

export interface SpecimenDetails {
  herbarium_code: string; // e.g., "JKUAT-HB-001"
  barcode_number?: string;
  phenology?: "Vegetative" | "Flowering" | "Fruiting" | "Spores";
  life_form?: "Tree" | "Shrub" | "Herb" | "Climber" | "Epiphyte" | "Other";
  plant_description?: string; // Notes on color, smell, height when alive
}

export interface IdentificationInformation {
  identified_by: string;
  identification_date?: string;
  identification_notes?: string;
  is_type_specimen: boolean;
  type_status?: "Holotype" | "Isotype" | "Paratype" | "Syntype" | "Lectotype" | "Neotype";
}

export interface StorageInformation {
  cabinet_number?: string;
  shelf_number?: string;
  folder_number?: string;
  preservation_method: "Pressed & Dried" | "Spirit Collection" | "Carpological (Fruit/Seed)" | "Wood Sample";
  condition?: "Good" | "Fair" | "Poor" | "Damaged";
}

export interface HerbariumSpecimen {
  id: string;
  created_at: string;
  updated_at: string;
  created_by?: string;

  taxonomic_information: TaxonomicInformation;
  collection_information: CollectionInformation;
  specimen_details: SpecimenDetails;
  identification_information: IdentificationInformation;
  storage_information: StorageInformation;

  images?: Array<{ url: string; is_primary: boolean; caption?: string }>;
}
