import { IRepository } from "@/domain/@shared/repository";
import { Scheduler } from "@/domain/scheduler/entities";
import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import { IRepeatOptions } from "../types";
import { IRemoveRepeatableTaskDTO } from "../usecases/remove-repeatable-task/dto";

export interface ISchedulerRepository
  extends IRepository<Scheduler, IScheduleTaskDTO | IRemoveRepeatableTaskDTO> {
  updateByJobAndRepeat(
    job: string,
    repeat: IRepeatOptions,
    data: Partial<IScheduleTaskDTO>
  ): Promise<void>;
}
