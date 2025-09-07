import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenFactory } from './factories/token.factory';
import { OtpService } from './services/otp.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SendOtpDto, VerifyOtpDto } from '../user/dto/otp-verification.dto';
import { OAuthProvider } from '@prisma/client';
import { AuthResponse, OtpResponse, GoogleUser } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenFactory: TokenFactory,
    private readonly otpService: OtpService,
  ) {}

  async handleGoogleCallback(
    googleUser: GoogleUser,
  ): Promise<AuthResponse | { user: GoogleUser; requiresUsername: boolean }> {
    // Check if this OAuth provider is already linked to a user (LOGIN case)
    const existingUser = await this.userService.findUserByOAuthProvider(
      googleUser.provider,
      googleUser.providerId,
    );

    if (existingUser) {
      // OAuth provider already linked - this is a LOGIN, return tokens immediately
      const tokens = await this.tokenFactory.generateTokenPair(existingUser.id);
      return {
        user: {
          id: existingUser.id,
          username: existingUser.username,
          displayName: existingUser.displayName,
          avatar: existingUser.avatar || undefined,
          bio: existingUser.bio || undefined,
          verificationStatus: existingUser.verificationStatus,
          role: existingUser.role,
        },
        tokens,
      };
    }

    // OAuth provider not linked - return user data for username selection (REGISTER/LINK case)
    return {
      user: googleUser,
      requiresUsername: true,
    };
  }

  async authenticateOAuth(body: {
    oauthProvider: string;
    oauthProviderId: string;
    email?: string;
    displayName?: string;
    avatarUrl?: string;
    username?: string;
  }): Promise<AuthResponse> {
    // Step 1: Check if OAuth provider is already linked to a user (LOGIN)
    const existingOAuthUser = await this.userService.findUserByOAuthProvider(
      body.oauthProvider,
      body.oauthProviderId,
    );

    if (existingOAuthUser) {
      // OAuth provider already linked - this is a LOGIN
      const tokens = await this.tokenFactory.generateTokenPair(
        existingOAuthUser.id,
      );
      return {
        user: {
          id: existingOAuthUser.id,
          username: existingOAuthUser.username,
          displayName: existingOAuthUser.displayName,
          avatar: existingOAuthUser.avatar || undefined,
          bio: existingOAuthUser.bio || undefined,
          verificationStatus: existingOAuthUser.verificationStatus,
          role: existingOAuthUser.role,
        },
        tokens,
      };
    }

    // Step 2: Check if user exists with email (LINK OAuth to existing user)
    if (body.email) {
      const existingEmailUser = await this.userService.findUserByEmail(
        body.email,
      );
      if (existingEmailUser) {
        // User exists with this email - LINK the OAuth provider
        await this.userService.linkOAuthProvider(existingEmailUser.id, {
          provider: body.oauthProvider,
          providerId: body.oauthProviderId,
          accessToken: '', // We'll need to store this properly
          refreshToken: '',
        });

        const tokens = await this.tokenFactory.generateTokenPair(
          existingEmailUser.id,
        );
        return {
          user: {
            id: existingEmailUser.id,
            username: existingEmailUser.username,
            displayName: existingEmailUser.displayName,
            avatar: existingEmailUser.avatar || undefined,
            bio: existingEmailUser.bio || undefined,
            verificationStatus: existingEmailUser.verificationStatus,
            role: existingEmailUser.role,
          },
          tokens,
        };
      }
    }

    // Step 3: Check if username is taken (for new registration)
    if (body.username) {
      const usernameExists = await this.userService.findUserByUsername(
        body.username,
      );
      if (usernameExists) {
        throw new ConflictException('Username is already taken');
      }
    }

    // Step 4: Create new user (REGISTER)
    const createUserDto: CreateUserDto = {
      username: body.username || body.email?.split('@')[0] || 'user',
      email: body.email,
      displayName: body.displayName,
      avatarUrl: body.avatarUrl,
      oauthProvider: body.oauthProvider as any,
      oauthProviderId: body.oauthProviderId,
      isActive: true,
    };

    const newUser = await this.userService.createUser(createUserDto);
    const tokens = await this.tokenFactory.generateTokenPair(newUser.id);

    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        displayName: newUser.displayName,
        avatar: newUser.avatar || undefined,
        bio: newUser.bio || undefined,
        verificationStatus: newUser.verificationStatus,
        role: newUser.role,
      },
      tokens,
    };
  }

  async registerWithPhoneOrEmail(sendOtpDto: SendOtpDto): Promise<OtpResponse> {
    if (!sendOtpDto.phoneNumber && !sendOtpDto.email) {
      throw new BadRequestException(
        'Either phone number or email must be provided',
      );
    }

    const identifier = sendOtpDto.phoneNumber || sendOtpDto.email!;

    // Rate limiting is now handled by @nestjs/throttler at the controller level

    // Check if user already exists
    const existingUser =
      await this.userService.findUserByUsernameOrEmailOrPhone(
        undefined,
        sendOtpDto.email,
        sendOtpDto.phoneNumber,
      );

    if (existingUser) {
      throw new ConflictException(
        'User already exists with this phone number or email',
      );
    }

    // Generate and store OTP
    const { code, expiresAt } = await this.otpService.generateOtp(
      sendOtpDto.phoneNumber,
      sendOtpDto.email,
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

  async verifyOtpAndRegister(
    verifyOtpDto: VerifyOtpDto,
    username: string,
  ): Promise<AuthResponse> {
    if (!verifyOtpDto.phoneNumber && !verifyOtpDto.email) {
      throw new BadRequestException(
        'Either phone number or email must be provided',
      );
    }

    const identifier = verifyOtpDto.phoneNumber || verifyOtpDto.email!;

    // Verify OTP
    const isValidOtp = await this.otpService.verifyOtp(
      identifier,
      verifyOtpDto.otpCode,
    );

    if (!isValidOtp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Check if user already exists
    const existingUser =
      await this.userService.findUserByUsernameOrEmailOrPhone(
        username,
        verifyOtpDto.email,
        verifyOtpDto.phoneNumber,
      );

    if (existingUser) {
      throw new ConflictException(
        'User already exists with this username, email, or phone number',
      );
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
        avatar: user.avatar || undefined,
        bio: user.bio || undefined,
        verificationStatus: user.verificationStatus,
        role: user.role,
      },
      tokens,
    };
  }

  async loginWithOAuth(
    provider: OAuthProvider,
    providerId: string,
  ): Promise<AuthResponse> {
    const user = await this.userService.findUserByOAuthProvider(
      provider,
      providerId,
    );

    if (!user) {
      throw new UnauthorizedException(
        'User not found with this OAuth provider',
      );
    }

    // User is active by default in our schema

    // Generate tokens
    const tokens = await this.tokenFactory.generateTokenPair(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar || undefined,
        bio: user.bio || undefined,
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
        avatar: user.avatar || undefined,
        bio: user.bio || undefined,
        verificationStatus: user.verificationStatus,
        role: user.role,
      },
      tokens,
    };
  }
}
