
// Performance monitoring utilities
export const performanceLogger = {
  startTimer: (name: string) => {
    const startTime = performance.now();
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`⏱️ ${name} took ${duration.toFixed(2)}ms`);
        return duration;
      }
    };
  },

  logMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log(`📊 Memory usage:`, {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`
      });
    }
  },

  measureRender: (componentName: string) => {
    return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
      const method = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const timer = performanceLogger.startTimer(`${componentName}.${propertyName}`);
        const result = method.apply(this, args);
        timer.end();
        return result;
      };
    };
  }
};

// Image optimization utilities
export const imageUtils = {
  getOptimizedImageUrl: (url: string, width?: number, height?: number, quality = 80) => {
    if (!url) return url;
    
    // For production, you might want to use a service like Cloudinary or ImageKit
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', quality.toString());
    
    return `${url}?${params.toString()}`;
  },

  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }
};

// API response caching
export const cacheUtils = {
  setCache: (key: string, data: any, ttl = 300000) => { // 5 minutes default
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  },

  getCache: (key: string) => {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }
      
      return parsed.data;
    } catch {
      return null;
    }
  },

  clearCache: (prefix = 'cache_') => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => localStorage.removeItem(key));
  }
};
