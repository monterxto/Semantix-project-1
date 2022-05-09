import { makeDbSchedulerRepository } from "@/main/factories/infra/database/mongodb";
import { makeMessageQueue } from "@/main/factories/infra/broker/redis/bullmq";
import {
  RemoveRepeatableTaskUseCase,
  IRemoveRepeatableTaskUseCase,
} from "@/domain/scheduler/usecases/remove-repeatable-task";

export const makeRemoveRepeatableTaskUseCase = (): IRemoveRepeatableTaskUseCase => {
  const dbSchedulerRepository = makeDbSchedulerRepository();
  const messageQueue = makeMessageQueue();
  return new RemoveRepeatableTaskUseCase(dbSchedulerRepository, messageQueue);
};
