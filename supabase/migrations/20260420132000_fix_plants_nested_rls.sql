-- Fix RLS for plant-related tables
ALTER TABLE plant_local_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_recommendations ENABLE ROW LEVEL SECURITY;

-- 1. Local Names Policies
DROP POLICY IF EXISTS "Public can view local names" ON plant_local_names;
DROP POLICY IF EXISTS "Staff and Creators can manage local names" ON plant_local_names;

CREATE POLICY "Public can view local names" ON plant_local_names FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff and Creators can manage local names" ON plant_local_names FOR ALL TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM plants p WHERE p.id = plant_id AND (p.created_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = auth.uid() AND r.name IN ('administrator', 'technical_team')))
  )
);

-- 2. Recommendations Policies
DROP POLICY IF EXISTS "Public can view recommendations" ON plant_recommendations;
DROP POLICY IF EXISTS "Staff and Creators can manage recommendations" ON plant_recommendations;

CREATE POLICY "Public can view recommendations" ON plant_recommendations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff and Creators can manage recommendations" ON plant_recommendations FOR ALL TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM plants p WHERE p.id = plant_id AND (p.created_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = auth.uid() AND r.name IN ('administrator', 'technical_team')))
  )
);
