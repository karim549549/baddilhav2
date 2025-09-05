import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenFactory } from './factories/token.factory';
import { OtpService } from './services/otp.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JWT_CONFIG } from '../libs/constants/jwt.constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_CONFIG.ACCESS_SECRET_KEY),
        signOptions: {
          expiresIn: configService.get<string>(
            JWT_CONFIG.ACCESS_EXPIRATION_KEY,
            JWT_CONFIG.DEFAULT_ACCESS_EXPIRATION,
          ),
          issuer: JWT_CONFIG.ISSUER,
          audience: JWT_CONFIG.AUDIENCE,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenFactory,
    OtpService,
    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
