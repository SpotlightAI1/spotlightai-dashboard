
-- Create a function to get facility admissions data
CREATE OR REPLACE FUNCTION get_facility_admissions()
RETURNS TABLE (
  "PROVIDER_NAME" text,
  total_admission_volume bigint
)
LANGUAGE sql
AS $$
  SELECT 
    f."PROVIDER_NAME",
    COUNT(t."THCIC_ID") AS total_admission_volume
  FROM "tx_state_IP_2018" AS t
  JOIN "facility_id_table_tx" AS f 
    ON t."THCIC_ID" = f."THCIC_ID"
  GROUP BY f."PROVIDER_NAME"
  ORDER BY total_admission_volume DESC;
$$;
