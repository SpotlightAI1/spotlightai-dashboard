

export interface OrganizationProfile {
  id: string;
  name: string;
  type: 'Independent' | 'Regional' | 'Specialty' | 'Critical Access';
  beds: number;
  revenue: number;
  market: string;
  strategic_priorities?: string[];
}

export interface ScoredInitiative {
  initiative_name: string;
  financial_impact: number;
  operational_complexity: number;
  competitive_disruption: number;
  time_urgency: number;
  description: string;
  priority_score: number;
  quadrant: 'Quick Wins' | 'Strategic Bets' | 'Fill-ins' | 'Money Pits';
  auto_generated: boolean;
}

export interface RoleInsight {
  role: 'CEO' | 'CFO' | 'COO';
  perspective: string;
  key_concerns: string[];
  recommendations: string[];
}

export interface ActionItem {
  task: string;
  timeline: string;
  responsible_role: string;
  priority: 'High' | 'Medium' | 'Low';
  dependencies: string[];
}

export interface SIMAnalysisResult {
  organization_profile: OrganizationProfile;
  scored_initiatives: ScoredInitiative[];
  role_insights: RoleInsight[];
  action_items: ActionItem[];
  executive_summary: string;
  industry_benchmarks: {
    organization_type_factors: Record<string, number>;
    size_factors: Record<string, number>;
  };
  generated_at: string;
}

// Industry benchmark adjustments
const ORGANIZATION_TYPE_ADJUSTMENTS = {
  'Independent': {
    technology_complexity_multiplier: 1.3,
    financial_impact_multiplier: 0.9,
    disruption_boost: 0.2
  },
  'Regional': {
    technology_complexity_multiplier: 1.0,
    financial_impact_multiplier: 1.1,
    disruption_boost: 0.1
  },
  'Specialty': {
    technology_complexity_multiplier: 0.8,
    financial_impact_multiplier: 1.2,
    disruption_boost: 0.3
  },
  'Critical Access': {
    technology_complexity_multiplier: 1.5,
    financial_impact_multiplier: 0.7,
    disruption_boost: 0.0
  }
};

const SIZE_ADJUSTMENTS = {
  small: { beds: [0, 100], complexity_multiplier: 1.2, financial_multiplier: 0.8 },
  medium: { beds: [101, 300], complexity_multiplier: 1.0, financial_multiplier: 1.0 },
  large: { beds: [301, 600], complexity_multiplier: 0.9, financial_multiplier: 1.2 },
  enterprise: { beds: [601, Infinity], complexity_multiplier: 0.8, financial_multiplier: 1.3 }
};

// Common healthcare initiatives template
const COMMON_INITIATIVES = [
  {
    initiative_name: 'Electronic Health Record (EHR) Modernization',
    base_financial_impact: 3,
    base_complexity: 4,
    base_disruption: 3,
    base_urgency: 4,
    description: 'Upgrade or implement comprehensive EHR system to improve clinical workflows and data integration',
    category: 'technology'
  },
  {
    initiative_name: 'Value-Based Care Program',
    base_financial_impact: 4,
    base_complexity: 4,
    base_disruption: 4,
    base_urgency: 5,
    description: 'Transition to value-based payment models with focus on quality outcomes and cost reduction',
    category: 'financial'
  },
  {
    initiative_name: 'Telehealth Platform Expansion',
    base_financial_impact: 3,
    base_complexity: 2,
    base_disruption: 3,
    base_urgency: 4,
    description: 'Expand telehealth capabilities to improve patient access and operational efficiency',
    category: 'technology'
  },
  {
    initiative_name: 'Physician Recruitment & Retention',
    base_financial_impact: 4,
    base_complexity: 3,
    base_disruption: 2,
    base_urgency: 5,
    description: 'Comprehensive strategy to recruit and retain clinical staff in competitive market',
    category: 'workforce'
  },
  {
    initiative_name: 'Patient Experience Enhancement',
    base_financial_impact: 2,
    base_complexity: 2,
    base_disruption: 2,
    base_urgency: 3,
    description: 'Systematic improvement of patient satisfaction and engagement across all touchpoints',
    category: 'operational'
  },
  {
    initiative_name: 'Cybersecurity Infrastructure Upgrade',
    base_financial_impact: 2,
    base_complexity: 3,
    base_disruption: 1,
    base_urgency: 4,
    description: 'Strengthen cybersecurity defenses to protect patient data and ensure regulatory compliance',
    category: 'technology'
  },
  {
    initiative_name: 'Supply Chain Optimization',
    base_financial_impact: 3,
    base_complexity: 3,
    base_disruption: 2,
    base_urgency: 3,
    description: 'Optimize procurement and inventory management to reduce costs and improve efficiency',
    category: 'operational'
  },
  {
    initiative_name: 'Population Health Management',
    base_financial_impact: 4,
    base_complexity: 4,
    base_disruption: 3,
    base_urgency: 3,
    description: 'Implement population health strategies to improve community outcomes and reduce readmissions',
    category: 'clinical'
  }
];

