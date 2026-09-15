export interface TaxonomicInformation {
  family: string;
  genus: string;
  species: string;
  subspecies_or_variety?: string;
  common_names?: string[]; // e.g., "African Nightshade"
  local_vernacular_names?: string[]; // Local Kenyan names
}

export interface AccessionInformation {
  accession_number: string; // e.g., "JKUAT-PL-2023-001"
  collection_date: string; // ISO Date
  source_type: "Wild" | "Cultivated" | "Market" | "Other Institute";
  donor_institute?: string;
}

export interface OriginInformation {
  country_of_origin: string;
  county?: string;
  village_or_town?: string;
  gps_coordinates?: string;
  altitude_meters?: number;
  habitat_description?: string; // e.g., "Riverbank", "Semi-arid savanna"
}

export interface BotanicalInformation {
  life_form: "Tree" | "Shrub" | "Herb" | "Vine" | "Grass" | "Other";
  growth_habit?: string; // e.g., "Erect", "Creeping"
  phenology_at_collection?: "Vegetative" | "Flowering" | "Fruiting";
}

export interface ConservationInformation {
  iucn_red_list_category?: "NE" | "DD" | "LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX";
  cites_appendix?: "I" | "II" | "III" | "None";
}

export interface UtilizationInformation {
  primary_uses?: Array<"Food" | "Medicinal" | "Timber" | "Ornamental" | "Forage" | "Other">;
  specific_medicinal_uses?: string;
  cultural_significance?: string;
}

export interface CultivationInformation {
  propagation_method?: Array<"Seed" | "Cutting" | "Grafting" | "Tissue Culture">;
  soil_preference?: string;
  light_requirement?: "Full Sun" | "Partial Shade" | "Full Shade";
  water_requirement?: "Low" | "Medium" | "High";
}

export interface ConservationStatus {
  is_in_seed_bank: boolean;
  seed_viability_percentage?: number;
  is_in_live_field_genebank: boolean;
  field_plot_number?: string;
}

export interface PlantResource {
  id: string;
  created_at: string;
  updated_at: string;
  created_by?: string;

  taxonomic_information: TaxonomicInformation;
  accession_information: AccessionInformation;
  origin_information: OriginInformation;
  botanical_information: BotanicalInformation;
  conservation_information: ConservationInformation;
  utilization_information: UtilizationInformation;
  cultivation_information: CultivationInformation;
  conservation_status: ConservationStatus;

  images?: Array<{ url: string; is_primary: boolean; caption?: string }>;
}
