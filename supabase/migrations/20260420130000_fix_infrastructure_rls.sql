-- Fix RLS policies for lab infrastructure to allow management by staff
-- This assumes existence of 'administrator' and 'technical_team' roles as discussed in the app

-- 1. Lab Fridges
ALTER TABLE lab_fridges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view fridges" ON lab_fridges;
DROP POLICY IF EXISTS "Staff can manage fridges" ON lab_fridges;

CREATE POLICY "Public can view fridges" 
ON lab_fridges FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Staff can manage fridges" 
ON lab_fridges FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() 
    AND r.name IN ('administrator', 'technical_team')
  )
);

-- 2. Lab Shelves
ALTER TABLE lab_shelves ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view shelves" ON lab_shelves;
DROP POLICY IF EXISTS "Staff can manage shelves" ON lab_shelves;

CREATE POLICY "Public can view shelves" 
ON lab_shelves FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Staff can manage shelves" 
ON lab_shelves FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() 
    AND r.name IN ('administrator', 'technical_team')
  )
);

-- 3. Lab Trays
ALTER TABLE lab_trays ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view trays" ON lab_trays;
DROP POLICY IF EXISTS "Staff can manage trays" ON lab_trays;

CREATE POLICY "Public can view trays" 
ON lab_trays FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Staff can manage trays" 
ON lab_trays FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() 
    AND r.name IN ('administrator', 'technical_team')
  )
);

-- 4. Lab Partitions
ALTER TABLE lab_partitions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view partitions" ON lab_partitions;
DROP POLICY IF EXISTS "Staff can manage partitions" ON lab_partitions;

CREATE POLICY "Public can view partitions" 
ON lab_partitions FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Staff can manage partitions" 
ON lab_partitions FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() 
    AND r.name IN ('administrator', 'technical_team')
  )
);

-- 5. Researchers can also create if needed (Optional, but let's stick to management being Staff)
-- But user said: "seeding new records on-the-fly" should work for researchers too.
-- Let's update the policy to include researchers for INSERT only if we want that.
-- User said: "register the lab infrastructure then by the technical team" - so let's stick to staff for now.
