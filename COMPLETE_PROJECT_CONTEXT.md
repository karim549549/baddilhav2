# BADDILHA PROJECT CONTEXT - COMPLETE CODEBASE ANALYSIS

## 🎯 PROJECT VISION

**Baddilha** is a Gen Z-focused item swapping app that uses Tinder-style swiping mechanics for trading games, electronics, and collectibles. Users swipe on items they want and get matched when there's mutual interest.

## 🏗️ ARCHITECTURE OVERVIEW

### **Tech Stack**

- **Mobile**: React Native 0.79.6 + Expo SDK 53 + TypeScript
- **Backend**: NestJS + PostgreSQL + Prisma ORM
- **Web**: Next.js 15 + Tailwind CSS (Universal Link Handler)
- **Deployment**: Render (API) + Vercel (Web) + Expo (Mobile)

### **Project Structure**

```
baddilha/
├── mobile/                 # React Native/Expo app
├── api/                   # NestJS backend API
├── web/                   # Next.js Universal Link Handler
└── PROJECT_CONTEXT.md     # This file
```

## 📱 MOBILE APP DETAILED ANALYSIS

### **App Structure & Navigation**

```
mobile/app/
├── _layout.tsx            # Root layout with auth logic
├── (auth)/                # Authentication screens
│   ├── index.tsx          # Main auth screen (Google button → home)
│   ├── otp-verification.tsx # OTP verification screen
│   ├── phone-input.tsx    # Phone input screen
│   └── _layout.tsx        # Auth layout
├── (tabs)/                # Main tab navigation
│   ├── _layout.tsx        # Tab layout (TypeScript errors)
│   ├── index.tsx          # Main swipe screen
│   ├── explore.tsx        # Search/explore screen
│   ├── likes.tsx          # Likes/matches screen
│   ├── chat.tsx           # Chat screen
│   └── profile.tsx        # Profile screen (with logout/delete)
├── add-item.tsx           # Add item screen
├── chat-detail.tsx        # Chat detail screen
├── create-profile.tsx     # Profile creation
├── user-profile.tsx       # User profile view
└── globals.css            # Global styles
```

### **Components & Services**

```
mobile/
├── components/
│   ├── ItemCard.tsx       # Item card component
│   └── SwiperCard.tsx     # Swiper card component
├── src/
│   ├── services/
│   │   └── api.ts         # Axios client (no auth token)
│   ├── hooks/
│   │   └── useApi.ts      # API hook
│   ├── types/
│   │   ├── user.types.ts  # User types
│   │   └── api.types.ts   # API types
│   └── config/
│       └── env.ts         # Environment config
├── data/
│   └── mockDataNew.ts     # Mock data (12 items, 5 users)
└── utils/
    └── theme.ts           # Theme colors and gradients
```

### **Current Mobile App State**

- ✅ **Working**: Basic navigation, auth flow (simulated), profile screen
- 🚧 **Issues**: TypeScript errors in tab navigation, no dark mode
- ❌ **Missing**: Real authentication, API integration, data persistence

### **Mock Data Available**

- **12 Items**: Gaming, electronics, collectibles, clothing, accessories
- **5 Users**: With ratings, swap counts, avatars
- **Categories**: GAMING, ELECTRONICS, COLLECTIBLES, ACCESSORIES, BOOKS, CLOTHING, SPORTS, OTHER
- **Conditions**: NEW, LIKE_NEW, EXCELLENT, GOOD, FAIR, POOR

## 🔧 BACKEND API DETAILED ANALYSIS

### **API Structure**

```
api/src/
├── main.ts                # App bootstrap with CORS, Swagger, validation
├── app.module.ts          # Main app module
├── auth/
│   ├── auth.controller.ts # OAuth endpoints (Google callback → Vercel)
│   ├── auth.service.ts    # Auth logic
│   ├── strategies/
│   │   └── google.strategy.ts # Google OAuth strategy
│   ├── guards/            # JWT, Google auth guards
│   ├── decorators/        # Public, auth decorators
│   └── services/          # Auth services
├── user/
│   ├── user.controller.ts # User endpoints
│   ├── user.service.ts    # User management
│   └── dto/               # User DTOs
├── common/
│   ├── filters/           # Global exception filter
│   ├── interceptors/      # Response interceptor
│   └── decorators/        # Common decorators
└── prisma/
    └── prisma.service.ts  # Database service
```

