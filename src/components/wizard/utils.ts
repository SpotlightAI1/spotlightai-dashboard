
import { WizardData } from './types';

export const generateMasterPrompt = (data: WizardData): string => {
  const stakeholdersList = data.stakeholders
    .map(s => `${s.name} (${s.title})`)
    .join(', ');

  return `You are analyzing ${data.name}, a ${data.type} with ${data.annual_revenue_range} in annual revenue, operating ${data.beds || 'N/A'} beds and employing ${data.employee_count || 'N/A'} people in the ${data.market} market.

Their market position is ${data.market_position} and their top strategic priorities are: ${data.strategic_priorities.join(', ')}. Key challenges include: ${data.current_challenges.join(', ')}. Technology maturity is level ${data.technology_maturity_level}/5 and change management capability is level ${data.change_management_capability}/5.

Key stakeholders include: ${stakeholdersList}. Board composition is ${data.board_composition_type} and typical strategic decisions take ${data.strategic_decision_timeline}.

When providing strategic recommendations, consider their specific constraints and capabilities based on the profile data. Tailor all analysis to their organizational context, resource constraints, and strategic priorities. Focus on initiatives that align with their technology maturity level and change management capabilities.`;
};
