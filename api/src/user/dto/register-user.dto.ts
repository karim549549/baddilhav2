import { IsString, IsOptional, IsEnum, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OAuthProvider } from '@prisma/client';

export class RegisterUserDto {
  @ApiProperty({ description: 'Username for the user', example: 'gamer123' })
  @IsString()
  username: string;

  @ApiPropertyOptional({ description: 'User email address', example: 'user@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'User phone number', example: '+1234567890' })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'User display name', example: 'John Doe' })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({ description: 'OAuth provider used for registration', enum: OAuthProvider })
  @IsOptional()
  @IsEnum(OAuthProvider)
  oauthProvider?: OAuthProvider;

  @ApiPropertyOptional({ description: 'OAuth provider ID', example: 'google_123456789' })
  @IsOptional()
  @IsString()
  oauthProviderId?: string;

  @ApiPropertyOptional({ description: 'OAuth provider email', example: 'user@gmail.com' })
  @IsOptional()
  @IsEmail()
  oauthEmail?: string;

  @ApiPropertyOptional({ description: 'OAuth provider name', example: 'John Doe' })
  @IsOptional()
  @IsString()
  oauthName?: string;

  @ApiPropertyOptional({ description: 'OAuth provider avatar URL', example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  oauthAvatarUrl?: string;
}
