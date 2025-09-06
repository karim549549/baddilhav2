import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { CACHE_CONFIG } from '../../libs/constants/cache.constants';
import { OtpData, OtpGenerationResult } from '../../types';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly MAX_ATTEMPTS = 3;
  private readonly OTP_TTL = CACHE_CONFIG.OTP_TTL;

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private getOtpKey(identifier: string): string {
    return `${CACHE_CONFIG.OTP_PREFIX}${identifier}`;
  }

  private getAttemptsKey(identifier: string): string {
    return `${CACHE_CONFIG.OTP_ATTEMPTS_PREFIX}${identifier}`;
  }

  async generateOtp(
    phoneNumber?: string,
    email?: string,
  ): Promise<OtpGenerationResult> {
    const identifier = phoneNumber || email;
    if (!identifier) {
      throw new Error('Either phone number or email must be provided');
    }

    const code = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + this.OTP_TTL * 1000);

    const otpData: OtpData = {
      code,
      phoneNumber,
      email,
      attempts: 0,
      createdAt: new Date(),
    };

    // Store OTP in cache
    await this.cacheManager.set(
      this.getOtpKey(identifier),
      otpData,
      this.OTP_TTL * 1000,
    );

    this.logger.log(
      `OTP generated for ${identifier} (expires in ${this.OTP_TTL}s)`,
    );

    return { code, expiresAt };
  }

  async verifyOtp(identifier: string, providedCode: string): Promise<boolean> {
    const otpData = await this.cacheManager.get<OtpData>(
      this.getOtpKey(identifier),
    );

    if (!otpData) {
      this.logger.warn(
        `OTP verification failed: No OTP found for ${identifier}`,
      );
      return false;
    }

    // Check attempts
    if (otpData.attempts >= this.MAX_ATTEMPTS) {
      this.logger.warn(
        `OTP verification failed: Max attempts exceeded for ${identifier}`,
      );
      await this.cacheManager.del(this.getOtpKey(identifier));
      return false;
    }

    // Verify code
    if (otpData.code !== providedCode) {
      otpData.attempts += 1;
      await this.cacheManager.set(
        this.getOtpKey(identifier),
        otpData,
        this.OTP_TTL * 1000,
      );

      this.logger.warn(
        `OTP verification failed: Invalid code for ${identifier} (attempt ${otpData.attempts}/${this.MAX_ATTEMPTS})`,
      );
      return false;
    }

    // OTP is valid, remove it from cache
    await this.cacheManager.del(this.getOtpKey(identifier));
    this.logger.log(`OTP verification successful for ${identifier}`);

    return true;
  }

  async getOtpInfo(
    identifier: string,
  ): Promise<{ attempts: number; createdAt: Date } | null> {
    const otpData = await this.cacheManager.get<OtpData>(
      this.getOtpKey(identifier),
    );

    if (!otpData) {
      return null;
    }

    return {
      attempts: otpData.attempts,
      createdAt: otpData.createdAt,
    };
  }

  async clearOtp(identifier: string): Promise<void> {
    await this.cacheManager.del(this.getOtpKey(identifier));
    this.logger.log(`OTP cleared for ${identifier}`);
  }

  async isOtpValid(identifier: string): Promise<boolean> {
    const otpData = await this.cacheManager.get<OtpData>(
      this.getOtpKey(identifier),
    );
    return (
      otpData !== null &&
      otpData !== undefined &&
      otpData.attempts < this.MAX_ATTEMPTS
    );
  }

  // Note: Rate limiting is now handled by @nestjs/throttler at the controller level
  // This provides better IP-based protection and is more secure
}
