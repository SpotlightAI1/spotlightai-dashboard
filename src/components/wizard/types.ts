
export interface WizardData {
  // Step 1 - Basic Information
  name: string;
  type: string;
  annual_revenue_range: string;
  market: string;
  
  // Step 2 - Operational Details
  beds: number | null;
  employee_count: number | null;
  market_position: string;
  ehr_system: string;
  
  // Step 3 - Strategic Context
  strategic_priorities: string[];
  current_challenges: string[];
  technology_maturity_level: number;
  change_management_capability: number;
  
  // Step 4 - Stakeholder Information
  stakeholders: Array<{
    name: string;
    title: string;
    email: string;
    phone: string;
    role_type: string;
    primary_contact: boolean;
  }>;
  board_composition_type: string;
  strategic_decision_timeline: string;
}
