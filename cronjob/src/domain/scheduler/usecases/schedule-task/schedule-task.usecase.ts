import { Scheduler } from "@/domain/scheduler/entities";
import { ISchedulerRepository } from "@/domain/scheduler/repository/scheduler.repository";
import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";

export class ScheduleTaskUseCase {
  constructor(private schedulerRepository: ISchedulerRepository) {}

  async execute(scheduler: IScheduleTaskDTO): Promise<void> {
    await this.schedulerRepository.create(scheduler);
  }
}