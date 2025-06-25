
import { supabase } from '@/integrations/supabase/client';
import { useOptimizedQuery } from './useOptimizedQuery';

export interface Organization {
  id: string;
  name: string;
  type: string;
  market: string;
  beds: number | null;
  employee_count: number | null;
  annual_revenue_range: string | null;
  onboarding_completed_at: string | null;
  created_at: string;
}

export const useOptimizedOrganizations = () => {
  return useOptimizedQuery({
    queryKey: ['organizations-optimized'],
    queryFn: async (): Promise<Organization[]> => {
      console.log('Fetching organizations with optimized query...');
      
      const { data, error } = await supabase
        .from('healthcare_organizations')
        .select(`
          id,
          name,
          type,
          market,
          beds,
          employee_count,
          annual_revenue_range,
          onboarding_completed_at,
          created_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching organizations:', error);
        throw new Error(`Failed to fetch organizations: ${error.message}`);
      }

      console.log('Organizations loaded successfully:', data?.length || 0, 'items');
      return data || [];
    },
    errorMessage: 'Failed to load organizations'
  });
};

export const useOptimizedOrganization = (id: string) => {
  return useOptimizedQuery({
    queryKey: ['organization', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('healthcare_organizations')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        throw new Error(`Failed to fetch organization: ${error.message}`);
      }
      
      return data;
    },
    enabled: !!id,
    errorMessage: 'Failed to load organization details'
  });
};
