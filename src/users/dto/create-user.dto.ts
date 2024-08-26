import { IsString, IsEmail, IsOptional, IsDateString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6) // Enforcing minimum length for password for security reasons
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
