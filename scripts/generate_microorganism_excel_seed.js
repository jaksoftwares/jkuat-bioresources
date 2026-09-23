const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const inputPath = path.join(__dirname, '..', 'data', 'JKUAT Metadata_ii (1).xlsx');
const outputPath = path.join(__dirname, '..', 'supabase', 'seeds', '02_microorganisms_from_metadata.sql');
const workbook = XLSX.readFile(inputPath, { cellDates: true });
const rows = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1, { header: 1, defval: null });
const headers = rows[1];
const dataRows = rows.slice(2).filter((row) => Number.isInteger(Number(row[0])) && Number(row[0]) >= 1 && Number(row[0]) <= 47);

const text = (value) => value === null || value === undefined ? null : String(value).trim() || null;
const bool = (value) => /^(yes|true|1)$/i.test(text(value) || '');
const number = (value) => {
  if (value === null || value === undefined || value === '' || text(value) === 'v') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
const date = (value) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  return text(value);
};
const valueAt = (row, index) => row[index];
const group = (row, indexes) => Object.fromEntries(Object.entries(indexes).map(([key, index]) => [key, valueAt(row, index)]));
const clean = (object) => Object.fromEntries(Object.entries(object).filter(([, value]) => value !== null && value !== undefined && value !== ''));
const riskGroup = (value) => {
  const match = text(value)?.match(/[1-4]/);
  return match ? match[0] : '1';
};
const formOfSupply = (value) => (text(value) || '').split(/[,/]/).map((item) => item.trim()).filter(Boolean).map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase());
const rawValues = (row) => Object.fromEntries(headers.map((header, index) => [header || `column_${index + 1}`, valueAt(row, index)]).filter(([, value]) => value !== null && value !== undefined && value !== ''));
const sqlJson = (value) => `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;

const inserts = dataRows.map((row) => {
  const serial = Number(row[0]);
  const scientificName = [text(row[2]), text(row[3])].filter(Boolean).join(' ') || `Microbial strain ${serial}`;
  const taxonomic = clean({
    catalogue_number: serial,
    scientific_name: scientificName,
    type_of_organism: text(row[1]) || 'Other',
    genus: text(row[2]) || 'Unknown',
    species: text(row[3]) || '',
    is_type_strain: bool(row[5]),
    strain_number: text(row[6]) || `UNTRACKED-${serial}`,
    ncbi_16s_accession_number: text(row[7]),
  });
  const isolation = clean({ source_of_isolation: text(row[8]) || 'Unknown', isolated_by: text(row[9]) || 'Unknown', isolation_date: date(row[10]), village: text(row[11]), town: text(row[12]), county: text(row[13]), pin_code: text(row[14]), country: text(row[15]) || 'Unknown', gps_coordinates: text(row[16]) });
  const pathogenicity = { is_pathogenic: bool(row[17]), pathogenic_to_human: bool(row[18]), pathogenic_to_plant: bool(row[19]), pathogenic_to_animal: bool(row[20]), biohazard_group: riskGroup(row[21]) };
  const availability = clean({ is_available: bool(row[22]), form_of_supply: formOfSupply(row[23]), received_from_other_pi: bool(row[24]), pi_organization_name: text(row[25]), other_culture_collection_numbers: text(row[26]) });
  const cbd = clean({ pic_taken: bool(row[27]), pic_issuing_authority: text(row[28]) });
  const growth = clean({ isolation_medium_name: text(row[31]), growth_medium_name: text(row[32]) || 'Unknown', medium_composition: text(row[33]), ph_range: text(row[34]), optimum_ph: number(row[35]), temperature_range_celsius: text(row[36]), optimum_temperature_celsius: number(row[37]), salt_range_percentage: text(row[38]), optimum_salt_concentration: text(row[39]), oxygen_requirement: text(row[40]) || 'Unknown', special_growth_requirements: text(row[41]), incubation_time_days: number(row[42]), subculturing_period_days: number(row[43]) });
  const preservation = clean({ preservation_in_ln2: bool(row[44]), lyophilization: bool(row[45]), active_form: bool(row[46]), mineral_oil: bool(row[47]), at_4_celsius: bool(row[48]), other_preservation_methods: text(row[49]) });
  const identification = clean({ identified_by: text(row[50]) || 'Unknown', identification_date: date(row[51]), gene_accession_number: text(row[52]), sequence_text: text(row[53]), maldi_system_similarity_index: number(row[54]), biolog_system_similarity_index: number(row[55]), fame_analysis_similarity_index: number(row[56]), api_system: text(row[57]) });
  const special = clean({ important_properties_applications: text(row[58]), patent_info: text(row[59]), references: text(row[60]) });
  const depositor = clean({ depositor_name: text(row[61]) || 'Unknown', address: text(row[62]), email: text(row[63]), phone_number: text(row[64]), dispatch_date: date(row[65]) });
  const payment = clean({ date_of_payment: date(row[66]), mode_of_payment: text(row[67]), payment_id: text(row[68]) });
  const administrative = clean({ signature: text(row[69]), record_date: date(row[70]), mcm_field_1: text(row[29]), mcm_field_2: text(row[30]) });
  const morphology = clean({ size: text(row[72]), shape: text(row[73]), color: text(row[74]), margin: text(row[75]), elevation: text(row[76]), consistency: text(row[77]), opacity: text(row[78]), gram_nature: text(row[79]), cell_morphology: text(row[80]), capsule: text(row[81]), spore: text(row[82]), flagella: text(row[83]), motility: text(row[84]) });
  const molecular = clean({ gene_used_for_identification: text(row[85]), cultured: text(row[86]), cultured_similarity_percentage: number(row[87]), uncultured: text(row[88]), uncultured_similarity_percentage: number(row[89]), type_strain: text(row[90]), type_strain_similarity_percentage: number(row[91]), gc_content_percentage: number(row[92]), tm_celsius: number(row[93]) });
  const biochemical = { results: clean(Object.fromEntries(Array.from({ length: 10 }, (_, offset) => [`BT Imp ${offset + 1}`, text(row[94 + offset])]).filter(([, value]) => value))) };
  const sourceMetadata = { source_file: 'JKUAT Metadata_ii (1).xlsx', source_sheet: 'Sheet1', source_row: dataRows.indexOf(row) + 3, source_serial: serial, source_values: rawValues(row) };
  return `(${serial}, ${sqlJson(taxonomic)}, ${sqlJson(isolation)}, ${sqlJson(pathogenicity)}, ${sqlJson(availability)}, ${sqlJson(cbd)}, ${sqlJson(growth)}, ${sqlJson(preservation)}, ${sqlJson(identification)}, ${sqlJson(special)}, ${sqlJson(depositor)}, ${sqlJson(morphology)}, ${sqlJson(molecular)}, ${sqlJson(biochemical)}, ${sqlJson(payment)}, ${sqlJson(administrative)}, ${sqlJson(sourceMetadata)})`;
});

const sql = `-- Generated from data/JKUAT Metadata_ii (1).xlsx\n-- Example and empty placeholder rows are excluded. Source order is preserved by display_order.\n\nBEGIN;\nALTER TABLE microorganisms\n  ADD COLUMN IF NOT EXISTS display_order integer,\n  ADD COLUMN IF NOT EXISTS payment_information jsonb NOT NULL DEFAULT '{}'::jsonb,\n  ADD COLUMN IF NOT EXISTS administrative_information jsonb NOT NULL DEFAULT '{}'::jsonb,\n  ADD COLUMN IF NOT EXISTS source_metadata jsonb NOT NULL DEFAULT '{}'::jsonb;\n\nDELETE FROM lab_test_tubes;\nDELETE FROM microorganisms;\n\nINSERT INTO microorganisms (display_order, taxonomic_information, details_of_isolation, pathogenicity_information, availability_information, cbd_information, growth_related_information, preservation_information, identification_information, special_feature_information, depositor_information, morphological_identification, molecular_identification, biochemical_information, payment_information, administrative_information, source_metadata) VALUES\n${inserts.join(',\n')};\n\nCOMMIT;\n`;
fs.writeFileSync(outputPath, sql);
console.log(`Generated ${dataRows.length} microorganism records in ${outputPath}`);