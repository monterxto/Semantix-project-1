import { RemoveRepeatableTaskDTOValidator } from "@/infra/validators/dto/scheduler";

export const makeRemoveRepeatableTaskValidator = (): any => {
  return new RemoveRepeatableTaskDTOValidator();
};
