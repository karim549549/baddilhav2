export interface GoogleProfile {
  id: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: Array<{
    value: string;
    verified: boolean;
  }>;
  photos: Array<{
    value: string;
  }>;
  provider: string;
}

export interface GoogleUser {
  provider: 'google';
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
