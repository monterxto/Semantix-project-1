import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";

export interface IScheduleTaskUseCase {
  execute(scheduler: IScheduleTaskDTO): Promise<void>;
}
