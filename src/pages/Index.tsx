import { MetricsOverview } from "@/components/MetricsOverview";
import { StrategicImpactMatrix } from "@/components/StrategicImpactMatrix";
import { SIMAnalysisPanel } from "@/components/SIMAnalysisPanel";
import { ServiceLinePortfolio } from "@/components/ServiceLinePortfolio";
import { BenchmarkComparison } from "@/components/BenchmarkComparison";
import { StrategicAlerts } from "@/components/StrategicAlerts";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SIMSummaryWidget } from "@/components/SIMSummaryWidget";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SetonAdmissionsChart } from "@/components/SetonAdmissionsChart";
import { FacilityAdmissionsChart } from "@/components/FacilityAdmissionsChart";
import { PortfolioComposition } from "@/components/PortfolioComposition";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <div className="mb-8">
          <MetricsOverview />
        </div>
        
        {/* Strategic Planning Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <StrategicImpactMatrix />
          <SIMAnalysisPanel />
        </div>
        
        {/* Service Line Performance */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <ServiceLinePortfolio />
          <BenchmarkComparison />
        </div>
        
        {/* Market Data and Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <SetonAdmissionsChart />
          <FacilityAdmissionsChart />
        </div>
        
        {/* Strategic Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <StrategicAlerts />
          <SIMSummaryWidget />
        </div>
        
        {/* Additional Analysis */}
        <div className="mb-8">
          <PortfolioComposition />
        </div>
      </main>
    </div>
  );
};

export default Index;
