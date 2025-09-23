// User API Service
import { fetcher } from "@/lib/fetcher";
import { MessageResponse, User } from "./auth.api"; // Import from auth.api to avoid duplication

// User Types

export interface UpdateUserRequest {
  fullName?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
}

export interface UsersResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// User API Service
export const userApi = {
  // Get all users (with pagination)
  async getUsers(page = 1, limit = 10) {
    return fetcher.get<UsersResponse>(`/users?page=${page}&limit=${limit}`);
  },

  // Get user by ID
  async getUserById(id: string) {
    return fetcher.get<User>(`/users/${id}`);
  },

  // Update user profile
  async updateUser(id: string, data: UpdateUserRequest) {
    return fetcher.put<User>(`/users/${id}`, data);
  },

  // Delete user
  async deleteUser(id: string) {
    return fetcher.delete<MessageResponse>(`/users/${id}`);
  },

  // Update current user profile
  async updateMyProfile(data: UpdateUserRequest) {
    return fetcher.put<User>("/users/profile", data);
  },
};

// Export individual functions for convenience
export const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateMyProfile,
} = userApi;
