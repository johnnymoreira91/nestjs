import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry, CronExpression } from '@nestjs/schedule';
import { AliveTask } from 'src/infra/tasks/alive.task';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger('AliveTask.name');

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly aliveTask: AliveTask,
  ) {}

  handleAlive() {
    this.aliveTask.handleCron();
  }

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the current second is 45');
  // }

  // @Cron('0 * * * * *')
  // @Cron(CronExpression.EVERY_5_SECONDS, { name: 'takingOrders' })
  // openForBusiness() {
  //   console.log('Delicious cakes is open for business...');
  //   const takingOrdersJob = this.schedulerRegistry.getCronJob('takingOrders');
  //   takingOrdersJob.start();
  // }

  // @Cron(CronExpression.EVERY_5_SECONDS, { name: 'takingOrders' })
  // takingOrders() {
  //   console.log('Delicious cakes is still taking orders');
  // }

  // @Cron('40,45 * * * * *')
  // closingSoon() {
  //   console.log('Delicious cakes will be closing soon');
  // }

  // @Cron('50 * * * * *')
  // closed() {
  //   const takingOrdersJob = this.schedulerRegistry.getCronJob('takingOrders');
  //   takingOrdersJob.stop();
  //   console.log('Delicious cakes is closed for the day');
  //   console.log('');
  // }
}
