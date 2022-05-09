import { makeDbSchedulerRepository } from "@/main/factories/infra/database/mongodb";
import { makeMessageQueue } from "@/main/factories/infra/broker/redis/bullmq";
import {
  ScheduleTaskUseCase,
  IScheduleTaskUseCase,
} from "@/domain/scheduler/usecases/schedule-task";

export const makeScheduleTaskUseCase = (): IScheduleTaskUseCase => {
  const dbAccountRepository = makeDbSchedulerRepository();
  const messageQueue = makeMessageQueue();
  return new ScheduleTaskUseCase(dbAccountRepository, messageQueue);
};
