import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '../../constants/jwt.constants';

export interface JwtRefreshPayload {
  sub: string; // User ID
  type: string; // Token type
  iss?: string; // Issuer
  aud?: string; // Audience
  iat?: number; // Issued at
  exp?: number; // Expiration
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_CONFIG.REFRESH_SECRET_KEY),
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    });
  }

  async validate(payload: JwtRefreshPayload) {
    // Verify token type is refresh token
    if (payload.type !== JWT_CONFIG.REFRESH_TOKEN) {
      throw new UnauthorizedException('Invalid token type');
    }

    // For now, return basic user info
    // TODO: Add UserService when we create it
    return {
      userId: payload.sub,
      username: 'temp_user', // Will be replaced with actual user lookup
      user: {
        id: payload.sub,
        username: 'temp_user',
        role: 'USER',
      },
    };
  }
}
