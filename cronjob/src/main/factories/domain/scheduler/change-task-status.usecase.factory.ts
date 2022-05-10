import { makeDbSchedulerRepository } from "@/main/factories/infra/database/mongodb";
import {
  ChangeTaskStatusUseCase,
  IChangeTaskStatusUseCase,
} from "@/domain/scheduler/usecases/change-task-status";

export const makeChangeTaskStatusUseCase = (): IChangeTaskStatusUseCase => {
  const dbSchedulerRepository = makeDbSchedulerRepository();
  return new ChangeTaskStatusUseCase(dbSchedulerRepository);
};
