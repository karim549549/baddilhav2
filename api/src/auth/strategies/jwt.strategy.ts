import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '../../libs/constants/jwt.constants';
import { UserService } from '../../user/user.service';

export interface JwtPayload {
  sub: string; // User ID
  type: string; // Token type
  iss?: string; // Issuer
  aud?: string; // Audience
  iat?: number; // Issued at
  exp?: number; // Expiration
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_CONFIG.ACCESS_SECRET_KEY),
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    });
  }

  async validate(payload: JwtPayload) {
    // Verify token type is access token
    if (payload.type !== JWT_CONFIG.ACCESS_TOKEN) {
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
