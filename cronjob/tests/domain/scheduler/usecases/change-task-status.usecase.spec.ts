import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { ChangeTaskStatusUseCase } from "@/domain/scheduler/usecases/change-task-status";
import { ITaskDTO } from "@/domain/scheduler/usecases/change-task-status/dto";
import { IStatusScheduler } from "@/domain/scheduler/types";
import { mock, MockProxy } from "jest-mock-extended";

describe("Change Task Status usecase unit test", () => {
  let mockSchedulerRepository: MockProxy<ISchedulerRepository>;

  beforeEach(() => {
    mockSchedulerRepository = mock<ISchedulerRepository>();
  });

  it("should change the status of a task", async () => {
    const changeTaskStatusUseCase = new ChangeTaskStatusUseCase(
      mockSchedulerRepository
    );
    const taskDTO: ITaskDTO = {
      jobId: "1",
      status: IStatusScheduler.ACTIVE,
    };
    await changeTaskStatusUseCase.execute(taskDTO);
    expect(mockSchedulerRepository.update).toBeCalledWith(taskDTO.jobId, {
      status: taskDTO.status,
    });
  });
});
