import { z } from "zod";

export const TaxonomicInformationSchema = z.object({
  family: z.string().min(1, "Family is required"),
  genus: z.string().min(1, "Genus is required"),
  species: z.string().min(1, "Species is required"),
  subspecies_or_variety: z.string().optional(),
  common_names: z.array(z.string()).optional(),
  local_vernacular_names: z.array(z.string()).optional(),
});

export const AccessionInformationSchema = z.object({
  accession_number: z.string().min(1, "Accession number is required"),
  collection_date: z.string().min(1, "Collection date is required"),
  source_type: z.enum(["Wild", "Cultivated", "Market", "Other Institute"]),
  donor_institute: z.string().optional(),
});

export const OriginInformationSchema = z.object({
  country_of_origin: z.string().min(1, "Country of origin is required"),
  county: z.string().optional(),
  village_or_town: z.string().optional(),
  gps_coordinates: z.string().optional(),
  altitude_meters: z.number().optional(),
  habitat_description: z.string().optional(),
});

export const BotanicalInformationSchema = z.object({
  life_form: z.enum(["Tree", "Shrub", "Herb", "Vine", "Grass", "Other"]),
  growth_habit: z.string().optional(),
  phenology_at_collection: z.enum(["Vegetative", "Flowering", "Fruiting"]).optional(),
});

export const ConservationInformationSchema = z.object({
  iucn_red_list_category: z.enum(["NE", "DD", "LC", "NT", "VU", "EN", "CR", "EW", "EX"]).optional(),
  cites_appendix: z.enum(["I", "II", "III", "None"]).optional(),
});

export const UtilizationInformationSchema = z.object({
  primary_uses: z.array(z.enum(["Food", "Medicinal", "Timber", "Ornamental", "Forage", "Other"])).optional(),
  specific_medicinal_uses: z.string().optional(),
  cultural_significance: z.string().optional(),
});

export const CultivationInformationSchema = z.object({
  propagation_method: z.array(z.enum(["Seed", "Cutting", "Grafting", "Tissue Culture"])).optional(),
  soil_preference: z.string().optional(),
  light_requirement: z.enum(["Full Sun", "Partial Shade", "Full Shade"]).optional(),
  water_requirement: z.enum(["Low", "Medium", "High"]).optional(),
});

export const ConservationStatusSchema = z.object({
  is_in_seed_bank: z.boolean(),
  seed_viability_percentage: z.number().min(0).max(100).optional(),
  is_in_live_field_genebank: z.boolean(),
  field_plot_number: z.string().optional(),
});

export const PlantResourceSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().optional(),
  taxonomic_information: TaxonomicInformationSchema,
  accession_information: AccessionInformationSchema,
  origin_information: OriginInformationSchema,
  botanical_information: BotanicalInformationSchema,
  conservation_information: ConservationInformationSchema,
  utilization_information: UtilizationInformationSchema,
  cultivation_information: CultivationInformationSchema,
  conservation_status: ConservationStatusSchema,
  images: z.array(z.object({ url: z.string(), is_primary: z.boolean(), caption: z.string().optional() })).optional()
});

export type PlantResourceFormData = z.infer<typeof PlantResourceSchema>;
