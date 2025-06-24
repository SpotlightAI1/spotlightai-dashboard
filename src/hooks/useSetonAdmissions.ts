
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
      
      // Specific Seton facility THCIC_IDs
      const setonThcicIds = [597000, 559000, 497000, 971000, 921000, 861700, 797600, 770000, 424500, 797500];

      console.log('Looking for THCIC IDs:', setonThcicIds);

      // First, get facility names for these THCIC_IDs
      const { data: facilities, error: facilitiesError } = await supabase
        .from('Facility ID Table_TX')
        .select('THCIC_ID, PROVIDER_NAME')
        .in('THCIC_ID', setonThcicIds);

      if (facilitiesError) {
        console.error('Error fetching Seton facilities:', facilitiesError);
        throw facilitiesError;
      }

      console.log('Seton facilities found:', facilities);

      if (!facilities || facilities.length === 0) {
        console.log('No Seton facilities found for the specified THCIC IDs');
        return [];
      }

      // Now get admissions data for these facilities
      const { data: admissions, error: admissionsError } = await supabase
        .from('Texas State IP 2018')
        .select('THCIC_ID')
        .in('THCIC_ID', setonThcicIds);

      if (admissionsError) {
        console.error('Error fetching admissions:', admissionsError);
        throw admissionsError;
      }

      console.log('Admissions data records found:', admissions?.length || 0);
      console.log('Sample admissions data:', admissions?.slice(0, 5));

      // Group by facility and count admissions
      const admissionsByFacility = admissions?.reduce((acc: Record<number, SetonAdmissionData>, record: any) => {
        const thcicId = record.THCIC_ID;
        
        if (thcicId) {
          if (!acc[thcicId]) {
            const facility = facilities.find(f => f.THCIC_ID === thcicId);
            acc[thcicId] = {
              provider_name: facility?.PROVIDER_NAME || 'Unknown',
              total_admissions: 0,
              thcic_id: thcicId
            };
          }
          acc[thcicId].total_admissions += 1;
        }
        
        return acc;
      }, {}) || {};

      const result = Object.values(admissionsByFacility);
      console.log('Final processed Seton admissions data:', result);
      console.log('Total facilities with admissions:', result.length);
      
      return result;
    },
  });
};
