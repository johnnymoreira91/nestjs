import {
  Processor,
  Process,
  OnQueueCompleted,
  OnQueueProgress,
  OnQueueActive,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('registerUser-queue')
class SendEmailConsumerService {
  constructor(private readonly mailService: MailerService) {}

  @Process('registerUser-job')
  async sendEmailJob(job: Job<CreateUserDto>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Help Desk <helpdesk@it.com>',
      subject: 'User Registration',
      text: `Welcame ${data.name} to out server`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Queue Completed: ${job.name}`);
  }

  @OnQueueProgress()
  onProgress(job: Job) {
    console.log(`Running queue: ${job.name}`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    console.log(`Faled queue: ${job.name}`);
  }
}

export { SendEmailConsumerService };
