import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// Auth endpoint decorator with common responses
export function AuthEndpoint(
  summary: string,
  description: string,
  successSchema?: any
) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiResponse({
      status: 201,
      description: 'Operation successful',
      schema: successSchema || {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operation successful' },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/User' },
              tokens: {
                type: 'object',
                properties: {
                  accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                  refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                }
              }
            }
          }
        }
      }
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 401, description: 'Invalid or expired OTP' }),
    ApiResponse({ status: 409, description: 'User already exists' })
  );
}

// OTP endpoint decorator
export function OtpEndpoint(
  summary: string,
  description: string,
  successSchema?: any
) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiResponse({
      status: 200,
      description: 'OTP sent successfully',
      schema: successSchema || {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'OTP sent successfully' },
          data: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'OTP sent to +1234567890' },
              expiresAt: { type: 'string', format: 'date-time', example: '2024-01-01T12:00:00Z' },
              identifier: { type: 'string', example: '+1234567890' }
            }
          }
        }
      }
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 409, description: 'User already exists' })
  );
}
