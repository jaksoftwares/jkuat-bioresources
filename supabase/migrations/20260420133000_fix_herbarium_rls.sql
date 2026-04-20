-- Fix RLS for herbarium_specimens
ALTER TABLE herbarium_specimens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view herbarium" ON herbarium_specimens;
DROP POLICY IF EXISTS "Staff and Researchers can manage herbarium" ON herbarium_specimens;

-- 1. All authenticated users can view specimens
CREATE POLICY "Public can view herbarium" 
ON herbarium_specimens FOR SELECT 
TO authenticated 
USING (true);

-- 2. Staff can manage all specimens, Researchers can manage their own
CREATE POLICY "Staff and Researchers can manage herbarium" 
ON herbarium_specimens FOR ALL 
TO authenticated 
USING (
  created_by = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() 
    AND r.name IN ('administrator', 'technical_team')
  )
)
WITH CHECK (
  created_by = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() 
    AND r.name IN ('administrator', 'technical_team')
  )
);
