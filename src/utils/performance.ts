
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
  },

  // New: Bundle size analysis
  logBundleMetrics: () => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const jsResources = resources.filter(r => r.name.includes('.js'));
      const cssResources = resources.filter(r => r.name.includes('.css'));
      
      console.log('📦 Bundle Analysis:', {
        totalJS: jsResources.length,
        totalCSS: cssResources.length,
        largestJS: jsResources.reduce((max, r) => r.transferSize > max.transferSize ? r : max, jsResources[0]),
        slowestResource: resources.reduce((max, r) => r.duration > max.duration ? r : max, resources[0])
      });
    }
  },

  // New: Component render tracking
  trackComponentRender: (componentName: string, props?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ${componentName} rendered`, props ? { props } : '');
    }
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
    params.append('f', 'webp'); // Prefer WebP format
    
    return `${url}?${params.toString()}`;
  },

  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  },

  // New: Batch image preloading
  preloadImages: async (urls: string[]): Promise<void> => {
    const promises = urls.map(url => imageUtils.preloadImage(url));
    await Promise.allSettled(promises);
  },

  // New: Image format detection
  supportsWebP: (): Promise<boolean> => {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
};

// API response caching with enhanced features
export const cacheUtils = {
  setCache: (key: string, data: any, ttl = 300000) => { // 5 minutes default
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
      version: '1.0'
    };
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Cache storage failed:', error);
      // Fallback to memory cache if localStorage is full
      (window as any).__memoryCache = (window as any).__memoryCache || new Map();
      (window as any).__memoryCache.set(key, item);
    }
  },

  getCache: (key: string) => {
    try {
      // Try localStorage first
      const item = localStorage.getItem(`cache_${key}`);
      if (item) {
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > parsed.ttl) {
          localStorage.removeItem(`cache_${key}`);
          return null;
        }
        return parsed.data;
      }
      
      // Fallback to memory cache
      const memoryCache = (window as any).__memoryCache;
      if (memoryCache && memoryCache.has(key)) {
        const cached = memoryCache.get(key);
        if (Date.now() - cached.timestamp > cached.ttl) {
          memoryCache.delete(key);
          return null;
        }
        return cached.data;
      }
      
      return null;
    } catch {
      return null;
    }
  },

  clearCache: (prefix = 'cache_') => {
    // Clear localStorage
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => localStorage.removeItem(key));
    
    // Clear memory cache
    if ((window as any).__memoryCache) {
      (window as any).__memoryCache.clear();
    }
  },

  // New: Cache size monitoring
  getCacheSize: (): { localStorage: number; memory: number } => {
    let localStorageSize = 0;
    let memorySize = 0;
    
    try {
      for (let key in localStorage) {
        if (key.startsWith('cache_')) {
          localStorageSize += localStorage[key].length;
        }
      }
    } catch (error) {
      console.warn('Could not calculate localStorage cache size');
    }
    
    const memoryCache = (window as any).__memoryCache;
    if (memoryCache) {
      memorySize = memoryCache.size;
    }
    
    return { localStorage: localStorageSize, memory: memorySize };
  }
};

// New: Database query optimization helpers
export const queryOptimization = {
  // Debounce database queries
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    }) as T;
  },

  // Batch multiple queries
  batchQueries: async <T>(queries: (() => Promise<T>)[], batchSize = 5): Promise<T[]> => {
    const results: T[] = [];
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(batch.map(query => query()));
      results.push(...batchResults.map(result => 
        result.status === 'fulfilled' ? result.value : null
      ).filter(Boolean));
    }
    return results;
  }
};
