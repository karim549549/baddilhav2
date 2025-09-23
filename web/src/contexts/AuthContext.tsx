// Auth Context using Zustand Store
import React, { useEffect, ReactNode } from "react";
import { initializeAuth } from "@/stores/auth.store";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
};

// Re-export the store hook for convenience
export { useAuthStore as useAuth } from "@/stores/auth.store";
