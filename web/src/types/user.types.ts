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

export interface UpdateUserRequest {
  fullName?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
}

export interface UsersResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
