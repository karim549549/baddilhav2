// ========================================
// Rate Limiting Constants
// ========================================
// Centralized configuration for rate limiting
// Improves security and prevents abuse

export const RATE_LIMIT_CONFIG = {
  // Environment variable keys
  TTL_KEY: 'RATE_LIMIT_TTL',
  MAX_KEY: 'RATE_LIMIT_MAX',
  
  // Default values (fallbacks)
  DEFAULT_TTL: 60, // 1 minute in seconds
  DEFAULT_MAX: 10, // max requests per TTL
  
  // OTP specific rate limits
  OTP_TTL: 300, // 5 minutes
  OTP_MAX: 3, // max 3 OTP requests per 5 minutes
  
  // Auth specific rate limits
  AUTH_TTL: 900, // 15 minutes
  AUTH_MAX: 5, // max 5 auth attempts per 15 minutes
  
  // General API rate limits
  API_TTL: 60, // 1 minute
  API_MAX: 100, // max 100 requests per minute
} as const;

export const RATE_LIMIT_ERROR_MESSAGES = {
  TOO_MANY_REQUESTS: 'Too many requests, please try again later',
  OTP_RATE_LIMIT: 'Too many OTP requests, please wait before requesting another',
  AUTH_RATE_LIMIT: 'Too many authentication attempts, please try again later',
} as const;
