import { BadRequestException, Injectable } from '@nestjs/common';
import { CacheService } from 'src/infra/services/cache/CacheService';
import { ICacheService } from 'src/infra/services/cache/ICacheService';
import { Cache } from 'src/utils/enum/Cache';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.create({ ...createUserDto });
    } catch (error) {
      throw new BadRequestException(error.parent.detail);
    }
  }

  async findAll() {
    const key = 'findAll-users';
    try {
      const cache = await this.cacheService.get<User[]>(key, Cache.Users);
      if (!cache) {
        const data = await this.userRepository.findAll();
        await this.cacheService.set(key, JSON.stringify(data), Cache.Users, 30);
        return data;
      } else {
        return cache;
      }
    } catch (error) {}
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.remove(id);
  }
}
