
import { useState } from 'react';
import { WizardData } from './types';

export const useWizardData = () => {
  const [wizardData, setWizardData] = useState<WizardData>({
    name: '',
    type: '',
    annual_revenue_range: '',
    market: '',
    beds: null,
    employee_count: null,
    market_position: '',
    ehr_system: '',
    strategic_priorities: [],
    current_challenges: [],
    technology_maturity_level: 1,
    change_management_capability: 1,
    stakeholders: [],
    board_composition_type: '',
    strategic_decision_timeline: ''
  });

  const updateWizardData = (stepData: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...stepData }));
  };

  return { wizardData, updateWizardData };
};
