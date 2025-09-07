export const GOOGLE_CONFIG = {
  // Environment variable keys
  CLIENT_ID_KEY: 'GOOGLE_CLIENT_ID',
  CLIENT_SECRET_KEY: 'GOOGLE_CLIENT_SECRET',
  CALLBACK_URL_KEY: 'GOOGLE_CALLBACK_URL',

  // OAuth scopes
  SCOPES: ['email', 'profile'],

  // Default callback URL for development
  DEFAULT_CALLBACK_URL: 'baddilha://auth/google/callback',
} as const;

export const GOOGLE_ERROR_MESSAGES = {
  OAUTH_FAILED: 'Google OAuth authentication failed',
  USER_CREATION_FAILED: 'Failed to create user from Google profile',
  INVALID_PROFILE: 'Invalid Google profile data',
  MISSING_EMAIL: 'Email not provided by Google',
  MISSING_PROFILE: 'Profile data not provided by Google',
} as const;
