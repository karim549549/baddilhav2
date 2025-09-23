import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { BusinessValidationPipe } from '../pipes/business-validation.pipe';

interface EndpointOptions {
  summary: string;
  description?: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  statusCode?: number;
  responses?: Array<{
    status: number;
    description: string;
    type?: any;
  }>;
  params?: Array<{
    name: string;
    description: string;
    example: string;
  }>;
  queries?: Array<{
    name: string;
    required?: boolean;
    type?: any;
    enum?: any;
    example: string | number;
  }>;
  useValidation?: boolean;
  useBusinessValidation?: boolean;
  isAdmin?: boolean;
}

export function ApiEndpoint(options: EndpointOptions) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  ];

  // Add HTTP status code
  if (options.statusCode) {
    decorators.push(HttpCode(options.statusCode));
  }

  // Add validation pipes
  if (options.useValidation) {
    decorators.push(UsePipes(ValidationPipe));
  }
  if (options.useBusinessValidation) {
    decorators.push(UsePipes(BusinessValidationPipe));
  }

  // Add API responses
  if (options.responses) {
    options.responses.forEach((response) => {
      decorators.push(
        ApiResponse({
          status: response.status,
          description: response.description,
          type: response.type,
        }),
      );
    });
  }

  // Add API parameters
  if (options.params) {
    options.params.forEach((param) => {
      decorators.push(
        ApiParam({
          name: param.name,
          description: param.description,
          example: param.example,
        }),
      );
    });
  }

  // Add API queries
  if (options.queries) {
    options.queries.forEach((query) => {
      decorators.push(
        ApiQuery({
          name: query.name,
          required: query.required,
          type: query.type,
          enum: query.enum,
          example: query.example,
        }),
      );
    });
  }

  // Add admin-specific responses
  if (options.isAdmin) {
    decorators.push(
      ApiResponse({
        status: 403,
        description: 'Insufficient permissions',
      }),
    );
  }

  return applyDecorators(...decorators);
}

// Common response patterns
export const CommonResponses = {
  created: (type: any) => [
    {
      status: 201,
      description: 'Resource created successfully',
      type,
    },
    {
      status: 400,
      description: 'Validation failed',
    },
    {
      status: 409,
      description: 'Resource already exists',
    },
  ],
  ok: (type: any) => [
    {
      status: 200,
      description: 'Operation successful',
      type,
    },
  ],
  notFound: () => [
    {
      status: 404,
      description: 'Resource not found',
    },
  ],
  noContent: () => [
    {
      status: 204,
      description: 'Operation successful',
    },
  ],
  validationError: () => [
    {
      status: 400,
      description: 'Validation failed',
    },
  ],
};
