import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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
      throw new UnauthorizedException('Invalid email or password');
    }

    const { id, email, username } = user;
    return {
      message: 'Login successful',
      statusCode: 200,
      access_token: this.jwtService.sign({ id, email, username }),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const existingUser = await this.userRepository.findOne({
      where: [{ email: registerDto.email }, { username: registerDto.username }],
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
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

