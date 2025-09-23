import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '../../libs/constants/jwt.constants';
import { UserService } from '../../user/user.service';

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
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
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

    // Get user from database
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return user object that will be attached to request
    return {
      userId: user.id,
      fullName: user.fullName,
      user,
    };
  }
}
