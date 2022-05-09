import { Scheduler } from "@/domain/scheduler/entities";
import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import { IMessageQueue } from "@/domain/@shared/message-queue/message-queue.interface";
import { IRepeatOptions, IStatusScheduler } from "../../types";
import { IJobsOptions } from "@/domain/@shared/message-queue/jobs-options.interface";

export class ScheduleTaskUseCase {
  constructor(
    private schedulerRepository: ISchedulerRepository,
    private messageQueue: IMessageQueue
  ) {}

  async execute(scheduler: IScheduleTaskDTO): Promise<void> {
    scheduler.status = IStatusScheduler.WAITING;
    const opts: IJobsOptions = {};
    if (scheduler?.delay) {
      opts.delay = new Date(scheduler.delay).getTime() - new Date().getTime();
      scheduler.status = IStatusScheduler.SCHEDULED
    }
    if (scheduler?.repeat) {
      opts.repeat = scheduler.repeat;
      scheduler.status = IStatusScheduler.REPEATED;
    }
    await this.schedulerRepository.create(scheduler);
    await this.messageQueue.sendMessage(scheduler.job, scheduler.data, opts);
  }
}
