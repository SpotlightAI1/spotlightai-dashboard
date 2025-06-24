
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSetonAdmissions } from '@/hooks/useSetonAdmissions';
import { Loader2 } from 'lucide-react';

export const SetonAdmissionsChart = () => {
  const { data: setonData, isLoading, error } = useSetonAdmissions();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Seton Facilities - Total Admissions</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading Seton admissions data...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Seton Facilities - Total Admissions</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-red-600">Error loading data: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  if (!setonData || setonData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Seton Facilities - Total Admissions</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-gray-600">No Seton facility data found</div>
        </CardContent>
      </Card>
    );
  }

  // Format data for the chart with shortened facility names for better display
  const chartData = setonData.map(item => ({
    name: item.PROVIDER_NAME.replace(/Seton\s*/gi, '').trim() || item.PROVIDER_NAME,
    fullName: item.PROVIDER_NAME,
    admissions: item.total_admissions,
    thcicId: item.THCIC_ID
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Seton Facilities - Total Admissions (2018)</CardTitle>
        <p className="text-sm text-gray-600">
          Total admissions by Seton healthcare facilities based on Texas State IP data
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                angle={-45} 
                textAnchor="end" 
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, 'Total Admissions']}
                labelFormatter={(label) => {
                  const item = chartData.find(d => d.name === label);
                  return item ? item.fullName : label;
                }}
              />
              <Bar 
                dataKey="admissions" 
                fill="#3b82f6" 
                name="admissions"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary statistics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {setonData.length}
            </div>
            <div className="text-sm text-gray-600">Facilities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {setonData.reduce((sum, item) => sum + item.total_admissions, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Admissions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(setonData.reduce((sum, item) => sum + item.total_admissions, 0) / setonData.length).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Avg per Facility</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...setonData.map(item => item.total_admissions)).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Highest</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
