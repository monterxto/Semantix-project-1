import { Scheduler } from "@/domain/scheduler/entities";
import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import { IMessageQueue } from "@/domain/@shared/message-queue/message-queue.interface";

export class ScheduleTaskUseCase {
  constructor(
    private schedulerRepository: ISchedulerRepository,
    private messageQueue: IMessageQueue
  ) {}

  async execute(scheduler: IScheduleTaskDTO): Promise<void> {
    await this.schedulerRepository.create(scheduler);
    if (scheduler.enabled) {
      await this.messageQueue.sendMessage(
        scheduler.job,
        scheduler.data,
        scheduler?.repeat
      );
    }
  }
}
