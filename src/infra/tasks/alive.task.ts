import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AliveTask {
  private readonly logger = new Logger(AliveTask.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug(
      'To see if the application is alive in current second is 45',
    );
  }
}
