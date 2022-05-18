import {
  IScheduleTaskDTO,
  JobsNames,
} from "@/domain/scheduler/usecases/schedule-task/dto";
import { IScheduleTaskUseCase } from "@/domain/scheduler/usecases/schedule-task";
import { ScheduleTaskController } from "@/application/controllers/scheduler";
import {
  HttpResponse,
  IValidation,
  HttpRequest,
} from "@/application/protocols";
import { mock, MockProxy } from "jest-mock-extended";

describe("Schedule task controller", () => {
  let mockScheduleTaskUseCase: MockProxy<IScheduleTaskUseCase>;
  let mockValidation: MockProxy<IValidation>;

  beforeEach(() => {
    mockScheduleTaskUseCase = mock<IScheduleTaskUseCase>();
    mockValidation = mock<IValidation>();
  });

  it("should call schedule task use case", async () => {
    const scheduleTaskController: ScheduleTaskController =
      new ScheduleTaskController(mockScheduleTaskUseCase, mockValidation);
    const mockScheduleTaskDTO: IScheduleTaskDTO = {
      name: "name",
      job: JobsNames.USERS_SEMANTIX_TO_DB,
      delay: "2022-12-12T12:12:12.000Z",
    };

    const mockHttpRequest: HttpRequest = {
      body: mockScheduleTaskDTO,
    };

    const result = await scheduleTaskController.handle(mockHttpRequest);

    const mockResultHttp: HttpResponse = {
      statusCode: 204,
      body: null,
    };

    expect(result).toEqual(mockResultHttp);
    expect(mockScheduleTaskUseCase.execute).toHaveBeenCalledWith(
      mockScheduleTaskDTO
    );
  });

  it("should throw an error", async () => {
    const scheduleTaskController: ScheduleTaskController =
      new ScheduleTaskController(mockScheduleTaskUseCase, mockValidation);
    const mockScheduleTaskDTO: any = {
      name: "name",
      job: "invalid job",
    };

    const mockHttpRequest: HttpRequest = {
      body: mockScheduleTaskDTO,
    };

    mockValidation.validate.mockImplementation(() => {
      throw new Error(
        "job must be one of the following values: CreateReportsToGofile, UsersSemantixToDb"
      );
    });

    const result = await scheduleTaskController.handle(mockHttpRequest);

    const mockResultHttp: HttpResponse = {
      statusCode: 400,
      body: new Error(
        "job must be one of the following values: CreateReportsToGofile, UsersSemantixToDb"
      ),
    };
    expect(result).toEqual(mockResultHttp);
    expect(mockScheduleTaskUseCase.execute).not.toHaveBeenCalled();
  });
});
