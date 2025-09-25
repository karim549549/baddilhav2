import type {
  AdminUsersResponseDto,
  AdminUserResponseDto,
  AdminStatsDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
  UserSearchDto,
} from "../types/admin.types";

const BASE = "http://localhost:4000/admin";

export const adminApi = {
  getUsers: async (params?: UserSearchDto): Promise<AdminUsersResponseDto> => {
    let qs = "";
    if (params) {
      const entries: [string, string][] = [];
      if (params.search) entries.push(["search", String(params.search)]);
      if (params.role) entries.push(["role", String(params.role)]);
      if (params.verificationStatus)
        entries.push(["verificationStatus", String(params.verificationStatus)]);
      if (params.page !== undefined)
        entries.push(["page", String(params.page)]);
      if (params.limit !== undefined)
        entries.push(["limit", String(params.limit)]);
      if (entries.length) qs = "?" + new URLSearchParams(entries).toString();
    }

    const res = await fetch(`${BASE}/users${qs}`);
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },

  getUserById: async (id: string): Promise<AdminUserResponseDto> => {
    const res = await fetch(`${BASE}/users/${id}`);
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },

  updateUserRole: async (
    id: string,
    payload: UpdateUserRoleDto
  ): Promise<AdminUserResponseDto> => {
    const res = await fetch(`${BASE}/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },

  updateUserStatus: async (
    id: string,
    payload: UpdateUserStatusDto
  ): Promise<AdminUserResponseDto> => {
    const res = await fetch(`${BASE}/users/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },

  suspendUser: async (id: string): Promise<AdminUserResponseDto> => {
    const res = await fetch(`${BASE}/users/${id}/suspend`, { method: "POST" });
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },

  unsuspendUser: async (id: string): Promise<AdminUserResponseDto> => {
    const res = await fetch(`${BASE}/users/${id}/unsuspend`, {
      method: "POST",
    });
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`${BASE}/users/${id}`, { method: "DELETE" });
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },

  getStats: async (): Promise<AdminStatsDto> => {
    const res = await fetch(`${BASE}/stats`);
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return body?.data;
  },
};

export default adminApi;
