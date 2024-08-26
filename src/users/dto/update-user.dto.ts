import { IsString, IsEmail, IsOptional, IsDateString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Username must be at least 1 character long' })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
