
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingDown, Clock, CheckCircle } from 'lucide-react';

export const StrategicAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Emergency Department Capacity',
      message: 'ED utilization at 98% - immediate intervention required',
      priority: 'High',
      timestamp: '2 hours ago',
      category: 'Operations'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Physician Retention Risk',
      message: '3 key specialists considering departure - retention strategy needed',
      priority: 'Medium',
      timestamp: '1 day ago',
      category: 'Workforce'
    },
    {
      id: 3,
      type: 'info',
      title: 'Quality Metrics Trend',
      message: 'Patient satisfaction scores declining for 2 consecutive quarters',
      priority: 'Medium',
      timestamp: '3 days ago',
      category: 'Quality'
    },
    {
      id: 4,
      type: 'success',
      title: 'Cost Reduction Achievement',
      message: 'Supply chain optimization exceeded target by 12%',
      priority: 'Low',
      timestamp: '1 week ago',
      category: 'Finance'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'info': return <TrendingDown className="h-5 w-5 text-blue-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBorder = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500';
      case 'warning': return 'border-l-yellow-500';
      case 'info': return 'border-l-blue-500';
      case 'success': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded';
    switch (priority) {
      case 'High': return `${baseClasses} bg-red-100 text-red-800`;
      case 'Medium': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Low': return `${baseClasses} bg-green-100 text-green-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Strategic Alerts</CardTitle>
        <p className="text-sm text-gray-600">Critical issues requiring executive attention</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 border-l-4 ${getAlertBorder(alert.type)} bg-gray-50 rounded-r-lg`}
            >
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">{alert.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={getPriorityBadge(alert.priority)}>{alert.priority}</span>
                      <span className="text-xs text-gray-500">{alert.category}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-blue-900">Alert Summary</h4>
              <p className="text-xs text-blue-700">1 Critical, 2 Warnings, 1 Info</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              View All Alerts
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
