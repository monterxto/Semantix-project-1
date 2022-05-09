import { Validation } from "@/application/protocols";
import { makeSchedulerTaskValidator } from "@/main/factories/infra/validators/scheduler";
import { adaptClassValidator } from "@/main/adapter/application/validation/class-validator.adapter";

export const makeSchedulerTaskControllerValidation = (): Validation => {
  return new adaptClassValidator(makeSchedulerTaskValidator());
};