### **Database Schema (Prisma)**

```prisma
// Key Models:
- User (with OAuth accounts, location, preferences)
- Item (with photos, categories, conditions)
- SwipeAction (swipe directions: LEFT, RIGHT, UP, DOWN)
- Match (user1, user2, item1, item2, status)
- ChatMessage (text, image, location, system)
- Notification (match, message, new_item, system)
- UserActivity (analytics)
- AppMetrics (app analytics)
```

### **Current API State**

- ✅ **Working**: Basic structure, Swagger docs, validation
- 🚧 **Issues**: Google OAuth complexity, no real data
- ❌ **Missing**: Real authentication, data seeding, core endpoints

## 🌐 WEB APP DETAILED ANALYSIS

### **Web App Structure**

```
web/src/app/
├── page.tsx               # Dashboard with project status
├── debug/
│   └── page.tsx           # Debug info display
└── auth/google/callback/
    └── page.tsx           # Universal link handler
```

### **Current Web App State**

- ✅ **Working**: Dashboard, debug page, OAuth callback handler
- 🚧 **Issues**: OAuth flow not working properly
- ❌ **Missing**: Real OAuth integration, mobile app deep linking

## 🎨 UI/UX DESIGN SYSTEM

### **Current Theme**

- **Primary Colors**: Pink gradient (#FD297B → #FF5864 → #FF655B)
- **UI Colors**: White, gray, black
- **Accent Colors**: Red (NOPE), Green (LIKE), Blue (SUPER LIKE)
- **Icons**: Ionicons, 18px size
- **Tab Bar**: Semi-transparent white background
- **No Dark Mode**: Currently light theme only

### **Swipe Actions**

- **Right Swipe**: Like item, want to swap
- **Left Swipe**: Pass, not interested
- **Up Swipe**: Super Like (limited daily)
- **Down Swipe**: Dislike/block item

## 🚧 CURRENT ISSUES & TECHNICAL DEBT

### **Critical Issues**

1. **TypeScript Errors** - Tab bar button props causing type conflicts
2. **No Dark Mode** - App doesn't support system theme
3. **No Real Auth** - Google button just redirects to home
4. **No Data** - No seeded test user or real data
5. **Deep Linking** - Set up but not working properly

### **Technical Debt**

1. **Google OAuth** - Completely removed, needs replacement
2. **API Integration** - No real API calls, just mock data
3. **State Management** - No global state management
4. **Error Handling** - Basic error handling only
5. **No Error Boundaries** - App crashes on errors

## 📊 CURRENT APP FLOW

### **User Journey**

1. User opens app → Auth screen
2. Clicks "Continue with Google" → Redirects to home (no real auth)
3. Navigates through tabs (swipe, explore, likes, chat, profile)
4. Profile has logout/delete buttons (no real functionality)

### **Data Flow**

- **Mock Data**: 12 items, 5 users in `mockDataNew.ts`
- **No API Calls**: All data is local mock data
- **No Persistence**: Data resets on app restart

## 🎯 IMMEDIATE TODOS

### **High Priority**

1. **Fix TypeScript Errors** - Resolve tab bar button prop conflicts
2. **Add Dark Mode** - Support system theme with proper colors
3. **Seed Test User** - Add test user to database for development
4. **Build Core Features** - Implement swipe, match, chat functionality
5. **Add Simple Auth** - Email/password or phone OTP authentication

### **Medium Priority**

1. **API Integration** - Connect mobile app to backend
2. **State Management** - Add global state management
3. **Error Handling** - Add error boundaries and better error handling
4. **Data Persistence** - Add local storage and sync

### **Low Priority**

1. **Deep Linking** - Fix OAuth deep linking
2. **Analytics** - Add user activity tracking
3. **Push Notifications** - Add notification system
4. **Performance** - Optimize app performance

## 📦 KEY DEPENDENCIES

### **Mobile Dependencies**

```json
{
  "expo": "~53.0.22",
  "expo-linear-gradient": "~14.1.5",
  "expo-web-browser": "~14.2.0",
  "expo-system-ui": "~5.0.11",
  "react-native": "0.79.6",
  "expo-router": "~5.1.5",
  "nativewind": "^4.1.23",
  "react-native-deck-swiper": "^2.0.19"
}
```

### **Backend Dependencies**

```json
{
  "@nestjs/core": "^10.0.0",
  "@nestjs/common": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/jwt": "^10.0.0",
  "@nestjs/passport": "^10.0.0",
  "passport-google-oauth20": "^2.0.0",
  "prisma": "^5.0.0",
  "@prisma/client": "^5.0.0"
}
```

### **Web Dependencies**

```json
{
  "next": "15.0.0",
  "react": "19.0.0",
  "tailwindcss": "^3.0.0"
}
```

## 🔗 DEPLOYMENT STATUS

### **Current Deployments**

- **Mobile**: Expo development build (local development)
- **Backend**: https://baddilhav2.onrender.com (Render)
- **Web**: https://baddilhav2.vercel.app (Vercel)
- **Database**: PostgreSQL on Render

### **Environment Variables**

- **Mobile**: `API_BASE_URL = "https://baddilhav2.onrender.com"`
- **Backend**: `DATABASE_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`
- **Web**: No environment variables needed

## 💡 ARCHITECTURE DECISIONS

### **Why These Choices?**

1. **Expo**: Rapid development, easy deployment, good Gen Z app store presence
2. **NativeWind**: Consistent styling, easy theming changes for future branding
3. **Expo Router**: Modern navigation, file-based routing, good performance
4. **TypeScript**: Type safety, better development experience, easier maintenance
5. **Prisma**: Type-safe database access, easy migrations
6. **NestJS**: Scalable backend architecture, built-in validation, Swagger

### **Future Considerations**

1. **Dark Mode**: Easy to implement with system theme detection
2. **RTL Support**: Arabic language support for Middle East market
3. **Custom Branding**: Easy to change colors and themes
4. **Scalability**: Architecture supports growth

## 🐛 KNOWN BUGS

### **Critical Bugs**

1. Tab bar button TypeScript errors
2. Deep linking not working properly
3. No real authentication flow
4. No data persistence
5. No error boundaries

### **Minor Bugs**

1. Mock data images not loading properly
2. Some UI elements not responsive
3. Navigation transitions could be smoother

## 📋 DEVELOPMENT NOTES

### **User Preferences**

- User prefers direct fixes over explanations
- Performance is a concern (slow terminal processing)
- Prefers working solutions over complex setups
- Wants to focus on core features over OAuth complexity
- Mobile-first development approach

### **Code Quality**

- TypeScript strict mode enabled
- ESLint configured
- Prettier for code formatting
- No `any` types allowed
- Global error handling implemented

### **Testing Strategy**

- No tests currently implemented
- Manual testing only
- Need to add unit tests for critical functions
- Need to add integration tests for API endpoints

## 🚀 NEXT SESSION PRIORITIES

### **Immediate (Next 2 hours)**

1. Fix TypeScript errors in tab navigation
2. Implement dark mode support
3. Seed test user in database
4. Test basic app functionality

### **Short Term (Next week)**

1. Build core swipe functionality
2. Add proper authentication system
3. Connect mobile app to backend API
4. Implement basic matching system

### **Medium Term (Next month)**

1. Add chat functionality
2. Implement item management
3. Add push notifications
4. Optimize performance

---

**Last Updated**: January 2025
**Status**: Ready for new session with complete codebase context
**Next Focus**: Fix TypeScript errors and add dark mode support
