import { SchedulerTaskDTOValidator } from "@/infra/validators/dto/scheduler";

export const makeSchedulerTaskValidator = (): any => {
  return new SchedulerTaskDTOValidator();
};
