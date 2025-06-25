
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

export const useStrategicInitiatives = () => {
  return useQuery({
    queryKey: ['strategic-initiatives'],
    queryFn: async (): Promise<StrategicInitiative[]> => {
      console.log('Fetching strategic initiatives data...');
      
      const { data, error } = await supabase
        .from('strategic_initiatives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching strategic initiatives:', error);
        throw error;
      }

      console.log('Strategic initiatives data:', data);
      return data || [];
    },
  });
};

export const useStrategicInitiativesByOrganization = (organizationId: string) => {
  return useQuery({
    queryKey: ['strategic-initiatives', organizationId],
    queryFn: async (): Promise<StrategicInitiative[]> => {
      const { data, error } = await supabase
        .from('strategic_initiatives')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};
