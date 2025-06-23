
// Healthcare-specific TypeScript interfaces and types

export interface ServiceLineBenchmark {
  id: string;
  organization_type: string;
  service_line: string;
  average_revenue_percentage: number | null;
  market_position: string | null;
  region: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceLineBenchmarkInsert {
  organization_type: string;
  service_line: string;
  average_revenue_percentage?: number | null;
  market_position?: string | null;
  region?: string | null;
}

export interface ServiceLineBenchmarkUpdate {
  organization_type?: string;
  service_line?: string;
  average_revenue_percentage?: number | null;
  market_position?: string | null;
  region?: string | null;
}

export interface StrategicInsight {
  id: string;
  organization_id: string | null;
  insight_type: string;
  content: string;
  confidence_score: number | null;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface StrategicInsightInsert {
  organization_id?: string | null;
  insight_type: string;
  content: string;
  confidence_score?: number | null;
  generated_at?: string;
}

export interface StrategicInsightUpdate {
  organization_id?: string | null;
  insight_type?: string;
  content?: string;
  confidence_score?: number | null;
  generated_at?: string;
}

// Common healthcare organization types
export type OrganizationType = 'Independent' | 'Regional' | 'Specialty' | 'Critical Access';

// Service line types (can be extended as needed)
export type ServiceLineType = 
  | 'Cardiology'
  | 'Orthopedics' 
  | 'Emergency Medicine'
  | 'Surgery'
  | 'Oncology'
  | 'Neurology'
  | 'Pediatrics'
  | 'Women\'s Health'
  | 'Mental Health'
  | 'Rehabilitation';

// Market position types
export type MarketPosition = 'Leader' | 'Challenger' | 'Follower' | 'Niche';

// Insight types for strategic insights
export type InsightType = 
  | 'Performance'
  | 'Market Opportunity'
  | 'Risk Assessment'
  | 'Operational Efficiency'
  | 'Financial Analysis'
  | 'Competitive Intelligence';
