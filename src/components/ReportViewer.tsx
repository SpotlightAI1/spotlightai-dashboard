
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Eye, Share2, Calendar, Filter } from 'lucide-react';

export const ReportViewer = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  
  const reports = [
    {
      id: 1,
      name: 'Q4 Executive Summary',
      type: 'Executive',
      date: '2024-01-15',
      status: 'Completed',
      size: '2.4 MB',
      pages: 24
    },
    {
      id: 2,
      name: 'Monthly Operations Report',
      type: 'Operational',
      date: '2024-01-10',
      status: 'Completed',
      size: '5.1 MB',
      pages: 45
    },
    {
      id: 3,
      name: 'Financial Analysis - December',
      type: 'Financial',
      date: '2024-01-08',
      status: 'Completed',
      size: '3.2 MB',
      pages: 32
    },
    {
      id: 4,
      name: 'Quality Metrics Review',
      type: 'Quality',
      date: '2024-01-05',
      status: 'Draft',
      size: '1.8 MB',
      pages: 18
    }
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded';
    switch (status) {
      case 'Completed': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Draft': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Processing': return `${baseClasses} bg-blue-100 text-blue-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Report Library</CardTitle>
        <p className="text-sm text-gray-600">Access and manage generated reports</p>
        <div className="flex items-center space-x-2 mt-4">
          <button className="flex items-center space-x-2 px-3 py-2 border rounded text-sm hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border rounded text-sm hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="text-sm">{report.name}</div>
                      <div className="text-xs text-gray-500">{report.pages} pages</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {report.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(report.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={getStatusBadge(report.status)}>
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {report.size}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-purple-600 hover:text-purple-800" title="Share">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Quick Actions</h4>
              <p className="text-xs text-gray-600">Common report operations</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Schedule Report
              </button>
              <button className="px-3 py-2 border text-sm rounded hover:bg-gray-50">
                Export All
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
