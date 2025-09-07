import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthResponse, OtpResponse, GoogleUser } from '../types';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { SendOtpDto, VerifyOtpDto } from '../user/dto/otp-verification.dto';
import { RATE_LIMIT_CONFIG } from '../libs/constants/rate-limit.constants';
import { Public } from './decorators/public.decorator';
import {
  AuthEndpoint,
  OtpEndpoint,
} from '../common/decorators/auth-endpoint.decorator';
import {
  ApiOtpRequestBody,
  ApiOtpVerificationBody,
  ApiRefreshTokenBody,
} from '../common/decorators/api-responses.decorator';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import type { Request } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/oauth')
  @Public()
  @AuthEndpoint(
    'Register user with OAuth provider',
    'Register a new user using OAuth provider (Google, Discord, Apple) or login if user already exists',
  )
  async registerWithOAuth(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthResponse> {
    return this.authService.registerWithOAuth(registerUserDto);
  }

  @Post('register/otp/send')
  @Public()
  @Throttle({
    default: {
      limit: RATE_LIMIT_CONFIG.OTP_MAX,
      ttl: RATE_LIMIT_CONFIG.OTP_TTL * 1000,
    },
  })
  @HttpCode(HttpStatus.OK)
  @OtpEndpoint(
    'Send OTP for phone/email registration',
    'Send OTP to phone number or email for user registration',
  )
  @ApiOtpRequestBody()
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<OtpResponse> {
    return this.authService.registerWithPhoneOrEmail(sendOtpDto);
  }

  @Post('register/otp/verify')
  @Public()
  @AuthEndpoint(
    'Verify OTP and complete registration',
    'Verify OTP code and complete user registration with username',
  )
  @ApiOtpVerificationBody()
  async verifyOtpAndRegister(
    @Body() body: VerifyOtpDto & { username: string },
  ): Promise<AuthResponse> {
    const { username, ...verifyOtpDto } = body;
    return this.authService.verifyOtpAndRegister(verifyOtpDto, username);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @AuthEndpoint(
    'Refresh access token',
    'Generate new access token using refresh token',
  )
  @ApiRefreshTokenBody()
  async refreshToken(
    @Body() body: { refreshToken: string },
  ): Promise<AuthResponse> {
    return this.authService.refreshToken(body.refreshToken);
  }

  @Get('google')
  @Public()
  @AuthEndpoint(
    'Initiate Google OAuth',
    'Redirect to Google OAuth consent screen',
  )
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @Public()
  @AuthEndpoint(
    'Google OAuth callback',
    'Handle Google OAuth callback and return user info for username selection',
  )
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @Req() req: Request & { user: GoogleUser },
  ): Promise<{ user: GoogleUser; requiresUsername: boolean }> {
    const googleUser = req.user;

    return {
      user: googleUser,
      requiresUsername: true,
    };
  }
}
