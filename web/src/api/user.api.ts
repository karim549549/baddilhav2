// User API - reset placeholders
import type { MessageResponse } from "@/types/auth.types";
import type {
  User,
  UpdateUserRequest,
  UsersResponse,
} from "@/types/user.types";

export const userApi = {
  async getUsers(_page = 1, _limit = 10): Promise<UsersResponse> {
    throw new Error("API client not implemented");
  },
  async getUserById(_id: string): Promise<User> {
    throw new Error("API client not implemented");
  },
  async updateUser(_id: string, _data: UpdateUserRequest): Promise<User> {
    throw new Error("API client not implemented");
  },
  async deleteUser(_id: string): Promise<MessageResponse> {
    throw new Error("API client not implemented");
  },
  async updateMyProfile(_data: UpdateUserRequest): Promise<User> {
    throw new Error("API client not implemented");
  },
};

export const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateMyProfile,
} = userApi;
