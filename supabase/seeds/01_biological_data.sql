-- Standalone Seeding Script for Biological Data
-- Refactored for maximum compatibility with SQL runners

-- 1. Seed Plants
INSERT INTO plants (
    scientific_name, common_name, family_name, genus, species, 
    is_aiv, category, geographic_distribution, created_by, updated_by
) 
SELECT 
    v.scientific_name, v.common_name, v.family_name, v.genus, v.species, 
    v.is_aiv, v.category, v.geographic_distribution::jsonb, 
    COALESCE((SELECT id FROM auth.users WHERE email = 'jaksoftwares05@gmail.com' LIMIT 1), (SELECT id FROM auth.users LIMIT 1)),
    COALESCE((SELECT id FROM auth.users WHERE email = 'jaksoftwares05@gmail.com' LIMIT 1), (SELECT id FROM auth.users LIMIT 1))
FROM (VALUES 
    ('Solanum nigrum', 'Black Nightshade', 'Solanaceae', 'Solanum', 'nigrum', true, 'AIV', '["Kenya", "Tanzania"]'),
    ('Amaranthus dubius', 'Terere', 'Amaranthaceae', 'Amaranthus', 'dubius', true, 'AIV', '["Uganda", "Kenya"]'),
    ('Cleome gynandra', 'Saget', 'Cleomaceae', 'Cleome', 'gynandra', true, 'AIV', '["Kenya"]'),
    ('Vigna unguiculata', 'Kundre', 'Fabaceae', 'Vigna', 'unguiculata', true, 'AIV', '["Sub-Saharan Africa"]'),
    ('Cucurbita maxima', 'Pumpkin', 'Cucurbitaceae', 'Cucurbita', 'maxima', false, 'Vegetable', '["Global"]'),
    ('Moringa oleifera', 'Moringa', 'Moringaceae', 'Moringa', 'oleifera', false, 'Medicinal', '["Global"]')
) AS v(scientific_name, common_name, family_name, genus, species, is_aiv, category, geographic_distribution)
ON CONFLICT DO NOTHING;

-- 2. Seed Microorganisms
INSERT INTO microorganisms (
    scientific_name, strain_code, source_isolated_from, optimum_temperature, growth_medium, created_by
) 
SELECT 
    v.scientific_name, v.strain_code, v.source_isolated_from, v.optimum_temperature, v.growth_medium,
    COALESCE((SELECT id FROM auth.users WHERE email = 'jaksoftwares05@gmail.com' LIMIT 1), (SELECT id FROM auth.users LIMIT 1))
FROM (VALUES 
    ('Bacillus subtilis', 'MIC-001', 'Soil', 37.0, 'LB Broth'),
    ('Escherichia coli', 'MIC-002', 'Water', 37.0, 'Nutrient Agar'),
    ('Saccharomyces cerevisiae', 'MIC-003', 'Fruit', 30.0, 'YPD'),
    ('Pseudomonas aeruginosa', 'MIC-004', 'Soil', 37.0, 'Cetrimide')
) AS v(scientific_name, strain_code, source_isolated_from, optimum_temperature, growth_medium)
ON CONFLICT DO NOTHING;

-- 3. Seed Herbarium
INSERT INTO herbarium_specimens (
    herbarium_code, scientific_name, common_name, collection_date, physical_storage_location, created_by
) 
SELECT 
    v.herbarium_code, v.scientific_name, v.common_name, v.collection_date::date, v.physical_storage_location,
    COALESCE((SELECT id FROM auth.users WHERE email = 'jaksoftwares05@gmail.com' LIMIT 1), (SELECT id FROM auth.users LIMIT 1))
FROM (VALUES 
    ('JKUAT-BOT-001', 'Solanum nigrum', 'Black Nightshade', '2026-01-01', 'Cabinet A1'),
    ('JKUAT-BOT-002', 'Amaranthus dubius', 'Terere', '2026-01-05', 'Cabinet A2'),
    ('JKUAT-BOT-003', 'Cleome gynandra', 'Saget', '2026-01-10', 'Cabinet B1')
) AS v(herbarium_code, scientific_name, common_name, collection_date, physical_storage_location)
ON CONFLICT (herbarium_code) DO NOTHING;
