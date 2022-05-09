import { Validation } from "@/application/protocols";
import { makeRemoveRepeatableTaskValidator } from "@/main/factories/infra/validators/scheduler";
import { adaptClassValidator } from "@/main/adapter/application/validation/class-validator.adapter";

export const makeRemoveRepeatableTaskControllerValidation = (): Validation => {
  return new adaptClassValidator(makeRemoveRepeatableTaskValidator());
};
