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
    if (url.includes("auth/success")) {
      this.handleAuthSuccess(url);
    } else if (url.includes("auth/username")) {
      this.handleUsernameRequired(url);
    }
  };

  private static async handleAuthSuccess(url: string) {
    try {
      const urlObj = new URL(url);
      const tokensParam = urlObj.searchParams.get("tokens");
      const userParam = urlObj.searchParams.get("user");

      if (tokensParam && userParam) {
        const tokens = JSON.parse(decodeURIComponent(tokensParam));
        const user = JSON.parse(decodeURIComponent(userParam));

        console.log("✅ User logged in successfully:", user);
        console.log("🔑 Tokens received:", tokens);

        // TODO: Store tokens in secure storage
        // TODO: Navigate to main app
      }
    } catch (error) {
      console.error("Error handling auth success:", error);
    }
  }

  private static async handleUsernameRequired(url: string) {
    try {
      const urlObj = new URL(url);
      const userParam = urlObj.searchParams.get("user");

      if (userParam) {
        const user = JSON.parse(decodeURIComponent(userParam));

        console.log("👤 New user, requires username:", user);

        // TODO: Navigate to username selection screen
        // TODO: Pass user data to username screen
      }
    } catch (error) {
      console.error("Error handling username required:", error);
    }
  }

  static cleanup() {
    Linking.removeAllListeners("url");
    this.listeners = [];
  }
}
