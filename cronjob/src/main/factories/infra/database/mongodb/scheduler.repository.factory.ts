import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { SchedulerRepository } from '@/infra/database/mongodb/repositories/scheduler.repository';

export const makeDbSchedulerRepository = (): ISchedulerRepository => {
  return new SchedulerRepository();
};
