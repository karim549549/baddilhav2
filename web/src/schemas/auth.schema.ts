import { z } from "zod";

// Signup validation schema matching backend DTO
export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Full name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  email: z.string().email("Please provide a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Note: Types are now imported from @/types/auth.types
