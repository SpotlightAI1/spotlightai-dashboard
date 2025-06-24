
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
      console.log('Fetching all Seton facilities dynamically...');
      
      // First, get ALL facilities with "Seton" in the name
      const { data: setonFacilities, error: facilitiesError } = await supabase
        .from('Facility ID Table_TX')
        .select('THCIC_ID, PROVIDER_NAME')
        .ilike('PROVIDER_NAME', '%Seton%');

      if (facilitiesError) {
        console.error('Error fetching Seton facilities:', facilitiesError);
        throw facilitiesError;
      }

      console.log('All Seton facilities found:', setonFacilities);

      if (!setonFacilities || setonFacilities.length === 0) {
        console.log('No Seton facilities found');
        return [];
      }

      // Extract THCIC_IDs for the admissions query
      const setonThcicIds = setonFacilities.map(facility => facility.THCIC_ID);
      console.log('Seton THCIC IDs to query:', setonThcicIds);

      // Get admissions data for these facilities
      const { data: admissions, error: admissionsError } = await supabase
        .from('Texas State IP 2018')
        .select('THCIC_ID')
        .in('THCIC_ID', setonThcicIds);

      if (admissionsError) {
        console.error('Error fetching admissions:', admissionsError);
        throw admissionsError;
      }

      console.log('Total admission records found:', admissions?.length || 0);

      // Group by facility and count admissions
      const admissionsByFacility = admissions?.reduce((acc: Record<number, SetonAdmissionData>, record: any) => {
        const thcicId = record.THCIC_ID;
        
        if (thcicId) {
          if (!acc[thcicId]) {
            const facility = setonFacilities.find(f => f.THCIC_ID === thcicId);
            acc[thcicId] = {
              PROVIDER_NAME: facility?.PROVIDER_NAME || 'Unknown',
              total_admissions: 0,
              THCIC_ID: thcicId
            };
          }
          acc[thcicId].total_admissions += 1;
        }
        
        return acc;
      }, {}) || {};

      // Convert to array and filter out facilities with zero admissions
      const facilitiesWithAdmissions = Object.values(admissionsByFacility)
        .filter(facility => facility.total_admissions > 0);

      console.log('Seton facilities with admissions:', facilitiesWithAdmissions);
      console.log('Facilities filtered (has admissions):', facilitiesWithAdmissions.length);
      
      // Sort by admissions count descending
      const sortedResults = facilitiesWithAdmissions.sort((a, b) => b.total_admissions - a.total_admissions);
      
      console.log('Final sorted results:', sortedResults);
      
      return sortedResults;
    },
  });
};
