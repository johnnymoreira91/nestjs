import { Module } from '@nestjs/common';
import { AliveTask } from 'src/infra/tasks/alive.task';
import { CronjobsService } from './cronjobs.service';

@Module({
  providers: [CronjobsService, AliveTask],
})
export class CronjobsModule {}
