
-- Check if RLS is enabled and what policies exist
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'healthcare_organizations';

-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'healthcare_organizations';

-- Create a policy to allow all users to insert organizations
-- (Since this appears to be a public onboarding wizard)
CREATE POLICY "Allow public insert on healthcare_organizations" 
ON public.healthcare_organizations 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Also allow public to read organizations (for the organizations list page)
CREATE POLICY "Allow public select on healthcare_organizations" 
ON public.healthcare_organizations 
FOR SELECT 
TO public 
USING (true);
