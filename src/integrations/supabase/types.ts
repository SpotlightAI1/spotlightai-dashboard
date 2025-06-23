export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      healthcare_organizations: {
        Row: {
          beds: number | null
          created_at: string
          current_challenges: string[] | null
          id: string
          market: string | null
          name: string
          revenue: number | null
          strategic_priorities: string[] | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string
        }
        Insert: {
          beds?: number | null
          created_at?: string
          current_challenges?: string[] | null
          id?: string
          market?: string | null
          name: string
          revenue?: number | null
          strategic_priorities?: string[] | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
        }
        Update: {
          beds?: number | null
          created_at?: string
          current_challenges?: string[] | null
          id?: string
          market?: string | null
          name?: string
          revenue?: number | null
          strategic_priorities?: string[] | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
        }
        Relationships: []
      }
      "IP Test": {
        Row: {
          adm_date: string | null
          adm_fscl_yr: number | null
          adm_pract_name: string | null
          adm_pract_specialty: string | null
          age: number | null
          clasf_cd: string | null
          clasf_schm: number | null
          clasf_type: string | null
          DIRECT_COST: number | null
          drg_name: string | null
          drg_no: number | null
          drg_vers: string | null
          dsch_date: string | null
          dsch_fscl_yr: number | null
          dx_cd: string | null
          dx_cd_prio: string | null
          finance_grp: string | null
          gender_cd: string | null
          hosp_svc_name: string | null
          INDIRECT_COST: number | null
          len_of_stay: number | null
          NPR_CONTRIBUTION_MARGIN: number | null
          NPR_NOI: number | null
          plan_5grp: string | null
          plan_grp: string | null
          prim_pract_name: string | null
          prim_pract_specialty: string | null
          prim_pyr_cd: string | null
          proc_pract_name: string | null
          proc_pract_specialty: string | null
          pt_id: number
          pt_no: number | null
          shrt_zip: number
          site: string | null
          smsdss_c_clasf_mstr_v_clasf_desc: string | null
          smsdss_c_dx_acct_v_clasf_desc: string | null
          TOT_CHG_AMT: number | null
          TOTAL_COST: number | null
          vst_type_cd: string | null
        }
        Insert: {
          adm_date?: string | null
          adm_fscl_yr?: number | null
          adm_pract_name?: string | null
          adm_pract_specialty?: string | null
          age?: number | null
          clasf_cd?: string | null
          clasf_schm?: number | null
          clasf_type?: string | null
          DIRECT_COST?: number | null
          drg_name?: string | null
          drg_no?: number | null
          drg_vers?: string | null
          dsch_date?: string | null
          dsch_fscl_yr?: number | null
          dx_cd?: string | null
          dx_cd_prio?: string | null
          finance_grp?: string | null
          gender_cd?: string | null
          hosp_svc_name?: string | null
          INDIRECT_COST?: number | null
          len_of_stay?: number | null
          NPR_CONTRIBUTION_MARGIN?: number | null
          NPR_NOI?: number | null
          plan_5grp?: string | null
          plan_grp?: string | null
          prim_pract_name?: string | null
          prim_pract_specialty?: string | null
          prim_pyr_cd?: string | null
          proc_pract_name?: string | null
          proc_pract_specialty?: string | null
          pt_id: number
          pt_no?: number | null
          shrt_zip: number
          site?: string | null
          smsdss_c_clasf_mstr_v_clasf_desc?: string | null
          smsdss_c_dx_acct_v_clasf_desc?: string | null
          TOT_CHG_AMT?: number | null
          TOTAL_COST?: number | null
          vst_type_cd?: string | null
        }
        Update: {
          adm_date?: string | null
          adm_fscl_yr?: number | null
          adm_pract_name?: string | null
          adm_pract_specialty?: string | null
          age?: number | null
          clasf_cd?: string | null
          clasf_schm?: number | null
          clasf_type?: string | null
          DIRECT_COST?: number | null
          drg_name?: string | null
          drg_no?: number | null
          drg_vers?: string | null
          dsch_date?: string | null
          dsch_fscl_yr?: number | null
          dx_cd?: string | null
          dx_cd_prio?: string | null
          finance_grp?: string | null
          gender_cd?: string | null
          hosp_svc_name?: string | null
          INDIRECT_COST?: number | null
          len_of_stay?: number | null
          NPR_CONTRIBUTION_MARGIN?: number | null
          NPR_NOI?: number | null
          plan_5grp?: string | null
          plan_grp?: string | null
          prim_pract_name?: string | null
          prim_pract_specialty?: string | null
          prim_pyr_cd?: string | null
          proc_pract_name?: string | null
          proc_pract_specialty?: string | null
          pt_id?: number
          pt_no?: number | null
          shrt_zip?: number
          site?: string | null
          smsdss_c_clasf_mstr_v_clasf_desc?: string | null
          smsdss_c_dx_acct_v_clasf_desc?: string | null
          TOT_CHG_AMT?: number | null
          TOTAL_COST?: number | null
          vst_type_cd?: string | null
        }
        Relationships: []
      }
      measurements: {
        Row: {
          debt: number | null
          id: number
          temperature: number | null
        }
        Insert: {
          debt?: number | null
          id?: number
          temperature?: number | null
        }
        Update: {
          debt?: number | null
          id?: number
          temperature?: number | null
        }
        Relationships: []
      }
      "Texas State IP 2018": {
        Row: {
          ADMIT_WEEKDAY: number | null
          ADMITTING_DIAGNOSIS: string | null
          APR_DRG: number | null
          APR_GROUPER_ERROR_CODE: string | null
          APR_GROUPER_VERSION_NBR: number | null
          APR_MDC: number | null
          ATTENDING_PHYSICIAN_UNIF_ID: number | null
          DISCHARGE: string | null
          EMERGENCY_DEPT_FLAG: string | null
          ENCOUNTER_INDICATOR: number | null
          ETHNICITY: string | null
          FIRST_PAYMENT_SRC: string | null
          ILLNESS_SEVERITY: number | null
          LENGTH_OF_STAY: number | null
          MS_DRG: number | null
          MS_GROUPER_ERROR_CODE: string | null
          MS_GROUPER_VERSION_NBR: number | null
          MS_MDC: number | null
          OPERATING_PHYSICIAN_UNIF_ID: string | null
          OTH_DIAG_CODE_1: string | null
          OTH_DIAG_CODE_2: string | null
          OTH_DIAG_CODE_3: string | null
          OTH_SURG_PROC_CODE_1: string | null
          OTH_SURG_PROC_CODE_2: string | null
          OTH_SURG_PROC_CODE_3: string | null
          OTH_SURG_PROC_DAY_1: string | null
          OTH_SURG_PROC_DAY_2: string | null
          OTH_SURG_PROC_DAY_3: string | null
          PAT_AGE: string | null
          PAT_COUNTRY: string | null
          PAT_COUNTY: string | null
          PAT_STATE: string | null
          PAT_STATUS: string | null
          PAT_ZIP: string | null
          POA_OTH_DIAG_CODE_1: string | null
          POA_OTH_DIAG_CODE_2: string | null
          POA_OTH_DIAG_CODE_3: string | null
          POA_PRINC_DIAG_CODE: string | null
          PRINC_DIAG_CODE: string | null
          PRINC_SURG_PROC_CODE: string | null
          PRINC_SURG_PROC_DAY: string | null
          PROVIDER_NAME: string | null
          PUBLIC_HEALTH_REGION: string | null
          RACE: string | null
          RECORD_ID: number
          RISK_MORTALITY: number | null
          SECONDARY_PAYMENT_SRC: string | null
          SEX_CODE: string | null
          SOURCE_OF_ADMISSION: string | null
          SPEC_UNIT_1: string | null
          SPEC_UNIT_2: string | null
          THCIC_ID: number | null
          TOTAL_CHARGES: string | null
          TOTAL_CHARGES_ACCOMM: string | null
          TOTAL_CHARGES_ANCIL: string | null
          TOTAL_NON_COV_CHARGES: string | null
          TOTAL_NON_COV_CHARGES_ACCOMM: string | null
          TOTAL_NON_COV_CHARGES_ANCIL: string | null
          TYPE_OF_ADMISSION: number | null
          TYPE_OF_BILL: number | null
        }
        Insert: {
          ADMIT_WEEKDAY?: number | null
          ADMITTING_DIAGNOSIS?: string | null
          APR_DRG?: number | null
          APR_GROUPER_ERROR_CODE?: string | null
          APR_GROUPER_VERSION_NBR?: number | null
          APR_MDC?: number | null
          ATTENDING_PHYSICIAN_UNIF_ID?: number | null
          DISCHARGE?: string | null
          EMERGENCY_DEPT_FLAG?: string | null
          ENCOUNTER_INDICATOR?: number | null
          ETHNICITY?: string | null
          FIRST_PAYMENT_SRC?: string | null
          ILLNESS_SEVERITY?: number | null
          LENGTH_OF_STAY?: number | null
          MS_DRG?: number | null
          MS_GROUPER_ERROR_CODE?: string | null
          MS_GROUPER_VERSION_NBR?: number | null
          MS_MDC?: number | null
          OPERATING_PHYSICIAN_UNIF_ID?: string | null
          OTH_DIAG_CODE_1?: string | null
          OTH_DIAG_CODE_2?: string | null
          OTH_DIAG_CODE_3?: string | null
          OTH_SURG_PROC_CODE_1?: string | null
          OTH_SURG_PROC_CODE_2?: string | null
          OTH_SURG_PROC_CODE_3?: string | null
          OTH_SURG_PROC_DAY_1?: string | null
          OTH_SURG_PROC_DAY_2?: string | null
          OTH_SURG_PROC_DAY_3?: string | null
          PAT_AGE?: string | null
          PAT_COUNTRY?: string | null
          PAT_COUNTY?: string | null
          PAT_STATE?: string | null
          PAT_STATUS?: string | null
          PAT_ZIP?: string | null
          POA_OTH_DIAG_CODE_1?: string | null
          POA_OTH_DIAG_CODE_2?: string | null
          POA_OTH_DIAG_CODE_3?: string | null
          POA_PRINC_DIAG_CODE?: string | null
          PRINC_DIAG_CODE?: string | null
          PRINC_SURG_PROC_CODE?: string | null
          PRINC_SURG_PROC_DAY?: string | null
          PROVIDER_NAME?: string | null
          PUBLIC_HEALTH_REGION?: string | null
          RACE?: string | null
          RECORD_ID: number
          RISK_MORTALITY?: number | null
          SECONDARY_PAYMENT_SRC?: string | null
          SEX_CODE?: string | null
          SOURCE_OF_ADMISSION?: string | null
          SPEC_UNIT_1?: string | null
          SPEC_UNIT_2?: string | null
          THCIC_ID?: number | null
          TOTAL_CHARGES?: string | null
          TOTAL_CHARGES_ACCOMM?: string | null
          TOTAL_CHARGES_ANCIL?: string | null
          TOTAL_NON_COV_CHARGES?: string | null
          TOTAL_NON_COV_CHARGES_ACCOMM?: string | null
          TOTAL_NON_COV_CHARGES_ANCIL?: string | null
          TYPE_OF_ADMISSION?: number | null
          TYPE_OF_BILL?: number | null
        }
        Update: {
          ADMIT_WEEKDAY?: number | null
          ADMITTING_DIAGNOSIS?: string | null
          APR_DRG?: number | null
          APR_GROUPER_ERROR_CODE?: string | null
          APR_GROUPER_VERSION_NBR?: number | null
          APR_MDC?: number | null
          ATTENDING_PHYSICIAN_UNIF_ID?: number | null
          DISCHARGE?: string | null
          EMERGENCY_DEPT_FLAG?: string | null
          ENCOUNTER_INDICATOR?: number | null
          ETHNICITY?: string | null
          FIRST_PAYMENT_SRC?: string | null
          ILLNESS_SEVERITY?: number | null
          LENGTH_OF_STAY?: number | null
          MS_DRG?: number | null
          MS_GROUPER_ERROR_CODE?: string | null
          MS_GROUPER_VERSION_NBR?: number | null
          MS_MDC?: number | null
          OPERATING_PHYSICIAN_UNIF_ID?: string | null
          OTH_DIAG_CODE_1?: string | null
          OTH_DIAG_CODE_2?: string | null
          OTH_DIAG_CODE_3?: string | null
          OTH_SURG_PROC_CODE_1?: string | null
          OTH_SURG_PROC_CODE_2?: string | null
          OTH_SURG_PROC_CODE_3?: string | null
          OTH_SURG_PROC_DAY_1?: string | null
          OTH_SURG_PROC_DAY_2?: string | null
          OTH_SURG_PROC_DAY_3?: string | null
          PAT_AGE?: string | null
          PAT_COUNTRY?: string | null
          PAT_COUNTY?: string | null
          PAT_STATE?: string | null
          PAT_STATUS?: string | null
          PAT_ZIP?: string | null
          POA_OTH_DIAG_CODE_1?: string | null
          POA_OTH_DIAG_CODE_2?: string | null
          POA_OTH_DIAG_CODE_3?: string | null
          POA_PRINC_DIAG_CODE?: string | null
          PRINC_DIAG_CODE?: string | null
          PRINC_SURG_PROC_CODE?: string | null
          PRINC_SURG_PROC_DAY?: string | null
          PROVIDER_NAME?: string | null
          PUBLIC_HEALTH_REGION?: string | null
          RACE?: string | null
          RECORD_ID?: number
          RISK_MORTALITY?: number | null
          SECONDARY_PAYMENT_SRC?: string | null
          SEX_CODE?: string | null
          SOURCE_OF_ADMISSION?: string | null
          SPEC_UNIT_1?: string | null
          SPEC_UNIT_2?: string | null
          THCIC_ID?: number | null
          TOTAL_CHARGES?: string | null
          TOTAL_CHARGES_ACCOMM?: string | null
          TOTAL_CHARGES_ANCIL?: string | null
          TOTAL_NON_COV_CHARGES?: string | null
          TOTAL_NON_COV_CHARGES_ACCOMM?: string | null
          TOTAL_NON_COV_CHARGES_ANCIL?: string | null
          TYPE_OF_ADMISSION?: number | null
          TYPE_OF_BILL?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      organization_type:
        | "Independent"
        | "Regional"
        | "Specialty"
        | "Critical Access"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      organization_type: [
        "Independent",
        "Regional",
        "Specialty",
        "Critical Access",
      ],
    },
  },
} as const
