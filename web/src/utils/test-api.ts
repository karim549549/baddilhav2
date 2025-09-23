// Simple API connection test
import { fetcher } from "@/lib/fetcher";

export const testApiConnection = async () => {
  try {
    console.log("Testing API connection...");

    // Test basic connectivity
    const response = await fetcher.get("/health");

    if (response.success) {
      console.log("✅ API connection successful:", response.data);
      return true;
    } else {
      console.error("❌ API connection failed:", response.error);
      return false;
    }
  } catch (error) {
    console.error("❌ API connection error:", error);
    return false;
  }
};

// Test signup endpoint specifically
export const testSignupEndpoint = async () => {
  try {
    console.log("Testing signup endpoint...");

    const testData = {
      fullName: "Test User",
      email: "test@example.com",
      password: "TestPassword123!",
    };

    const response = await fetcher.post("/auth/signup", testData);

    if (response.success) {
      console.log("✅ Signup endpoint working:", response.data);
      return true;
    } else {
      console.error("❌ Signup endpoint failed:", response.error);
      return false;
    }
  } catch (error) {
    console.error("❌ Signup endpoint error:", error);
    return false;
  }
};
