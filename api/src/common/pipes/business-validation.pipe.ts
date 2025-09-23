import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class BusinessValidationPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      await this.validateBusinessRules(value, metadata);
    }
    return value;
  }

  private async validateBusinessRules(value: any, metadata: ArgumentMetadata) {
    // Validate email uniqueness for user creation
    if (value.email && metadata.metatype?.name === 'CreateUserDto') {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: value.email },
      });

      if (existingUser) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: ['Email already exists'],
        });
      }
    }

    // Validate phone uniqueness for user creation
    if (value.phone && metadata.metatype?.name === 'CreateUserDto') {
      const existingUser = await this.prisma.user.findUnique({
        where: { phone: value.phone },
      });

      if (existingUser) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: ['Phone number already exists'],
        });
      }
    }

    // Validate admin role changes
    if (value.role && metadata.metatype?.name === 'UpdateUserRoleDto') {
      await this.validateAdminRoleChange(value.role);
    }
  }

  private async validateAdminRoleChange(newRole: Role) {
    if (newRole !== Role.ADMIN) {
      const adminCount = await this.prisma.user.count({
        where: { role: Role.ADMIN },
      });

      if (adminCount <= 1) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: ['Cannot demote the last admin'],
        });
      }
    }
  }
}
