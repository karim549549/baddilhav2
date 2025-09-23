export interface OtpData {
  code: string;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
}

export interface OtpVerificationResult {
  success: boolean;
  message: string;
}
