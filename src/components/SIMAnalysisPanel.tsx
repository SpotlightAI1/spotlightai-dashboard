
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, TrendingUp, Clock, DollarSign, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { useSIMAnalysis } from '@/hooks/useSIMAnalysis';
import type { OrganizationProfile, ScoredInitiative, RoleInsight, ActionItem } from '@/utils/simAnalysis';

interface SIMAnalysisPanelProps {
  selectedOrganization?: OrganizationProfile;
}

const QuadrantBadge = ({ quadrant }: { quadrant: ScoredInitiative['quadrant'] }) => {
  const colors = {
    'Quick Wins': 'bg-green-100 text-green-800 border-green-200',
    'Strategic Bets': 'bg-blue-100 text-blue-800 border-blue-200',
    'Fill-ins': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Money Pits': 'bg-red-100 text-red-800 border-red-200'
  };
  
  return (
    <Badge className={colors[quadrant]} variant="outline">
      {quadrant}
    </Badge>
  );
};

const PriorityBadge = ({ priority }: { priority: ActionItem['priority'] }) => {
  const colors = {
    'High': 'bg-red-100 text-red-800 border-red-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Low': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  
  return (
    <Badge className={colors[priority]} variant="outline">
      {priority}
    </Badge>
  );
};

const RoleIcon = ({ role }: { role: RoleInsight['role'] }) => {
  const icons = {
    'CEO': TrendingUp,
    'CFO': DollarSign,
    'COO': Users
  };
  const Icon = icons[role];
  return <Icon className="h-5 w-5" />;
};

export const SIMAnalysisPanel = ({ selectedOrganization }: SIMAnalysisPanelProps) => {
  const { analysis, generateAnalysis, isGenerating, isLoading, error } = useSIMAnalysis();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample organization for demo purposes
  const defaultOrganization: OrganizationProfile = {
    id: 'demo-org',
    name: 'Regional Medical Center',
    type: 'Regional',
    beds: 275,
    revenue: 185000000,
    market: 'Metro Area',
    strategic_priorities: ['Patient Experience', 'Technology Modernization', 'Cost Reduction']
  };

  const organization = selectedOrganization || defaultOrganization;

  const handleGenerateAnalysis = () => {
    generateAnalysis(organization);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            SIM Analysis Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Strategic Impact Matrix Analysis
        </CardTitle>
        <p className="text-sm text-gray-600">
          AI-powered strategic prioritization with role-specific insights and actionable recommendations
        </p>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Analysis Target: {organization.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {organization.type}
                </div>
                <div>
                  <span className="font-medium">Beds:</span> {organization.beds}
                </div>
                <div>
                  <span className="font-medium">Revenue:</span> ${Math.round(organization.revenue / 1000000)}M
                </div>
                <div>
                  <span className="font-medium">Market:</span> {organization.market}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateAnalysis} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Analysis...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate SIM Analysis
                </>
              )}
            </Button>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
              <TabsTrigger value="insights">Role Insights</TabsTrigger>
              <TabsTrigger value="actions">Action Items</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-sm leading-relaxed">
                  {analysis.executive_summary}
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Industry Benchmarks</h4>
                  <div className="text-xs space-y-1">
                    <div>Tech Complexity: {analysis.industry_benchmarks.organization_type_factors.technology_complexity_multiplier.toFixed(1)}x</div>
                    <div>Financial Impact: {analysis.industry_benchmarks.organization_type_factors.financial_impact_multiplier.toFixed(1)}x</div>
                    <div>Disruption Boost: +{analysis.industry_benchmarks.organization_type_factors.disruption_boost.toFixed(1)}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Quick Stats</h4>
                  <div className="text-xs space-y-1">
                    <div>Total Initiatives: {analysis.scored_initiatives.length}</div>
                    <div>Quick Wins: {analysis.scored_initiatives.filter(i => i.quadrant === 'Quick Wins').length}</div>
                    <div>Strategic Bets: {analysis.scored_initiatives.filter(i => i.quadrant === 'Strategic Bets').length}</div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleGenerateAnalysis} 
                disabled={isGenerating}
                variant="outline"
                size="sm"
              >
                Regenerate Analysis
              </Button>
            </TabsContent>

            <TabsContent value="initiatives" className="space-y-4">
              <div className="space-y-3">
                {analysis.scored_initiatives.slice(0, 8).map((initiative, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{initiative.initiative_name}</h4>
                      <div className="flex items-center gap-2">
                        <QuadrantBadge quadrant={initiative.quadrant} />
                        {initiative.auto_generated && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                            AI Generated
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600">{initiative.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>Financial: {initiative.financial_impact}/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Urgency: {initiative.time_urgency}/5</span>
                      </div>
                      <div>
                        <span className="font-medium">Priority: {initiative.priority_score.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              {analysis.role_insights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <RoleIcon role={insight.role} />
                    <h3 className="font-semibold">{insight.role} Perspective</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 italic">{insight.perspective}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Concerns:</h4>
                    <ul className="text-xs space-y-1 ml-4">
                      {insight.key_concerns.map((concern, idx) => (
                        <li key={idx} className="list-disc">{concern}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Recommendations:</h4>
                    <ul className="text-xs space-y-1 ml-4">
                      {insight.recommendations.map((rec, idx) => (
                        <li key={idx} className="list-disc">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="actions" className="space-y-3">
              {analysis.action_items.map((action, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{action.task}</h4>
                    <PriorityBadge priority={action.priority} />
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{action.timeline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{action.responsible_role}</span>
                    </div>
                  </div>
                  
                  {action.dependencies.length > 0 && (
                    <div className="text-xs">
                      <span className="font-medium">Dependencies: </span>
                      <span className="text-gray-600">{action.dependencies.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
