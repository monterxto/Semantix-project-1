import { Controller } from "@/application/protocols";
import { RemoveRepeatableTaskController } from "@/application/controllers/scheduler";
import { makeRemoveRepeatableTaskUseCase } from "@/main/factories/domain/scheduler";
import { makeRemoveRepeatableTaskControllerValidation } from "@/main/factories/application/validation/scheduler";

export const makeRemoveRepeatableTaskController = (): Controller => {
  const removeRepeatableTaskUseCase = makeRemoveRepeatableTaskUseCase();
  const removeRepeatableTaskControllerValidation =
    makeRemoveRepeatableTaskControllerValidation();
  return new RemoveRepeatableTaskController(
    removeRepeatableTaskUseCase,
    removeRepeatableTaskControllerValidation
  );
};