function getSizeCategory(beds: number): keyof typeof SIZE_ADJUSTMENTS {
  for (const [category, config] of Object.entries(SIZE_ADJUSTMENTS)) {
    if (beds >= config.beds[0] && beds <= config.beds[1]) {
      return category as keyof typeof SIZE_ADJUSTMENTS;
    }
  }
  return 'medium';
}

function calculatePriorityScore(initiative: ScoredInitiative): number {
  // Weighted priority score: Financial Impact (40%) + Urgency (30%) + Disruption (20%) - Complexity (10%)
  return (
    initiative.financial_impact * 0.4 +
    initiative.time_urgency * 0.3 +
    initiative.competitive_disruption * 0.2 -
    initiative.operational_complexity * 0.1
  );
}

function determineQuadrant(financial_impact: number, complexity: number): ScoredInitiative['quadrant'] {
  const highImpact = financial_impact >= 3.5;
  const highComplexity = complexity >= 3.5;
  
  if (highImpact && !highComplexity) return 'Quick Wins';
  if (highImpact && highComplexity) return 'Strategic Bets';
  if (!highImpact && !highComplexity) return 'Fill-ins';
  return 'Money Pits';
}

function generateScoredInitiatives(org: OrganizationProfile, existingInitiatives: ScoredInitiative[] = []): ScoredInitiative[] {
  const orgTypeAdj = ORGANIZATION_TYPE_ADJUSTMENTS[org.type];
  const sizeCategory = getSizeCategory(org.beds);
  const sizeAdj = SIZE_ADJUSTMENTS[sizeCategory];
  
  // Score existing initiatives first
  const scoredExisting = existingInitiatives.map(initiative => ({
    ...initiative,
    priority_score: calculatePriorityScore(initiative),
    quadrant: determineQuadrant(initiative.financial_impact, initiative.operational_complexity),
    auto_generated: false
  }));
  
  // Generate common initiatives not already present
  const existingNames = new Set(existingInitiatives.map(i => i.initiative_name));
  const newInitiatives = COMMON_INITIATIVES
    .filter(template => !existingNames.has(template.initiative_name))
    .map(template => {
      let financial_impact = template.base_financial_impact * sizeAdj.financial_multiplier;
      let complexity = template.base_complexity;
      let disruption = template.base_disruption;
      
      // Apply organization type adjustments
      if (template.category === 'technology') {
        complexity *= orgTypeAdj.technology_complexity_multiplier;
      }
      financial_impact *= orgTypeAdj.financial_impact_multiplier;
      disruption = Math.min(5, disruption + orgTypeAdj.disruption_boost);
      
      // Clamp values to 1-5 range
      financial_impact = Math.max(1, Math.min(5, Math.round(financial_impact)));
      complexity = Math.max(1, Math.min(5, Math.round(complexity)));
      disruption = Math.max(1, Math.min(5, Math.round(disruption)));
      
      const initiative: ScoredInitiative = {
        initiative_name: template.initiative_name,
        financial_impact,
        operational_complexity: complexity,
        competitive_disruption: disruption,
        time_urgency: template.base_urgency,
        description: template.description,
        priority_score: 0,
        quadrant: 'Fill-ins',
        auto_generated: true
      };
      
      initiative.priority_score = calculatePriorityScore(initiative);
      initiative.quadrant = determineQuadrant(initiative.financial_impact, initiative.operational_complexity);
      
      return initiative;
    });
  
  return [...scoredExisting, ...newInitiatives].sort((a, b) => b.priority_score - a.priority_score);
}

