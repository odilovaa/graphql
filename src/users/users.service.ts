import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepo.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepo.findOne({ where: { id }});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepo.update({ id }, { ...updateUserDto})
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.userRepo.delete({ id })
    return id;
  }
}
