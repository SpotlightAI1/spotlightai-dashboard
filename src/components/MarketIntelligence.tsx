
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';

export const MarketIntelligence = () => {
  const marketData = [
    {
      title: 'Market Share Growth',
      value: '+2.3%',
      trend: 'up',
      description: 'Gained market share in cardiology services vs. competitors'
    },
    {
      title: 'Competitive Position',
      value: '#2',
      trend: 'up',
      description: 'Second largest health system in region by volume'
    },
    {
      title: 'Patient Satisfaction',
      value: '4.6/5',
      trend: 'up',
      description: 'Above regional average of 4.2/5'
    }
  ];

  const competitorAnalysis = [
    {
      name: 'Regional Medical Center',
      marketShare: '28%',
      trend: 'down',
      strength: 'Emergency Services'
    },
    {
      name: 'Metro Health System',
      marketShare: '24%',
      trend: 'up',
      strength: 'Oncology'
    },
    {
      name: 'University Hospital',
      marketShare: '19%',
      trend: 'neutral',
      strength: 'Research & Teaching'
    }
  ];

  const marketInsights = [
    {
      type: 'opportunity',
      title: 'Orthopedic Growth Opportunity',
      description: 'Aging population driving 15% increase in joint replacement demand',
      priority: 'high'
    },
    {
      type: 'threat',
      title: 'New Competitor Entry',
      description: 'Specialty cardiac center opening in Q3 2024',
      priority: 'medium'
    },
    {
      type: 'trend',
      title: 'Telehealth Adoption',
      description: '35% of follow-up visits now conducted virtually',
      priority: 'low'
    }
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Market Intelligence</CardTitle>
        <p className="text-sm text-gray-600">Competitive landscape and market trends</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Market Metrics */}
        <div className="grid grid-cols-1 gap-3">
          {marketData.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{metric.title}</h4>
                <p className="text-xs text-gray-600">{metric.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Competitor Analysis */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Top Competitors</h4>
          <div className="space-y-2">
            {competitorAnalysis.map((competitor, index) => (
              <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                <div>
                  <div className="text-sm font-medium text-gray-900">{competitor.name}</div>
                  <div className="text-xs text-gray-600">Strength: {competitor.strength}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{competitor.marketShare}</span>
                  {competitor.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                  {competitor.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Strategic Insights</h4>
          <div className="space-y-2">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {insight.type === 'opportunity' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {insight.type === 'threat' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {insight.type === 'trend' && <Info className="h-4 w-4 text-blue-500" />}
                    <span className="text-sm font-medium text-gray-900">{insight.title}</span>
                  </div>
                  <Badge variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}>
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
