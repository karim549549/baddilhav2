import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { Request, Response } from 'express';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('🎮 BADDILHA API')
    .setDescription(
      '**The ultimate item swapping platform for gamers!** 🚀\n\n' +
        'Trade your gaming items with other players in a secure, fun, and easy-to-use platform. ' +
        'Connect with fellow gamers, discover rare items, and build your perfect gaming collection.\n\n' +
        '## Features\n' +
        '- 🔐 **Secure Authentication** - OAuth & Phone verification\n' +
        '- 🎯 **Smart Matching** - AI-powered item recommendations\n' +
        '- 💬 **Real-time Chat** - Connect with other traders\n' +
        '- 📱 **Mobile-First** - Optimized for mobile gaming\n' +
        '- 🛡️ **Safe Trading** - Secure transaction system\n\n' +
        '## Getting Started\n' +
        '1. Register with your preferred OAuth provider or phone number\n' +
        '2. Add your gaming items to your collection\n' +
        '3. Start swiping and matching with other players\n' +
        '4. Chat and arrange trades safely\n\n' +
        '**Happy Trading! 🎮✨**',
    )
    .setVersion('1.0.0')
    .setContact(
      'BADDILHA Team',
      'https://github.com/baddilha',
      'hello@baddilha.com',
    )
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for references
    )
    .addServer('http://localhost:3000', 'Development server')
    .addServer('https://api.baddilha.com', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Customize Swagger UI with BADDILHA theme
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showRequestHeaders: true,
      docExpansion: 'none',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      tryItOutEnabled: true,
      requestInterceptor: (request: Request) => {
        // Add any custom request processing here
        return request;
      },
      responseInterceptor: (response: Response) => {
        // Add any custom response processing here
        return response;
      },
    },

    customSiteTitle: 'BADDILHA API Documentation',
    customfavIcon: '/favicon.ico',
  });

  console.log(
    '📚 Swagger documentation available at: http://localhost:3000/api/docs',
  );
}
