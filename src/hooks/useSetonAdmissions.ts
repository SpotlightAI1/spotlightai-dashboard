
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SetonAdmissionData {
  PROVIDER_NAME: string;
  total_admission_volume: number;
}

export const useSetonAdmissions = () => {
  return useQuery({
    queryKey: ['seton-admissions'],
    queryFn: async (): Promise<SetonAdmissionData[]> => {
      console.log('Fetching facility admissions data...');
      
      // Execute the SQL query directly
      const { data, error } = await supabase.rpc('get_facility_admissions');
      
      if (error) {
        console.error('Error fetching facility admissions:', error);
        throw error;
      }

      console.log('Facility admissions data:', data);
      return data || [];
    },
  });
};
