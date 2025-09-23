// Example: How to use the cleaned-up auth store

import { useAuthStore as useAuth } from "@/stores/auth.store";

export function AuthExample() {
  const {
    user, // Current user data
    isAuthenticated, // Boolean auth status
    isLoading, // Loading state
    error, // Error message
    login, // Login function
    signup, // Signup function
    logout, // Logout function
    clearError, // Clear error function
  } = useAuth();

  // Login example
  const handleLogin = async () => {
    try {
      await login("user@example.com", "password123");
      // User is now logged in, redirect or update UI
    } catch (error) {
      // Error is automatically handled by the store
      console.error("Login failed:", error);
    }
  };

  // Signup example
  const handleSignup = async () => {
    try {
      await signup(
        "John Doe",
        "john@example.com",
        "password123",
        "+1234567890",
        "A passionate collector"
      );
      // User is now logged in
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  // Logout example
  const handleLogout = async () => {
    await logout();
    // User is now logged out
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      <p>Role: {user?.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
