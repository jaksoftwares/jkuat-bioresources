-- Fix RLS for lab_test_tubes to allow researchers to store their samples
ALTER TABLE lab_test_tubes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view test tubes" ON lab_test_tubes;
DROP POLICY IF EXISTS "Researchers can manage their own test tubes" ON lab_test_tubes;
DROP POLICY IF EXISTS "Staff can manage all test tubes" ON lab_test_tubes;

-- 1. Everyone authenticated can view where things are stored
CREATE POLICY "Public can view test tubes" 
ON lab_test_tubes FOR SELECT 
TO authenticated 
USING (true);

-- 2. Staff has full control
CREATE POLICY "Staff can manage all test tubes" 
ON lab_test_tubes FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() 
    AND r.name IN ('administrator', 'technical_team')
  )
);

-- 3. Researchers can manage test tubes for their own microorganisms
-- Note: microorganism_id in lab_test_tubes references microorganisms(id)
-- microorganisms(id) has created_by
CREATE POLICY "Researchers can manage their own test tubes" 
ON lab_test_tubes FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM microorganisms m
    WHERE m.id = lab_test_tubes.microorganism_id 
    AND m.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM microorganisms m
    WHERE m.id = microorganism_id 
    AND m.created_by = auth.uid()
  )
);
