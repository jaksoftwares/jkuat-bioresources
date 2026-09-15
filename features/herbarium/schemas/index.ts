import { z } from "zod";

export const TaxonomicInformationSchema = z.object({
  family: z.string().min(1, "Family is required"),
  genus: z.string().min(1, "Genus is required"),
  species: z.string().min(1, "Species is required"),
  author_citation: z.string().optional(),
  infraspecific_rank: z.enum(["subsp.", "var.", "forma"]).optional(),
  infraspecific_epithet: z.string().optional(),
  synonyms: z.array(z.string()).optional(),
  local_names: z.array(z.string()).optional(),
});

export const CollectionInformationSchema = z.object({
  collector_name: z.string().min(1, "Collector name is required"),
  collection_number: z.string().min(1, "Collection number is required"),
  additional_collectors: z.array(z.string()).optional(),
  collection_date: z.string().min(1, "Collection date is required"),
  country: z.string().min(1, "Country is required"),
  county: z.string().optional(),
  locality_description: z.string().min(1, "Locality description is required"),
  gps_coordinates: z.string().optional(),
  elevation_meters: z.number().optional(),
  habitat_description: z.string().optional(),
});

export const SpecimenDetailsSchema = z.object({
  herbarium_code: z.string().min(1, "Herbarium code is required"),
  barcode_number: z.string().optional(),
  phenology: z.enum(["Vegetative", "Flowering", "Fruiting", "Spores"]).optional(),
  life_form: z.enum(["Tree", "Shrub", "Herb", "Climber", "Epiphyte", "Other"]).optional(),
  plant_description: z.string().optional(),
});

export const IdentificationInformationSchema = z.object({
  identified_by: z.string().min(1, "Identifier is required"),
  identification_date: z.string().optional(),
  identification_notes: z.string().optional(),
  is_type_specimen: z.boolean(),
  type_status: z.enum(["Holotype", "Isotype", "Paratype", "Syntype", "Lectotype", "Neotype"]).optional(),
});

export const StorageInformationSchema = z.object({
  cabinet_number: z.string().optional(),
  shelf_number: z.string().optional(),
  folder_number: z.string().optional(),
  preservation_method: z.enum(["Pressed & Dried", "Spirit Collection", "Carpological (Fruit/Seed)", "Wood Sample"]),
  condition: z.enum(["Good", "Fair", "Poor", "Damaged"]).optional(),
});

export const HerbariumSpecimenSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().optional(),
  taxonomic_information: TaxonomicInformationSchema,
  collection_information: CollectionInformationSchema,
  specimen_details: SpecimenDetailsSchema,
  identification_information: IdentificationInformationSchema,
  storage_information: StorageInformationSchema,
  images: z.array(z.object({ url: z.string(), is_primary: z.boolean(), caption: z.string().optional() })).optional()
});

export type HerbariumSpecimenFormData = z.infer<typeof HerbariumSpecimenSchema>;
