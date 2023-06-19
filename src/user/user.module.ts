import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { userProvider } from './user.providers';
import { UserRepository } from './user.repository';
import { CacheService } from 'src/infra/services/cache/CacheService';
import { SendEmailProducerService } from 'src/infra/jobs/sendEmailProducerService';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'registerUser-queue',
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProvider,
    UserRepository,
    CacheService,
    SendEmailProducerService,
  ],
})
export class UserModule {}
