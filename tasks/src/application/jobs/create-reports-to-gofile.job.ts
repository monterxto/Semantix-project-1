import { ICreateReportsToGofileUseCase } from "@/domain/user/usecases/create-reports-to-gofile";
import { IJob, IJobRequest } from "../protocols";

export class CreateReportsToGoFileJob implements IJob {
  constructor(
    private readonly createReportsToGoFileUseCase: ICreateReportsToGofileUseCase
  ) {}

  public async handle(job: IJobRequest): Promise<void> {
    await this.createReportsToGoFileUseCase.execute();
  }
}
