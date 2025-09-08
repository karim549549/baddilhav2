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
import type { Request, Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth/authenticate')
  @Public()
  @HttpCode(HttpStatus.OK)
  @AuthEndpoint(
    'Smart OAuth authentication',
    'Handles login, registration, or linking OAuth providers automatically',
  )
  async authenticateOAuth(
    @Body()
    body: {
      oauthProvider: string;
      oauthProviderId: string;
      email?: string;
      displayName?: string;
      avatarUrl?: string;
      username?: string;
    },
  ): Promise<AuthResponse> {
    return this.authService.authenticateOAuth(body);
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
    'Smart Google OAuth callback - handles login or returns user data for registration',
  )
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @Req() req: Request & { user: GoogleUser },
    @Res() res: Response,
  ): Promise<void> {
    console.log('🔍 OAuth callback received');
    console.log('🔍 Request user:', JSON.stringify(req.user, null, 2));
    console.log('🔍 Request headers:', req.headers);
    console.log('🔍 Request query:', req.query);

    const result = await this.authService.handleGoogleCallback(req.user);
    console.log('🔍 Auth service result:', JSON.stringify(result, null, 2));

    // Redirect to Vercel Universal Link
    if ('requiresUsername' in result) {
      // New user - redirect to username selection
      const userData = encodeURIComponent(JSON.stringify(result.user));
      const redirectUrl = `https://baddilhav2.vercel.app/auth/google/callback?type=username&user=${userData}`;
      console.log('🔍 Redirecting to username selection:', redirectUrl);
      res.redirect(redirectUrl);
    } else {
      // Existing user - redirect with tokens
      const tokensData = encodeURIComponent(JSON.stringify(result.tokens));
      const userData = encodeURIComponent(JSON.stringify(result.user));
      const redirectUrl = `https://baddilhav2.vercel.app/auth/google/callback?type=success&tokens=${tokensData}&user=${userData}`;
      console.log('🔍 Redirecting to success:', redirectUrl);
      res.redirect(redirectUrl);
    }
  }
}
