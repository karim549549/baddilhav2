"use client";

import { useEffect, useState } from "react";

export default function TestOAuthPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  useEffect(() => {
    addLog("Test OAuth page loaded");

    // Test the OAuth flow
    const testOAuth = async () => {
      try {
        addLog("Testing OAuth flow...");
        const response = await fetch(
          "https://baddilhav2.onrender.com/auth/google"
        );
        addLog(`OAuth response status: ${response.status}`);
        addLog(`OAuth response URL: ${response.url}`);

        if (response.redirected) {
          addLog(`Redirected to: ${response.url}`);
        }
      } catch (error) {
        addLog(`OAuth test error: ${error}`);
      }
    };

    testOAuth();
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-800/50">
          <h1 className="text-3xl font-bold text-white mb-6">🔍 OAuth Test</h1>

          <div className="mb-6">
            <button
              onClick={() =>
                window.open(
                  "https://baddilhav2.onrender.com/auth/google",
                  "_blank"
                )
              }
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Test OAuth Flow
            </button>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-4">Test Logs:</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-sm text-white/80 font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <a href="/debug" className="text-blue-400 hover:text-blue-300">
              View Debug Info →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
