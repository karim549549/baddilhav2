import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';

// Blob upload endpoint decorator
export function BlobUploadEndpoint(
  summary: string,
  description: string,
  successSchema?: any
) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiConsumes('multipart/form-data'),
    ApiResponse({
      status: 201,
      description: 'File uploaded successfully',
      schema: successSchema || {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'File uploaded successfully' },
          data: {
            type: 'object',
            properties: {
              path: { type: 'string', example: 'users/avatars/2024-01-01/avatar_user123_1234567890.jpg' },
              fullUrl: { type: 'string', example: 'https://supabase.co/storage/v1/object/public/bucket/path' },
              bucket: { type: 'string', example: 'baddilha-assets' },
              size: { type: 'number', example: 1024000 },
              contentType: { type: 'string', example: 'image/jpeg' }
            }
          }
        }
      }
    }),
    ApiResponse({ status: 400, description: 'Invalid file or upload failed' }),
    ApiResponse({ status: 401, description: 'Unauthorized' })
  );
}

// Blob delete endpoint decorator
export function BlobDeleteEndpoint(
  summary: string,
  description: string
) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiResponse({
      status: 200,
      description: 'File deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'File deleted successfully' },
          data: { type: 'object', example: {} }
        }
      }
    }),
    ApiResponse({ status: 404, description: 'File not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized' })
  );
}
