// Frontend mirror of admin DTOs (do not import server files here)
export interface AdminUserResponseDto {
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
  totalItems: number;
  maxDistance: number;
}

export interface AdminUsersResponseDto {
  data: AdminUserResponseDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface AdminStatsDto {
  totalUsers: number;
  newUsersThisMonth: number;
  activeUsers: number;
  usersByRole: Record<string, number>;
  usersByVerificationStatus: Record<string, number>;
  totalItems: number;
  averageItemsPerUser: number;
}

export interface UpdateUserRoleDto {
  role: string;
}

export interface UpdateUserStatusDto {
  verificationStatus: string;
}

export interface UserSearchDto {
  search?: string;
  role?: string;
  verificationStatus?: string;
  page?: number;
  limit?: number;
}
