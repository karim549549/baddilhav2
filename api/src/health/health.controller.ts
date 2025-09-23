import { Controller, Get } from '@nestjs/common';
import { ApiController } from '../common/decorators/api-controller.decorator';
import { ApiEndpoint } from '../common/decorators/api-endpoint.decorator';

@ApiController('Health')
@Controller()
export class HealthController {
  @Get()
  @ApiEndpoint({
    summary: 'API Health Check',
    method: 'GET',
    responses: [
      {
        status: 200,
        description: 'API is running successfully',
        type: Object,
      },
    ],
  })
  getHealth() {
    return {
      status: 'ok',
      message: 'BADDILHA API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  @Get('health')
  @ApiEndpoint({
    summary: 'Detailed Health Check',
    method: 'GET',
    responses: [
      {
        status: 200,
        description: 'Detailed health information',
        type: Object,
      },
    ],
  })
  getDetailedHealth() {
    return {
      status: 'healthy',
      message: 'BADDILHA API is running smoothly',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      endpoints: {
        docs: '/api/docs',
        users: '/users',
        admin: '/admin',
      },
    };
  }
}
