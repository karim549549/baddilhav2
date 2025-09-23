"use client";

import { useAuthStore as useAuth } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default function AuthStatus() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <User className="w-4 h-4" />
        <span>Not signed in</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 text-white">
        <User className="w-4 h-4" />
        <span className="text-sm">{user.fullName}</span>
        <span className="text-xs text-gray-400">({user.role})</span>
      </div>
      <Button
        onClick={logout}
        variant="outline"
        size="sm"
        className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
      >
        <LogOut className="w-4 h-4 mr-1" />
        Logout
      </Button>
    </div>
  );
}
