
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

    // Get ALL admissions data with PROVIDER_NAME from tx_state_IP_2018 table
    // Remove any limit to get all records
    const { data: admissionsData, error: admissionsError } = await supabase
      .from('tx_state_IP_2018')
      .select('PROVIDER_NAME, THCIC_ID')
      .not('PROVIDER_NAME', 'is', null);

    if (admissionsError) {
      console.error('Error fetching admissions data:', admissionsError);
      throw admissionsError;
    }

    console.log(`Retrieved ${admissionsData?.length || 0} admission records`);

    // Count admissions by facility - each row = 1 admission
    const facilityAdmissions = new Map();
    admissionsData?.forEach(admission => {
      if (admission.PROVIDER_NAME) {
        const facilityName = admission.PROVIDER_NAME.trim();
        
        if (!facilityAdmissions.has(facilityName)) {
          facilityAdmissions.set(facilityName, {
            name: facilityName,
            count: 0,
            thcicIds: new Set()
          });
        }
        
        // Increment admission count (each row is one admission)
        facilityAdmissions.get(facilityName).count += 1;
        
        // Track THCIC_IDs for this facility
        if (admission.THCIC_ID) {
          facilityAdmissions.get(facilityName).thcicIds.add(admission.THCIC_ID);
        }
      }
    });

    // Convert to array and get top 10 by admission count
    const topFacilities = Array.from(facilityAdmissions.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((facility, index) => ({
        id: index + 1,
        name: facility.name.length > 30 
          ? facility.name.substring(0, 30) + '...' 
          : facility.name,
        fullName: facility.name,
        value: facility.count,
        thcicId: Array.from(facility.thcicIds)[0] || null // Use first THCIC_ID found
      }));

    console.log(`Processed top 10 facilities:`, topFacilities.map(f => ({ name: f.name, value: f.value })));

    const totalAdmissions = Array.from(facilityAdmissions.values()).reduce((sum, facility) => sum + facility.count, 0);

    const response = {
      success: true,
      data: topFacilities,
      metadata: {
        totalFacilities: facilityAdmissions.size,
        totalAdmissions: totalAdmissions,
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
