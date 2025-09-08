"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<string>("No debug info found");

  useEffect(() => {
    // Test localStorage first
    try {
      localStorage.setItem("test", "localStorage works");
      localStorage.removeItem("test");

      // Get debug info from localStorage
      const stored = localStorage.getItem("baddilha_oauth_debug");
      if (stored) {
        setDebugInfo(stored);
      } else {
        setDebugInfo(
          "No debug info found in localStorage. Test OAuth flow to generate debug info."
        );
      }
    } catch (error) {
      setDebugInfo(`localStorage error: ${error}`);
    }
  }, []);

  const clearDebugInfo = () => {
    localStorage.removeItem("baddilha_oauth_debug");
    setDebugInfo("Debug info cleared");
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-800/50">
          {/* Header */}
          <div className="mb-8">
            <div className="text-4xl font-bold text-white mb-2">🔍</div>
            <div className="text-2xl font-bold text-white mb-2">
              BADDILHA DEBUG
            </div>
            <div className="text-white/60">OAuth Debug Information</div>
          </div>

          {/* Debug Info */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Debug Information
              </h2>
              <button
                onClick={clearDebugInfo}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              >
                Clear Debug Info
              </button>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
              <pre className="text-sm text-white/80 whitespace-pre-wrap break-all overflow-auto max-h-96">
                {debugInfo}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-blue-400 mb-3">
              How to Use:
            </h3>
            <ol className="text-white/80 space-y-2 text-sm">
              <li>1. Test Google OAuth on your Android phone</li>
              <li>
                2. The callback page will store debug info in localStorage
              </li>
              <li>3. Come back to this page to see the debug information</li>
              <li>
                4. Look for the &quot;allParams&quot; section to see what the
                backend sent
              </li>
            </ol>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/auth/google/callback"
              className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700/50 text-white text-center transition-colors"
            >
              <div className="text-lg font-bold mb-2">🔄</div>
              <div>OAuth Callback</div>
            </Link>
            <Link
              href="/"
              className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700/50 text-white text-center transition-colors"
            >
              <div className="text-lg font-bold mb-2">🏠</div>
              <div>Home</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
