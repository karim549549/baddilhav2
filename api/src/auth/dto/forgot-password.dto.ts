import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email address to send reset link to',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
}
