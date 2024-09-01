import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: [{ email: loginDto.email }, { username: loginDto.username }],
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      return 'Invalid email or password'
    }

    const { id, email, username } = user;
    return {
      access_token: this.jwtService.sign({ id, email, username }),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const existingUser = await this.userRepository.findOne({
      where: [{ email: registerDto.email }, { username: registerDto.username }],
    });

    if (existingUser) {
      return 'User with that email already exists';
    }

    const dateOfBirth = new Date(registerDto.dateOfBirth);
    if (isNaN(dateOfBirth.getTime())) {
      return {
        statusCode: 400,
        message: 'Invalid date format for dateOfBirth',
      };
    }

    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      dateOfBirth: new Date(registerDto.dateOfBirth).toISOString(),
    });

    await this.userRepository.save(newUser);
    return this.login({ email: newUser.email, password: registerDto.password });
  }
}

