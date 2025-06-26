
import React, { useState, memo, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StrategicReportGeneratorProps {
  organizationName: string;
  organizationId: string;
  lastReportDate?: string;
}

interface ReportType {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  sections: string[];
  icon: React.ReactNode;
}

const reportTypes: ReportType[] = [
  {
    id: 'executive',
    name: 'Executive Summary',
    description: 'High-level strategic overview for C-suite leadership',
    estimatedTime: '2 minutes',
    sections: [
      'Strategic Impact Matrix Overview',
      'Top Priority Initiatives',
      'Key Performance Metrics',
      'Strategic Recommendations',
      'Executive Action Items'
    ],
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: 'full',
    name: 'Full Analysis',
    description: 'Comprehensive strategic analysis with detailed insights',
    estimatedTime: '3 minutes',
    sections: [
      'Organization Profile & Context',
      'Complete Strategic Impact Matrix',
      'Initiative Analysis by Quadrant',
      'Role-Specific Insights (CEO/CFO/COO)',
      'Benchmarking & Industry Comparison',
      'Implementation Roadmap',
      'Risk Assessment & Mitigation',
      'Financial Impact Projections'
    ],
    icon: <Settings className="h-4 w-4" />
  },
  {
    id: 'board',
    name: 'Board Presentation',
    description: 'Strategic presentation format optimized for board meetings',
    estimatedTime: '2.5 minutes',
    sections: [
      'Executive Summary Dashboard',
      'Strategic Positioning Analysis',
      'Investment Priorities Matrix',
      'Performance Benchmarks',
      'Governance Recommendations',
      'Board Decision Points',
      'Next Quarter Milestones'
    ],
    icon: <Eye className="h-4 w-4" />
  }
];

const progressStages = [
  { stage: 'Initializing', message: 'Preparing report generation...' },
  { stage: 'Data Collection', message: 'Gathering organizational data and metrics...' },
  { stage: 'Strategic Analysis', message: 'Analyzing strategic initiatives and impact matrix...' },
  { stage: 'Benchmark Analysis', message: 'Comparing against industry benchmarks...' },
  { stage: 'Report Compilation', message: 'Compiling insights and recommendations...' },
  { stage: 'Final Processing', message: 'Finalizing report and preparing delivery...' },
  { stage: 'Complete', message: 'Report generated successfully!' }
];

const StrategicReportGeneratorComponent: React.FC<StrategicReportGeneratorProps> = ({
  organizationName,
  organizationId,
  lastReportDate
}) => {
  const [selectedReportType, setSelectedReportType] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const { toast } = useToast();

  const selectedReport = useMemo(() => 
    reportTypes.find(rt => rt.id === selectedReportType), 
    [selectedReportType]
  );

  const handleGenerateReport = useCallback(async () => {
    if (!selectedReportType) {
      toast({
        title: "Report Type Required",
        description: "Please select a report type before generating.",
        variant: "destructive"
      });
      return;
    }

    if (!recipientEmail) {
      toast({
        title: "Email Required",
        description: "Please provide a recipient email address.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStage(0);

    // Simulate report generation with progress updates
    for (let i = 0; i < progressStages.length; i++) {
      setCurrentStage(i);
      setProgress((i / (progressStages.length - 1)) * 100);
      
      // Simulate processing time for each stage
      const delay = i === progressStages.length - 1 ? 500 : Math.random() * 2000 + 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    setIsGenerating(false);
    toast({
      title: "Report Generated Successfully",
      description: `${selectedReport?.name} has been generated and sent to ${recipientEmail}`,
    });
  }, [selectedReportType, recipientEmail, selectedReport, toast]);

  const handlePreviewToggle = useCallback(() => {
    if (!selectedReportType) {
      toast({
        title: "Select Report Type",
        description: "Please select a report type to preview sections.",
        variant: "destructive"
      });
      return;
    }
    setShowPreview(!showPreview);
  }, [selectedReportType, showPreview, toast]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Generate Strategic Report
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Create comprehensive strategic analysis for <span className="font-medium">{organizationName}</span>
            </p>
          </div>
          {lastReportDate && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Last Report</p>
              <p className="text-sm font-medium">{lastReportDate}</p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Report Type Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Report Type</Label>
          <Select value={selectedReportType} onValueChange={setSelectedReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((reportType) => (
                <SelectItem key={reportType.id} value={reportType.id}>
                  <div className="flex items-center gap-2">
                    {reportType.icon}
                    <div>
                      <div className="font-medium">{reportType.name}</div>
                      <div className="text-xs text-gray-500">{reportType.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estimated Time & Preview */}
        {selectedReport && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Estimated Generation Time:</span>
              <Badge variant="secondary">{selectedReport.estimatedTime}</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviewToggle}
              className="flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              {showPreview ? 'Hide' : 'Preview'} Sections
            </Button>
          </div>
        )}

        {/* Report Sections Preview */}
        {showPreview && selectedReport && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Report Sections Preview</h4>
            <div className="space-y-2">
              {selectedReport.sections.map((section, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>{section}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recipient Email */}
        <div className="space-y-2">
          <Label htmlFor="recipient-email" className="text-sm font-medium">
            Recipient Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="recipient-email"
              type="email"
              placeholder="Enter email for report delivery"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="pl-10"
              disabled={isGenerating}
            />
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Generating Report...</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="h-4 w-4" />
              <span>{progressStages[currentStage]?.message}</span>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-xs text-gray-500">
            Report will be automatically delivered to the specified email address
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviewToggle}
              disabled={!selectedReportType || isGenerating}
            >
              Preview Report
            </Button>
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating || !selectedReportType || !recipientEmail}
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const StrategicReportGenerator = memo(StrategicReportGeneratorComponent);
