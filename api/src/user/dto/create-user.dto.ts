import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserVerificationStatus, OAuthProvider, Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ description: 'Username for the user', example: 'gamer123' })
  @IsString()
  username: string;

  @ApiPropertyOptional({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'User display name',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({
    description: 'User bio/description',
    example: 'Passionate gamer looking to trade items',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'User date of birth',
    example: '1995-01-01',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'User verification status',
    enum: UserVerificationStatus,
  })
  @IsOptional()
  @IsEnum(UserVerificationStatus)
  verificationStatus?: UserVerificationStatus;

  @ApiPropertyOptional({ description: 'User role', enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    description: 'OAuth provider used for registration',
    enum: OAuthProvider,
  })
  @IsOptional()
  @IsEnum(OAuthProvider)
  oauthProvider?: OAuthProvider;

  @ApiPropertyOptional({
    description: 'OAuth provider ID',
    example: 'google_123456789',
  })
  @IsOptional()
  @IsString()
  oauthProviderId?: string;

  @ApiPropertyOptional({ description: 'Whether user is active', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'User location latitude',
    example: 40.7128,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({
    description: 'User location longitude',
    example: -74.006,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiPropertyOptional({
    description: 'User location address',
    example: 'New York, NY, USA',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Maximum distance for item discovery (in km)',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  maxDistance?: number;

  @ApiPropertyOptional({
    description: 'Games the user is interested in',
    example: ['Call of Duty', 'Fortnite', 'Valorant'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interestedGames?: string[];

  @ApiPropertyOptional({
    description: 'User preferences for notifications',
    example: { matches: true, messages: true, system: false },
  })
  @IsOptional()
  preferences?: {
    matches?: boolean;
    messages?: boolean;
    system?: boolean;
  };
}
