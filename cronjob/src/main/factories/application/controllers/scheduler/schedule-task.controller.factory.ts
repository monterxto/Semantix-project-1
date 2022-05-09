import { Controller } from "@/application/protocols";
import { ScheduleTaskController } from "@/application/controllers/scheduler";
import { makeScheduleTaskUseCase } from "@/main/factories/domain/scheduler";
import { makeSchedulerTaskControllerValidation } from "@/main/factories/application/validation/scheduler";

export const makeScheduleTaskController = (): Controller => {
  const scheduleTaskUseCase = makeScheduleTaskUseCase();
  const scheduleTaskControllerValidation =
    makeSchedulerTaskControllerValidation();
  return new ScheduleTaskController(
    scheduleTaskUseCase,
    scheduleTaskControllerValidation
  );
};
