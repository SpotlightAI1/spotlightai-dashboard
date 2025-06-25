
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface FacilityAdmissionData {
  id: number;
  name: string;
  fullName: string;
  value: number;
  thcicId: number;
}

interface FacilityAdmissionsResponse {
  success: boolean;
  data: FacilityAdmissionData[];
  metadata: {
    totalFacilities: number;
    totalAdmissions: number;
    queryTime: string;
  };
}

export const useFacilityAdmissions = () => {
  return useQuery({
    queryKey: ['facility-admissions-api'],
    queryFn: async (): Promise<FacilityAdmissionsResponse> => {
      console.log('Calling facility-admissions edge function...');
      
      const { data, error } = await supabase.functions.invoke('facility-admissions');
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch facility admissions: ${error.message}`);
      }

      console.log('Facility admissions data received:', data);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
