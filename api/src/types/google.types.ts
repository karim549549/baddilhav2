export interface GoogleProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  verified_email: boolean;
}

export interface GoogleAuthResult {
  success: boolean;
  user?: any;
  message?: string;
}
