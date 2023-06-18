import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Permissions } from 'src/permission/entities/permission.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userModel: typeof User,
  ) {}

  async findAll() {
    return await this.userModel.findAll({
      include: [{ model: Permissions, as: 'permission' }],
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({ ...createUserDto });
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel.update(
      { ...updateUserDto },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    return await this.userModel.destroy({
      where: { id },
    });
  }
}
