import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { IRemoveRepeatableTaskDTO } from "@/domain/scheduler/usecases/remove-repeatable-task/dto";
import { IMessageQueue } from "@/domain/@shared/message-queue/message-queue.interface";
import { IStatusScheduler } from "@/domain/scheduler/types";
import { IRemoveRepeatableTaskUseCase } from "./remove-repeatable-task.usecase.interface";

export class RemoveRepeatableTaskUseCase
  implements IRemoveRepeatableTaskUseCase
{
  constructor(
    private schedulerRepository: ISchedulerRepository,
    private messageQueue: IMessageQueue
  ) {}

  async execute(repeatableTaskDto: IRemoveRepeatableTaskDTO): Promise<void> {
    await this.messageQueue.removeRepeatableMessage(
      repeatableTaskDto.job,
      repeatableTaskDto.repeat
    );
    await this.schedulerRepository.updateByJobAndRepeat(
      repeatableTaskDto.job,
      repeatableTaskDto.repeat,
      { status: IStatusScheduler.FINISHED }
    );
  }
}
