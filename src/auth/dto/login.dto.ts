import { IsString, IsOptional, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  password: string;
}