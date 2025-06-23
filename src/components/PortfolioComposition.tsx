
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const PortfolioComposition = () => {
  const compositionData = [
    { name: 'Cardiology', value: 32.5, growth: 8.2, color: '#3b82f6' },
    { name: 'Orthopedics', value: 24.8, growth: 12.1, color: '#10b981' },
    { name: 'Oncology', value: 18.9, growth: -2.3, color: '#f59e0b' },
    { name: 'Emergency', value: 12.4, growth: 5.7, color: '#ef4444' },
    { name: 'Neurology', value: 7.2, growth: 15.4, color: '#8b5cf6' },
    { name: 'Other', value: 4.2, growth: 3.1, color: '#6b7280' }
  ];

  const totalValue = compositionData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Portfolio Composition</CardTitle>
        <p className="text-sm text-gray-600">Service line distribution and growth trends</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={compositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {compositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {compositionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{item.value}%</div>
                  <div className={`text-xs flex items-center ${
                    item.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.growth > 0 ? 
                      <TrendingUp className="h-3 w-3 mr-1" /> : 
                      <TrendingDown className="h-3 w-3 mr-1" />
                    }
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
