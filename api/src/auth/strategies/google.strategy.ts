import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { GoogleProfile, GoogleUser } from '../../types/google.types';
import {
  GOOGLE_CONFIG,
  GOOGLE_ERROR_MESSAGES,
} from '../../libs/constants/google.constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID:
        '211876270719-lte0so8pfqoj4u8481himsk52jbq5vj4.apps.googleusercontent.com', // Android client ID
      clientSecret:
        configService.get<string>(GOOGLE_CONFIG.CLIENT_SECRET_KEY) ||
        'GOCSPX-your-secret-here',
      callbackURL: configService.get<string>(
        GOOGLE_CONFIG.CALLBACK_URL_KEY,
        GOOGLE_CONFIG.DEFAULT_CALLBACK_URL,
      ),
      scope: GOOGLE_CONFIG.SCOPES,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<void> {
    if (!profile || !profile.emails || !profile.emails[0]) {
      return done(new Error(GOOGLE_ERROR_MESSAGES.INVALID_PROFILE), null);
    }

    const email = profile.emails[0].value;
    if (!email) {
      return done(new Error(GOOGLE_ERROR_MESSAGES.MISSING_EMAIL), null);
    }

    const googleUser: GoogleUser = {
      provider: 'GOOGLE',
      providerId: profile.id,
      email,
      displayName:
        `${profile.name.givenName} ${profile.name.familyName}`.trim(),
      avatar: profile.photos?.[0]?.value,
      accessToken,
      refreshToken,
    };

    return done(null, googleUser);
  }
}
