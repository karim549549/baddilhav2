// Authentication API Service
import { fetcher } from "@/lib/fetcher";

// Auth Types - Updated to match backend DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
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

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  isPhoneVerified: boolean;
  verificationStatus: string;
  role: string;
  memberSince: string;
  lastActive: string;
}

export interface MessageResponse {
  message: string;
}

// Auth API Service - Updated to match backend endpoints
export const authApi = {
  // Login with email and password
  async login(credentials: LoginRequest) {
    return fetcher.post<AuthResponse>("/auth/login", credentials);
  },

  // Register new user
  async signup(userData: SignupRequest) {
    return fetcher.post<AuthResponse>("/auth/signup", userData);
  },

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest) {
    return fetcher.post<MessageResponse>("/auth/forgot-password", data);
  },

  // Reset password with token
  async resetPassword(data: ResetPasswordRequest) {
    return fetcher.post<MessageResponse>("/auth/reset-password", data);
  },

  // Refresh access token
  async refreshToken(data: RefreshTokenRequest) {
    return fetcher.post<AuthResponse>("/auth/refresh", data);
  },

  // Logout
  async logout() {
    return fetcher.post<MessageResponse>("/auth/logout");
  },

  // Get current user profile (using user service)
  async getProfile() {
    return fetcher.get<User>("/users/profile");
  },

  // Update user profile (using user service)
  async updateProfile(data: Partial<User>) {
    return fetcher.put<User>("/users/profile", data);
  },

  // Change password (placeholder - not implemented in backend yet)
  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return fetcher.post<MessageResponse>("/auth/change-password", data);
  },

  // Delete account (using user service)
  async deleteAccount() {
    return fetcher.delete<MessageResponse>("/users/profile");
  },

  // OAuth Login - Google (placeholder - not implemented in backend yet)
  async loginWithGoogle(code: string) {
    return fetcher.post<AuthResponse>("/auth/google", { code });
  },

  // OAuth Login - GitHub (placeholder - not implemented in backend yet)
  async loginWithGitHub(code: string) {
    return fetcher.post<AuthResponse>("/auth/github", { code });
  },

  // Verify email (placeholder - not implemented in backend yet)
  async verifyEmail(token: string) {
    return fetcher.post<MessageResponse>("/auth/verify-email", { token });
  },
};

// Export individual functions for convenience
export const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  loginWithGoogle,
  loginWithGitHub,
  verifyEmail,
} = authApi;
