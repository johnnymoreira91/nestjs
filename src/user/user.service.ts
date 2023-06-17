import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Permissions } from 'src/permission/entities/permission.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create({ ...createUserDto });
  }

  async findAll() {
    return await this.userRepository.findAll({
      include: [{ model: Permissions, as: 'permission' }],
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(
      { ...updateUserDto },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    return await this.userRepository.destroy({
      where: { id },
    });
  }
}
