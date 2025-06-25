
-- Create strategic_initiatives table
CREATE TABLE public.strategic_initiatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  initiative_name TEXT NOT NULL,
  financial_impact INTEGER NOT NULL CHECK (financial_impact >= 1 AND financial_impact <= 5),
  operational_complexity INTEGER NOT NULL CHECK (operational_complexity >= 1 AND operational_complexity <= 5),
  competitive_disruption INTEGER NOT NULL CHECK (competitive_disruption >= 1 AND competitive_disruption <= 5),
  time_urgency INTEGER NOT NULL CHECK (time_urgency >= 1 AND time_urgency <= 5),
  organization_id UUID REFERENCES public.healthcare_organizations(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.strategic_initiatives ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public access (since this is demo data)
CREATE POLICY "Allow public access to strategic initiatives" 
  ON public.strategic_initiatives 
  FOR ALL 
  USING (true);

-- Insert sample healthcare organizations first (using correct enum values)
INSERT INTO public.healthcare_organizations (id, name, type, market, beds, revenue)
VALUES 
  ('a1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Austin Regional Medical Center', 'Regional', 'Austin Metro', 450, 285000000),
  ('b2c3d4e5-f6a7-4901-bcde-f23456789012', 'Hill Country Community Hospital', 'Independent', 'Rural Texas', 125, 68000000),
  ('c3d4e5f6-a7b8-4012-cdef-345678901234', 'Texas Heart & Vascular Institute', 'Specialty', 'Dallas-Fort Worth', 200, 195000000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample strategic initiatives for each organization
INSERT INTO public.strategic_initiatives (
  initiative_name, 
  financial_impact, 
  operational_complexity, 
  competitive_disruption, 
  time_urgency, 
  organization_id, 
  description
) VALUES 
-- Austin Regional Medical Center initiatives
('Value-Based Care Transition', 4, 4, 4, 5, 'a1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Transition from fee-for-service to value-based payment models with focus on quality outcomes and cost reduction'),
('Nurse Retention Program', 3, 2, 2, 4, 'a1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Comprehensive workforce retention strategy including competitive compensation, career development, and wellness programs'),
('Epic EHR Implementation', 3, 5, 3, 3, 'a1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Complete migration to Epic electronic health record system across all departments'),
('Telehealth Platform Expansion', 4, 3, 4, 4, 'a1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Expand telehealth capabilities to reach rural patients and improve access to specialty care'),
('Robotic Surgery Center', 5, 4, 5, 2, 'a1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Establish state-of-the-art robotic surgery program to attract high-acuity cases'),

-- Hill Country Community Hospital initiatives  
('Rural Health Hub Development', 3, 3, 2, 4, 'b2c3d4e5-f6a7-4901-bcde-f23456789012', 'Transform facility into comprehensive rural health hub serving surrounding communities'),
('Physician Recruitment Initiative', 4, 3, 3, 5, 'b2c3d4e5-f6a7-4901-bcde-f23456789012', 'Aggressive recruitment of primary care and specialty physicians to address critical shortages'),
('Technology Infrastructure Upgrade', 2, 4, 2, 3, 'b2c3d4e5-f6a7-4901-bcde-f23456789012', 'Modernize IT infrastructure including network, cybersecurity, and clinical systems'),
('Emergency Department Expansion', 3, 4, 2, 3, 'b2c3d4e5-f6a7-4901-bcde-f23456789012', 'Expand and modernize emergency department to improve patient flow and capacity'),

-- Texas Heart & Vascular Institute initiatives
('AI-Powered Diagnostic Platform', 5, 4, 5, 4, 'c3d4e5f6-a7b8-4012-cdef-345678901234', 'Implement artificial intelligence for cardiac imaging analysis and predictive diagnostics'),
('Minimally Invasive Surgery Program', 4, 3, 4, 3, 'c3d4e5f6-a7b8-4012-cdef-345678901234', 'Expand minimally invasive cardiac and vascular surgery capabilities'),
('Clinical Research Expansion', 3, 3, 3, 2, 'c3d4e5f6-a7b8-4012-cdef-345678901234', 'Establish clinical research center to participate in cardiovascular device and drug trials'),
('Patient Experience Enhancement', 2, 2, 2, 4, 'c3d4e5f6-a7b8-4012-cdef-345678901234', 'Comprehensive patient experience improvement program focusing on communication and comfort'),
('Outpatient Catheterization Lab', 4, 3, 3, 3, 'c3d4e5f6-a7b8-4012-cdef-345678901234', 'Develop dedicated outpatient cardiac catheterization facility for same-day procedures');