function generateRoleInsights(org: OrganizationProfile, initiatives: ScoredInitiative[]): RoleInsight[] {
  const topInitiatives = initiatives.slice(0, 5);
  const quickWins = initiatives.filter(i => i.quadrant === 'Quick Wins');
  const strategicBets = initiatives.filter(i => i.quadrant === 'Strategic Bets');
  
  return [
    {
      role: 'CEO',
      perspective: 'Strategic Leadership & Market Position',
      key_concerns: [
        'Long-term competitive advantage and market differentiation',
        'Board reporting and stakeholder communication',
        'Organizational transformation and change management',
        'Risk management and strategic vision alignment'
      ],
      recommendations: [
        `Focus on ${strategicBets.length > 0 ? strategicBets[0].initiative_name : topInitiatives[0]?.initiative_name} for long-term competitive advantage`,
        `Prioritize ${quickWins.length > 0 ? quickWins[0].initiative_name : 'operational efficiency initiatives'} for quick wins to build momentum`,
        `Establish executive steering committee for top 3 strategic initiatives`,
        `Develop change management strategy for organization-wide transformation`
      ]
    },
    {
      role: 'CFO',
      perspective: 'Financial Performance & ROI',
      key_concerns: [
        'Return on investment and payback periods',
        'Cash flow impact and capital allocation',
        'Financial risk mitigation',
        'Cost reduction and revenue optimization'
      ],
      recommendations: [
        `Implement robust ROI tracking for ${topInitiatives[0]?.initiative_name} with quarterly milestones`,
        `Establish $${Math.round(org.revenue * 0.03 / 1000000)}M annual budget for strategic initiatives`,
        `Prioritize initiatives with financial impact scores above 3.5`,
        `Develop detailed business cases for all Strategic Bets quadrant initiatives`
      ]
    },
    {
      role: 'COO',
      perspective: 'Operational Excellence & Implementation',
      key_concerns: [
        'Operational workflow disruption during implementation',
        'Staff training and adoption challenges',
        'Process standardization and quality metrics',
        'Day-to-day operational continuity'
      ],
      recommendations: [
        `Begin with ${quickWins[0]?.initiative_name || topInitiatives[0]?.initiative_name} to minimize operational disruption`,
        `Develop phased implementation approach for high-complexity initiatives`,
        `Establish dedicated project management office for initiative coordination`,
        `Create comprehensive staff training programs for technology implementations`
      ]
    }
  ];
}

