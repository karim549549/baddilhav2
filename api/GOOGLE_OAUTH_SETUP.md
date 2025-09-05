# Google OAuth Setup Guide

## Dependencies to Install

```bash
npm install @nestjs/passport passport passport-google-oauth20
npm install --save-dev @types/passport-google-oauth20
```

## Environment Variables

Add these to your `.env` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Select "Web application"
6. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
7. Copy Client ID and Client Secret to your `.env` file

## API Endpoints

- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Handle OAuth callback

## Usage

1. User visits `/auth/google`
2. Redirected to Google OAuth consent screen
3. After consent, redirected to `/auth/google/callback`
4. User is created/authenticated and JWT tokens are returned

## Mobile App Integration

For mobile apps, you'll need to:
1. Use deep links for the callback URL
2. Handle the OAuth flow in the mobile app
3. Send the authorization code to your backend
