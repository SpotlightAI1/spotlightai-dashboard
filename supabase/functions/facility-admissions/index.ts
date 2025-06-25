
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

    // Query to get facility admissions data with provider names
    const { data, error } = await supabase
      .from('tx_state_IP_2018')
      .select(`
        THCIC_ID,
        facility_id_table_tx!inner(
          PROVIDER_NAME,
          THCIC_ID
        )
      `);

    if (error) {
      console.error('Database query error:', error);
      throw error;
    }

    console.log(`Retrieved ${data?.length || 0} records from database`);

    // Group by facility and count admissions
    const facilityAdmissions = data?.reduce((acc: Record<string, any>, record: any) => {
      const facilityName = record.facility_id_table_tx?.PROVIDER_NAME;
      const thcicId = record.facility_id_table_tx?.THCIC_ID || record.THCIC_ID;
      
      if (facilityName && thcicId) {
        const key = `${thcicId}_${facilityName}`;
        if (!acc[key]) {
          acc[key] = {
            name: facilityName,
            value: 0,
            thcicId: thcicId
          };
        }
        acc[key].value += 1; // Count each record as one admission
      }
      
      return acc;
    }, {}) || {};

    // Convert to array and get top 10
    const topFacilities = Object.values(facilityAdmissions)
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, 10)
      .map((facility: any, index: number) => ({
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
        totalFacilities: Object.keys(facilityAdmissions).length,
        totalAdmissions: Object.values(facilityAdmissions).reduce((sum: number, facility: any) => sum + facility.value, 0),
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
