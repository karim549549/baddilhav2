// Auth Store using Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi, User, AuthUser } from "@/api";

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    phone?: string,
    bio?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Helper function to convert AuthUser to User
const convertAuthUserToUser = (authUser: AuthUser): User => ({
  id: authUser.id,
  email: authUser.email,
  fullName: authUser.fullName,
  role: authUser.role,
  verificationStatus: authUser.verificationStatus,
  isPhoneVerified: false,
  memberSince: new Date().toISOString(),
  lastActive: new Date().toISOString(),
});

// Helper function to handle auth success
const handleAuthSuccess = (
  authUser: AuthUser,
  accessToken: string,
  refreshToken: string
) => {
  // Store tokens
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  return {
    user: convertAuthUserToUser(authUser),
    isAuthenticated: true,
    isLoading: false,
    error: null,
  };
};

// Helper function to handle auth error with context-specific messages
const handleAuthError = (
  error: unknown,
  context: "login" | "signup" | "refresh" | "general"
) => {
  let errorMessage = "An unexpected error occurred. Please try again.";

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Context-specific error messages
    switch (context) {
      case "login":
        if (message.includes("401") || message.includes("unauthorized")) {
          errorMessage =
            "Invalid email or password. Please check your credentials.";
        } else if (message.includes("network") || message.includes("fetch")) {
          errorMessage =
            "Unable to connect to the server. Please check your internet connection.";
        } else if (message.includes("timeout")) {
          errorMessage = "Request timed out. Please try again.";
        } else {
          errorMessage =
            "Login failed. Please check your credentials and try again.";
        }
        break;

      case "signup":
        if (message.includes("409") || message.includes("conflict")) {
          errorMessage =
            "This email is already registered. Please use a different email or try logging in.";
        } else if (message.includes("422") || message.includes("validation")) {
          errorMessage =
            "Please check your input. Some fields may be invalid or missing.";
        } else if (message.includes("400") || message.includes("bad request")) {
          errorMessage =
            "Invalid information provided. Please check all fields and try again.";
        } else if (message.includes("network") || message.includes("fetch")) {
          errorMessage =
            "Unable to connect to the server. Please check your internet connection.";
        } else if (message.includes("timeout")) {
          errorMessage = "Request timed out. Please try again.";
        } else if (message.includes("password")) {
          errorMessage =
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
        } else if (message.includes("email")) {
          errorMessage = "Please enter a valid email address.";
        } else if (message.includes("name") || message.includes("fullname")) {
          errorMessage = "Please enter a valid full name.";
        } else {
          // Show the actual error message if it's user-friendly, otherwise show generic message
          errorMessage =
            error.message.includes("HTTP") || error.message.includes("Error:")
              ? "Signup failed. Please check your information and try again."
              : error.message;
        }
        break;

      case "refresh":
        errorMessage = "Session expired. Please log in again.";
        break;

      default:
        errorMessage =
          error.message || "An unexpected error occurred. Please try again.";
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: errorMessage,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.login({ email, password });

          if (response.success) {
            const { accessToken, refreshToken, user: authUser } = response.data;
            set(handleAuthSuccess(authUser, accessToken, refreshToken));
          } else {
            throw new Error(response.error?.message || "Login failed");
          }
        } catch (error) {
          set(handleAuthError(error, "login"));
          throw error;
        }
      },

      signup: async (
        fullName: string,
        email: string,
        password: string,
        phone?: string,
        bio?: string
      ) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.signup({
            fullName,
            email,
            password,
            phone,
            bio,
          });

          if (response.success) {
            const { accessToken, refreshToken, user: authUser } = response.data;
            set(handleAuthSuccess(authUser, accessToken, refreshToken));
          } else {
            // Log the full error for debugging
            console.error("Signup API Error:", response.error);
            throw new Error(response.error?.message || "Signup failed");
          }
        } catch (error) {
          // Log the full error for debugging
          console.error("Signup Error Details:", error);
          set(handleAuthError(error, "signup"));
          throw error;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Clear tokens and user
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      refreshToken: async () => {
        try {
          const refreshTokenValue = localStorage.getItem("refreshToken");
          if (!refreshTokenValue) {
            throw new Error("No refresh token available");
          }

          const response = await authApi.refreshToken({
            refreshToken: refreshTokenValue,
          });

          if (response.success) {
            const {
              accessToken,
              refreshToken: newRefreshToken,
              user: authUser,
            } = response.data;
            set(handleAuthSuccess(authUser, accessToken, newRefreshToken));
          } else {
            throw new Error("Token refresh failed");
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          // Clear tokens and redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
          set(handleAuthError(error, "refresh"));
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize auth state on app start
export const initializeAuth = async () => {
  const { refreshToken, setLoading } = useAuthStore.getState();

  try {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Try to get user profile
      const response = await authApi.getProfile();
      if (response.success) {
        useAuthStore.setState({ user: response.data, isAuthenticated: true });
      } else {
        // Token might be expired, try to refresh
        await refreshToken();
      }
    }
  } catch (error) {
    console.error("Auth initialization failed:", error);
    // Clear invalid tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    useAuthStore.setState(handleAuthError(error, "general"));
  } finally {
    setLoading(false);
  }
};
