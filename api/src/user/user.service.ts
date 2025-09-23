import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UsersResponseDto,
} from './dto/user.dto';
import { PaginationMeta } from '../common/interfaces/pagination.interface';
import { formatUserResponse } from '../common/utils/format-user.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Select object for user responses (excludes sensitive data)
  private userSelect = {
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
  };

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { fullName, email, password, phone, bio } = createUserDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, ...(phone ? [{ phone }] : [])],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or phone already exists',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        bio,
        hashedPassword,
      },
      select: this.userSelect,
    });

    return formatUserResponse(user);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return formatUserResponse(user);
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: this.userSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return formatUserResponse(user);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, lastActive: new Date() },
      select: this.userSelect,
    });

    return formatUserResponse(user);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }

  async getAllUsers(page = 1, limit = 10): Promise<UsersResponseDto> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: this.userSelect,
        orderBy: { memberSince: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    return {
      data: users.map(formatUserResponse),
      meta,
    };
  }
}
