
// Centralized error handling utilities
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

export const createAppError = (
  message: string,
  code?: string,
  statusCode?: number,
  context?: Record<string, any>
): AppError => {
  const error = new Error(message) as AppError;
  error.code = code;
  error.statusCode = statusCode;
  error.context = context;
  return error;
};

export const errorHandler = {
  logError: (error: Error | AppError, context?: Record<string, any>) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...('code' in error && { code: error.code }),
      ...('statusCode' in error && { statusCode: error.statusCode }),
      ...('context' in error && error.context),
      ...context
    };

    console.error('🚨 Application Error:', errorData);

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to monitoring service
      // monitoringService.captureException(error, errorData);
    }
  },

  handleApiError: (error: any) => {
    if (error.message?.includes('PGRST')) {
      return createAppError(
        'Database connection issue. Please try again.',
        'DATABASE_ERROR',
        500,
        { originalError: error.message }
      );
    }

    if (error.message?.includes('network')) {
      return createAppError(
        'Network connection issue. Please check your internet connection.',
        'NETWORK_ERROR',
        0,
        { originalError: error.message }
      );
    }

    return createAppError(
      error.message || 'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500,
      { originalError: error }
    );
  },

  isRetryableError: (error: Error | AppError) => {
    const retryableCodes = ['NETWORK_ERROR', 'DATABASE_ERROR', 'TIMEOUT_ERROR'];
    return 'code' in error && retryableCodes.includes(error.code || '');
  }
};
