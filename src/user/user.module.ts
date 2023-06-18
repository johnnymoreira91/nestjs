import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { userProvider } from './user.providers';
import { UserRepository } from './user.repository';
import { CacheService } from 'src/infra/services/cache/CacheService';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider, UserRepository, CacheService],
})
export class UserModule {}
