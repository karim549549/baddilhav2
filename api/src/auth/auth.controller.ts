import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  LoginDto,
  AuthResponseDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { ApiController } from '../common/decorators/api-controller.decorator';
import {
  ApiEndpoint,
  CommonResponses,
} from '../common/decorators/api-endpoint.decorator';

@ApiController('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiEndpoint({
    summary: 'Register a new user',
    method: 'POST',
    statusCode: 201,
    useValidation: true,
    useBusinessValidation: true,
    responses: [
      ...CommonResponses.created(AuthResponseDto),
      ...CommonResponses.validationError(),
    ],
  })
  async signup(@Body() signupDto: SignupDto): Promise<AuthResponseDto> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiEndpoint({
    summary: 'Login user',
    method: 'POST',
    useValidation: true,
    responses: [
      ...CommonResponses.ok(AuthResponseDto),
      ...CommonResponses.validationError(),
      {
        status: 401,
        description: 'Invalid credentials',
      },
    ],
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    console.log('AuthController login called with:', loginDto);
    const result = await this.authService.login(loginDto);
    console.log('AuthController login result:', result);
    return result;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiEndpoint({
    summary: 'Refresh access token',
    method: 'POST',
    useValidation: true,
    responses: [
      ...CommonResponses.ok(AuthResponseDto),
      ...CommonResponses.validationError(),
      {
        status: 401,
        description: 'Invalid refresh token',
      },
    ],
  })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiEndpoint({
    summary: 'Request password reset',
    method: 'POST',
    useValidation: true,
    responses: [
      {
        status: 200,
        description: 'Reset link sent if email exists',
        type: Object,
      },
      ...CommonResponses.validationError(),
    ],
  })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiEndpoint({
    summary: 'Reset password with token',
    method: 'POST',
    useValidation: true,
    responses: [
      {
        status: 200,
        description: 'Password reset successfully',
        type: Object,
      },
      ...CommonResponses.validationError(),
      {
        status: 400,
        description: 'Invalid or expired reset token',
      },
    ],
  })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiEndpoint({
    summary: 'Logout user',
    method: 'POST',
    responses: [
      {
        status: 200,
        description: 'Logged out successfully',
        type: Object,
      },
    ],
  })
  async logout(): Promise<{ message: string }> {
    return this.authService.logout();
  }
}
