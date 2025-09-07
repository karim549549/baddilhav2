// ========================================
// User Types (Client Side)
// ========================================

export type Role = "USER" | "ADMIN" | "MODERATOR";

export interface CreateUserRequest {
  username: string;
  displayName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  bio?: string;
  verificationStatus?: string;
  role?: Role;
  maxDistance?: number;
  latitude?: number;
  longitude?: number;
  address?: string;
  interestedGames?: string[];
  oauthProvider?: string;
  oauthProviderId?: string;
  preferences?: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}

export interface RegisterUserRequest {
  username: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
  oauthProvider?: string;
  oauthProviderId?: string;
  oauthEmail?: string;
  oauthName?: string;
  oauthAvatarUrl?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  displayName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  verificationStatus: string;
  role: Role;
  maxDistance: number;
  createdAt: string; // ISO string for client
  updatedAt: string; // ISO string for client
  location?: {
    id: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  preferences?: {
    id: string;
    gamesInterestedIn: string[];
    maxDistance: number;
  };
  oauthAccounts?: {
    id: string;
    provider: string;
    providerAccountId: string;
  }[];
}

export interface UpdateUserRequest {
  displayName?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  maxDistance?: number;
  latitude?: number;
  longitude?: number;
  address?: string;
  interestedGames?: string[];
}

export interface UserListResponse {
  users: UserResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
