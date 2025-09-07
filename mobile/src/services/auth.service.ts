import { Linking } from "react-native";
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
  static async initiateGoogleAuth(): Promise<void> {
    // For React Native, open Google OAuth URL in device's browser
    // The callback should redirect to a deep link that opens our app
    const googleAuthUrl = `${apiClient.defaults.baseURL}/auth/google`;
    await Linking.openURL(googleAuthUrl);
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
