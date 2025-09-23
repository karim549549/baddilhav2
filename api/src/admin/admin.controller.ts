import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import {
  AdminUserResponseDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
  UserSearchDto,
  AdminStatsDto,
  AdminUsersResponseDto,
} from './dto/admin-user.dto';
import { ApiController } from '../common/decorators/api-controller.decorator';
import {
  ApiEndpoint,
  CommonResponses,
} from '../common/decorators/api-endpoint.decorator';

@ApiController('Admin', true)
@Controller('admin')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiEndpoint({
    summary: 'Get all users with search and filters (Admin only)',
    method: 'GET',
    isAdmin: true,
    useValidation: true,
    responses: [...CommonResponses.ok(AdminUsersResponseDto)],
    queries: [
      { name: 'search', required: false, type: String, example: 'john' },
      { name: 'role', required: false, enum: Role, example: 'USER' },
      {
        name: 'verificationStatus',
        required: false,
        enum: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'],
        example: 'VERIFIED',
      },
      { name: 'page', required: false, type: Number, example: 1 },
      { name: 'limit', required: false, type: Number, example: 10 },
    ],
  })
  async getAllUsers(
    @Query() searchDto: UserSearchDto,
  ): Promise<AdminUsersResponseDto> {
    return this.adminService.getAllUsers(searchDto);
  }

  @Get('users/:id')
  @ApiEndpoint({
    summary: 'Get user by ID (Admin only)',
    method: 'GET',
    isAdmin: true,
    responses: [
      ...CommonResponses.ok(AdminUserResponseDto),
      ...CommonResponses.notFound(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async getUserById(@Param('id') id: string): Promise<AdminUserResponseDto> {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id/role')
  @ApiEndpoint({
    summary: 'Update user role (Admin only)',
    method: 'PATCH',
    isAdmin: true,
    useValidation: true,
    useBusinessValidation: true,
    responses: [
      ...CommonResponses.ok(AdminUserResponseDto),
      ...CommonResponses.validationError(),
      ...CommonResponses.notFound(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateUserRoleDto,
  ): Promise<AdminUserResponseDto> {
    return this.adminService.updateUserRole(id, updateRoleDto);
  }

  @Patch('users/:id/status')
  @ApiEndpoint({
    summary: 'Update user verification status (Admin only)',
    method: 'PATCH',
    isAdmin: true,
    useValidation: true,
    responses: [
      ...CommonResponses.ok(AdminUserResponseDto),
      ...CommonResponses.validationError(),
      ...CommonResponses.notFound(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async updateUserStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateUserStatusDto,
  ): Promise<AdminUserResponseDto> {
    return this.adminService.updateUserStatus(id, updateStatusDto);
  }

  @Post('users/:id/suspend')
  @ApiEndpoint({
    summary: 'Suspend user (Admin only)',
    method: 'POST',
    isAdmin: true,
    responses: [
      ...CommonResponses.ok(AdminUserResponseDto),
      ...CommonResponses.notFound(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async suspendUser(@Param('id') id: string): Promise<AdminUserResponseDto> {
    return this.adminService.suspendUser(id);
  }

  @Post('users/:id/unsuspend')
  @ApiEndpoint({
    summary: 'Unsuspend user (Admin only)',
    method: 'POST',
    isAdmin: true,
    responses: [
      ...CommonResponses.ok(AdminUserResponseDto),
      ...CommonResponses.notFound(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async unsuspendUser(@Param('id') id: string): Promise<AdminUserResponseDto> {
    return this.adminService.unsuspendUser(id);
  }

  @Delete('users/:id')
  @ApiEndpoint({
    summary: 'Delete user (Admin only)',
    method: 'DELETE',
    isAdmin: true,
    useBusinessValidation: true,
    responses: [
      ...CommonResponses.ok({ message: 'User deleted successfully' }),
      ...CommonResponses.notFound(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.adminService.deleteUser(id);
  }

  @Get('stats')
  @ApiEndpoint({
    summary: 'Get admin statistics (Admin only)',
    method: 'GET',
    isAdmin: true,
    responses: [...CommonResponses.ok(AdminStatsDto)],
  })
  async getAdminStats(): Promise<AdminStatsDto> {
    return this.adminService.getAdminStats();
  }
}
