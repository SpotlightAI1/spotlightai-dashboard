
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
      
      // First, get all Seton facilities from the Facility ID table
      const { data: facilities, error: facilitiesError } = await supabase
        .from('Facility ID Table_TX')
        .select('THCIC_ID, PROVIDER_NAME')
        .ilike('PROVIDER_NAME', '%Seton%');

      if (facilitiesError) {
        console.error('Error fetching Seton facilities:', facilitiesError);
        throw facilitiesError;
      }

      console.log('Seton facilities found:', facilities);

      if (!facilities || facilities.length === 0) {
        console.log('No Seton facilities found');
        return [];
      }

      // Extract THCIC_IDs for Seton facilities
      const setonThcicIds = facilities.map(f => f.THCIC_ID);

      // Now get admissions data for these facilities
      const { data: admissions, error: admissionsError } = await supabase
        .from('Texas State IP 2018')
        .select('THCIC_ID')
        .in('THCIC_ID', setonThcicIds);

      if (admissionsError) {
        console.error('Error fetching admissions:', admissionsError);
        throw admissionsError;
      }

      console.log('Admissions data:', admissions);

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
      console.log('Processed Seton admissions data:', result);
      
      return result;
    },
  });
};
