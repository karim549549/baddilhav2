import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
} from "@/types/auth.types";
export const authApi = {
  async login(_credentials: LoginRequest): Promise<AuthResponse> {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_credentials),
    });
    const result = await res.json();
    return result.data;
  },
  async signup(_userData: SignupRequest): Promise<AuthResponse> {
    const res = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_userData),
    });
    const result = await res.json();
    return result.data;
  },
};

export const { login, signup } = authApi;
