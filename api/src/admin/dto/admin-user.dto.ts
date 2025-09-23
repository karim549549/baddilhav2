import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role, UserVerificationStatus } from '@prisma/client';
import {
  PaginationQuery,
  PaginatedResponse,
} from '../../common/interfaces/pagination.interface';

export class AdminUserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'clx1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;

  @ApiPropertyOptional({
    description: 'Biography of the user',
    example: 'Software developer passionate about technology',
  })
  bio?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  phone?: string;

  @ApiProperty({
    description: 'Whether the phone number is verified',
    example: false,
  })
  isPhoneVerified: boolean;

  @ApiProperty({
    description: 'Verification status of the user',
    example: 'UNVERIFIED',
    enum: UserVerificationStatus,
  })
  verificationStatus: UserVerificationStatus;

  @ApiProperty({
    description: 'Role of the user',
    example: 'USER',
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    description: 'Date when the user joined',
    example: '2024-01-15T10:30:00.000Z',
  })
  memberSince: string;

  @ApiProperty({
    description: 'Date of last activity',
    example: '2024-01-20T14:45:00.000Z',
  })
  lastActive: string;

  @ApiProperty({
    description: 'Total number of items posted by the user',
    example: 5,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Maximum distance the user is willing to travel',
    example: 50,
  })
  maxDistance: number;
}

export class UpdateUserRoleDto {
  @ApiProperty({
    description: 'New role to assign to the user',
    example: 'ADMIN',
    enum: Role,
  })
  @IsEnum(Role, { message: 'Please provide a valid role' })
  @IsNotEmpty({ message: 'Role is required' })
  role: Role;
}

export class UpdateUserStatusDto {
  @ApiProperty({
    description: 'New verification status to assign to the user',
    example: 'VERIFIED',
    enum: UserVerificationStatus,
  })
  @IsEnum(UserVerificationStatus, {
    message: 'Please provide a valid verification status',
  })
  @IsNotEmpty({ message: 'Verification status is required' })
  verificationStatus: UserVerificationStatus;
}

export class UserSearchDto implements PaginationQuery {
  @ApiPropertyOptional({
    description: 'Search term to filter users by name, email, or phone',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter users by role',
    example: 'USER',
    enum: Role,
  })
  @IsOptional()
  @IsEnum(Role, { message: 'Please provide a valid role' })
  role?: Role;

  @ApiPropertyOptional({
    description: 'Filter users by verification status',
    example: 'VERIFIED',
    enum: UserVerificationStatus,
  })
  @IsOptional()
  @IsEnum(UserVerificationStatus, {
    message: 'Please provide a valid verification status',
  })
  verificationStatus?: UserVerificationStatus;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit must not exceed 100' })
  limit?: number = 10;
}

export class AdminUsersResponseDto
  implements PaginatedResponse<AdminUserResponseDto>
{
  @ApiProperty({
    description: 'Array of admin user data',
    type: [AdminUserResponseDto],
  })
  data: AdminUserResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    example: {
      page: 1,
      limit: 10,
      total: 100,
      totalPages: 10,
      hasNext: true,
      hasPrev: false,
    },
  })
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class AdminStatsDto {
  @ApiProperty({
    description: 'Total number of users in the system',
    example: 1250,
  })
  totalUsers: number;

  @ApiProperty({
    description: 'Number of new users registered this month',
    example: 45,
  })
  newUsersThisMonth: number;

  @ApiProperty({
    description: 'Number of active users in the last 30 days',
    example: 890,
  })
  activeUsers: number;

  @ApiProperty({
    description: 'Number of users grouped by role',
    example: { USER: 1200, ADMIN: 45, SUPER_ADMIN: 5 },
  })
  usersByRole: Record<string, number>;

  @ApiProperty({
    description: 'Number of users grouped by verification status',
    example: { UNVERIFIED: 200, PENDING: 50, VERIFIED: 950, REJECTED: 50 },
  })
  usersByVerificationStatus: Record<string, number>;

  @ApiProperty({
    description: 'Total number of items in the system',
    example: 5000,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Average number of items per user',
    example: 4.0,
  })
  averageItemsPerUser: number;
}
