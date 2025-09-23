import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { StandardResponseInterceptor } from './common/interceptors/standard-response.interceptor';
import { setupSwagger } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-API-Key',
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  });

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Global response interceptor
  app.useGlobalInterceptors(new StandardResponseInterceptor());

  // Global JWT authentication guard - disabled for now
  // app.useGlobalGuards(new JwtAuthGuard(app.get('Reflector')));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: 422,
    }),
  );

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Setup Swagger documentation
  setupSwagger(app);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`🚀 BADDILHA API is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
