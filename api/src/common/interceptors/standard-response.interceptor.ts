import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { StandardResponse } from '../filters/global-exception.filter';

@Injectable()
export class StandardResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const now = new Date().toISOString();

    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        const response: StandardResponse<T> = {
          success: true,
          message: 'Operation completed successfully',
          data,
          timestamp: now,
          path: request.url,
        };

        return response;
      }),
    );
  }
}
