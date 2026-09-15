export interface TaxonomicInformation {
  type_of_organism: "Bacteria" | "Fungi" | "Yeast" | "Algae" | "Virus" | "Other";
  genus: string;
  species: string;
  is_type_strain: boolean;
  strain_number: string;
  ncbi_16s_accession_number?: string;
}

export interface DetailsOfIsolation {
  source_of_isolation: string;
  isolated_by: string;
  isolation_date?: string; // ISO date string
  village?: string;
  town?: string;
  county?: string;
  pin_code?: string;
  country: string;
  gps_coordinates?: string;
}

export interface PathogenicityInformation {
  is_pathogenic: boolean;
  pathogenic_to_human: boolean;
  pathogenic_to_plant: boolean;
  pathogenic_to_animal: boolean;
  biohazard_group: "1" | "2" | "3" | "4";
}

export interface AvailabilityInformation {
  is_available: boolean;
  form_of_supply: Array<"Active" | "Frozen" | "Lyophilized" | "DNA">;
  received_from_other_pi: boolean;
  pi_organization_name?: string;
  other_culture_collection_numbers?: string;
}

export interface CBDInformation {
  pic_taken: boolean; // Prior Informed Consent (Nagoya Protocol)
  pic_issuing_authority?: string;
}

export interface GrowthRelatedInformation {
  isolation_medium_name?: string;
  growth_medium_name: string;
  medium_composition?: string;
  ph_range?: string;
  optimum_ph?: number;
  temperature_range_celsius?: string;
  optimum_temperature_celsius?: number;
  salt_range_percentage?: string;
  optimum_salt_concentration?: string;
  oxygen_requirement: "Aerobic" | "Anaerobic" | "Microaerophilic" | "Facultative Anaerobe" | "Unknown";
  special_growth_requirements?: string;
  incubation_time_days?: number;
  subculturing_period_days?: number;
}

export interface PreservationInformation {
  preservation_in_ln2: boolean;
  lyophilization: boolean;
  active_form: boolean;
  mineral_oil: boolean;
  at_4_celsius: boolean;
  other_preservation_methods?: string;
}

export interface IdentificationInformation {
  identified_by: string;
  identification_date?: string;
  gene_accession_number?: string;
  sequence_text?: string;
  maldi_system_similarity_index?: number;
  biolog_system_similarity_index?: number;
  fame_analysis_similarity_index?: number;
  api_system?: string; // API NE/API 50 CH/API ZYM/Vitek
}

export interface SpecialFeatureInformation {
  important_properties_applications?: string;
  patent_info?: string;
  references?: string;
}

export interface DepositorInformation {
  depositor_name: string;
  address?: string;
  email?: string;
  phone_number?: string;
  dispatch_date?: string;
}

export interface PaymentInformation {
  date_of_payment?: string;
  mode_of_payment?: string;
  id_of_payment?: string;
}

export interface MorphologicalIdentification {
  size?: string;
  shape?: string;
  color?: string;
  margin?: string;
  elevation?: string;
  consistency?: string;
  opacity?: string;
  gram_nature?: "Positive" | "Negative" | "Variable" | "Unknown";
  cell_morphology?: string;
  capsule?: boolean;
  spore?: boolean;
  flagella?: boolean;
  motility?: boolean;
}

export interface MolecularIdentification {
  gene_used_for_identification?: string;
  cultured?: string;
  cultured_similarity_percentage?: number;
  uncultured?: string;
  uncultured_similarity_percentage?: number;
  type_strain?: string;
  type_strain_similarity_percentage?: number;
  gc_content_percentage?: number;
  tm_celsius?: number;
}

export interface BiochemicalInformation {
  // Capturing the 'BT Imp' 1-10 generic fields from Excel template
  results: Record<string, string>;
}

export interface Microorganism {
  id: string;
  created_at: string;
  updated_at: string;
  created_by?: string;

  // The 13 Sub-domains based on JKUAT Metadata_ii.xlsx
  taxonomic_information: TaxonomicInformation;
  details_of_isolation: DetailsOfIsolation;
  pathogenicity_information: PathogenicityInformation;
  availability_information: AvailabilityInformation;
  cbd_information: CBDInformation;
  growth_related_information: GrowthRelatedInformation;
  preservation_information: PreservationInformation;
  identification_information: IdentificationInformation;
  special_feature_information: SpecialFeatureInformation;
  depositor_information: DepositorInformation;
  payment_information?: PaymentInformation;
  morphological_identification?: MorphologicalIdentification;
  molecular_identification?: MolecularIdentification;
  biochemical_information?: BiochemicalInformation;
  
  images?: Array<{ url: string; caption?: string }>;
}
