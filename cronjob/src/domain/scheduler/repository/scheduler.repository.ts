import { IRepository } from "@/domain/@shared/repository";
import { Scheduler } from "@/domain/scheduler/entities";
import {
  IScheduleTaskDTO
} from "@/domain/scheduler/usecases/schedule-task/dto";

export interface ISchedulerRepository
  extends IRepository<
    Scheduler,
    IScheduleTaskDTO
  > {}
