
import { supabase } from '@/integrations/supabase/client';
import { useOptimizedQuery } from './useOptimizedQuery';

export interface StrategicInitiative {
  id: string;
  initiative_name: string;
  financial_impact: number;
  operational_complexity: number;
  competitive_disruption: number;
  time_urgency: number;
  organization_id: string | null;
  description: string | null;
  created_at: string;
}

export const useOptimizedStrategicInitiatives = () => {
  return useOptimizedQuery({
    queryKey: ['strategic-initiatives-optimized'],
    queryFn: async (): Promise<StrategicInitiative[]> => {
      console.log('Fetching strategic initiatives with optimized query...');
      
      const { data, error } = await supabase
        .from('strategic_initiatives')
        .select(`
          id,
          initiative_name,
          financial_impact,
          operational_complexity,
          competitive_disruption,
          time_urgency,
          organization_id,
          description,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(100); // Limit for performance

      if (error) {
        console.error('Error fetching strategic initiatives:', error);
        throw new Error(`Failed to fetch strategic initiatives: ${error.message}`);
      }

      console.log('Strategic initiatives loaded successfully:', data?.length || 0, 'items');
      return data || [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for frequently updated data
    errorMessage: 'Failed to load strategic initiatives'
  });
};

export const useOptimizedStrategicInitiativesByOrganization = (organizationId: string) => {
  return useOptimizedQuery({
    queryKey: ['strategic-initiatives-by-org', organizationId],
    queryFn: async (): Promise<StrategicInitiative[]> => {
      const { data, error } = await supabase
        .from('strategic_initiatives')
        .select(`
          id,
          initiative_name,
          financial_impact,
          operational_complexity,
          competitive_disruption,
          time_urgency,
          organization_id,
          description,
          created_at
        `)
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch organization initiatives: ${error.message}`);
      }
      
      return data || [];
    },
    enabled: !!organizationId,
    errorMessage: 'Failed to load organization initiatives'
  });
};
