
-- Update healthcare_organizations table to include all wizard fields
ALTER TABLE healthcare_organizations 
ADD COLUMN IF NOT EXISTS annual_revenue_range TEXT,
ADD COLUMN IF NOT EXISTS employee_count INTEGER,
ADD COLUMN IF NOT EXISTS market_position TEXT,
ADD COLUMN IF NOT EXISTS ehr_system TEXT,
ADD COLUMN IF NOT EXISTS technology_maturity_level INTEGER CHECK (technology_maturity_level >= 1 AND technology_maturity_level <= 5),
ADD COLUMN IF NOT EXISTS change_management_capability INTEGER CHECK (change_management_capability >= 1 AND change_management_capability <= 5),
ADD COLUMN IF NOT EXISTS board_composition_type TEXT,
ADD COLUMN IF NOT EXISTS strategic_decision_timeline TEXT,
ADD COLUMN IF NOT EXISTS master_prompt TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS setup_wizard_version INTEGER DEFAULT 1;

-- Create stakeholders table
CREATE TABLE IF NOT EXISTS public.stakeholders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES healthcare_organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role_type TEXT NOT NULL,
  primary_contact BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create organization_priorities table
CREATE TABLE IF NOT EXISTS public.organization_priorities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES healthcare_organizations(id) ON DELETE CASCADE,
  priority_name TEXT NOT NULL,
  priority_rank INTEGER CHECK (priority_rank >= 1 AND priority_rank <= 5),
  target_completion_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create organization_challenges table  
CREATE TABLE IF NOT EXISTS public.organization_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES healthcare_organizations(id) ON DELETE CASCADE,
  challenge_name TEXT NOT NULL,
  severity_level INTEGER CHECK (severity_level >= 1 AND severity_level <= 5),
  mitigation_status TEXT DEFAULT 'planned' CHECK (mitigation_status IN ('planned', 'in-progress', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for new tables
ALTER TABLE public.stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_priorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_challenges ENABLE ROW LEVEL SECURITY;

-- Stakeholders policies (open for now, can be restricted later when auth is implemented)
CREATE POLICY "Allow all operations on stakeholders" ON public.stakeholders FOR ALL USING (true);

-- Organization priorities policies
CREATE POLICY "Allow all operations on organization_priorities" ON public.organization_priorities FOR ALL USING (true);

-- Organization challenges policies  
CREATE POLICY "Allow all operations on organization_challenges" ON public.organization_challenges FOR ALL USING (true);

-- Add triggers for updated_at columns
CREATE OR REPLACE TRIGGER trigger_stakeholders_updated_at
  BEFORE UPDATE ON public.stakeholders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER trigger_organization_priorities_updated_at
  BEFORE UPDATE ON public.organization_priorities  
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER trigger_organization_challenges_updated_at
  BEFORE UPDATE ON public.organization_challenges
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
