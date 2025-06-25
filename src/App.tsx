
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrganizationDetail } from "./pages/OrganizationDetail";
import { OrganizationsList } from "./pages/OrganizationsList";
import OrganizationWizardPage from "./pages/OrganizationWizard";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/organizations" element={<OrganizationsList />} />
          <Route path="/organizations/new" element={<OrganizationWizardPage />} />
          <Route path="/organizations/:id" element={<OrganizationDetail />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
