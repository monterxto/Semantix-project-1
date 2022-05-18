import { ITaskDTO } from "@/domain/scheduler/usecases/change-task-status/dto";
import { IChangeTaskStatusUseCase } from "@/domain/scheduler/usecases/change-task-status";
import { IStatusScheduler } from "@/domain/scheduler/types";
import { ChangeTaskStatusListener } from "@/application/listeners/scheduler";
import { mock, MockProxy } from "jest-mock-extended";

describe("Change task status listener", () => {
  let mockChangeTaskStatusUseCase: MockProxy<IChangeTaskStatusUseCase>;

  beforeEach(() => {
    mockChangeTaskStatusUseCase = mock<IChangeTaskStatusUseCase>();
  });

  it("should call change task status use case", async () => {
    const changeTaskStatusListener: ChangeTaskStatusListener =
      new ChangeTaskStatusListener(mockChangeTaskStatusUseCase);
    const mockTaskDTO: ITaskDTO = {
      jobId: "1",
      status: IStatusScheduler.ACTIVE,
    };

    await changeTaskStatusListener.handle(mockTaskDTO);

    expect(mockChangeTaskStatusUseCase.execute).toHaveBeenCalledWith(
      mockTaskDTO
    );
    expect(mockChangeTaskStatusUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
