
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SetonAdmissionData {
  provider_name: string;
  total_admissions: number;
  thcic_id: number;
}

export const useSetonAdmissions = () => {
  return useQuery({
    queryKey: ['seton-admissions'],
    queryFn: async (): Promise<SetonAdmissionData[]> => {
      console.log('Fetching Seton admissions data...');
      
      // Query to get admissions data for Seton facilities
      const { data, error } = await supabase
        .from('Texas State IP 2018')
        .select(`
          THCIC_ID,
          Facility ID Table_TX!inner(
            PROVIDER_NAME
          )
        `)
        .ilike('Facility ID Table_TX.PROVIDER_NAME', '%Seton%');

      if (error) {
        console.error('Error fetching Seton admissions:', error);
        throw error;
      }

      console.log('Raw Seton data:', data);

      // Group by facility and count admissions
      const admissionsByFacility = data?.reduce((acc: Record<string, SetonAdmissionData>, record: any) => {
        const facilityName = record['Facility ID Table_TX']?.PROVIDER_NAME;
        const thcicId = record.THCIC_ID;
        
        if (facilityName && thcicId) {
          const key = `${thcicId}_${facilityName}`;
          if (!acc[key]) {
            acc[key] = {
              provider_name: facilityName,
              total_admissions: 0,
              thcic_id: thcicId
            };
          }
          acc[key].total_admissions += 1;
        }
        
        return acc;
      }, {}) || {};

      const result = Object.values(admissionsByFacility);
      console.log('Processed Seton admissions data:', result);
      
      return result;
    },
  });
};
