
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ServiceLineBreakdownProps {
  onServiceLineSelect: (serviceLine: string) => void;
  selectedServiceLine: string | null;
}

export const ServiceLineBreakdown = ({ onServiceLineSelect, selectedServiceLine }: ServiceLineBreakdownProps) => {
  const serviceLineData = [
    { name: 'Cardiology', admissions: 456, revenue: 45.2, surgeries: 234 },
    { name: 'Orthopedics', admissions: 389, revenue: 38.7, surgeries: 298 },
    { name: 'Oncology', admissions: 267, revenue: 52.1, surgeries: 145 },
    { name: 'Neurology', admissions: 234, revenue: 28.9, surgeries: 87 },
    { name: 'Emergency', admissions: 567, revenue: 23.4, surgeries: 156 },
    { name: 'Gastroenterology', admissions: 189, revenue: 19.8, surgeries: 134 }
  ];

  const pieData = serviceLineData.map((item, index) => ({
    name: item.name,
    value: item.revenue,
    color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'][index]
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Service Line Performance</CardTitle>
        <p className="text-sm text-gray-600">Click on a service line to drill down to physician level</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value}${name === 'revenue' ? 'M' : ''}`, name === 'revenue' ? 'Revenue ($M)' : 'Admissions']}
                />
                <Bar 
                  dataKey="admissions" 
                  fill="#3b82f6" 
                  name="admissions"
                  onClick={(data) => onServiceLineSelect(data.name)}
                  className="cursor-pointer hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {serviceLineData.map((service) => (
              <div 
                key={service.name}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedServiceLine === service.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onServiceLineSelect(service.name)}
              >
                <h4 className="font-medium text-sm text-gray-900">{service.name}</h4>
                <div className="text-xs text-gray-600 mt-1">
                  <div>Admissions: {service.admissions}</div>
                  <div>Revenue: ${service.revenue}M</div>
                  <div>Surgeries: {service.surgeries}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
