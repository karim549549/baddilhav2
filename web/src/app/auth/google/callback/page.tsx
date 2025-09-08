"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function GoogleCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
          <div className="bg-gray-900/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl text-center max-w-lg mx-4 border border-gray-800/50">
            <div className="text-6xl font-bold text-white mb-2">🔄</div>
            <div className="text-2xl font-bold text-white mb-8">BADDILHA</div>
            <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}

function CallbackContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the OAuth result from URL parameters
    const type = searchParams.get("type");
    const tokens = searchParams.get("tokens");
    const user = searchParams.get("user");

    // Debug: Log all parameters
    const debugInfo = {
      type,
      tokens: tokens ? "present" : "missing",
      user: user ? "present" : "missing",
      allParams: Object.fromEntries(searchParams.entries()),
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    console.log("🔍 Callback parameters:", debugInfo);

    // Store debug info globally in localStorage
    localStorage.setItem(
      "baddilha_oauth_debug",
      JSON.stringify(debugInfo, null, 2)
    );

    // Also show on page for debugging
    const debugElement = document.getElementById("debug-info");
    if (debugElement) {
      debugElement.textContent = JSON.stringify(debugInfo, null, 2);
    }

    // Add delay to see debug info
    setTimeout(() => {
      if (type === "success" && tokens && user) {
        // Existing user - redirect with tokens
        const deepLinkUrl = `baddilha://auth/success?tokens=${tokens}&user=${user}`;
        window.location.href = deepLinkUrl;
      } else if (type === "username" && user) {
        // New user - redirect to username selection
        const deepLinkUrl = `baddilha://auth/username?user=${user}`;
        window.location.href = deepLinkUrl;
      } else {
        // Error case - pass error information
        const error = searchParams.get("error") || "unknown_error";
        const errorDescription =
          searchParams.get("error_description") || "Authentication failed";
        const message =
          searchParams.get("message") || "No additional details available";

        const deepLinkUrl = `baddilha://auth/error?error=${encodeURIComponent(
          error
        )}&error_description=${encodeURIComponent(
          errorDescription
        )}&message=${encodeURIComponent(message)}`;
        window.location.href = deepLinkUrl;
      }
    }, 10000); // 3 second delay
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl text-center max-w-lg mx-4 border border-gray-800/50">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-white mb-2">🔄</div>
          <div className="text-2xl font-bold text-white">BADDILHA</div>
        </div>

        {/* Status */}
        <div className="mb-8">
          <div className="text-xl text-white/90 mb-2">
            Redirecting to app...
          </div>
          <div className="text-sm text-white/60">
            Please wait while we complete authentication
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="space-y-3 text-left">
          <div className="flex items-center text-white/80">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm">OAuth authentication completed</span>
          </div>
          <div className="flex items-center text-white/80">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm">Redirecting to mobile app...</span>
          </div>
          <div className="flex items-center text-white/60">
            <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
            <span className="text-sm">Opening Baddilha app</span>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <div className="text-xs text-white/60 mb-2">Debug Info:</div>
          <pre
            id="debug-info"
            className="text-xs text-white/80 whitespace-pre-wrap break-all"
          >
            Loading...
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800/50">
          <div className="text-xs text-white/40">
            If the app doesn&apos;t open automatically, check your device
          </div>
        </div>
      </div>
    </div>
  );
}
