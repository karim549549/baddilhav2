import { Linking } from "react-native";
import { AuthService } from "./auth.service";
export class DeepLinkService {
  private static listeners: ((url: string) => void)[] = [];

  static initialize() {
    // Handle deep links when app is already open
    Linking.addEventListener("url", this.handleDeepLink);

    // Handle deep links when app is opened from closed state
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleDeepLink({ url });
      }
    });
  }

  static addListener(callback: (url: string) => void) {
    this.listeners.push(callback);
  }

  static removeListener(callback: (url: string) => void) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  private static handleDeepLink = (event: { url: string }) => {
    const { url } = event;
    console.log("Deep link received:", url);

    // Notify all listeners
    this.listeners.forEach((listener) => listener(url));

    // Handle specific deep link patterns
    if (url.includes("auth/google/callback")) {
      this.handleGoogleAuthCallback(url);
    }
  };

  private static async handleGoogleAuthCallback(url: string) {
    try {
      // For now, we'll call the backend to get the OAuth result
      // In a real implementation, you might pass the auth code in the URL
      const result = await AuthService.handleGoogleCallback();

      // Handle the result (login or registration)
      if ("requiresUsername" in result) {
        // New user - needs username selection
        console.log("New user, requires username:", result.user);
        // TODO: Navigate to username selection screen
      } else {
        // Existing user - logged in successfully
        console.log("User logged in:", result.user);
        // TODO: Store tokens and navigate to main app
      }
    } catch (error) {
      console.error("Error handling Google auth callback:", error);
    }
  }

  static cleanup() {
    Linking.removeAllListeners("url");
    this.listeners = [];
  }
}
