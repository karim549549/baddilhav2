import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { CACHE_CONFIG } from './libs/constants/cache.constants';
import { RATE_LIMIT_CONFIG } from './libs/constants/rate-limit.constants';
import { BlobModule } from './blob/blob.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>(CACHE_CONFIG.TTL_KEY, CACHE_CONFIG.DEFAULT_TTL),
        max: configService.get<number>(CACHE_CONFIG.MAX_KEY, CACHE_CONFIG.DEFAULT_MAX),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get<number>(RATE_LIMIT_CONFIG.TTL_KEY, RATE_LIMIT_CONFIG.DEFAULT_TTL) * 1000,
            limit: configService.get<number>(RATE_LIMIT_CONFIG.MAX_KEY, RATE_LIMIT_CONFIG.DEFAULT_MAX),
          },
        ],
      }),
      inject: [ConfigService],
    }),
    PrismaModule, // Global module - must be imported here
    AuthModule,
    EmailModule, 
    UserModule, BlobModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
