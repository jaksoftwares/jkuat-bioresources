import { z } from "zod";

export const TaxonomicInformationSchema = z.object({
  type_of_organism: z.enum(["Bacteria", "Fungi", "Yeast", "Algae", "Virus", "Other"]),
  genus: z.string().min(1, "Genus is required"),
  species: z.string().min(1, "Species is required"),
  is_type_strain: z.boolean(),
  strain_number: z.string().min(1, "Strain number is required"),
  ncbi_16s_accession_number: z.string().optional(),
});

export const DetailsOfIsolationSchema = z.object({
  source_of_isolation: z.string().min(1, "Source of isolation is required"),
  isolated_by: z.string().min(1, "Isolated by is required"),
  isolation_date: z.string().optional(),
  village: z.string().optional(),
  town: z.string().optional(),
  county: z.string().optional(),
  pin_code: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  gps_coordinates: z.string().optional(),
});

export const PathogenicityInformationSchema = z.object({
  is_pathogenic: z.boolean(),
  pathogenic_to_human: z.boolean(),
  pathogenic_to_plant: z.boolean(),
  pathogenic_to_animal: z.boolean(),
  biohazard_group: z.enum(["1", "2", "3", "4"]),
});

export const AvailabilityInformationSchema = z.object({
  is_available: z.boolean(),
  form_of_supply: z.array(z.enum(["Active", "Frozen", "Lyophilized", "DNA"])),
  received_from_other_pi: z.boolean(),
  pi_organization_name: z.string().optional(),
  other_culture_collection_numbers: z.string().optional(),
});

export const CBDInformationSchema = z.object({
  pic_taken: z.boolean(),
  pic_issuing_authority: z.string().optional(),
});

export const GrowthRelatedInformationSchema = z.object({
  isolation_medium_name: z.string().optional(),
  growth_medium_name: z.string().min(1, "Growth medium is required"),
  medium_composition: z.string().optional(),
  ph_range: z.string().optional(),
  optimum_ph: z.number().optional(),
  temperature_range_celsius: z.string().optional(),
  optimum_temperature_celsius: z.number().optional(),
  salt_range_percentage: z.string().optional(),
  optimum_salt_concentration: z.string().optional(),
  oxygen_requirement: z.enum(["Aerobic", "Anaerobic", "Microaerophilic", "Facultative Anaerobe", "Unknown"]),
  special_growth_requirements: z.string().optional(),
  incubation_time_days: z.number().optional(),
  subculturing_period_days: z.number().optional(),
});

export const PreservationInformationSchema = z.object({
  preservation_in_ln2: z.boolean(),
  lyophilization: z.boolean(),
  active_form: z.boolean(),
  mineral_oil: z.boolean(),
  at_4_celsius: z.boolean(),
  other_preservation_methods: z.string().optional(),
});

export const IdentificationInformationSchema = z.object({
  identified_by: z.string().min(1, "Identifier is required"),
  identification_date: z.string().optional(),
  gene_accession_number: z.string().optional(),
  sequence_text: z.string().optional(),
  maldi_system_similarity_index: z.number().optional(),
  biolog_system_similarity_index: z.number().optional(),
  fame_analysis_similarity_index: z.number().optional(),
  api_system: z.string().optional(),
});

export const SpecialFeatureInformationSchema = z.object({
  important_properties_applications: z.string().optional(),
  patent_info: z.string().optional(),
  references: z.string().optional(),
});

export const DepositorInformationSchema = z.object({
  depositor_name: z.string().min(1, "Depositor name is required"),
  address: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone_number: z.string().optional(),
  dispatch_date: z.string().optional(),
});

export const MorphologicalIdentificationSchema = z.object({
  size: z.string().optional(),
  shape: z.string().optional(),
  color: z.string().optional(),
  margin: z.string().optional(),
  elevation: z.string().optional(),
  consistency: z.string().optional(),
  opacity: z.string().optional(),
  gram_nature: z.enum(["Positive", "Negative", "Variable", "Unknown"]).optional(),
  cell_morphology: z.string().optional(),
  capsule: z.boolean().optional(),
  spore: z.boolean().optional(),
  flagella: z.boolean().optional(),
  motility: z.boolean().optional(),
});

export const MolecularIdentificationSchema = z.object({
  gene_used_for_identification: z.string().optional(),
  cultured: z.string().optional(),
  cultured_similarity_percentage: z.number().optional(),
  uncultured: z.string().optional(),
  uncultured_similarity_percentage: z.number().optional(),
  type_strain: z.string().optional(),
  type_strain_similarity_percentage: z.number().optional(),
  gc_content_percentage: z.number().optional(),
  tm_celsius: z.number().optional(),
});

export const BiochemicalInformationSchema = z.object({
  results: z.record(z.string(), z.string()).optional(),
});

export const MicroorganismSchema = z.object({
  id: z.string().uuid().optional(), // optional for creates
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().optional(),
  scientific_name: z.string().min(1, "Scientific name is required"),
  category: z.string().optional(),
  taxonomic_information: TaxonomicInformationSchema,
  details_of_isolation: DetailsOfIsolationSchema,
  pathogenicity_information: PathogenicityInformationSchema,
  availability_information: AvailabilityInformationSchema,
  cbd_information: CBDInformationSchema,
  growth_related_information: GrowthRelatedInformationSchema,
  preservation_information: PreservationInformationSchema,
  identification_information: IdentificationInformationSchema,
  special_feature_information: SpecialFeatureInformationSchema,
  depositor_information: DepositorInformationSchema,
  morphological_identification: MorphologicalIdentificationSchema.optional(),
  molecular_identification: MolecularIdentificationSchema.optional(),
  biochemical_information: BiochemicalInformationSchema.optional(),
  images: z.array(z.object({ url: z.string(), caption: z.string().optional() })).optional()
});

export type MicroorganismFormData = z.infer<typeof MicroorganismSchema>;
