import { Microorganism } from "./types";

type LegacyMedia = { url?: string; secure_url?: string; caption?: string; name?: string };
type RawMicroorganism = Partial<Microorganism> & Record<string, unknown>;

const first = <T>(...values: T[]) => values.find((value) => value !== undefined && value !== null && value !== "");
const asString = (value: unknown) => value === undefined || value === null ? undefined : String(value);
const asNumber = (value: unknown) => {
  if (value === undefined || value === null || value === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};
const asBoolean = (value: unknown, fallback = false) => typeof value === "boolean" ? value : value === undefined ? fallback : value === "true" || value === 1 || value === "1";

const mediaItems = (items: LegacyMedia[] | undefined, fallback: LegacyMedia[] = []) => [...(items || []), ...fallback]
  .filter((item) => item?.url || item?.secure_url)
  .map((item) => ({
    ...item,
    url: item.url || item.secure_url || "",
    ...(item.caption ? { caption: item.caption } : {}),
    ...(item.name ? { name: item.name } : {}),
  }));

export function normalizeMicroorganism(input: RawMicroorganism): Microorganism {
  const tax = (input.taxonomic_information || {}) as Record<string, unknown>;
  const isolation = (input.details_of_isolation || {}) as Record<string, unknown>;
  const pathogenicity = (input.pathogenicity_information || {}) as Record<string, unknown>;
  const availability = (input.availability_information || {}) as Record<string, unknown>;
  const cbd = (input.cbd_information || {}) as Record<string, unknown>;
  const growth = (input.growth_related_information || {}) as Record<string, unknown>;
  const preservation = (input.preservation_information || {}) as Record<string, unknown>;
  const identification = (input.identification_information || {}) as Record<string, unknown>;
  const special = (input.special_feature_information || {}) as Record<string, unknown>;
  const depositor = (input.depositor_information || {}) as Record<string, unknown>;
  const legacyScientificName = asString(input.scientific_name);
  const legacyStrain = asString(input.strain_code);
  const legacySource = asString(input.source_isolated_from);
  const legacyImages = (input.microscopy_images || []) as LegacyMedia[];
  const legacyDocuments = (input.supporting_docs || []) as LegacyMedia[];

  return {
    id: input.id || "",
    ...(input.display_order !== undefined ? { display_order: Number(input.display_order) } : {}),
    created_at: input.created_at || "",
    updated_at: input.updated_at || "",
    ...(input.created_by ? { created_by: input.created_by } : {}),
    taxonomic_information: {
      ...tax,
      ...(legacyScientificName && !tax.scientific_name ? { scientific_name: legacyScientificName } : {}),
      type_of_organism: first(tax.type_of_organism, "Other") as any,
      genus: first(tax.genus, legacyScientificName, "Unknown") as string,
      species: first(tax.species, "") as string,
      is_type_strain: asBoolean(tax.is_type_strain),
      strain_number: first(asString(tax.strain_number), legacyStrain, input.id?.substring(0, 8), "UNTRACKED") as string,
      ...(tax.ncbi_16s_accession_number ? { ncbi_16s_accession_number: asString(tax.ncbi_16s_accession_number) } : {}),
    },
    details_of_isolation: {
      ...isolation,
      source_of_isolation: first(isolation.source_of_isolation, legacySource, "Unknown") as string,
      isolated_by: first(isolation.isolated_by, "Unknown") as string,
      country: first(isolation.country, "Unknown") as string,
    },
    pathogenicity_information: {
      ...pathogenicity,
      is_pathogenic: asBoolean(pathogenicity.is_pathogenic),
      pathogenic_to_human: asBoolean(pathogenicity.pathogenic_to_human),
      pathogenic_to_plant: asBoolean(pathogenicity.pathogenic_to_plant),
      pathogenic_to_animal: asBoolean(pathogenicity.pathogenic_to_animal),
      biohazard_group: ["1", "2", "3", "4"].includes(String(pathogenicity.biohazard_group)) ? String(pathogenicity.biohazard_group) as any : "1",
    },
    availability_information: { ...availability, is_available: asBoolean(availability.is_available), form_of_supply: Array.isArray(availability.form_of_supply) ? availability.form_of_supply.map(String) as any : [], received_from_other_pi: asBoolean(availability.received_from_other_pi) },
    cbd_information: { ...cbd, pic_taken: asBoolean(cbd.pic_taken) },
    growth_related_information: {
      ...growth,
      growth_medium_name: first(growth.growth_medium_name, input.growth_medium, "Unknown") as string,
      ...(growth.optimum_temperature_celsius === undefined && asNumber(input.optimum_temperature) !== undefined ? { optimum_temperature_celsius: asNumber(input.optimum_temperature) } : {}),
      ...(growth.ph_range === undefined && (input.min_ph !== undefined || input.max_ph !== undefined) ? { ph_range: `${input.min_ph ?? ""}-${input.max_ph ?? ""}` } : {}),
      oxygen_requirement: first(growth.oxygen_requirement, "Unknown") as any,
    },
    preservation_information: { ...preservation, preservation_in_ln2: asBoolean(preservation.preservation_in_ln2), lyophilization: asBoolean(preservation.lyophilization), active_form: asBoolean(preservation.active_form), mineral_oil: asBoolean(preservation.mineral_oil), at_4_celsius: asBoolean(preservation.at_4_celsius) },
    identification_information: { ...identification, identified_by: first(identification.identified_by, "Unknown") as string },
    special_feature_information: { ...special, ...(input.experiment_details && !special.legacy_experiment_details ? { legacy_experiment_details: asString(input.experiment_details) } : {}), ...(input.characteristics && !special.important_properties_applications ? { important_properties_applications: asString(input.characteristics) } : {}) } as any,
    depositor_information: { ...depositor, depositor_name: first(depositor.depositor_name, "Unknown") as string },
    ...(input.morphological_identification ? { morphological_identification: input.morphological_identification } : {}),
    ...(input.molecular_identification ? { molecular_identification: input.molecular_identification } : {}),
    biochemical_information: input.biochemical_information || { results: input.enzymatic_activity ? { legacy_enzymatic_activity: asString(input.enzymatic_activity) || "" } : {} },
    media: {
      images: mediaItems(input.media?.images, Array.isArray(input.images) ? input.images as LegacyMedia[] : legacyImages),
      documents: mediaItems(input.media?.documents, legacyDocuments),
    },
    payment_information: input.payment_information || {},
    administrative_information: input.administrative_information || {},
    ...(input.source_metadata ? { source_metadata: input.source_metadata } : {}),
  };
}