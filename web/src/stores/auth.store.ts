// Minimal Auth Store (reset for rebuild)
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/api/auth.api";
import type { AuthResponse } from "@/types/auth.types";
import type { User } from "@/types/user.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res: AuthResponse = await authApi.login({ email, password });
          // persist tokens
          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
          }
          set({
            user: res.user as User,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: unknown) {
          const message =
            typeof err === "object" && err !== null && "message" in err
              ? String((err as { message?: unknown }).message)
              : "Login failed";
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      signup: async (fullName: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res: AuthResponse = await authApi.signup({
            fullName,
            email,
            password,
          });
          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
          }
          set({
            user: res.user as User,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: unknown) {
          const message =
            typeof err === "object" && err !== null && "message" in err
              ? String((err as { message?: unknown }).message)
              : "Signup failed";
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      logout: () => {
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
      },

      clearError: () => set({ error: null }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    { name: "auth-storage" }
  )
);
/*
export const initializeAuth = async () => {
  if (typeof window === "undefined") return;
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return;

  try {
    const res = await authApi.refreshToken({ refreshToken });
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    // hydrate the store
    useAuthStore.setState({
      user: res.user as User,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  } catch {
    // token invalid, clear storage and reset store
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }
};*/
