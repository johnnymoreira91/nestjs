import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
class SendEmailProducerService {
  constructor(
    @InjectQueue('registerUser-queue') private registerUserQueue: Queue,
  ) {}

  async sendEmail(user: CreateUserDto) {
    await this.registerUserQueue.add('registerUser-job', user, {
      attempts: 2,
    });
  }
}

export { SendEmailProducerService };
