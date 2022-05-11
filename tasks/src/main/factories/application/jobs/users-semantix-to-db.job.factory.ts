import { IJob } from "@/application/protocols";
import { UsersSemantixToDbJob } from "@/application/jobs";
import { makeUsersSemantixToDbUseCase } from "@/main/factories/domain/user";

export const makeUsersSemantixToDbJob = (): IJob => {
  const usersSemantixToDbUseCase = makeUsersSemantixToDbUseCase();
  return new UsersSemantixToDbJob(usersSemantixToDbUseCase);
};
