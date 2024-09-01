import { IsString, IsEmail, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

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

  @IsString() 
  @IsNotEmpty()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}