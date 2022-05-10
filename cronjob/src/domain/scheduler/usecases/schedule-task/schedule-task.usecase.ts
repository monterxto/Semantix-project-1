import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import { IMessageQueue } from "@/domain/@shared/message-queue/message-queue.interface";
import { IStatusScheduler } from "@/domain/scheduler/types";
import { IJobsOptions } from "@/domain/@shared/message-queue/jobs-options.interface";
import { IScheduleTaskUseCase } from "./schedule-task.usecase.interface";

export class ScheduleTaskUseCase implements IScheduleTaskUseCase {
  constructor(
    private schedulerRepository: ISchedulerRepository,
    private messageQueue: IMessageQueue
  ) {}

  async execute(scheduler: IScheduleTaskDTO): Promise<void> {
    scheduler.status = IStatusScheduler.WAITING;
    let delay;
    let repeat;
    if (scheduler?.delay) {
      delay = new Date(scheduler.delay).getTime() - new Date().getTime();
      scheduler.status = IStatusScheduler.SCHEDULED;
    }
    if (scheduler?.repeat) {
      repeat = scheduler.repeat;
      scheduler.status = IStatusScheduler.REPEATED;
    }
    const scheduled = await this.schedulerRepository.create(scheduler);
    const opts: IJobsOptions = {
      delay,
      repeat,
      jobId: !repeat && scheduled.getId(),
    };
    await this.messageQueue.sendMessage(scheduler.job, scheduler.data, opts);
  }
}
