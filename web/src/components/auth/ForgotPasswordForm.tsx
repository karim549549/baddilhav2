import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordForm() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xs transition-colors flex items-center justify-center"
          >
            Send Reset Link
            <Mail className="ml-2 h-5 w-5" />
          </Button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/login"
            className="text-purple-400 hover:text-purple-300 font-medium underline flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
