import { IsString, IsEmail, IsOptional, IsDate, IsNotEmpty, IsDateString } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  sex: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}