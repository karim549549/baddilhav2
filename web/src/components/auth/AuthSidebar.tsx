import { Zap, Users, Plug, Settings } from "lucide-react";
import AuthLogo from "./AuthLogo";

export default function AuthSidebar() {
  const features = [
    {
      number: 1,
      title: "Enter credentials",
    },
    {
      number: 2,
      title: "Verify account",
    },
    {
      number: 3,
      title: "Access dashboard",
    },
    {
      number: 4,
      title: "Manage system",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <AuthLogo />
      </div>

      {/* Features List */}
      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-neutral-800 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Quick Access</h3>
            <p className="text-gray-400 text-sm">
              Sign in to access your admin dashboard and manage your Baddilha
              system.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-300">
                Secure authentication
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-300">
                Admin dashboard access
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-300">System management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-6 p-4 bg-neutral-900 rounded-lg">
        <blockquote className="text-gray-300 text-xs italic mb-3">
          &quot;Baddilha has amazing features with the best solution.&quot;
        </blockquote>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-neutral-950 font-semibold text-xs">JW</span>
          </div>
          <div>
            <p className="font-semibold text-white text-xs">Jhon Wicz</p>
            <p className="text-gray-400 text-xs">CEO of Maospati Airways</p>
          </div>
        </div>
      </div>
    </div>
  );
}
