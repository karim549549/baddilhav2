import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { GoogleProfile, GoogleUser } from '../../types/google.types';
import { GOOGLE_CONFIG, GOOGLE_ERROR_MESSAGES } from '../../libs/constants/google.constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>(GOOGLE_CONFIG.CLIENT_ID_KEY),
      clientSecret: configService.get<string>(GOOGLE_CONFIG.CLIENT_SECRET_KEY),
      callbackURL: configService.get<string>(
        GOOGLE_CONFIG.CALLBACK_URL_KEY,
        GOOGLE_CONFIG.DEFAULT_CALLBACK_URL
      ),
      scope: GOOGLE_CONFIG.SCOPES,
    } as any);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback
  ): Promise<any> {
    try {
      if (!profile || !profile.emails || !profile.emails[0]) {
        return done(new Error(GOOGLE_ERROR_MESSAGES.INVALID_PROFILE), null);
      }

      const email = profile.emails[0].value;
      if (!email) {
        return done(new Error(GOOGLE_ERROR_MESSAGES.MISSING_EMAIL), null);
      }

      const googleUser: GoogleUser = {
        provider: 'google',
        providerId: profile.id,
        email,
        displayName: `${profile.name.givenName} ${profile.name.familyName}`.trim(),
        avatar: profile.photos?.[0]?.value,
        accessToken,
        refreshToken,
      };

      return done(null, googleUser);
    } catch (error) {
      return done(new Error(GOOGLE_ERROR_MESSAGES.OAUTH_FAILED), null);
    }
  }
}
