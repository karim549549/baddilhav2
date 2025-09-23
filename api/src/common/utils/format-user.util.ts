import { UserResponseDto } from '../../user/dto/user.dto';
import { AdminUserResponseDto } from '../../admin/dto/admin-user.dto';
import { PrismaUserSelect, AdminUserSelect } from '../types/user.types';

export function formatUserResponse(user: PrismaUserSelect): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    avatar: user.avatar || undefined,
    bio: user.bio || undefined,
    phone: user.phone || undefined,
    isPhoneVerified: user.isPhoneVerified,
    verificationStatus: user.verificationStatus,
    role: user.role,
    memberSince: user.memberSince.toISOString(),
    lastActive: user.lastActive.toISOString(),
  };
}

export function formatAdminUserResponse(
  user: AdminUserSelect,
): AdminUserResponseDto {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    avatar: user.avatar || undefined,
    bio: user.bio || undefined,
    phone: user.phone || undefined,
    isPhoneVerified: user.isPhoneVerified,
    verificationStatus: user.verificationStatus,
    role: user.role,
    memberSince: user.memberSince.toISOString(),
    lastActive: user.lastActive.toISOString(),
    totalItems: user.totalItems,
    maxDistance: user.maxDistance,
  };
}
