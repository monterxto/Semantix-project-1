import { IUsersSemantixToDbUseCase } from "@/domain/user/usecases/users-semantix-to-db";
import { Job } from "bullmq";
import { IJob, IJobRequest } from "../protocols";

export class UsersSemantixToDbJob implements IJob {
  constructor(
    private readonly usersSemantixToDbUseCase: IUsersSemantixToDbUseCase
  ) {}

  public async handle(job: IJobRequest): Promise<void> {
    await this.usersSemantixToDbUseCase.execute();
  }
}
