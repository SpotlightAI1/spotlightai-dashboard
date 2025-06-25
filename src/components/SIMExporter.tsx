
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileImage, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface SIMExporterProps {
  chartRef: React.RefObject<HTMLDivElement>;
  organizationName?: string;
}

export const SIMExporter = ({ chartRef, organizationName = 'Organization' }: SIMExporterProps) => {
  const { toast } = useToast();

  const exportAsPNG = async () => {
    if (!chartRef.current) {
      toast({
        title: "Export Error",
        description: "Chart not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false
      });

      const link = document.createElement('a');
      link.download = `${organizationName}-SIM-Matrix.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Export Successful",
        description: "SIM Matrix exported as PNG.",
      });
    } catch (error) {
      console.error('PNG export error:', error);
      toast({
        title: "Export Error",
        description: "Failed to export as PNG. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportAsPDF = async () => {
    if (!chartRef.current) {
      toast({
        title: "Export Error",
        description: "Chart not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${organizationName}-SIM-Matrix.pdf`);

      toast({
        title: "Export Successful",
        description: "SIM Matrix exported as PDF.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Error",
        description: "Failed to export as PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportAsPNG}>
          <FileImage className="h-4 w-4 mr-2" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
