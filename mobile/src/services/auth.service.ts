import { Linking } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";
import apiClient from "./api";
import {
  AuthResponse,
  OtpResponse,
  SendOtpRequest,
  VerifyOtpRequest,
  GoogleCallbackResponse,
  RefreshTokenRequest,
  LogoutRequest,
  LogoutResponse,
} from "../types";

export class AuthService {
  // Google OAuth endpoints
  static async initiateGoogleAuth(): Promise<
    AuthResponse | GoogleCallbackResponse
  > {
    try {
      // Use backend OAuth flow - this is why we built the web app!
      const backendOAuthUrl = "https://baddilhav2.onrender.com/auth/google";

      // Open backend OAuth URL in browser
      const supported = await Linking.canOpenURL(backendOAuthUrl);
      if (supported) {
        await Linking.openURL(backendOAuthUrl);
      } else {
        throw new Error("Cannot open OAuth URL");
      }

      // The response will come via deep link from Vercel
      return {
        type: "redirect",
        message: "OAuth initiated, waiting for deep link...",
      } as unknown as GoogleCallbackResponse;
    } catch (error) {
      console.error("Google OAuth error:", error);
      throw error;
    }
  }

  static async handleGoogleCallback(): Promise<
    AuthResponse | GoogleCallbackResponse
  > {
    const response = await apiClient.get("/auth/google/callback");
    return response.data;
  }

  static async authenticateOAuth(data: {
    oauthProvider: string;
    oauthProviderId: string;
    email?: string;
    displayName?: string;
    avatarUrl?: string;
    username?: string;
  }): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/oauth/authenticate", data);
    return response.data;
  }

  // OTP endpoints
  static async sendOtp(data: SendOtpRequest): Promise<OtpResponse> {
    const response = await apiClient.post("/auth/register/otp/send", data);
    return response.data;
  }

  static async verifyOtpAndRegister(
    data: VerifyOtpRequest
  ): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/register/otp/verify", data);
    return response.data;
  }

  // Token management
  static async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/refresh", data);
    return response.data;
  }

  static async logout(data: LogoutRequest): Promise<LogoutResponse> {
    const response = await apiClient.post("/auth/logout", data);
    return response.data;
  }
}
