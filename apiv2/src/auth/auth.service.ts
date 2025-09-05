import { Injectable } from '@nestjs/common';
import { TokenFactory } from './factories/token.factory';
import { AuthResponse, RefreshTokenRequest, RefreshTokenResponse, LogoutRequest, LogoutResponse } from '../types/auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly tokenFactory: TokenFactory) {}

  /**
   * Generate authentication response with tokens
   */
  generateAuthResponse(userId: string, userData: any): AuthResponse {
    const tokens = this.tokenFactory.generateTokenPair(userId);
    
    return {
      user: {
        id: userData.id || userId,
        username: userData.username || 'temp_user',
        displayName: userData.displayName || 'Temp User',
        avatar: userData.avatar,
        bio: userData.bio,
        verificationStatus: userData.verificationStatus || 'UNVERIFIED',
        role: userData.role || 'USER',
      },
      tokens,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    try {
      // Verify refresh token
      const payload = this.tokenFactory.verifyToken(request.refreshToken, true);
      
      // Generate new token pair
      const tokens = this.tokenFactory.generateTokenPair(payload.sub);
      
      return {
        accessToken: tokens.accessToken.token,
        refreshToken: tokens.refreshToken.token,
        accessTokenExpiresIn: tokens.accessToken.expiresIn,
        refreshTokenExpiresIn: tokens.refreshToken.expiresIn,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Logout user
   */
  async logout(request: LogoutRequest): Promise<LogoutResponse> {
    // TODO: Implement token blacklisting
    return {
      message: 'Logged out successfully',
    };
  }

  /**
   * Get current user info
   */
  async getCurrentUser(userId: string): Promise<any> {
    // TODO: Implement user lookup from database
    return {
      id: userId,
      username: 'temp_user',
      displayName: 'Temp User',
      verificationStatus: 'UNVERIFIED',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
