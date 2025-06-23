
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, AlertTriangle } from 'lucide-react';

export const ExecutiveSummary = () => {
  const keyMetrics = [
    {
      title: 'Total System Revenue',
      value: '$2.47B',
      change: '+8.7%',
      trend: 'up' as const,
      icon: <DollarSign className="h-5 w-5 text-green-500" />
    },
    {
      title: 'Patient Volume',
      value: '284K',
      change: '+12.3%',
      trend: 'up' as const,
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    {
      title: 'Operating Margin',
      value: '14.2%',
      change: '+2.1%',
      trend: 'up' as const,
      icon: <Activity className="h-5 w-5 text-purple-500" />
    },
    {
      title: 'Quality Score',
      value: '4.2/5',
      change: '-0.3%',
      trend: 'down' as const,
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />
    }
  ];

  const highlights = [
    {
      category: 'Performance',
      status: 'positive',
      message: 'Cardiology and Orthopedics outperforming market benchmarks by 3.5% and 2.3% respectively'
    },
    {
      category: 'Opportunity',
      status: 'warning',
      message: 'Emergency services underperforming benchmark by 2.8% - optimization opportunity identified'
    },
    {
      category: 'Growth',
      status: 'positive',
      message: 'Neurology showing 15.2% growth in surgical procedures, leading system performance'
    },
    {
      category: 'Risk',
      status: 'alert',
      message: 'Patient satisfaction scores trending downward across 3 facilities - immediate attention required'
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Executive Summary</CardTitle>
        <p className="text-sm text-gray-600">System-wide performance overview and key insights</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white">
              <div className="flex items-center justify-between mb-2">
                {metric.icon}
                <div className={`text-xs flex items-center ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.title}</div>
            </div>
          ))}
        </div>

        {/* Key Highlights */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h3>
          <div className="space-y-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  highlight.status === 'positive' ? 'bg-green-500' :
                  highlight.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      highlight.status === 'positive' ? 'bg-green-100 text-green-800' :
                      highlight.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {highlight.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{highlight.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">Immediate (0-30 days)</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Address patient satisfaction concerns at underperforming facilities</li>
                <li>• Implement emergency services optimization plan</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-medium text-green-900 mb-2">Strategic (30-90 days)</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Expand neurology surgical capacity to meet growing demand</li>
                <li>• Leverage cardiology best practices across system</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
