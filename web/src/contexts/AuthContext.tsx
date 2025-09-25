// Auth Context using Zustand Store
import React, { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <>{children}</>;
};

// Re-export the store hook for convenience
export { useAuthStore as useAuth } from "@/stores/auth.store";
