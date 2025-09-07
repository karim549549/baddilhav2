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
      // Create a redirect URI for the mobile app using Universal Links
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: "https",
        hostname: "baddilha.app",
        path: "auth/google/callback",
      });

      // Create the OAuth request
      const request = new AuthSession.AuthRequest({
        clientId:
          "211876270719-9tnup7ataj2fovclpcgs34c96p5huv73.apps.googleusercontent.com",
        scopes: ["openid", "profile", "email"],
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        extraParams: {},
        additionalParameters: {},
      });

      // Start the OAuth flow
      const result = await request.promptAsync({
        authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      });

      if (result.type === "success") {
        // Exchange the authorization code for tokens
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId:
              "211876270719-9tnup7ataj2fovclpcgs34c96p5huv73.apps.googleusercontent.com",
            code: result.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier,
            },
          },
          {
            tokenEndpoint: "https://oauth2.googleapis.com/token",
          }
        );

        // Get user info from Google
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.accessToken}`
        );
        const userInfo = await userInfoResponse.json();

        // Send the OAuth data to your backend
        const backendResponse = await apiClient.post(
          "/auth/oauth/authenticate",
          {
            oauthProvider: "GOOGLE",
            oauthProviderId: userInfo.id,
            email: userInfo.email,
            displayName: userInfo.name,
            avatarUrl: userInfo.picture,
          }
        );

        return backendResponse.data;
      } else {
        throw new Error("OAuth flow was cancelled or failed");
      }
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
