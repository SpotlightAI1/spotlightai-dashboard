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
      facility_id_table_tx: {
        Row: {
          CERT_STATUS: string | null
          FAC_ACUTE_CARE_IND: string | null
          FAC_LONG_TERM_AC_IND: string | null
          FAC_OTHER_LTC_IND: string | null
          FAC_PEDS_IND: string | null
          FAC_PSYCH_IND: string | null
          FAC_REHAB_IND: string | null
          FAC_SNF_IND: string | null
          FAC_TEACHING_IND: string | null
          POA_PROVIDER_INDICATOR: string | null
          PROVIDER_NAME: string | null
          THCIC_ID: number
        }
        Insert: {
          CERT_STATUS?: string | null
          FAC_ACUTE_CARE_IND?: string | null
          FAC_LONG_TERM_AC_IND?: string | null
          FAC_OTHER_LTC_IND?: string | null
          FAC_PEDS_IND?: string | null
          FAC_PSYCH_IND?: string | null
          FAC_REHAB_IND?: string | null
          FAC_SNF_IND?: string | null
          FAC_TEACHING_IND?: string | null
          POA_PROVIDER_INDICATOR?: string | null
          PROVIDER_NAME?: string | null
          THCIC_ID: number
        }
        Update: {
          CERT_STATUS?: string | null
          FAC_ACUTE_CARE_IND?: string | null
          FAC_LONG_TERM_AC_IND?: string | null
          FAC_OTHER_LTC_IND?: string | null
          FAC_PEDS_IND?: string | null
          FAC_PSYCH_IND?: string | null
          FAC_REHAB_IND?: string | null
          FAC_SNF_IND?: string | null
          FAC_TEACHING_IND?: string | null
          POA_PROVIDER_INDICATOR?: string | null
          PROVIDER_NAME?: string | null
          THCIC_ID?: number
        }
        Relationships: []
      }
      healthcare_organizations: {
        Row: {
          annual_revenue_range: string | null
          beds: number | null
          board_composition_type: string | null
          change_management_capability: number | null
          created_at: string
          current_challenges: string[] | null
          ehr_system: string | null
          employee_count: number | null
          id: string
          market: string | null
          market_position: string | null
          master_prompt: string | null
          name: string
          onboarding_completed_at: string | null
          revenue: number | null
          setup_wizard_version: number | null
          strategic_decision_timeline: string | null
          strategic_priorities: string[] | null
          technology_maturity_level: number | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string
        }
        Insert: {
          annual_revenue_range?: string | null
          beds?: number | null
          board_composition_type?: string | null
          change_management_capability?: number | null
          created_at?: string
          current_challenges?: string[] | null
          ehr_system?: string | null
          employee_count?: number | null
          id?: string
          market?: string | null
          market_position?: string | null
          master_prompt?: string | null
          name: string
          onboarding_completed_at?: string | null
          revenue?: number | null
          setup_wizard_version?: number | null
          strategic_decision_timeline?: string | null
          strategic_priorities?: string[] | null
          technology_maturity_level?: number | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
        }
        Update: {
          annual_revenue_range?: string | null
          beds?: number | null
          board_composition_type?: string | null
          change_management_capability?: number | null
          created_at?: string
          current_challenges?: string[] | null
          ehr_system?: string | null
          employee_count?: number | null
          id?: string
          market?: string | null
          market_position?: string | null
          master_prompt?: string | null
          name?: string
          onboarding_completed_at?: string | null
          revenue?: number | null
          setup_wizard_version?: number | null
          strategic_decision_timeline?: string | null
          strategic_priorities?: string[] | null
          technology_maturity_level?: number | null
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
      op_pudf_2018: {
        Row: {
          ambulance_amount: number | null
          anes_amount: number | null
          blood_adm_amount: number | null
          blood_amount: number | null
          card_amount: number | null
          clinic_amount: number | null
          condition_code_1: string | null
          condition_code_2: string | null
          condition_code_3: string | null
          condition_code_4: string | null
          condition_code_5: string | null
          condition_code_6: string | null
          condition_code_7: string | null
          condition_code_8: string | null
          dme_amount: number | null
          e_code_1: string | null
          e_code_10: string | null
          e_code_2: string | null
          e_code_3: string | null
          e_code_4: string | null
          e_code_5: string | null
          e_code_6: string | null
          e_code_7: string | null
          e_code_8: string | null
          e_code_9: string | null
          emergency_dept_flag: string | null
          er_amount: number | null
          esrd_amount: number | null
          ethnicity: string | null
          facility_name: string | null
          first_payment_src: string | null
          id: string
          input_format: string | null
          it_amount: number | null
          lab_amount: number | null
          length_of_service: string | null
          lith_amount: number | null
          medsurg_amount: number | null
          mri_amount: number | null
          op_amount: number | null
          or_amount: number | null
          organ_amount: number | null
          ot_amount: number | null
          oth_diag_code_1: string | null
          oth_diag_code_10: string | null
          oth_diag_code_11: string | null
          oth_diag_code_12: string | null
          oth_diag_code_13: string | null
          oth_diag_code_14: string | null
          oth_diag_code_15: string | null
          oth_diag_code_16: string | null
          oth_diag_code_17: string | null
          oth_diag_code_18: string | null
          oth_diag_code_19: string | null
          oth_diag_code_2: string | null
          oth_diag_code_20: string | null
          oth_diag_code_21: string | null
          oth_diag_code_22: string | null
          oth_diag_code_23: string | null
          oth_diag_code_24: string | null
          oth_diag_code_3: string | null
          oth_diag_code_4: string | null
          oth_diag_code_5: string | null
          oth_diag_code_6: string | null
          oth_diag_code_7: string | null
          oth_diag_code_8: string | null
          oth_diag_code_9: string | null
          other_amount: number | null
          pat_age: string | null
          pat_country: string | null
          pat_county: string | null
          pat_reason_for_visit: string | null
          pat_state: string | null
          pat_status: string | null
          pat_zip: string | null
          pharm_amount: number | null
          physician1_index_number: string | null
          physician2_index_number: string | null
          princ_diag_code: string | null
          pro_fee_amount: number | null
          proc_code_1: string | null
          proc_code_10: string | null
          proc_code_11: string | null
          proc_code_12: string | null
          proc_code_13: string | null
          proc_code_14: string | null
          proc_code_15: string | null
          proc_code_16: string | null
          proc_code_17: string | null
          proc_code_18: string | null
          proc_code_19: string | null
          proc_code_2: string | null
          proc_code_20: string | null
          proc_code_21: string | null
          proc_code_22: string | null
          proc_code_23: string | null
          proc_code_24: string | null
          proc_code_25: string | null
          proc_code_3: string | null
          proc_code_4: string | null
          proc_code_5: string | null
          proc_code_6: string | null
          proc_code_7: string | null
          proc_code_8: string | null
          proc_code_9: string | null
          pt_amount: number | null
          public_health_region: string | null
          race: string | null
          rad_amount: number | null
          record_id: string | null
          related_cause_code_1: string | null
          related_cause_code_2: string | null
          related_cause_code_3: string | null
          secondary_payment_src: string | null
          service_quarter: string | null
          sex_code: string | null
          source_of_admission: string | null
          spec_unit_1: string | null
          spec_unit_2: string | null
          spec_unit_3: string | null
          spec_unit_4: string | null
          spec_unit_5: string | null
          speech_amount: number | null
          thcic_id: string | null
          total_charges: number | null
          total_charges_ancil: number | null
          total_non_cov_charges: number | null
          total_non_cov_charges_ancil: number | null
          type_of_bill: string | null
          used_dme_amount: number | null
        }
        Insert: {
          ambulance_amount?: number | null
          anes_amount?: number | null
          blood_adm_amount?: number | null
          blood_amount?: number | null
          card_amount?: number | null
          clinic_amount?: number | null
          condition_code_1?: string | null
          condition_code_2?: string | null
          condition_code_3?: string | null
          condition_code_4?: string | null
          condition_code_5?: string | null
          condition_code_6?: string | null
          condition_code_7?: string | null
          condition_code_8?: string | null
          dme_amount?: number | null
          e_code_1?: string | null
          e_code_10?: string | null
          e_code_2?: string | null
          e_code_3?: string | null
          e_code_4?: string | null
          e_code_5?: string | null
          e_code_6?: string | null
          e_code_7?: string | null
          e_code_8?: string | null
          e_code_9?: string | null
          emergency_dept_flag?: string | null
          er_amount?: number | null
          esrd_amount?: number | null
          ethnicity?: string | null
          facility_name?: string | null
          first_payment_src?: string | null
          id?: string
          input_format?: string | null
          it_amount?: number | null
          lab_amount?: number | null
          length_of_service?: string | null
          lith_amount?: number | null
          medsurg_amount?: number | null
          mri_amount?: number | null
          op_amount?: number | null
          or_amount?: number | null
          organ_amount?: number | null
          ot_amount?: number | null
          oth_diag_code_1?: string | null
          oth_diag_code_10?: string | null
          oth_diag_code_11?: string | null
          oth_diag_code_12?: string | null
          oth_diag_code_13?: string | null
          oth_diag_code_14?: string | null
          oth_diag_code_15?: string | null
          oth_diag_code_16?: string | null
          oth_diag_code_17?: string | null
          oth_diag_code_18?: string | null
          oth_diag_code_19?: string | null
          oth_diag_code_2?: string | null
          oth_diag_code_20?: string | null
          oth_diag_code_21?: string | null
          oth_diag_code_22?: string | null
          oth_diag_code_23?: string | null
          oth_diag_code_24?: string | null
          oth_diag_code_3?: string | null
          oth_diag_code_4?: string | null
          oth_diag_code_5?: string | null
          oth_diag_code_6?: string | null
          oth_diag_code_7?: string | null
          oth_diag_code_8?: string | null
          oth_diag_code_9?: string | null
          other_amount?: number | null
          pat_age?: string | null
          pat_country?: string | null
          pat_county?: string | null
          pat_reason_for_visit?: string | null
          pat_state?: string | null
          pat_status?: string | null
          pat_zip?: string | null
          pharm_amount?: number | null
          physician1_index_number?: string | null
          physician2_index_number?: string | null
          princ_diag_code?: string | null
          pro_fee_amount?: number | null
          proc_code_1?: string | null
          proc_code_10?: string | null
          proc_code_11?: string | null
          proc_code_12?: string | null
          proc_code_13?: string | null
          proc_code_14?: string | null
          proc_code_15?: string | null
          proc_code_16?: string | null
          proc_code_17?: string | null
          proc_code_18?: string | null
          proc_code_19?: string | null
          proc_code_2?: string | null
          proc_code_20?: string | null
          proc_code_21?: string | null
          proc_code_22?: string | null
          proc_code_23?: string | null
          proc_code_24?: string | null
          proc_code_25?: string | null
          proc_code_3?: string | null
          proc_code_4?: string | null
          proc_code_5?: string | null
          proc_code_6?: string | null
          proc_code_7?: string | null
          proc_code_8?: string | null
          proc_code_9?: string | null
          pt_amount?: number | null
          public_health_region?: string | null
          race?: string | null
          rad_amount?: number | null
          record_id?: string | null
          related_cause_code_1?: string | null
          related_cause_code_2?: string | null
          related_cause_code_3?: string | null
          secondary_payment_src?: string | null
          service_quarter?: string | null
          sex_code?: string | null
          source_of_admission?: string | null
          spec_unit_1?: string | null
          spec_unit_2?: string | null
          spec_unit_3?: string | null
          spec_unit_4?: string | null
          spec_unit_5?: string | null
          speech_amount?: number | null
          thcic_id?: string | null
          total_charges?: number | null
          total_charges_ancil?: number | null
          total_non_cov_charges?: number | null
          total_non_cov_charges_ancil?: number | null
          type_of_bill?: string | null
          used_dme_amount?: number | null
        }
        Update: {
          ambulance_amount?: number | null
          anes_amount?: number | null
          blood_adm_amount?: number | null
          blood_amount?: number | null
          card_amount?: number | null
          clinic_amount?: number | null
          condition_code_1?: string | null
          condition_code_2?: string | null
          condition_code_3?: string | null
          condition_code_4?: string | null
          condition_code_5?: string | null
          condition_code_6?: string | null
          condition_code_7?: string | null
          condition_code_8?: string | null
          dme_amount?: number | null
          e_code_1?: string | null
          e_code_10?: string | null
          e_code_2?: string | null
          e_code_3?: string | null
          e_code_4?: string | null
          e_code_5?: string | null
          e_code_6?: string | null
          e_code_7?: string | null
          e_code_8?: string | null
          e_code_9?: string | null
          emergency_dept_flag?: string | null
          er_amount?: number | null
          esrd_amount?: number | null
          ethnicity?: string | null
          facility_name?: string | null
          first_payment_src?: string | null
          id?: string
          input_format?: string | null
          it_amount?: number | null
          lab_amount?: number | null
          length_of_service?: string | null
          lith_amount?: number | null
          medsurg_amount?: number | null
          mri_amount?: number | null
          op_amount?: number | null
          or_amount?: number | null
          organ_amount?: number | null
          ot_amount?: number | null
          oth_diag_code_1?: string | null
          oth_diag_code_10?: string | null
          oth_diag_code_11?: string | null
          oth_diag_code_12?: string | null
          oth_diag_code_13?: string | null
          oth_diag_code_14?: string | null
          oth_diag_code_15?: string | null
          oth_diag_code_16?: string | null
          oth_diag_code_17?: string | null
          oth_diag_code_18?: string | null
          oth_diag_code_19?: string | null
          oth_diag_code_2?: string | null
          oth_diag_code_20?: string | null
          oth_diag_code_21?: string | null
          oth_diag_code_22?: string | null
          oth_diag_code_23?: string | null
          oth_diag_code_24?: string | null
          oth_diag_code_3?: string | null
          oth_diag_code_4?: string | null
          oth_diag_code_5?: string | null
          oth_diag_code_6?: string | null
          oth_diag_code_7?: string | null
          oth_diag_code_8?: string | null
          oth_diag_code_9?: string | null
          other_amount?: number | null
          pat_age?: string | null
          pat_country?: string | null
          pat_county?: string | null
          pat_reason_for_visit?: string | null
          pat_state?: string | null
          pat_status?: string | null
          pat_zip?: string | null
          pharm_amount?: number | null
          physician1_index_number?: string | null
          physician2_index_number?: string | null
          princ_diag_code?: string | null
          pro_fee_amount?: number | null
          proc_code_1?: string | null
          proc_code_10?: string | null
          proc_code_11?: string | null
          proc_code_12?: string | null
          proc_code_13?: string | null
          proc_code_14?: string | null
          proc_code_15?: string | null
          proc_code_16?: string | null
          proc_code_17?: string | null
          proc_code_18?: string | null
          proc_code_19?: string | null
          proc_code_2?: string | null
          proc_code_20?: string | null
          proc_code_21?: string | null
          proc_code_22?: string | null
          proc_code_23?: string | null
          proc_code_24?: string | null
          proc_code_25?: string | null
          proc_code_3?: string | null
          proc_code_4?: string | null
          proc_code_5?: string | null
          proc_code_6?: string | null
          proc_code_7?: string | null
          proc_code_8?: string | null
          proc_code_9?: string | null
          pt_amount?: number | null
          public_health_region?: string | null
          race?: string | null
          rad_amount?: number | null
          record_id?: string | null
          related_cause_code_1?: string | null
          related_cause_code_2?: string | null
          related_cause_code_3?: string | null
          secondary_payment_src?: string | null
          service_quarter?: string | null
          sex_code?: string | null
          source_of_admission?: string | null
          spec_unit_1?: string | null
          spec_unit_2?: string | null
          spec_unit_3?: string | null
          spec_unit_4?: string | null
          spec_unit_5?: string | null
          speech_amount?: number | null
          thcic_id?: string | null
          total_charges?: number | null
          total_charges_ancil?: number | null
          total_non_cov_charges?: number | null
          total_non_cov_charges_ancil?: number | null
          type_of_bill?: string | null
          used_dme_amount?: number | null
        }
        Relationships: []
      }
      organization_challenges: {
        Row: {
          challenge_name: string
          created_at: string
          id: string
          mitigation_status: string | null
          organization_id: string | null
          severity_level: number | null
          updated_at: string
        }
        Insert: {
          challenge_name: string
          created_at?: string
          id?: string
          mitigation_status?: string | null
          organization_id?: string | null
          severity_level?: number | null
          updated_at?: string
        }
        Update: {
          challenge_name?: string
          created_at?: string
          id?: string
          mitigation_status?: string | null
          organization_id?: string | null
          severity_level?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_challenges_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "healthcare_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_priorities: {
        Row: {
          created_at: string
          id: string
          organization_id: string | null
          priority_name: string
          priority_rank: number | null
          target_completion_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id?: string | null
          priority_name: string
          priority_rank?: number | null
          target_completion_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string | null
          priority_name?: string
          priority_rank?: number | null
          target_completion_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_priorities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "healthcare_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      service_line_benchmarks: {
        Row: {
          average_revenue_percentage: number | null
          created_at: string
          id: string
          market_position: string | null
          organization_type: string
          region: string | null
          service_line: string
          updated_at: string
        }
        Insert: {
          average_revenue_percentage?: number | null
          created_at?: string
          id?: string
          market_position?: string | null
          organization_type: string
          region?: string | null
          service_line: string
          updated_at?: string
        }
        Update: {
          average_revenue_percentage?: number | null
          created_at?: string
          id?: string
          market_position?: string | null
          organization_type?: string
          region?: string | null
          service_line?: string
          updated_at?: string
        }
        Relationships: []
      }
      stakeholders: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          organization_id: string | null
          phone: string | null
          primary_contact: boolean | null
          role_type: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          organization_id?: string | null
          phone?: string | null
          primary_contact?: boolean | null
          role_type: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          phone?: string | null
          primary_contact?: boolean | null
          role_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stakeholders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "healthcare_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      strategic_initiatives: {
        Row: {
          competitive_disruption: number
          created_at: string
          description: string | null
          financial_impact: number
          id: string
          initiative_name: string
          operational_complexity: number
          organization_id: string | null
          time_urgency: number
        }
        Insert: {
          competitive_disruption: number
          created_at?: string
          description?: string | null
          financial_impact: number
          id?: string
          initiative_name: string
          operational_complexity: number
          organization_id?: string | null
          time_urgency: number
        }
        Update: {
          competitive_disruption?: number
          created_at?: string
          description?: string | null
          financial_impact?: number
          id?: string
          initiative_name?: string
          operational_complexity?: number
          organization_id?: string | null
          time_urgency?: number
        }
        Relationships: [
          {
            foreignKeyName: "strategic_initiatives_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "healthcare_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      strategic_insights: {
        Row: {
          confidence_score: number | null
          content: string
          created_at: string
          generated_at: string
          id: string
          insight_type: string
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          confidence_score?: number | null
          content: string
          created_at?: string
          generated_at?: string
          id?: string
          insight_type: string
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          confidence_score?: number | null
          content?: string
          created_at?: string
          generated_at?: string
          id?: string
          insight_type?: string
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "strategic_insights_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "healthcare_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tx_state_IP_2018: {
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
      mike_dashboard_data: {
        Row: {
          PROVIDER_NAME: string | null
          total_admissions: number | null
        }
        Relationships: []
      }
      my_dashboard_data: {
        Row: {
          PROVIDER_NAME: string | null
          total_admissions: number | null
        }
        Relationships: []
      }
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
