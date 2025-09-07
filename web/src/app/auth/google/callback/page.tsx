"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function GoogleCallback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the OAuth result from URL parameters
    const type = searchParams.get("type");
    const tokens = searchParams.get("tokens");
    const user = searchParams.get("user");

    if (type === "success" && tokens && user) {
      // Existing user - redirect with tokens
      const deepLinkUrl = `baddilha://auth/success?tokens=${tokens}&user=${user}`;
      window.location.href = deepLinkUrl;
    } else if (type === "username" && user) {
      // New user - redirect to username selection
      const deepLinkUrl = `baddilha://auth/username?user=${user}`;
      window.location.href = deepLinkUrl;
    } else {
      // Error case
      const deepLinkUrl = "baddilha://auth/error";
      window.location.href = deepLinkUrl;
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-4">
        <div className="text-4xl font-bold mb-4 text-gray-800">🔄 BADDILHA</div>
        <div className="text-lg mb-6 text-gray-600">Redirecting to app...</div>
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
