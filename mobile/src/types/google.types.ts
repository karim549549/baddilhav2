// ========================================
// Google OAuth Types (Client Side)
// ========================================

export type OAuthProvider = "GOOGLE" | "APPLE" | "FACEBOOK";

export interface GoogleProfile {
  id: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: {
    value: string;
    verified: boolean;
  }[];
  photos: {
    value: string;
  }[];
  provider: string;
}

export interface GoogleUser {
  provider: OAuthProvider;
  providerId: string;
  email: string;
  displayName: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
}

export interface GoogleAuthResult {
  user: GoogleUser;
  isNewUser: boolean;
}

export interface GoogleCallbackResponse {
  user: GoogleUser;
  requiresUsername: boolean;
}