function generateActionItems(initiatives: ScoredInitiative[], org: OrganizationProfile): ActionItem[] {
  const topInitiatives = initiatives.slice(0, 6);
  const actionItems: ActionItem[] = [];
  
  // Executive alignment actions
  actionItems.push({
    task: 'Conduct executive strategic planning session to align on initiative priorities',
    timeline: '2 weeks',
    responsible_role: 'CEO',
    priority: 'High',
    dependencies: ['Board approval for strategic direction']
  });
  
  // Top initiative actions
  topInitiatives.forEach((initiative, index) => {
    const urgencyMap = { 5: 'High', 4: 'High', 3: 'Medium', 2: 'Medium', 1: 'Low' };
    const timelineMap = { 5: '1 month', 4: '6 weeks', 3: '2 months', 2: '3 months', 1: '4 months' };
    
    actionItems.push({
      task: `Develop detailed implementation plan for ${initiative.initiative_name}`,
      timeline: timelineMap[initiative.time_urgency as keyof typeof timelineMap],
      responsible_role: initiative.quadrant === 'Strategic Bets' ? 'CEO' : 'COO',
      priority: urgencyMap[initiative.time_urgency as keyof typeof urgencyMap] as ActionItem['priority'],
      dependencies: initiative.financial_impact >= 4 ? ['CFO budget approval', 'Board authorization'] : ['Department head alignment']
    });
  });
  
  // Organization-specific actions
  if (org.type === 'Critical Access') {
    actionItems.push({
      task: 'Explore federal funding opportunities for rural health initiatives',
      timeline: '3 months',
      responsible_role: 'CFO',
      priority: 'Medium',
      dependencies: ['Grant writing capability assessment']
    });
  }
  
  if (org.beds < 150) {
    actionItems.push({
      task: 'Evaluate shared services partnerships for complex technology initiatives',
      timeline: '2 months',
      responsible_role: 'COO',
      priority: 'Medium',
      dependencies: ['Partner organization identification']
    });
  }
  
  return actionItems.sort((a, b) => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

function generateExecutiveSummary(org: OrganizationProfile, initiatives: ScoredInitiative[], benchmarks: { organization_type_factors: Record<string, number>, size_factors: Record<string, number> }): string {
  const sizeCategory = getSizeCategory(org.beds);
  const topInitiative = initiatives[0];
  const quickWins = initiatives.filter(i => i.quadrant === 'Quick Wins').length;
  const strategicBets = initiatives.filter(i => i.quadrant === 'Strategic Bets').length;
  
  return `
Strategic Impact Matrix Analysis for ${org.name}

Organization Profile: ${org.type} ${sizeCategory} healthcare system with ${org.beds} beds and $${Math.round(org.revenue / 1000000)}M annual revenue.

Key Findings:
• ${initiatives.length} strategic initiatives identified with ${quickWins} Quick Wins and ${strategicBets} Strategic Bets
• Top priority: ${topInitiative?.initiative_name} (Priority Score: ${topInitiative?.priority_score.toFixed(1)})
• Organization type factors: ${org.type} systems typically face ${org.type === 'Independent' ? 'higher technology complexity but benefit from agility' : org.type === 'Critical Access' ? 'resource constraints but have access to rural health funding' : 'balanced complexity with strong market position'}

Immediate Recommendations:
1. Focus on Quick Wins to build momentum and demonstrate value
2. Develop comprehensive business cases for Strategic Bets
3. Establish cross-functional steering committee for implementation oversight
4. Align initiatives with ${org.type} system strengths and market position

This analysis provides a data-driven foundation for strategic decision-making aligned with your organization's unique characteristics and market position.
  `.trim();
}

export const generateSIMAnalysis = (
  organization: OrganizationProfile,
  existingInitiatives: ScoredInitiative[] = []
): SIMAnalysisResult => {
  console.log('Generating SIM analysis for organization:', organization.name);
  
  // Get industry benchmarks for this organization type
  const benchmarks = getIndustryBenchmarks(organization);
  
  // Generate additional initiatives if we have fewer than 8
  const allInitiatives = [...existingInitiatives];
  
  if (allInitiatives.length < 8) {
    const additionalInitiatives = generateInitiativesForOrganization(organization, 8 - allInitiatives.length);
    allInitiatives.push(...additionalInitiatives);
  }
  
  // Score all initiatives
  const scoredInitiatives = allInitiatives.map(initiative => {
    const baseScore = (
      initiative.financial_impact * benchmarks.organization_type_factors.financial_impact_multiplier +
      (6 - initiative.operational_complexity) * benchmarks.organization_type_factors.technology_complexity_multiplier +
      (initiative.competitive_disruption + benchmarks.organization_type_factors.disruption_boost) +
      initiative.time_urgency
    ) / 4;
    
    // Apply organization-specific adjustments
    let adjustedScore = baseScore;
    
    // Size-based adjustments
    if (organization.beds < 150) {
      // Smaller hospitals - reduce complexity tolerance
      adjustedScore = adjustedScore * 0.9;
    } else if (organization.beds > 400) {
      // Larger hospitals - increase impact potential
      adjustedScore = adjustedScore * 1.1;
    }
    
    // Revenue-based adjustments
    if (organization.revenue < 100000000) {
      // Lower revenue - emphasize cost control
      if (initiative.initiative_name.toLowerCase().includes('cost') || 
          initiative.initiative_name.toLowerCase().includes('efficiency')) {
        adjustedScore = adjustedScore * 1.2;
      }
    }
    
    const finalScore = Math.max(1, Math.min(5, adjustedScore));
    
    // Determine quadrant based on impact vs complexity
    let quadrant: ScoredInitiative['quadrant'];
    const complexityScore = initiative.operational_complexity;
    const impactScore = initiative.financial_impact;
    
    if (impactScore >= 3 && complexityScore <= 3) {
      quadrant = 'Quick Wins';
    } else if (impactScore >= 3 && complexityScore > 3) {
      quadrant = 'Strategic Bets';
    } else if (impactScore < 3 && complexityScore <= 3) {
      quadrant = 'Fill-ins';
    } else {
      quadrant = 'Money Pits';
    }
    
    return {
      ...initiative,
      priority_score: parseFloat(finalScore.toFixed(1)),
      quadrant
    };
  });
  
  // Sort by priority score
  scoredInitiatives.sort((a, b) => b.priority_score - a.priority_score);
  
  // Generate role-specific insights
  const roleInsights = generateRoleInsights(organization, scoredInitiatives);
  
  // Generate action items
  const actionItems = generateActionItems(scoredInitiatives, organization);
  
  // Generate executive summary
  const executiveSummary = generateExecutiveSummary(organization, scoredInitiatives, benchmarks);
  
  return {
    organization_profile: organization,
    scored_initiatives: scoredInitiatives,
    role_insights: roleInsights,
    action_items: actionItems,
    executive_summary: executiveSummary,
    industry_benchmarks: benchmarks,
    generated_at: new Date().toISOString()
  };
};

function getIndustryBenchmarks(org: OrganizationProfile): { organization_type_factors: Record<string, number>, size_factors: Record<string, number> } {
  const orgTypeAdj = ORGANIZATION_TYPE_ADJUSTMENTS[org.type];
  const sizeCategory = getSizeCategory(org.beds);
  const sizeAdj = SIZE_ADJUSTMENTS[sizeCategory];
  
  return {
    organization_type_factors: {
      technology_complexity_multiplier: orgTypeAdj.technology_complexity_multiplier,
      financial_impact_multiplier: orgTypeAdj.financial_impact_multiplier,
      disruption_boost: orgTypeAdj.disruption_boost
    },
    size_factors: {
      complexity_multiplier: sizeAdj.complexity_multiplier,
      financial_multiplier: sizeAdj.financial_multiplier
    }
  };
}

function generateInitiativesForOrganization(org: OrganizationProfile, count: number): ScoredInitiative[] {
  // Use the common initiatives generation logic
  const generated = generateScoredInitiatives(org, []);
  return generated.slice(0, count);
}

