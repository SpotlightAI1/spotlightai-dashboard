
-- Create service_line_benchmarks table
CREATE TABLE public.service_line_benchmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_type TEXT NOT NULL,
  service_line TEXT NOT NULL,
  average_revenue_percentage DECIMAL,
  market_position TEXT,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create strategic_insights table
CREATE TABLE public.strategic_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.healthcare_organizations(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL,
  content TEXT NOT NULL,
  confidence_score DECIMAL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on both tables
ALTER TABLE public.service_line_benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategic_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for service_line_benchmarks (public read access for benchmark data)
CREATE POLICY "Allow public read access to service line benchmarks" 
  ON public.service_line_benchmarks 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert service line benchmarks" 
  ON public.service_line_benchmarks 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update service line benchmarks" 
  ON public.service_line_benchmarks 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policies for strategic_insights (more restrictive)
CREATE POLICY "Allow public read access to strategic insights" 
  ON public.strategic_insights 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert strategic insights" 
  ON public.strategic_insights 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update strategic insights" 
  ON public.strategic_insights 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create triggers to automatically update the updated_at timestamp
CREATE TRIGGER update_service_line_benchmarks_updated_at 
  BEFORE UPDATE ON public.service_line_benchmarks 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_strategic_insights_updated_at 
  BEFORE UPDATE ON public.strategic_insights 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
