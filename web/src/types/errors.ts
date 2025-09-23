// Error Types and Interfaces for Baddilha App

export enum ErrorType {
  // Network & API Errors
  NETWORK_ERROR = "NETWORK_ERROR",
  API_ERROR = "API_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",

  // Authentication & Authorization
  AUTH_ERROR = "AUTH_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",

  // Validation Errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_INPUT = "INVALID_INPUT",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",

  // Business Logic Errors
  BUSINESS_ERROR = "BUSINESS_ERROR",
  ITEM_NOT_FOUND = "ITEM_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  MATCH_NOT_FOUND = "MATCH_NOT_FOUND",
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

  // File & Upload Errors
  FILE_ERROR = "FILE_ERROR",
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  UPLOAD_FAILED = "UPLOAD_FAILED",

  // Rate Limiting
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  // Server Errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  // Client Errors
  CLIENT_ERROR = "CLIENT_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export enum ErrorSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface BaseError {
  type: ErrorType;
  message: string;
  code?: string | number;
  severity: ErrorSeverity;
  timestamp: Date;
  context?: Record<string, unknown>;
  stack?: string;
}

export interface ApiError extends BaseError {
  type: ErrorType.API_ERROR;
  status: number;
  statusText: string;
  url: string;
  method: string;
  response?: unknown;
}

export interface ValidationError extends BaseError {
  type: ErrorType.VALIDATION_ERROR;
  field: string;
  value: unknown;
  constraint: string;
}

export interface NetworkError extends BaseError {
  type: ErrorType.NETWORK_ERROR;
  originalError: Error;
  url: string;
  method: string;
}

export interface AuthError extends BaseError {
  type: ErrorType.AUTH_ERROR;
  authType: "login" | "signup" | "logout" | "refresh" | "verify";
  provider?: string;
}

export interface BusinessError extends BaseError {
  type: ErrorType.BUSINESS_ERROR;
  businessRule: string;
  entityType: string;
  entityId?: string;
}

export interface FileError extends BaseError {
  type: ErrorType.FILE_ERROR;
  fileName: string;
  fileSize?: number;
  fileType?: string;
  maxSize?: number;
  allowedTypes?: string[];
}

export type AppError =
  | ApiError
  | ValidationError
  | NetworkError
  | AuthError
  | BusinessError
  | FileError
  | BaseError;

// Error Response from API
export interface ErrorResponse {
  error: {
    type: string;
    message: string;
    code?: string | number;
    details?: Record<string, unknown>;
    field?: string;
    constraint?: string;
  };
  timestamp: string;
  path: string;
  method: string;
}

// Error Handler Configuration
export interface ErrorHandlerConfig {
  enableLogging: boolean;
  enableReporting: boolean;
  enableRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  showUserNotifications: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
}

// Error Context for better debugging
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  url?: string;
  timestamp: Date;
  additionalData?: Record<string, unknown>;
}

// Error Recovery Actions
export interface ErrorRecoveryAction {
  type: "retry" | "redirect" | "refresh" | "logout" | "show_modal" | "none";
  payload?: unknown;
  message?: string;
}

// Error Handler Result
export interface ErrorHandlerResult {
  handled: boolean;
  recoveryAction?: ErrorRecoveryAction;
  userMessage?: string;
  shouldRetry?: boolean;
  retryAfter?: number;
}
