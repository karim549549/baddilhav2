export interface UserProfile {
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
