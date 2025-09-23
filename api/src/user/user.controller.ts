import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UsersResponseDto,
} from './dto/user.dto';
import { ApiController } from '../common/decorators/api-controller.decorator';
import {
  ApiEndpoint,
  CommonResponses,
} from '../common/decorators/api-endpoint.decorator';

@ApiController('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiEndpoint({
    summary: 'Create a new user',
    method: 'POST',
    statusCode: 201,
    useValidation: true,
    useBusinessValidation: true,
    responses: [...CommonResponses.created(UserResponseDto)],
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiEndpoint({
    summary: 'Get all users with pagination',
    method: 'GET',
    responses: [...CommonResponses.ok(UsersResponseDto)],
    queries: [
      { name: 'page', required: false, type: Number, example: 1 },
      { name: 'limit', required: false, type: Number, example: 10 },
    ],
  })
  async getAllUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<UsersResponseDto> {
    return this.userService.getAllUsers(page, limit);
  }

  @Get(':id')
  @ApiEndpoint({
    summary: 'Get user by ID',
    method: 'GET',
    responses: [
      ...CommonResponses.ok(UserResponseDto),
      ...CommonResponses.notFound(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiEndpoint({
    summary: 'Update user by ID',
    method: 'PUT',
    useValidation: true,
    responses: [
      ...CommonResponses.ok(UserResponseDto),
      ...CommonResponses.notFound(),
      ...CommonResponses.validationError(),
    ],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiEndpoint({
    summary: 'Delete user by ID',
    method: 'DELETE',
    statusCode: 204,
    responses: [...CommonResponses.noContent(), ...CommonResponses.notFound()],
    params: [
      { name: 'id', description: 'User ID', example: 'clx1234567890abcdef' },
    ],
  })
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }
}
