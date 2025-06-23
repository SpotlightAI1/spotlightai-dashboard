
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricsOverview } from '@/components/MetricsOverview';
import { ServiceLineBreakdown } from '@/components/ServiceLineBreakdown';
import { ServiceLinePortfolio } from '@/components/ServiceLinePortfolio';
import { HospitalSystemOverview } from '@/components/HospitalSystemOverview';
import { MarketIntelligence } from '@/components/MarketIntelligence';
import { PhysicianDrilldown } from '@/components/PhysicianDrilldown';
import { ChatAgent } from '@/components/ChatAgent';

const Index = () => {
  const [selectedServiceLine, setSelectedServiceLine] = useState<string | null>(null);
  const [selectedPhysician, setSelectedPhysician] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <MetricsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ServiceLineBreakdown 
            onServiceLineSelect={setSelectedServiceLine}
            selectedServiceLine={selectedServiceLine}
          />
          <MarketIntelligence />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ServiceLinePortfolio />
          <HospitalSystemOverview />
        </div>

        {selectedServiceLine && (
          <PhysicianDrilldown 
            serviceLine={selectedServiceLine}
            onPhysicianSelect={setSelectedPhysician}
            selectedPhysician={selectedPhysician}
          />
        )}
      </main>

      <ChatAgent isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Index;
