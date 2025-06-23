
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Calendar, Settings, Play } from 'lucide-react';

export const ReportGenerator = () => {
  const [selectedReport, setSelectedReport] = useState('executive');
  const [dateRange, setDateRange] = useState('monthly');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'High-level performance overview for C-suite',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'operational',
      name: 'Operational Report',
      description: 'Detailed operational metrics and KPIs',
      icon: <Settings className="h-5 w-5" />
    },
    {
      id: 'financial',
      name: 'Financial Analysis',
      description: 'Revenue, costs, and financial performance',
      icon: <Download className="h-5 w-5" />
    },
    {
      id: 'quality',
      name: 'Quality Metrics',
      description: 'Patient outcomes and quality indicators',
      icon: <Calendar className="h-5 w-5" />
    }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Report Generator</CardTitle>
        <p className="text-sm text-gray-600">Create custom reports for stakeholders</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Report Type Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Report Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${selectedReport === report.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {report.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{report.name}</h4>
                      <p className="text-xs text-gray-600">{report.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Date Range</h3>
            <div className="flex flex-wrap gap-2">
              {['weekly', 'monthly', 'quarterly', 'yearly', 'custom'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-2 text-sm rounded border ${
                    dateRange === range
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Include Sections</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                'Key Metrics',
                'Service Lines',
                'Hospital Performance',
                'Benchmarks',
                'Financial Summary',
                'Quality Indicators',
                'Strategic Alerts',
                'Recommendations'
              ].map((section) => (
                <label key={section} className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>{section}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">
              Estimated generation time: 30-60 seconds
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className={`flex items-center space-x-2 px-4 py-2 rounded text-white ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Play className="h-4 w-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
