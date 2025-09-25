import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'SecurePassword123!',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
