import { IRemoveRepeatableTaskDTO } from "@/domain/scheduler/usecases/remove-repeatable-task/dto";
import { IRemoveRepeatableTaskUseCase } from "@/domain/scheduler/usecases/remove-repeatable-task";
import { RemoveRepeatableTaskController } from "@/application/controllers/scheduler";
import {
  HttpResponse,
  IValidation,
  HttpRequest,
} from "@/application/protocols";
import { mock, MockProxy } from "jest-mock-extended";
import { JobsNames } from "@/domain/scheduler/usecases/schedule-task/dto";

describe("Remove repeatable task controller", () => {
  let mockRemoveRepeatableTaskUseCase: MockProxy<IRemoveRepeatableTaskUseCase>;
  let mockValidation: MockProxy<IValidation>;

  beforeEach(() => {
    mockRemoveRepeatableTaskUseCase = mock<IRemoveRepeatableTaskUseCase>();
    mockValidation = mock<IValidation>();
  });

  it("should call remove repeatable task use case", async () => {
    const removeRepeatableTaskController: RemoveRepeatableTaskController =
      new RemoveRepeatableTaskController(
        mockRemoveRepeatableTaskUseCase,
        mockValidation
      );
    const mockRemoveRepeatableTaskDTO: IRemoveRepeatableTaskDTO = {
      job: JobsNames.USERS_SEMANTIX_TO_DB,
      repeat: {
        cron: "* * */30 * * *",
      },
    };

    const mockHttpRequest: HttpRequest = {
      body: mockRemoveRepeatableTaskDTO,
    };

    const result = await removeRepeatableTaskController.handle(mockHttpRequest);

    const mockResultHttp: HttpResponse = {
      statusCode: 204,
      body: null,
    };

    expect(result).toEqual(mockResultHttp);
    expect(mockRemoveRepeatableTaskUseCase.execute).toHaveBeenCalledWith(
      mockRemoveRepeatableTaskDTO
    );
  });

  it("should throw an error", async () => {
    const removeRepeatableTaskController: RemoveRepeatableTaskController =
      new RemoveRepeatableTaskController(
        mockRemoveRepeatableTaskUseCase,
        mockValidation
      );
    const mockRemoveRepeatableTaskDTO: any = {
      job: "invalid job",
    };

    const mockHttpRequest: HttpRequest = {
      body: mockRemoveRepeatableTaskDTO,
    };

    mockValidation.validate.mockImplementation(() => {
      throw new Error(
        "job must be one of the following values: CreateReportsToGofile, UsersSemantixToDb"
      );
    });

    const result = await removeRepeatableTaskController.handle(mockHttpRequest);

    const mockResultHttp: HttpResponse = {
      statusCode: 400,
      body: new Error(
        "job must be one of the following values: CreateReportsToGofile, UsersSemantixToDb"
      ),
    };
    expect(result).toEqual(mockResultHttp);
    expect(mockRemoveRepeatableTaskUseCase.execute).not.toHaveBeenCalled();
  });
});
