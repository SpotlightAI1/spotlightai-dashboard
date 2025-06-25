
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface FacilityAdmissionData {
  provider_name: string;
  total_admissions: number;
  thcic_id: number;
}

export const useSetonAdmissions = () => {
  return useQuery({
    queryKey: ['facility-admissions'],
    queryFn: async (): Promise<FacilityAdmissionData[]> => {
      console.log('Fetching facility admissions data...');
      
      // Query to get admissions data for all facilities using the exact SQL structure
      const { data, error } = await supabase
        .from('tx_state_IP_2018')
        .select(`
          RECORD_ID,
          THCIC_ID,
          facility_id_table_tx!inner(
            PROVIDER_NAME,
            THCIC_ID
          )
        `);

      if (error) {
        console.error('Error fetching facility admissions:', error);
        throw error;
      }

      console.log('Raw facility data:', data);

      // Group by facility and count admissions (RECORD_ID count)
      const admissionsByFacility = data?.reduce((acc: Record<string, FacilityAdmissionData>, record: any) => {
        const facilityName = record['facility_id_table_tx']?.PROVIDER_NAME;
        const thcicId = record['facility_id_table_tx']?.THCIC_ID || record.THCIC_ID;
        
        if (facilityName && thcicId) {
          const key = `${thcicId}_${facilityName}`;
          if (!acc[key]) {
            acc[key] = {
              provider_name: facilityName,
              total_admissions: 0,
              thcic_id: thcicId
            };
          }
          acc[key].total_admissions += 1; // Count each RECORD_ID
        }
        
        return acc;
      }, {}) || {};

      const result = Object.values(admissionsByFacility)
        .sort((a, b) => b.total_admissions - a.total_admissions); // Sort by total_admissions DESC
        
      console.log('Processed facility admissions data:', result);
      
      return result;
    },
  });
};
