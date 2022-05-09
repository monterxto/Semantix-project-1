import { serverError, noContent, badRequest } from "@/application/helpers";
import { HttpResponse, Validation } from "@/application/protocols";
import { IScheduleTaskUseCase } from "@/domain/scheduler/usecases/schedule-task";
export class ScheduleTaskController {
  constructor(
    private readonly scheduleTaskUseCase: IScheduleTaskUseCase,
    private readonly validation: Validation
  ) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      await this.validation.validate(req.body);
      await this.scheduleTaskUseCase.execute(req.body);
      return noContent();
    } catch (error) {
      if (error instanceof Error) return badRequest(error);
      return serverError(new Error("Unexpected error"));
    }
  }
}
