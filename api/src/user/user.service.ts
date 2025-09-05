import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        displayName: createUserDto.displayName || createUserDto.username,
        phone: createUserDto.phoneNumber,
        avatar: createUserDto.avatarUrl,
        bio: createUserDto.bio,
        verificationStatus: createUserDto.verificationStatus || 'UNVERIFIED',
        role: createUserDto.role || 'USER',
        maxDistance: createUserDto.maxDistance || 50.0,
        location: createUserDto.latitude && createUserDto.longitude ? {
          create: {
            latitude: createUserDto.latitude,
            longitude: createUserDto.longitude,
            city: createUserDto.address || 'Unknown',
            country: 'Unknown',
          }
        } : undefined,
        preferences: createUserDto.interestedGames ? {
          create: {
            gamesInterestedIn: createUserDto.interestedGames,
          }
        } : undefined,
        oauthAccounts: createUserDto.oauthProvider && createUserDto.oauthProviderId ? {
          create: {
            provider: createUserDto.oauthProvider,
            providerAccountId: createUserDto.oauthProviderId,
          }
        } : undefined,
      },
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
    });

    return user;
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findUserByUsernameOrEmailOrPhone(
      registerUserDto.username,
      registerUserDto.email,
      registerUserDto.phoneNumber
    );

    if (existingUser) {
      throw new ConflictException('User already exists with this username, email, or phone number');
    }

    const user = await this.prisma.user.create({
      data: {
        username: registerUserDto.username,
        displayName: registerUserDto.displayName || registerUserDto.username,
        phone: registerUserDto.phoneNumber,
        verificationStatus: 'UNVERIFIED',
        role: 'USER',
        oauthAccounts: registerUserDto.oauthProvider && registerUserDto.oauthProviderId ? {
          create: {
            provider: registerUserDto.oauthProvider,
            providerAccountId: registerUserDto.oauthProviderId,
          }
        } : undefined,
      },
      include: {
        oauthAccounts: true,
      },
    });

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
    });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
    });
  }

  async linkOAuthProvider(userId: string, oauthData: {
    provider: string;
    providerId: string;
    accessToken: string;
    refreshToken?: string;
  }): Promise<void> {
    await this.prisma.oAuthAccount.upsert({
      where: {
        provider_providerAccountId: {
          provider: oauthData.provider as any,
          providerAccountId: oauthData.providerId,
        },
      },
      update: {
        accessToken: oauthData.accessToken,
        refreshToken: oauthData.refreshToken,
      },
      create: {
        userId,
        provider: oauthData.provider as any,
        providerAccountId: oauthData.providerId,
        accessToken: oauthData.accessToken,
        refreshToken: oauthData.refreshToken,
      },
    });
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { phone: phoneNumber },
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
    });
  }

  async findUserByUsernameOrEmailOrPhone(
    username?: string,
    email?: string,
    phoneNumber?: string
  ): Promise<User | null> {
    if (!username && !phoneNumber) {
      return null;
    }

    return this.prisma.user.findFirst({
      where: {
        OR: [
          username ? { username } : undefined,
          phoneNumber ? { phone: phoneNumber } : undefined,
        ].filter(Boolean),
      },
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
    });
  }

  async findUserByOAuthProvider(provider: string, providerId: string): Promise<User | null> {
    const oauthAccount = await this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider: provider as any,
          providerAccountId: providerId,
        },
      },
      include: {
        user: {
          include: {
            location: true,
            preferences: true,
            oauthAccounts: true,
          },
        },
      },
    });

    return oauthAccount?.user || null;
  }

  async updateUser(id: string, updateData: Partial<CreateUserDto>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        username: updateData.username,
        displayName: updateData.displayName,
        phone: updateData.phoneNumber,
        avatar: updateData.avatarUrl,
        bio: updateData.bio,
        maxDistance: updateData.maxDistance,
      },
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
    });

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getAllUsers(skip = 0, take = 10): Promise<User[]> {
    return this.prisma.user.findMany({
      skip,
      take,
      include: {
        location: true,
        preferences: true,
        oauthAccounts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUsersCount(): Promise<number> {
    return this.prisma.user.count();
  }
}
