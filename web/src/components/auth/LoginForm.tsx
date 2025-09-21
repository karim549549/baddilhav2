"use client";

import { DoorOpen, Mail, Lock, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual authentication logic here
    // For now, just redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <DoorOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="pl-10 bg-black border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 rounded-xs"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-white text-sm font-medium"
              >
                Password <span className="text-red-500">*</span>
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-purple-400 hover:text-purple-300 text-xs underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="pl-10 bg-black border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 rounded-xs"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xs transition-colors flex items-center justify-center"
          >
            Login
            <DoorOpen className="ml-2 h-5 w-5" />
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or</span>
            </div>
          </div>

          {/* Google Provider */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800 hover:text-white py-3 rounded-xs flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* GitHub Provider */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800 hover:text-white py-3 rounded-xs flex items-center justify-center"
          >
            <Github className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>
        </form>

        {/* Toggle to Signup */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-purple-400 hover:text-purple-300 font-medium underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
