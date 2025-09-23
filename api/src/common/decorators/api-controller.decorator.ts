import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

export function ApiController(tag: string, useAuth = false) {
  const decorators = [ApiTags(tag)];

  if (useAuth) {
    decorators.push(ApiBearerAuth('JWT-auth'));
  }

  return applyDecorators(...decorators);
}
