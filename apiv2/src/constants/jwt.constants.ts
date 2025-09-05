// ========================================
// JWT Authentication Constants
// ========================================
// Centralized configuration for JWT tokens
// Avoid magic strings throughout the codebase

export const JWT_CONFIG = {
  // Environment variable keys
  ACCESS_SECRET_KEY: 'JWT_ACCESS_SECRET',
  REFRESH_SECRET_KEY: 'JWT_REFRESH_SECRET',
  ACCESS_EXPIRATION_KEY: 'JWT_ACCESS_EXPIRATION',
  REFRESH_EXPIRATION_KEY: 'JWT_REFRESH_EXPIRATION',
  
  // Default values (fallbacks)
  DEFAULT_ACCESS_EXPIRATION: '15m',
  DEFAULT_REFRESH_EXPIRATION: '7d',
  
  // Token types
  ACCESS_TOKEN: 'access',
  REFRESH_TOKEN: 'refresh',
  
  // JWT payload fields
  USER_ID_FIELD: 'sub',
  TOKEN_TYPE_FIELD: 'type',
  ISSUER_FIELD: 'iss',
  AUDIENCE_FIELD: 'aud',
  
  // Issuer and audience
  ISSUER: 'baddilha-api',
  AUDIENCE: 'baddilha-app',
} as const;

export const JWT_ERROR_MESSAGES = {
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_SIGNATURE: 'Invalid token signature',
  TOKEN_NOT_FOUND: 'Token not found in request',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
} as const;

export const JWT_STRATEGY_NAMES = {
  ACCESS_TOKEN: 'jwt-access',
  REFRESH_TOKEN: 'jwt-refresh',
} as const;
