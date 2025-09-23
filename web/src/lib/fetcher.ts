// Base Fetcher with Automatic Error Handling
import {
  AppError,
  ApiError,
  NetworkError,
  ErrorType,
  ErrorSeverity,
  ErrorContext,
  ErrorHandlerResult,
} from "@/types/errors";
import { env } from "@/config/env";

// Fetcher Configuration
export interface FetcherConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  enableLogging: boolean;
}

// Request Options
export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  skipErrorHandling?: boolean;
  context?: ErrorContext;
}

// Response Wrapper
export interface FetcherResponse<T = unknown> {
  data: T;
  success: boolean;
  error?: AppError;
  status: number;
  headers: Headers;
}

// Default Configuration
const DEFAULT_CONFIG: FetcherConfig = {
  baseURL: env.API_URL,
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  enableLogging: env.IS_DEVELOPMENT,
};

class Fetcher {
  private config: FetcherConfig;
  private errorHandlers: Map<
    ErrorType,
    (error: AppError) => ErrorHandlerResult
  > = new Map();

  constructor(config: Partial<FetcherConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.setupDefaultErrorHandlers();
  }

  // Setup default error handlers
  private setupDefaultErrorHandlers(): void {
    // Simplified error handling - all errors use the same handler
    this.errorHandlers.set(
      ErrorType.NETWORK_ERROR,
      this.handleError.bind(this)
    );
    this.errorHandlers.set(ErrorType.API_ERROR, this.handleError.bind(this));
    this.errorHandlers.set(ErrorType.AUTH_ERROR, this.handleError.bind(this));
    this.errorHandlers.set(
      ErrorType.VALIDATION_ERROR,
      this.handleError.bind(this)
    );
    this.errorHandlers.set(
      ErrorType.RATE_LIMIT_EXCEEDED,
      this.handleError.bind(this)
    );
  }

  // Main request method
  async request<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<FetcherResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const requestOptions = this.mergeOptions(options);

    try {
      const response = await this.executeRequest(url, requestOptions);
      const data = await this.parseResponse(response);

      return {
        data: data as T,
        success: true,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      const appError = this.createAppError(
        error,
        url,
        requestOptions.method || "GET"
      );

      if (!options.skipErrorHandling) {
        const handlerResult = this.handleError(appError);
        if (handlerResult.shouldRetry && options.retries !== 0) {
          return this.retryRequest(endpoint, options, appError);
        }
      }

      return {
        data: null as T,
        success: false,
        error: appError,
        status:
          appError.type === ErrorType.API_ERROR
            ? (appError as ApiError).status
            : 0,
        headers: new Headers(),
      };
    }
  }

  // Execute the actual request
  private async executeRequest(
    url: string,
    options: RequestOptions
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || this.config.timeout
    );

    try {
      // Get auth token from localStorage
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...this.config.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Parse response based on content type
  private async parseResponse(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return response.json();
    } else if (contentType?.includes("text/")) {
      return response.text();
    } else {
      return response.blob();
    }
  }

