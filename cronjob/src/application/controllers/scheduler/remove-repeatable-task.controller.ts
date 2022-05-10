import { serverError, noContent, badRequest } from "@/application/helpers";
import {
  HttpResponse,
  IController,
  IValidation,
} from "@/application/protocols";
import { IRemoveRepeatableTaskUseCase } from "@/domain/scheduler/usecases/remove-repeatable-task";
export class RemoveRepeatableTaskController implements IController {
  constructor(
    private readonly removeRepeatableTaskUseCase: IRemoveRepeatableTaskUseCase,
    private readonly validation: IValidation
  ) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      await this.validation.validate(req.body);
      await this.removeRepeatableTaskUseCase.execute(req.body);
      return noContent();
    } catch (error) {
      if (error instanceof Error) return badRequest(error);
      return serverError(new Error("Unexpected error"));
    }
  }
}
