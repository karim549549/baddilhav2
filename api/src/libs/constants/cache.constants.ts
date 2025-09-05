// ========================================
// Cache Configuration Constants
// ========================================
// Centralized configuration for cache settings
// Avoid magic strings throughout the codebase

export const CACHE_CONFIG = {
  // Environment variable keys
  TTL_KEY: 'CACHE_TTL',
  MAX_KEY: 'CACHE_MAX',
  USE_REDIS_KEY: 'USE_REDIS',
  
  // Redis configuration keys
  REDIS_URL_KEY: 'REDIS_URL',
  REDIS_HOST_KEY: 'REDIS_HOST',
  REDIS_PORT_KEY: 'REDIS_PORT',
  REDIS_PASSWORD_KEY: 'REDIS_PASSWORD',
  
  // Default values (fallbacks)
  DEFAULT_TTL: 86400, // 24 hours in seconds
  DEFAULT_MAX: 100, // maximum number of items in cache
  DEFAULT_USE_REDIS: false,
  DEFAULT_REDIS_HOST: 'localhost',
  DEFAULT_REDIS_PORT: 6379,
  
  // Cache key prefixes
  OTP_PREFIX: 'otp:',
  OTP_ATTEMPTS_PREFIX: 'otp_attempts:',
  USER_PREFIX: 'user:',
  SESSION_PREFIX: 'session:',
  
  // TTL values (in seconds)
  OTP_TTL: 600, // 10 minutes
  OTP_ATTEMPTS_TTL: 3600, // 1 hour
  USER_TTL: 1800, // 30 minutes
  SESSION_TTL: 86400, // 24 hours
} as const;

export const CACHE_ERROR_MESSAGES = {
  CONNECTION_FAILED: 'Failed to connect to cache',
  OPERATION_FAILED: 'Cache operation failed',
  KEY_NOT_FOUND: 'Cache key not found',
  INVALID_TTL: 'Invalid TTL value',
} as const;
