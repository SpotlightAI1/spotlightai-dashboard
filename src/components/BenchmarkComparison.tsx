
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

export const BenchmarkComparison = () => {
  const benchmarkData = [
    { 
      metric: 'Operating Margin', 
      current: 14.2, 
      benchmark: 12.5, 
      target: 15.0,
      status: 'above'
    },
    { 
      metric: 'Patient Satisfaction', 
      current: 4.1, 
      benchmark: 4.3, 
      target: 4.5,
      status: 'below'
    },
    { 
      metric: 'Length of Stay', 
      current: 3.2, 
      benchmark: 3.8, 
      target: 3.0,
      status: 'above'
    },
    { 
      metric: 'Readmission Rate', 
      current: 8.7, 
      benchmark: 9.2, 
      target: 7.5,
      status: 'warning'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'above': return 'text-green-600';
      case 'below': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'above': return <TrendingUp className="h-4 w-4" />;
      case 'below': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <Target className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Benchmark Comparison</CardTitle>
        <p className="text-sm text-gray-600">Performance vs. industry standards and targets</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#3b82f6" name="Current" />
                <Bar dataKey="benchmark" fill="#94a3b8" name="Industry Avg" />
                <Bar dataKey="target" fill="#10b981" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarkData.map((item) => (
              <div key={item.metric} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{item.metric}</h4>
                  <div className={`flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Current:</span>
                    <span className="font-semibold">{item.current}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Industry:</span>
                    <span>{item.benchmark}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target:</span>
                    <span>{item.target}%</span>
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
