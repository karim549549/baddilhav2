import { Role, UserVerificationStatus } from '@prisma/client';

export interface PrismaUserSelect {
  id: string;
  email: string;
  fullName: string;
  avatar?: string | null;
  bio?: string | null;
  phone?: string | null;
  isPhoneVerified: boolean;
  verificationStatus: UserVerificationStatus;
  role: Role;
  memberSince: Date;
  lastActive: Date;
}

export interface AdminUserSelect extends PrismaUserSelect {
  totalItems: number;
  maxDistance: number;
}
