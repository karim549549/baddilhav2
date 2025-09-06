import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new user',
    description: 'Create a new user with all required information'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User created successfully' },
        data: { $ref: '#/components/schemas/User' }
      }
    }
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all users',
    description: 'Get a paginated list of all users'
  })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Number of users to skip' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Number of users to take' })
  @ApiResponse({ 
    status: 200, 
    description: 'Users retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Users retrieved successfully' },
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/User' }
        }
      }
    }
  })
  async getAllUsers(
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ): Promise<User[]> {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 10;
    return this.userService.getAllUsers(skipNum, takeNum);
  }

  @Get('count')
  @ApiOperation({ 
    summary: 'Get users count',
    description: 'Get the total number of users'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Users count retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Users count retrieved successfully' },
        data: { type: 'number', example: 150 }
      }
    }
  })
  async getUsersCount(): Promise<number> {
    return this.userService.getUsersCount();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get user by ID',
    description: 'Get a specific user by their ID'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User retrieved successfully' },
        data: { $ref: '#/components/schemas/User' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  @Get('username/:username')
  @ApiOperation({ 
    summary: 'Get user by username',
    description: 'Get a specific user by their username'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User retrieved successfully' },
        data: { $ref: '#/components/schemas/User' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByUsername(@Param('username') username: string): Promise<User | null> {
    return this.userService.findUserByUsername(username);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update user',
    description: 'Update user information'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User updated successfully' },
        data: { $ref: '#/components/schemas/User' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'User already exists with this data' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateUserDto>
  ): Promise<User> {
    return this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete user',
    description: 'Delete a user by their ID'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User deleted successfully' },
        data: { type: 'object', example: {} }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
