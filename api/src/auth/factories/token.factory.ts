import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '../../libs/constants/jwt.constants';
import { TokenPayload, TokenPair, Token } from '../../types/auth.types';

@Injectable()
export class TokenFactory {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generate both access and refresh tokens
   */
  generateTokenPair(userId: string): TokenPair {
    return {
      accessToken: this.generateToken(userId, 'access').token,
      refreshToken: this.generateToken(userId, 'refresh').token,
    };
  }

  /**
   * Verify and decode a token
   */
  verifyToken(token: string, isRefreshToken = false): TokenPayload {
    const secretKey = isRefreshToken
      ? JWT_CONFIG.REFRESH_SECRET_KEY
      : JWT_CONFIG.ACCESS_SECRET_KEY;

    return this.jwtService.verify<TokenPayload>(token, {
      secret: this.configService.get<string>(secretKey),
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    });
  }

  /**
   * Generic token generator
   */
  private generateToken(userId: string, type: 'access' | 'refresh'): Token {
    const payload: TokenPayload = {
      sub: userId,
      email: '', // Will be filled by the caller
      role: '', // Will be filled by the caller
      type:
        type === 'access' ? JWT_CONFIG.ACCESS_TOKEN : JWT_CONFIG.REFRESH_TOKEN,
    };

    const secret = this.configService.get<string>(
      type === 'access'
        ? JWT_CONFIG.ACCESS_SECRET_KEY
        : JWT_CONFIG.REFRESH_SECRET_KEY,
    );

    const expiresIn = this.configService.get<string>(
      type === 'access'
        ? JWT_CONFIG.ACCESS_EXPIRATION_KEY
        : JWT_CONFIG.REFRESH_EXPIRATION_KEY,
      type === 'access'
        ? JWT_CONFIG.DEFAULT_ACCESS_EXPIRATION
        : JWT_CONFIG.DEFAULT_REFRESH_EXPIRATION,
    );

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    });

    return {
      token,
      expiresIn,
    };
  }

  /**
   * Calculate expiration date from expiresIn string
   */
  private calculateExpirationDate(expiresIn: string): Date {
    return new Date(Date.now() + this.parseExpiresIn(expiresIn));
  }

  /**
   * Parse expiresIn string to milliseconds
   */
  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
      throw new Error(`Invalid expiresIn format: ${expiresIn}`);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2] as 's' | 'm' | 'h' | 'd';

    const multipliers = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    return value * multipliers[unit];
  }
}
