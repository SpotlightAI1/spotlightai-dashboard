
-- Create enum for organization types
CREATE TYPE public.organization_type AS ENUM ('Independent', 'Regional', 'Specialty', 'Critical Access');

-- Create the healthcare_organizations table
CREATE TABLE public.healthcare_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type organization_type NOT NULL,
  revenue DECIMAL,
  beds INTEGER,
  market TEXT,
  strategic_priorities TEXT[],
  current_challenges TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.healthcare_organizations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (assuming this is reference data)
CREATE POLICY "Allow public read access to healthcare organizations" 
  ON public.healthcare_organizations 
  FOR SELECT 
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert healthcare organizations" 
  ON public.healthcare_organizations 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated users to update healthcare organizations" 
  ON public.healthcare_organizations 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_healthcare_organizations_updated_at 
  BEFORE UPDATE ON public.healthcare_organizations 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
