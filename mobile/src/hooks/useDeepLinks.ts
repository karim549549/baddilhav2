import { useEffect } from "react";
import { DeepLinkService } from "../services/deepLink.service";

export function useDeepLinks() {
  useEffect(() => {
    // Initialize deep link handling
    DeepLinkService.initialize();

    // Cleanup on unmount
    return () => {
      DeepLinkService.cleanup();
    };
  }, []);
}
