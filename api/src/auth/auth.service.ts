import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenFactory } from './factories/token.factory';
import { OtpService } from './services/otp.service';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SendOtpDto, VerifyOtpDto } from '../user/dto/otp-verification.dto';
import {  OAuthProvider } from '@prisma/client';
import { AuthResponse, OtpResponse, GoogleUser } from '../types';
import { GOOGLE_ERROR_MESSAGES } from '../libs/constants/google.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenFactory: TokenFactory,
    private readonly otpService: OtpService,
  ) {}

  async registerWithOAuth(registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    // Check if user already exists with OAuth provider
    if (registerUserDto.oauthProvider && registerUserDto.oauthProviderId) {
      const existingUser = await this.userService.findUserByOAuthProvider(
        registerUserDto.oauthProvider,
        registerUserDto.oauthProviderId
      );

      if (existingUser) {
        const tokens = await this.tokenFactory.generateTokenPair(existingUser.id);
        return {
          user: {
            id: existingUser.id,
            username: existingUser.username,
            displayName: existingUser.displayName,
            avatar: existingUser.avatar,
            bio: existingUser.bio,
            verificationStatus: existingUser.verificationStatus,
            role: existingUser.role,
          },
          tokens,
        };
      }
    }

    // Check if user exists with username, email, or phone
    const existingUser = await this.userService.findUserByUsernameOrEmailOrPhone(
      registerUserDto.username,
      registerUserDto.email,
      registerUserDto.phoneNumber
    );

    if (existingUser) {
      throw new ConflictException('User already exists with this username, email, or phone number');
    }

    // Create new user
    const user = await this.userService.registerUser(registerUserDto);
    
    // Generate tokens
    const tokens = await this.tokenFactory.generateTokenPair(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        bio: user.bio,
        verificationStatus: user.verificationStatus,
        role: user.role,
      },
      tokens,
    };
  }

  async registerWithPhoneOrEmail(sendOtpDto: SendOtpDto): Promise<OtpResponse> {
    if (!sendOtpDto.phoneNumber && !sendOtpDto.email) {
      throw new BadRequestException('Either phone number or email must be provided');
    }

    const identifier = sendOtpDto.phoneNumber || sendOtpDto.email!;

    // Rate limiting is now handled by @nestjs/throttler at the controller level

    // Check if user already exists
    const existingUser = await this.userService.findUserByUsernameOrEmailOrPhone(
      undefined,
      sendOtpDto.email,
      sendOtpDto.phoneNumber
    );

    if (existingUser) {
      throw new ConflictException('User already exists with this phone number or email');
    }

    // Generate and store OTP
    const { code, expiresAt } = await this.otpService.generateOtp(
      sendOtpDto.phoneNumber,
      sendOtpDto.email
    );

    // Rate limiting is handled by @nestjs/throttler

    // TODO: Send OTP via SMS/Email service
    // For development, we'll log the OTP (remove in production)
    console.log(`🔐 OTP for ${identifier}: ${code}`);

    return {
      message: `OTP sent to ${identifier}`,
      expiresAt,
      identifier,
    };
  }

  async verifyOtpAndRegister(verifyOtpDto: VerifyOtpDto, username: string): Promise<AuthResponse> {
    if (!verifyOtpDto.phoneNumber && !verifyOtpDto.email) {
      throw new BadRequestException('Either phone number or email must be provided');
    }

    const identifier = verifyOtpDto.phoneNumber || verifyOtpDto.email!;

    // Verify OTP
    const isValidOtp = await this.otpService.verifyOtp(identifier, verifyOtpDto.otpCode);

    if (!isValidOtp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Check if user already exists
    const existingUser = await this.userService.findUserByUsernameOrEmailOrPhone(
      username,
      verifyOtpDto.email,
      verifyOtpDto.phoneNumber
    );

    if (existingUser) {
      throw new ConflictException('User already exists with this username, email, or phone number');
    }

    // Create user
    const createUserDto: CreateUserDto = {
      username,
      email: verifyOtpDto.email,
      phoneNumber: verifyOtpDto.phoneNumber,
      verificationStatus: 'VERIFIED',
    };

    const user = await this.userService.createUser(createUserDto);
    
    // Generate tokens
    const tokens = await this.tokenFactory.generateTokenPair(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        bio: user.bio,
        verificationStatus: user.verificationStatus,
        role: user.role,
      },
      tokens,
    };
  }

  async loginWithOAuth(provider: OAuthProvider, providerId: string): Promise<AuthResponse> {
    const user = await this.userService.findUserByOAuthProvider(provider, providerId);

    if (!user) {
      throw new UnauthorizedException('User not found with this OAuth provider');
    }

    // User is active by default in our schema

    // Generate tokens
    const tokens = await this.tokenFactory.generateTokenPair(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        bio: user.bio,
        verificationStatus: user.verificationStatus,
        role: user.role,
      },
      tokens,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const payload = this.tokenFactory.verifyToken(refreshToken, true);
    
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.userService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate new token pair
    const tokens = await this.tokenFactory.generateTokenPair(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        bio: user.bio,
        verificationStatus: user.verificationStatus,
        role: user.role,
      },
      tokens,
    };
  }

  async authenticateGoogleUser(googleUser: GoogleUser): Promise<AuthResponse> {
    try {
      // Check if user already exists with this Google account
      const existingUser = await this.userService.findUserByEmail(googleUser.email);
      
      if (existingUser) {
        // User exists, check if they have Google OAuth linked
        const hasGoogleOAuth = (existingUser as any).oauthAccounts?.some(
          (account: any) => account.provider === 'GOOGLE' && account.providerAccountId === googleUser.providerId
        );

        if (!hasGoogleOAuth) {
          // Link Google OAuth to existing user
          await this.userService.linkOAuthProvider(existingUser.id, {
            provider: 'GOOGLE',
            providerId: googleUser.providerId,
            accessToken: googleUser.accessToken,
            refreshToken: googleUser.refreshToken,
          });
        }

        // Generate tokens for existing user
        const tokens = await this.tokenFactory.generateTokenPair(existingUser.id);

        return {
          user: {
            id: existingUser.id,
            username: existingUser.username,
            displayName: existingUser.displayName,
            avatar: existingUser.avatar,
            bio: existingUser.bio,
            verificationStatus: existingUser.verificationStatus,
            role: existingUser.role,
          },
          tokens,
        };
      }

      // Create new user from Google profile
      const createUserDto: CreateUserDto = {
        username: googleUser.email.split('@')[0], // Use email prefix as username
        email: googleUser.email,
        displayName: googleUser.displayName,
        avatarUrl: googleUser.avatar,
        oauthProvider: 'GOOGLE',
        oauthProviderId: googleUser.providerId,
        isActive: true,
      };

      const newUser = await this.userService.createUser(createUserDto);
      const tokens = await this.tokenFactory.generateTokenPair(newUser.id);

      return {
        user: {
          id: newUser.id,
          username: newUser.username,
          displayName: newUser.displayName,
          avatar: newUser.avatar,
          bio: newUser.bio,
          verificationStatus: newUser.verificationStatus,
          role: newUser.role,
        },
        tokens,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || GOOGLE_ERROR_MESSAGES.USER_CREATION_FAILED
      );
    }
  }
}
