import { IListener } from "@/application/protocols";
import { ChangeTaskStatusListener } from "@/application/listeners/scheduler";
import { makeChangeTaskStatusUseCase } from "@/main/factories/domain/scheduler";

export const makeChangeTaskStatusListener = (): IListener => {
  const changeTaskStatusUseCase = makeChangeTaskStatusUseCase();
  return new ChangeTaskStatusListener(changeTaskStatusUseCase);
};
