import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

// Generic success response decorator
export function ApiSuccessResponse(description: string, schema?: any) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      schema: schema || {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: description },
          data: { type: 'object' }
        }
      }
    })
  );
}

// Generic created response decorator
export function ApiCreatedResponse(description: string, schema?: any) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description,
      schema: schema || {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: description },
          data: { type: 'object' }
        }
      }
    })
  );
}

// Generic error responses decorator
export function ApiErrorResponses() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 409, description: 'Conflict - Resource already exists' }),
    ApiResponse({ status: 500, description: 'Internal server error' })
  );
}

// Auth-specific responses
export function ApiAuthResponses() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 401, description: 'Invalid or expired OTP' }),
    ApiResponse({ status: 409, description: 'User already exists' })
  );
}

// OTP request body decorator
export function ApiOtpRequestBody() {
  return ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string', example: '+1234567890' },
        email: { type: 'string', example: 'user@example.com' }
      }
    }
  });
}

// OTP verification body decorator
export function ApiOtpVerificationBody() {
  return ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'gamer123' },
        phoneNumber: { type: 'string', example: '+1234567890' },
        email: { type: 'string', example: 'user@example.com' },
        otpCode: { type: 'string', example: '123456' }
      },
      required: ['username', 'otpCode']
    }
  });
}

// Refresh token body decorator
export function ApiRefreshTokenBody() {
  return ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
      },
      required: ['refreshToken']
    }
  });
}