  // Create AppError from various error types
  private createAppError(
    error: unknown,
    url: string,
    method: string
  ): AppError {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        type: ErrorType.TIMEOUT_ERROR,
        message: "Request timeout",
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
        context: { url, method },
      };
    }

    if (error instanceof Error && error.message?.includes("HTTP")) {
      const statusMatch = error.message.match(/HTTP (\d+):/);
      const status = statusMatch ? parseInt(statusMatch[1]) : 500;

      return {
        type: ErrorType.API_ERROR,
        message: error.message,
        status,
        statusText: error.message.split(": ")[1] || "Unknown Error",
        url,
        method,
        severity: this.getSeverityFromStatus(status),
        timestamp: new Date(),
      } as ApiError;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        type: ErrorType.NETWORK_ERROR,
        message: "Network connection failed",
        severity: ErrorSeverity.HIGH,
        timestamp: new Date(),
        originalError: error,
        url,
        method,
      } as NetworkError;
    }

    return {
      type: ErrorType.UNKNOWN_ERROR,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      severity: ErrorSeverity.MEDIUM,
      timestamp: new Date(),
      context: { url, method, originalError: error },
    };
  }

  // Get error severity from HTTP status
  private getSeverityFromStatus(status: number): ErrorSeverity {
    if (status >= 500) return ErrorSeverity.HIGH;
    if (status >= 400) return ErrorSeverity.MEDIUM;
    return ErrorSeverity.LOW;
  }

  // Merge request options with defaults
  private mergeOptions(options: RequestOptions): RequestOptions {
    return {
      timeout: this.config.timeout,
      retries: this.config.retries,
      retryDelay: this.config.retryDelay,
      ...options,
    };
  }

  // Handle error using registered handlers
  private handleError(error: AppError): ErrorHandlerResult {
    this.logError(error);

    // User-friendly error messages based on type and status
    switch (error.type) {
      case ErrorType.NETWORK_ERROR:
        return {
          handled: true,
          userMessage:
            "Unable to connect to the server. Please check your internet connection and try again.",
          shouldRetry: true,
          retryAfter: 2000,
        };

      case ErrorType.API_ERROR:
        const apiError = error as ApiError;

        // Handle specific HTTP status codes with user-friendly messages
        switch (apiError.status) {
          case 400:
            return {
              handled: true,
              userMessage:
                "Invalid request. Please check your input and try again.",
            };
          case 401:
            return {
              handled: true,
              userMessage: "Your session has expired. Please log in again.",
              recoveryAction: { type: "logout" },
            };
          case 403:
            return {
              handled: true,
              userMessage: "You don't have permission to perform this action.",
            };
          case 404:
            return {
              handled: true,
              userMessage:
                "The requested resource was not found. Please check the URL or try again later.",
            };
          case 409:
            return {
              handled: true,
              userMessage:
                "This email is already registered. Please use a different email or try logging in.",
            };
          case 422:
            return {
              handled: true,
              userMessage:
                "Please check your input. Some fields may be invalid or missing.",
            };
          case 429:
            return {
              handled: true,
              userMessage:
                "Too many requests. Please wait a moment before trying again.",
              shouldRetry: true,
              retryAfter: 60000,
            };
          case 500:
            return {
              handled: true,
              userMessage:
                "Server error. Our team has been notified. Please try again later.",
              shouldRetry: true,
              retryAfter: 5000,
            };
          case 502:
          case 503:
          case 504:
            return {
              handled: true,
              userMessage:
                "Service temporarily unavailable. Please try again in a few minutes.",
              shouldRetry: true,
              retryAfter: 10000,
            };
          default:
            return {
              handled: true,
              userMessage: "Something went wrong. Please try again later.",
            };
        }

      case ErrorType.AUTH_ERROR:
        return {
          handled: true,
          userMessage:
            "Invalid email or password. Please check your credentials and try again.",
          recoveryAction: { type: "redirect", payload: "/auth/login" },
        };

      case ErrorType.VALIDATION_ERROR:
        return {
          handled: true,
          userMessage: error.message,
        };

      case ErrorType.RATE_LIMIT_EXCEEDED:
        return {
          handled: true,
          userMessage:
            "Too many attempts. Please wait a moment before trying again.",
          shouldRetry: true,
          retryAfter: 60000,
        };

      case ErrorType.TIMEOUT_ERROR:
        return {
          handled: true,
          userMessage:
            "Request timed out. Please check your connection and try again.",
          shouldRetry: true,
          retryAfter: 3000,
        };

      default:
        return {
          handled: false,
          userMessage: "An unexpected error occurred. Please try again later.",
        };
    }
  }

  // Retry request with exponential backoff
  private async retryRequest<T>(
    endpoint: string,
    options: RequestOptions,
    _lastError: AppError
  ): Promise<FetcherResponse<T>> {
    const retries = (options.retries || this.config.retries) - 1;
    const delay =
      (options.retryDelay || this.config.retryDelay) *
      Math.pow(2, this.config.retries - retries);

    await new Promise((resolve) => setTimeout(resolve, delay));

    return this.request<T>(endpoint, { ...options, retries });
  }

  // Log error if enabled
  private logError(error: AppError): void {
    if (this.config.enableLogging) {
      console.error("[Fetcher Error]", {
        type: error.type,
        message: error.message,
        severity: error.severity,
        timestamp: error.timestamp,
        context: error.context,
      });
    }
  }

  // Convenience methods
  async get<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<FetcherResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<FetcherResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<FetcherResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<FetcherResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<FetcherResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  // Add custom error handler
  addErrorHandler(
    type: ErrorType,
    handler: (error: AppError) => ErrorHandlerResult
  ): void {
    this.errorHandlers.set(type, handler);
  }

  // Update configuration
  updateConfig(config: Partial<FetcherConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Create default fetcher instance
export const fetcher = new Fetcher();

// Export class for custom instances
export { Fetcher };

// Export convenience functions
export const { get, post, put, patch, delete: del } = fetcher;
