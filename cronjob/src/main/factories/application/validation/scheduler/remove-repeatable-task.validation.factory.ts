import { IValidation } from "@/application/protocols";
import { makeRemoveRepeatableTaskValidator } from "@/main/factories/infra/validators/scheduler";
import { adaptClassValidator } from "@/main/adapter/application/validation/class-validator.adapter";

export const makeRemoveRepeatableTaskControllerValidation = (): IValidation => {
  return new adaptClassValidator(makeRemoveRepeatableTaskValidator());
};
