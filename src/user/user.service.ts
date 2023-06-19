import { BadRequestException, Injectable } from '@nestjs/common';
import { CacheService } from 'src/infra/services/cache/CacheService';
import { Cache } from 'src/utils/enum/Cache';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailProducerService } from 'src/infra/jobs/sendEmailProducerService';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly mailService: SendEmailProducerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.userRepository.create({ ...createUserDto });

      await this.mailService.sendEmail(createUserDto);

      return data;
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
