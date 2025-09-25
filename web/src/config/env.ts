// Environment Configuration
export const env = {
  // API Configuration
  API_URL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000" ||
    "https://baddilhav2.onrender.com/",

  // App Configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Baddilha",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000",

  // Environment
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  // OAuth Configuration
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
} as const;
