import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { ITaskDTO } from "./dto";
import { IChangeTaskStatusUseCase } from "./change-task-status.usecase.interface";

export class ChangeTaskStatusUseCase implements IChangeTaskStatusUseCase {
  constructor(private schedulerRepository: ISchedulerRepository) {}

  async execute(task: ITaskDTO): Promise<void> {
    await this.schedulerRepository.update(task.jobId, {
      status: task.status,
    });
  }
}
