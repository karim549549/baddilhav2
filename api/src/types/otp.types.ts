// ========================================
// OTP Types
// ========================================
// Centralized type definitions for OTP functionality
// Improves code readability and maintainability

export interface OtpData {
  code: string;
  phoneNumber?: string;
  email?: string;
  attempts: number;
  createdAt: Date;
}

export interface OtpGenerationResult {
  code: string;
  expiresAt: Date;
}

export interface OtpVerificationResult {
  isValid: boolean;
  attemptsRemaining?: number;
  message?: string;
}

export interface OtpInfo {
  attempts: number;
  createdAt: Date;
}

export interface OtpRateLimit {
  canSend: boolean;
  attemptsRemaining?: number;
  resetTime?: Date;
}
