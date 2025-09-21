# BADDILHA PROJECT CONTEXT

## Project Overview

- **Mobile App**: React Native/Expo app with Tinder-like UI
- **Backend API**: NestJS API deployed on Render
- **Web App**: Next.js Universal Link Handler deployed on Vercel
- **Database**: PostgreSQL with Prisma ORM

## Current Status (January 2025)

### ✅ COMPLETED

1. **Google OAuth Cleanup** - Removed all Google OAuth implementation due to complexity
2. **UI Cleanup** - Simplified auth screens, removed unused packages
3. **Navigation** - Fixed tab bar icons, sizing, and ripple effects
4. **Profile Screen** - Added logout and delete account buttons
5. **Basic App Structure** - Working navigation between screens

### 🚧 CURRENT ISSUES

1. **TypeScript Errors** - Tab bar button props causing type conflicts
2. **No Dark Mode** - App doesn't support system theme
3. **No Real Auth** - Google button just redirects to home
4. **No Data** - No seeded test user or real data

### 📁 KEY FILES

#### Mobile App (`mobile/`)

```
app/
├── (auth)/
│   └── index.tsx          # Auth screen (Google button → home redirect)
├── (tabs)/
│   ├── _layout.tsx        # Tab navigation (TypeScript errors)
│   ├── index.tsx          # Main swipe screen
│   ├── explore.tsx        # Search/explore screen
│   ├── likes.tsx          # Likes/matches screen
│   ├── chat.tsx           # Chat screen
│   └── profile.tsx        # Profile screen (with logout/delete)
└── _layout.tsx            # Root layout

src/
├── services/
│   └── api.ts             # Axios client (no auth token)
├── hooks/
│   └── useApi.ts          # API hook
└── types/
    ├── user.types.ts      # User types
    └── api.types.ts       # API types

package.json               # Dependencies (expo-linear-gradient, expo-web-browser)
app.json                   # Expo config with deep linking
```

#### Backend API (`apiv2/`)

```
src/
├── auth/
│   ├── auth.controller.ts # OAuth endpoints (Google callback → Vercel redirect)
│   ├── auth.service.ts    # Auth logic
│   └── strategies/
│       └── google.strategy.ts # Google OAuth strategy
├── user/
│   └── user.service.ts    # User management
└── main.ts                # App setup with Swagger

prisma/
└── schema.prisma          # Database schema
```

#### Web App (`web/`)

```
src/app/
├── page.tsx               # Dashboard with project status
├── debug/
│   └── page.tsx           # Debug info display
└── auth/google/callback/
    └── page.tsx           # Universal link handler (redirects to mobile app)
```

### 🎯 IMMEDIATE TODOS

1. **Fix TypeScript Errors** - Resolve tab bar button prop conflicts
2. **Add Dark Mode** - Support system theme with proper colors
3. **Seed Test User** - Add test user to database for development
4. **Build Core Features** - Implement swipe, match, chat functionality
5. **Add Simple Auth** - Email/password or phone OTP authentication

### 🔧 TECHNICAL DEBT

1. **Google OAuth** - Completely removed, needs replacement
2. **Deep Linking** - Set up but not working properly
3. **API Integration** - No real API calls, just mock data
4. **State Management** - No global state management
5. **Error Handling** - Basic error handling only

### 📱 CURRENT APP FLOW

1. User opens app → Auth screen
2. Clicks "Continue with Google" → Redirects to home (no real auth)
3. Navigates through tabs (swipe, explore, likes, chat, profile)
4. Profile has logout/delete buttons (no real functionality)

### 🎨 UI THEME

- **Primary Color**: #FD297B (Tinder pink)
- **Background**: White/transparent
- **Icons**: Ionicons, 18px size
- **Tab Bar**: Semi-transparent white background
- **No Dark Mode**: Currently light theme only

### 🚀 NEXT SESSION PRIORITIES

1. Fix TypeScript errors in tab navigation
2. Implement dark mode support
3. Seed test user in database
4. Build core swipe functionality
5. Add proper authentication system

### 📦 KEY DEPENDENCIES

```json
{
  "expo": "~53.0.22",
  "expo-linear-gradient": "~14.1.5",
  "expo-web-browser": "~14.2.0",
  "expo-system-ui": "~5.0.11",
  "react-native": "0.79.6",
  "expo-router": "~5.1.5"
}
```

### 🔗 DEPLOYMENT

- **Mobile**: Expo development build
- **Backend**: https://baddilhav2.onrender.com
- **Web**: https://baddilhav2.vercel.app
- **Database**: PostgreSQL on Render

### 💡 ARCHITECTURE DECISIONS

1. **No Google OAuth** - Too complex, removed for now
2. **Universal Links** - Web app handles OAuth redirects
3. **Expo Router** - File-based routing
4. **Prisma** - Database ORM
5. **Tailwind CSS** - Web app styling
6. **NativeWind** - Mobile app styling

### 🐛 KNOWN BUGS

1. Tab bar button TypeScript errors
2. Deep linking not working properly
3. No real authentication flow
4. No data persistence
5. No error boundaries

### 📋 DEVELOPMENT NOTES

- User prefers direct fixes over explanations
- Performance is a concern (slow terminal processing)
- Prefers working solutions over complex setups
- Wants to focus on core features over OAuth complexity
- Mobile-first development approach

---

**Last Updated**: January 2025
**Status**: Ready for new session with dark mode and core features
