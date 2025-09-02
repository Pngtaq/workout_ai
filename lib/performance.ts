// Performance monitoring utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(operation: string): () => void {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics.has(operation)) {
        this.metrics.set(operation, []);
      }
      
      this.metrics.get(operation)!.push(duration);
      
      // Log slow operations (>1 second)
      if (duration > 1000) {
        console.warn(`Slow operation detected: ${operation} took ${duration.toFixed(2)}ms`);
      }
    };
  }

  getAverageTime(operation: string): number {
    const times = this.metrics.get(operation);
    if (!times || times.length === 0) return 0;
    
    const sum = times.reduce((acc, time) => acc + time, 0);
    return sum / times.length;
  }

  getMetrics(): Record<string, { count: number; avgTime: number; maxTime: number }> {
    const result: Record<string, { count: number; avgTime: number; maxTime: number }> = {};
    
    for (const [operation, times] of this.metrics.entries()) {
      result[operation] = {
        count: times.length,
        avgTime: this.getAverageTime(operation),
        maxTime: Math.max(...times),
      };
    }
    
    return result;
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}

// Performance wrapper for API routes
export function withPerformanceMonitoring<T extends unknown[], R>(
  operation: string,
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const monitor = PerformanceMonitor.getInstance();
    const endTimer = monitor.startTimer(operation);
    
    try {
      const result = await fn(...args);
      endTimer();
      return result;
    } catch (error) {
      endTimer();
      throw error;
    }
  };
}
