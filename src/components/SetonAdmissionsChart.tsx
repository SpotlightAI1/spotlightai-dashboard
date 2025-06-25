
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSetonAdmissions } from '@/hooks/useSetonAdmissions';
import { Loader2 } from 'lucide-react';

export const SetonAdmissionsChart = () => {
  const { data: facilityData, isLoading, error } = useSetonAdmissions();

  console.log('Chart component - facilityData:', facilityData);
  console.log('Chart component - isLoading:', isLoading);
  console.log('Chart component - error:', error);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Facility Admissions - Total Volume</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading facility admissions data...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('Chart error:', error);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Facility Admissions - Total Volume</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-red-600">Error loading data: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  if (!facilityData || facilityData.length === 0) {
    console.log('No data to display in chart');
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Facility Admissions - Total Volume</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-gray-600">No facility admission data found</div>
        </CardContent>
      </Card>
    );
  }

  // Take top 20 facilities for better chart readability
  const topFacilities = facilityData.slice(0, 20);

  // Format data for the chart
  const chartData = topFacilities.map(item => ({
    name: item.PROVIDER_NAME.length > 30 
      ? item.PROVIDER_NAME.substring(0, 27) + '...' 
      : item.PROVIDER_NAME,
    fullName: item.PROVIDER_NAME,
    admissions: item.total_admission_volume
  }));

  console.log('Chart data formatted:', chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Top 20 Facilities - Admission Volume (2018)</CardTitle>
        <p className="text-sm text-gray-600">
          Total admissions by healthcare facilities (top 20 by volume)
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }} 
                angle={-45} 
                textAnchor="end" 
                height={100}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value.toLocaleString(), 'Total Admissions']}
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
              {facilityData.length}
            </div>
            <div className="text-sm text-gray-600">Total Facilities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {facilityData.reduce((sum, item) => sum + item.total_admission_volume, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Admissions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(facilityData.reduce((sum, item) => sum + item.total_admission_volume, 0) / facilityData.length).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Avg per Facility</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...facilityData.map(item => item.total_admission_volume)).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Highest Volume</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
