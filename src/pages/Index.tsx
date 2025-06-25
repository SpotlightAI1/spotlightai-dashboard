
import { MetricsOverview } from "@/components/MetricsOverview";
import { StrategicImpactMatrix } from "@/components/StrategicImpactMatrix";
import { SIMAnalysisPanel } from "@/components/SIMAnalysisPanel";
import { ServiceLinePortfolio } from "@/components/ServiceLinePortfolio";
import { BenchmarkComparison } from "@/components/BenchmarkComparison";
import { StrategicAlerts } from "@/components/StrategicAlerts";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto p-6 space-y-6">
        {/* Quick Access to Organizations */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Organization Analysis</h2>
              <p className="text-sm text-gray-600">View detailed SIM analysis for specific organizations</p>
            </div>
            <Link to="/organizations">
              <Button className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                View Organizations
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            <MetricsOverview />
            <StrategicAlerts />
          </div>
          
          <div className="space-y-6">
            <SIMAnalysisPanel />
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <StrategicImpactMatrix />
          <ServiceLinePortfolio />
        </div>
        
        <BenchmarkComparison />
      </main>
    </div>
  );
};

export default Index;
