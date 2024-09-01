import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username }
    });
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }
  
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });
    if (existingUserByEmail) {
      throw new Error('Email already exists');
    }
  
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(user);
  }
  

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const password = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = password;
    }
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async setIsActive(id: number): Promise<User> {
    await this.userRepository.update(id, { is_active: true });
    return this.userRepository.findOne({ where: { id } });
  }
}
