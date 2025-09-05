import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface StandardResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  timestamp: string;
  path: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';
    let errorDetails: any = null;

    // Handle different types of exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || exception.message;
        errorCode = (exceptionResponse as any).error || 'HTTP_EXCEPTION';
      } else {
        message = exception.message;
        errorCode = 'HTTP_EXCEPTION';
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      // Handle Prisma database errors
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Resource already exists';
          errorCode = 'DUPLICATE_ENTRY';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Resource not found';
          errorCode = 'NOT_FOUND';
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Invalid reference';
          errorCode = 'INVALID_REFERENCE';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = 'Database operation failed';
          errorCode = 'DATABASE_ERROR';
          errorDetails = { code: exception.code };
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorCode = 'GENERIC_ERROR';
      errorDetails = { stack: exception.stack };
    }

    // Log the error
    this.logger.error(
      `Exception occurred: ${message}`,
      exception instanceof Error ? exception.stack : 'Unknown error',
      {
        path: request.url,
        method: request.method,
        statusCode: status,
        errorCode,
        timestamp: new Date().toISOString(),
      },
    );

    // Create standard error response
    const errorResponse: StandardResponse = {
      success: false,
      message,
      error: {
        code: errorCode,
        details: errorDetails,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Send response
    response.status(status).json(errorResponse);
  }
}
