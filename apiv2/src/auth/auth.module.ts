import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '../constants/jwt.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RolesGuard } from './guards/roles.guard';
import { TokenFactory } from './factories/token.factory';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtAuthGuard,
    JwtRefreshGuard,
    RolesGuard,
    TokenFactory,
  ],
  exports: [AuthService, TokenFactory, JwtAuthGuard, JwtRefreshGuard, RolesGuard],
})
export class AuthModule {}
