"use client";

import AuthSidebar from "@/components/auth/AuthSidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left Sidebar - 1/4 of screen */}
        <div className="w-1/4 bg-neutral-900">
          <AuthSidebar />
        </div>

        {/* Right Main Area - 3/4 of screen */}
        <div className="w-3/4 bg-neutral-950">{children}</div>
      </div>

      {/* Footer Bar - Bottom of entire screen */}
      <div className="bg-black border-t border-gray-700 py-3">
        <div className="flex justify-center">
          <p className="text-gray-500 text-xs text-center">
            By signing in to the system, you are agreeing to our{" "}
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Privacy Policy
            </a>
            . If you have problems logging in, please reach out to{" "}
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
