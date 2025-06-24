
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SetonAdmissionData {
  PROVIDER_NAME: string;
  total_admissions: number;
  THCIC_ID: number;
}

export const useSetonAdmissions = () => {
  return useQuery({
    queryKey: ['seton-admissions'],
    queryFn: async (): Promise<SetonAdmissionData[]> => {
      console.log('Fetching all Seton and Dell Seton facilities...');
      
      // Step 1: Get ALL facilities with "Seton" or "Dell Seton" in the name
      const { data: setonFacilities, error: facilitiesError } = await supabase
        .from('facility_id_table_tx')
        .select('THCIC_ID, PROVIDER_NAME')
        .or('PROVIDER_NAME.ilike.%Seton%,PROVIDER_NAME.ilike.%Dell Seton%');

      if (facilitiesError) {
        console.error('Error fetching Seton facilities:', facilitiesError);
        throw facilitiesError;
      }

      console.log('All Seton/Dell Seton facilities found:', setonFacilities);
      console.log('Number of Seton facilities found:', setonFacilities?.length || 0);

      if (!setonFacilities || setonFacilities.length === 0) {
        console.log('No Seton facilities found');
        return [];
      }

      // Step 2: Extract THCIC_IDs for the admissions query
      const setonThcicIds = setonFacilities.map(facility => facility.THCIC_ID);
      console.log('Seton THCIC IDs to query:', setonThcicIds);

      // Step 3: Get admissions count by THCIC_ID from tx_state_IP_2018
      const { data: admissionsData, error: admissionsError } = await supabase
        .from('tx_state_IP_2018')
        .select('THCIC_ID')
        .in('THCIC_ID', setonThcicIds);

      if (admissionsError) {
        console.error('Error fetching admissions:', admissionsError);
        throw admissionsError;
      }

      console.log('Total admission records found:', admissionsData?.length || 0);

      // Step 4: Count admissions by THCIC_ID (like Excel COUNTIF)
      const admissionCounts: Record<number, number> = {};
      admissionsData?.forEach(record => {
        if (record.THCIC_ID) {
          admissionCounts[record.THCIC_ID] = (admissionCounts[record.THCIC_ID] || 0) + 1;
        }
      });

      console.log('Admission counts by THCIC_ID:', admissionCounts);

      // Step 5: Join facility data with admission counts (like Excel INDEX/MATCH + VLOOKUP)
      const facilitiesWithAdmissions: SetonAdmissionData[] = setonFacilities.map(facility => ({
        PROVIDER_NAME: facility.PROVIDER_NAME || 'Unknown',
        total_admissions: admissionCounts[facility.THCIC_ID] || 0,
        THCIC_ID: facility.THCIC_ID
      }));

      // Step 6: Filter out facilities with zero admissions and sort by admissions descending
      const filteredResults = facilitiesWithAdmissions
        .filter(facility => facility.total_admissions > 0)
        .sort((a, b) => b.total_admissions - a.total_admissions);

      console.log('Final results with admissions > 0:', filteredResults);
      console.log('Number of Seton facilities with admissions:', filteredResults.length);

      return filteredResults;
    },
  });
};
