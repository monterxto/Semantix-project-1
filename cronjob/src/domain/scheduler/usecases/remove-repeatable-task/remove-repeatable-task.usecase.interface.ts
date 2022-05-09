import { IRemoveRepeatableTaskDTO } from "@/domain/scheduler/usecases/remove-repeatable-task/dto";

export interface IRemoveRepeatableTaskUseCase {
  execute(scheduler: IRemoveRepeatableTaskDTO): Promise<void>;
}
