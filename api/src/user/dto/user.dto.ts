import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsUrl,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginatedResponse } from '../../common/interfaces/pagination.interface';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'Full name can only contain letters, spaces, hyphens, and apostrophes',
  })
  fullName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'SecurePassword123!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber(undefined, { message: 'Please provide a valid phone number' })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Biography or description of the user',
    example: 'Software developer passionate about technology',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Bio must not exceed 500 characters' })
  bio?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Updated full name of the user',
    example: 'John Smith',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'Full name can only contain letters, spaces, hyphens, and apostrophes',
  })
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Updated biography or description of the user',
    example: 'Senior software developer with 5 years of experience',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Bio must not exceed 500 characters' })
  bio?: string;

  @ApiPropertyOptional({
    description: 'Updated phone number of the user',
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber(undefined, { message: 'Please provide a valid phone number' })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Please provide a valid URL for the avatar' })
  avatar?: string;
}

export class UserResponseDto {
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
    enum: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'],
  })
  verificationStatus: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'USER',
    enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
  })
  role: string;

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
}

export class UsersResponseDto implements PaginatedResponse<UserResponseDto> {
  @ApiProperty({
    description: 'Array of users',
    type: [UserResponseDto],
  })
  data: UserResponseDto[];

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
