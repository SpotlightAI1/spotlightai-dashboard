
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const ServiceLinePortfolio = () => {
  const portfolioData = [
    { name: 'Cardiology', value: 28.5, benchmark: 25.0, color: '#8884d8' },
    { name: 'Orthopedics', value: 22.3, benchmark: 20.0, color: '#82ca9d' },
    { name: 'Oncology', value: 18.7, benchmark: 22.0, color: '#ffc658' },
    { name: 'Emergency', value: 15.2, benchmark: 18.0, color: '#ff7300' },
    { name: 'Neurology', value: 8.9, benchmark: 8.5, color: '#8dd1e1' },
    { name: 'Gastroenterology', value: 6.4, benchmark: 6.5, color: '#d084d0' }
  ];

  const benchmarkComparison = portfolioData.map(item => ({
    name: item.name,
    actual: item.value,
    benchmark: item.benchmark,
    variance: item.value - item.benchmark
  }));

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Service Line Portfolio Analysis</CardTitle>
        <p className="text-sm text-gray-600">Market share comparison vs. industry benchmarks</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Current Portfolio Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">vs. Industry Benchmarks</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}%`, name === 'actual' ? 'Our System' : name === 'benchmark' ? 'Industry Avg' : 'Variance']} />
                  <Bar dataKey="actual" fill="#3b82f6" name="actual" />
                  <Bar dataKey="benchmark" fill="#94a3b8" name="benchmark" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioData.map((service) => {
            const variance = service.value - service.benchmark;
            const isOutperforming = variance > 0;
            
            return (
              <div key={service.name} className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm text-gray-900">{service.name}</h4>
                <div className="text-xs text-gray-600 mt-1">
                  <div>Current: {service.value}%</div>
                  <div>Benchmark: {service.benchmark}%</div>
                  <div className={`font-medium ${isOutperforming ? 'text-green-600' : 'text-red-600'}`}>
                    {isOutperforming ? '+' : ''}{variance.toFixed(1)}% vs benchmark
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
