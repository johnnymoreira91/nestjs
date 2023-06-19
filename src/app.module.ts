import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendEmailConsumerService } from './infra/jobs/sendEmailConsumerService';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { SendEmailProducerService } from './infra/jobs/sendEmailProducerService';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'registerUser-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'yvonne.quigley71@ethereal.email',
          pass: 'E9P74J2NwZkceHPNrR',
        },
      },
    }),
    UserModule,
    PermissionModule,
    CronjobsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SendEmailConsumerService],
})
export class AppModule {
  constructor(
    @InjectQueue('registerUser-queue') private registerUserQueue: Queue,
  ) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.registerUserQueue),
    ]);

    consumer.apply(router).forRoutes('/admin/queue');
  }
}
