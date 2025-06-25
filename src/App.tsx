
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { OrganizationDetail } from "./pages/OrganizationDetail";
import { OrganizationsList } from "./pages/OrganizationsList";
import OrganizationWizardPage from "./pages/OrganizationWizard";
import Index from "./pages/Index";
import { performanceLogger } from "./utils/performance";
import { useEffect } from "react";

// Optimized QueryClient configuration for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus for better performance
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Performance monitoring setup
    const timer = performanceLogger.startTimer('App Initial Load');
    
    // Log memory usage periodically in development
    if (process.env.NODE_ENV === 'development') {
      const memoryInterval = setInterval(() => {
        performanceLogger.logMemoryUsage();
      }, 30000); // Every 30 seconds

      return () => {
        clearInterval(memoryInterval);
        timer.end();
      };
    }

    timer.end();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <ErrorBoundary>
                    <Index />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/organizations" 
                element={
                  <ErrorBoundary>
                    <OrganizationsList />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/organizations/new" 
                element={
                  <ErrorBoundary>
                    <OrganizationWizardPage />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/organizations/:id" 
                element={
                  <ErrorBoundary>
                    <OrganizationDetail />
                  </ErrorBoundary>
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
