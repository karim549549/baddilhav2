import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, UserVerificationStatus } from '@prisma/client';
import {
  AdminUserResponseDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
  UserSearchDto,
  AdminStatsDto,
  AdminUsersResponseDto,
} from './dto/admin-user.dto';
import { PaginationMeta } from '../common/interfaces/pagination.interface';
import { formatAdminUserResponse } from '../common/utils/format-user.util';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Admin select object with more data than regular user
  private adminUserSelect = {
    id: true,
    email: true,
    fullName: true,
    avatar: true,
    bio: true,
    phone: true,
    isPhoneVerified: true,
    verificationStatus: true,
    role: true,
    memberSince: true,
    lastActive: true,
    totalItems: true,
    maxDistance: true,
  };

  async getAllUsers(searchDto: UserSearchDto): Promise<AdminUsersResponseDto> {
    const {
      search,
      role,
      verificationStatus,
      page = 1,
      limit = 10,
    } = searchDto;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: {
      OR?: Array<{
        fullName?: { contains: string; mode: 'insensitive' };
        email?: { contains: string; mode: 'insensitive' };
        phone?: { contains: string; mode: 'insensitive' };
      }>;
      role?: Role;
      verificationStatus?: UserVerificationStatus;
    } = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (verificationStatus) {
      where.verificationStatus = verificationStatus;
    }

    // Get users and total count
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: this.adminUserSelect,
        skip,
        take: limit,
        orderBy: { memberSince: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    };

    return {
      data: users.map(formatAdminUserResponse),
      meta,
    };
  }

  async getUserById(id: string): Promise<AdminUserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.adminUserSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return formatAdminUserResponse(user);
  }

  async updateUserRole(
    id: string,
    updateRoleDto: UpdateUserRoleDto,
  ): Promise<AdminUserResponseDto> {
    const { role } = updateRoleDto;
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Prevent demoting the last admin
    if (existingUser.role === Role.ADMIN && role !== Role.ADMIN) {
      const adminCount = await this.prisma.user.count({
        where: { role: Role.ADMIN },
      });
      if (adminCount <= 1) {
        throw new BadRequestException('Cannot demote the last admin');
      }
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: { role },
      select: this.adminUserSelect,
    });

    return formatAdminUserResponse(user);
  }

  async updateUserStatus(
    id: string,
    updateStatusDto: UpdateUserStatusDto,
  ): Promise<AdminUserResponseDto> {
    const { verificationStatus } = updateStatusDto;
    const user = await this.prisma.user.update({
      where: { id },
      data: { verificationStatus },
      select: this.adminUserSelect,
    });

    return formatAdminUserResponse(user);
  }

  async suspendUser(id: string): Promise<AdminUserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        verificationStatus: UserVerificationStatus.REJECTED,
        lastActive: new Date(),
      },
      select: this.adminUserSelect,
    });

    return formatAdminUserResponse(user);
  }

  async unsuspendUser(id: string): Promise<AdminUserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        verificationStatus: UserVerificationStatus.VERIFIED,
        lastActive: new Date(),
      },
      select: this.adminUserSelect,
    });

    return formatAdminUserResponse(user);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Prevent deleting the last admin
    if (existingUser.role === Role.ADMIN) {
      const adminCount = await this.prisma.user.count({
        where: { role: Role.ADMIN },
      });
      if (adminCount <= 1) {
        throw new BadRequestException('Cannot delete the last admin');
      }
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }

  async getAdminStats(): Promise<AdminStatsDto> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      newUsersThisMonth,
      activeUsers,
      usersByRole,
      usersByVerificationStatus,
      totalItems,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({
        where: { memberSince: { gte: startOfMonth } },
      }),
      this.prisma.user.count({
        where: { lastActive: { gte: thirtyDaysAgo } },
      }),
      this.getUsersByRole(),
      this.getUsersByVerificationStatus(),
      this.prisma.item.count(),
    ]);

    const averageItemsPerUser = totalUsers > 0 ? totalItems / totalUsers : 0;

    return {
      totalUsers,
      newUsersThisMonth,
      activeUsers,
      usersByRole,
      usersByVerificationStatus,
      totalItems,
      averageItemsPerUser: Math.round(averageItemsPerUser * 100) / 100,
    };
  }

  private async getUsersByRole(): Promise<Record<string, number>> {
    const result = await this.prisma.user.groupBy({
      by: ['role'],
      _count: { role: true },
    });

    return result.reduce(
      (acc, item) => {
        acc[item.role] = item._count.role;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  private async getUsersByVerificationStatus(): Promise<
    Record<string, number>
  > {
    const result = await this.prisma.user.groupBy({
      by: ['verificationStatus'],
      _count: { verificationStatus: true },
    });

    return result.reduce(
      (acc, item) => {
        acc[item.verificationStatus] = item._count.verificationStatus;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}
