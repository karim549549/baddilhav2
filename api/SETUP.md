# BADDILHA API Setup Guide

## 🚀 Quick Start

### 1. Install Required Dependencies

```bash
# Install JWT and Config packages
npm install @nestjs/jwt @nestjs/config

# Install additional auth-related packages
npm install @nestjs/passport passport passport-jwt passport-local
npm install bcryptjs @types/bcryptjs
npm install class-validator class-transformer

# Install Swagger and validation packages
npm install @nestjs/swagger class-validator class-transformer
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.template .env

**Note:** The template file is named `env.template` (without the dot) due to system restrictions. Copy it to `.env` (with the dot) for your local environment.

# Fill in your values:
# - DATABASE_URL (Supabase pooled connection)
# - DIRECT_URL (Supabase direct connection)
# - JWT_ACCESS_SECRET (your secret key)
# - JWT_REFRESH_SECRET (your secret key)
# - JWT_ACCESS_EXPIRATION (default: 15m)
# - JWT_REFRESH_EXPIRATION (default: 7d)
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (if any)
npx prisma migrate dev

# Push schema to database
npx prisma db push
```

### 4. Start Development Server

```bash
npm run start:dev
```

## 🔐 JWT Authentication System

### What We've Built:

1. **`src/constants/jwt.constants.ts`** - Centralized JWT configuration
2. **`src/auth/factories/token.factory.ts`** - Token generation and validation
3. **`src/auth/auth.module.ts`** - Authentication module (ready for JWT)

### Next Steps After Package Installation:

1. **Update `src/auth/auth.module.ts`** with JWT configuration
2. **Create JWT strategies** for access and refresh tokens
3. **Implement auth guards** for protected routes
4. **Add auth decorators** for user context

### JWT Token Flow:

```
User Login → TokenFactory.generateTokenPair() → 
Access Token (15m) + Refresh Token (7d) → 
Client stores both → 
Access token for API calls → 
Refresh token to get new access token
```

## 🛡️ Global Error Handling & Response System

### What We've Built:

1. **`src/common/filters/global-exception.filter.ts`** - Global error handler
2. **`src/common/interceptors/standard-response.interceptor.ts`** - Standard response wrapper

### Features:

- **No Try-Catch Needed** - Global error handling catches all errors
- **Standard Response Format** - All responses follow consistent structure
- **Automatic Error Logging** - Errors are logged with context
- **Prisma Error Handling** - Database errors are properly mapped
- **CORS Enabled** - All origins allowed for development
- **Zero Boilerplate** - No need to inject services or modules

### Response Format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

### Error Response Format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": { ... }
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

## 📚 Swagger Documentation

### Features:

- **Interactive API Docs** - Available at `/api/docs`
- **JWT Authentication** - Bearer token support
- **Request/Response Examples** - Full API documentation
- **Custom Styling** - BADDILHA-branded interface
- **Try It Out** - Test endpoints directly from docs

### Access:

```bash
# After starting the server
http://localhost:3000/api/docs
```

## 🏗️ Architecture Overview

```
src/
├── common/                           # Global utilities
│   ├── filters/
│   │   └── global-exception.filter.ts    # Global error handling
│   └── interceptors/
│       └── standard-response.interceptor.ts # Response standardization
├── config/
│   └── swagger.config.ts                  # Swagger setup
├── constants/
│   └── jwt.constants.ts                   # JWT configuration
├── auth/
│   ├── auth.module.ts                     # Main auth module
│   ├── auth.service.ts                    # Authentication logic
│   ├── auth.controller.ts                 # Auth endpoints
│   ├── factories/
│   │   └── token.factory.ts               # JWT token management
│   ├── strategies/                        # Passport strategies (TODO)
│   ├── guards/                            # Route protection (TODO)
│   └── decorators/                        # User context (TODO)
└── prisma/
    └── schema.prisma                      # Database schema
```

## 🔧 Configuration

### JWT Settings:
- **Access Token**: 15 minutes (configurable)
- **Refresh Token**: 7 days (configurable)
- **Issuer**: baddilha-api
- **Audience**: baddilha-app

### CORS Settings:
- **Origin**: All origins (`*`)
- **Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Headers**: Authorization, Content-Type, etc.
- **Credentials**: Enabled

### Environment Variables:
```bash
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

## 📝 Usage Examples

### Simple Route Handlers (Recommended):
```typescript
@Get()
getData() {
  // This gets automatically wrapped by StandardResponseInterceptor
  return { items: ['item1', 'item2'] };
}
```

### Error Handling:
```typescript
@Get()
getData() {
  // This gets caught by GlobalExceptionFilter
  throw new Error('Something went wrong');
}
```

### No Boilerplate Needed:
- ✅ No service injection required
- ✅ No module imports needed
- ✅ No manual response wrapping
- ✅ Just return your data and go!

## 📝 TODO After Setup

1. **Install packages** (see step 1 above)
2. **Update auth.module.ts** with JWT configuration
3. **Create JWT strategies** for passport
4. **Implement auth guards** for route protection
5. **Add user decorators** for request context
6. **Test authentication flow**
7. **Test error handling** with `/error-demo` endpoint
8. **Test Swagger docs** at `/api/docs`

## 🚨 Important Notes

- **Never commit `.env` files** to version control
- **Use strong, unique secrets** for JWT keys
- **Rotate secrets** in production regularly
- **No try-catch needed** - Global error handling covers everything
- **Standard responses** - All endpoints return consistent format
- **CORS enabled** - Frontend can connect from any origin
- **Swagger docs** - API documentation is automatically generated
