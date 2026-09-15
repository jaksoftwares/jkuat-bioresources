const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const excelPath = path.join(__dirname, '../data/JKUAT Metadata_ii.xlsx');
const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets['Sheet1'];

// Convert to JSON, using Row 1 (0-indexed 1) as headers
// xlsx sheet_to_json does this automatically if we specify range
const rawData = xlsx.utils.sheet_to_json(sheet, { range: 1, defval: null });

let sqlStatements = `-- Seed script generated from JKUAT Metadata_ii.xlsx\n`;
sqlStatements += `-- Execute this in the Supabase SQL Editor\n\n`;

function escapeString(str) {
  if (str === null || str === undefined) return 'null';
  return `'${String(str).replace(/'/g, "''")}'`;
}

for (const row of rawData) {
  // Only process rows that have at least a Genus or Strain No.
  if (!row['Genus'] && !row['Strain No. ']) continue;

  const scientificName = `${row['Genus'] || ''} ${row['Species'] || ''}`.trim() || 'Unknown Organism';
  const category = row['Type of organism'] || 'Bacteria';

  // Map JSONB structures
  const taxonomic = {
    type_of_organism: row['Type of organism'],
    genus: row['Genus'],
    species: row['Species'],
    is_type_strain: row['Whether TYPE Strain'] === 'Yes' || row['Whether TYPE Strain'] === 'Y',
    strain_number: row['Strain No. '],
    ncbi_16s_accession_number: row['16s NCBI Accesion No.']
  };

  const isolation = {
    source_of_isolation: row['Source of Isolation'],
    isolated_by: row['Isolated by'],
    isolation_date: row['Isolation Date'],
    village: row['Village'],
    town: row['Town'],
    county: row['County'],
    pin: row['PIN'],
    country: row['Country'],
    gps_coordinates: row['GPS Coordinates']
  };

  const pathogenicity = {
    is_pathogenic: row['Is this strain pathogenic'] === 'Yes' || row['Is this strain pathogenic'] === 'Y',
    pathogenic_to_human: row['Human'] === 'Yes',
    pathogenic_to_plant: row['Plant'] === 'Yes',
    pathogenic_to_animal: row['Animal'] === 'Yes',
    biohazard_group: row['Biohazard Group'] ? String(row['Biohazard Group']) : "1"
  };

  const availability = {
    is_available: row['Is the culture available with you'] === 'Yes',
    form: row['In what form? (Active, Frozen, Lyophilized)'],
    received_from_other: row['Did you receive this strain from other investigator/ Organization?'] === 'Yes',
    other_pi_organization: row['If yes, name of PI and Organization/Department'],
    other_culture_collection_numbers: row['Other Culture Collection Numbers']
  };

  const cbd = {
    pic_taken: row['PIC Taken'] === 'Yes',
    pic_issuing_authority: row['Authority/organization who issued PIC']
  };

  const growth = {
    isolation_medium_name: row['Isolation Medium Name'],
    growth_medium_name: row['Growth Medium Name'],
    composition: row['Composition'],
    ph_range: row['pH Range'],
    optimum_ph: row['Optimum pH'],
    temperature_range_celsius: row['Temperature Range  (℃)'],
    optimum_temperature_celsius: row['Optimum Temperature (℃)'],
    salt_range_percentage: row['Salt Range (Percentage)'],
    optimum_salt_concentration: row['Optimum Salt Concentration'],
    oxygen_requirement: row['Aerobic/ Anaerobic/ Microaerophilic'],
    special_growth_requirement: row['Any speical growth requirment'],
    incubation_time_days: row['Incubation Time (days)'],
    subculturing_period_days: row['Subculturing Period (days)']
  };

  const preservation = {
    preservation_in_ln2: row['Preservation in LN2'] === 'Yes',
    lyophilization: row['Lyophilization'] === 'Yes',
    active_form: row['Active form'] === 'Yes',
    mineral_oil: row['Mineral oil'] === 'Yes',
    at_4_deg_celsius: row['at 4 Deg Celcius'] === 'Yes',
    any_other: row['Any other']
  };

  const identification = {
    identified_by: row['Identified by'],
    identification_date: row['Identification Date'],
    accession_number: row['16S rRNA / any other gene / Whole Genome Accession Number (If submitted to GenBank)'],
    sequence_text: row['Sequence Text (If not Submitted)'],
    maldi_similarity: row['MALDI system (Similarity index)'],
    biolog_similarity: row['BIOLOG system (Similarity index)'],
    fame_similarity: row['FAME Analysis (Similarity index)'],
    api_system: row['API system (API NE/API 50 CH/API ZYM/Vitek)']
  };

  const specialFeatures = {
    important_properties: row['Important properties/ Applications'],
    patent_info: row['Patent Info'],
    reference: row['Reference']
  };

  const morphological = {
    size: row['Size'],
    shape: row['Shape'],
    color: row['Color'],
    margin: row['Margin'],
    elevation: row['Elevation'],
    consistency: row['Consistency'],
    opacity: row['Opacity'],
    gram_nature: row['Gram nature'],
    cell_morphology: row['Cell Morphology'],
    capsule: row['Capsule'],
    spore: row['Spore'],
    flagella: row['Flagella'],
    motility: row['Motlity']
  };

  // Convert JS objects to JSON strings for SQL
  const taxJson = escapeString(JSON.stringify(taxonomic));
  const isoJson = escapeString(JSON.stringify(isolation));
  const pathJson = escapeString(JSON.stringify(pathogenicity));
  const availJson = escapeString(JSON.stringify(availability));
  const cbdJson = escapeString(JSON.stringify(cbd));
  const growthJson = escapeString(JSON.stringify(growth));
  const presJson = escapeString(JSON.stringify(preservation));
  const identJson = escapeString(JSON.stringify(identification));
  const featJson = escapeString(JSON.stringify(specialFeatures));
  const morphJson = escapeString(JSON.stringify(morphological));

  sqlStatements += `
INSERT INTO public.microorganisms (
  scientific_name, taxonomic_information, details_of_isolation, pathogenicity_information, 
  availability_information, cbd_information, growth_related_information, preservation_information, 
  identification_information, special_feature_information, morphological_identification
) VALUES (
  ${escapeString(scientificName)}, ${taxJson}::jsonb, ${isoJson}::jsonb, ${pathJson}::jsonb,
  ${availJson}::jsonb, ${cbdJson}::jsonb, ${growthJson}::jsonb, ${presJson}::jsonb,
  ${identJson}::jsonb, ${featJson}::jsonb, ${morphJson}::jsonb
);
`;
}

const outputPath = path.join(__dirname, '../supabase/seed_bacteria.sql');
fs.writeFileSync(outputPath, sqlStatements);
console.log(`Successfully generated ${outputPath}`);
