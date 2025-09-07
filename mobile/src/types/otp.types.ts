// ========================================
// OTP Types (Client Side)
// ========================================

export interface OtpData {
  code: string;
  phoneNumber?: string;
  email?: string;
  attempts: number;
  createdAt: string; // ISO string for client
}

export interface OtpGenerationResult {
  code: string;
  expiresAt: string; // ISO string for client
}

export interface OtpVerificationResult {
  isValid: boolean;
  attemptsRemaining?: number;
  message?: string;
}

export interface OtpInfo {
  attempts: number;
  createdAt: string; // ISO string for client
}

export interface OtpRateLimit {
  canSend: boolean;
  attemptsRemaining?: number;
  resetTime?: string; // ISO string for client
}

export interface SendOtpRequest {
  phoneNumber?: string;
  email?: string;
}

export interface VerifyOtpRequest {
  phoneNumber?: string;
  email?: string;
  otpCode: string;
  username: string;
}
