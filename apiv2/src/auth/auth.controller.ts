import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import type { RefreshTokenRequest, RefreshTokenResponse, LogoutRequest, LogoutResponse } from '../types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Body() request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(request);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Body() request: LogoutRequest): Promise<LogoutResponse> {
    return this.authService.logout(request);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req: any) {
    return this.authService.getCurrentUser(req.user.userId);
  }
}
