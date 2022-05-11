import { IJob } from "@/application/protocols";
import { CreateReportsToGoFileJob } from "@/application/jobs";
import { makeCreateReportsToGofileUseCase } from "@/main/factories/domain/user";

export const makeCreateReportsToGofileJob = (): IJob => {
  const createReportsToGofileUseCase = makeCreateReportsToGofileUseCase();
  return new CreateReportsToGoFileJob(createReportsToGofileUseCase);
};
