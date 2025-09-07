// ========================================
// Authentication Types (Client Side)
// ========================================
// Centralized type definitions for authentication
// Improves code readability and maintainability

export interface TokenPayload {
  sub: string; // User ID
  type: string; // Token type (access/refresh)
  iss?: string; // Issuer
  aud?: string; // Audience
  iat?: number; // Issued at
  exp?: number; // Expiration
}

export interface Token {
  token: string;
  expiresAt: string; // ISO string for client
  expiresIn: string;
}

export interface TokenPair {
  accessToken: Token;
  refreshToken: Token;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    bio?: string;
    verificationStatus: string;
    role: string;
  };
  tokens: TokenPair;
}

export interface OtpResponse {
  message: string;
  expiresAt: string; // ISO string for client
  identifier: string; // phone number or email
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
}

export interface CurrentUserResponse {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  verificationStatus: string;
  role: string;
  createdAt: string; // ISO string for client
  updatedAt: string; // ISO string for client
}
