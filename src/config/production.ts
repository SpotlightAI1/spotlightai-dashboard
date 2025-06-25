
// Production configuration and environment variables
export const productionConfig = {
  // API Configuration
  api: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Caching Configuration
  cache: {
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxAge: 10 * 60 * 1000, // 10 minutes
    staleWhileRevalidate: true,
  },

  // Performance Configuration
  performance: {
    enableLogging: process.env.NODE_ENV === 'development',
    enableMetrics: true,
    sampleRate: 0.1, // 10% sampling for performance metrics
  },

  // Feature Flags
  features: {
    enableErrorReporting: process.env.NODE_ENV === 'production',
    enablePerformanceMonitoring: true,
    enableOfflineSupport: false, // Can be enabled later
  },

  // Supabase Configuration (already configured)
  supabase: {
    url: "https://rsillgjobfipoftvtnvk.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzaWxsZ2pvYmZpcG9mdHZ0bnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTI0NTQsImV4cCI6MjA2NTkyODQ1NH0.C3mqas_Ouke2h4reg_YJDoUO1ioxEk83Z-G33p_GL-8",
  },

  // Monitoring Configuration
  monitoring: {
    errorSampleRate: 1.0, // 100% error reporting
    performanceSampleRate: 0.1, // 10% performance monitoring
    enableUserFeedback: true,
  },
};

// Environment validation
export const validateEnvironment = () => {
  const requiredVars = [
    // Add any required environment variables here
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    // In production, you might want to throw an error instead
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  console.log('✅ Environment validation passed');
};

// Initialize production configuration
export const initializeProductionConfig = () => {
  validateEnvironment();
  
  // Set up performance observer for Core Web Vitals
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', entry.value);
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }

  console.log('🚀 Production configuration initialized');
};
