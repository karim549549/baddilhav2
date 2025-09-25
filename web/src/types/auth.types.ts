// Centralized Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  verificationStatus: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface MessageResponse {
  message: string;
}

// Form Data Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
}

// User Management Types
// User-related types are moved to user.types.ts
