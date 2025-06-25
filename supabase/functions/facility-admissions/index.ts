
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting facility admissions query...');

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // First, get all admissions data with THCIC_ID
    const { data: admissionsData, error: admissionsError } = await supabase
      .from('tx_state_IP_2018')
      .select('THCIC_ID')
      .not('THCIC_ID', 'is', null);

    if (admissionsError) {
      console.error('Error fetching admissions data:', admissionsError);
      throw admissionsError;
    }

    console.log(`Retrieved ${admissionsData?.length || 0} admission records`);

    // Get all facility information
    const { data: facilitiesData, error: facilitiesError } = await supabase
      .from('facility_id_table_tx')
      .select('THCIC_ID, PROVIDER_NAME')
      .not('PROVIDER_NAME', 'is', null);

    if (facilitiesError) {
      console.error('Error fetching facilities data:', facilitiesError);
      throw facilitiesError;
    }

    console.log(`Retrieved ${facilitiesData?.length || 0} facility records`);

    // Create a map of THCIC_ID to facility name for quick lookup
    const facilityMap = new Map();
    facilitiesData?.forEach(facility => {
      if (facility.THCIC_ID && facility.PROVIDER_NAME) {
        facilityMap.set(facility.THCIC_ID, facility.PROVIDER_NAME);
      }
    });

    // Count admissions by facility
    const facilityAdmissions = new Map();
    admissionsData?.forEach(admission => {
      if (admission.THCIC_ID && facilityMap.has(admission.THCIC_ID)) {
        const facilityName = facilityMap.get(admission.THCIC_ID);
        const key = `${admission.THCIC_ID}_${facilityName}`;
        
        if (!facilityAdmissions.has(key)) {
          facilityAdmissions.set(key, {
            name: facilityName,
            value: 0,
            thcicId: admission.THCIC_ID
          });
        }
        facilityAdmissions.get(key).value += 1;
      }
    });

    // Convert to array and get top 10
    const topFacilities = Array.from(facilityAdmissions.values())
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
      .map((facility, index) => ({
        id: index + 1,
        name: facility.name.length > 30 
          ? facility.name.substring(0, 30) + '...' 
          : facility.name,
        fullName: facility.name,
        value: facility.value,
        thcicId: facility.thcicId
      }));

    console.log(`Processed top 10 facilities:`, topFacilities.map(f => ({ name: f.name, value: f.value })));

    const response = {
      success: true,
      data: topFacilities,
      metadata: {
        totalFacilities: facilityAdmissions.size,
        totalAdmissions: Array.from(facilityAdmissions.values()).reduce((sum, facility) => sum + facility.value, 0),
        queryTime: new Date().toISOString()
      }
    };

    return new Response(
      JSON.stringify(response),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
