import { IMessageQueue } from "@/domain/@shared/message-queue";
import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { RemoveRepeatableTaskUseCase } from "@/domain/scheduler/usecases/remove-repeatable-task";
import {
  IRemoveRepeatableTaskDTO
} from "@/domain/scheduler/usecases/remove-repeatable-task/dto";
import { IStatusScheduler } from "@/domain/scheduler/types";
import { mock, MockProxy } from "jest-mock-extended";
import { JobsNames } from "@/domain/scheduler/usecases/schedule-task/dto";

describe("Remove repeatable task usecase unit test", () => {
  let mockSchedulerRepository: MockProxy<ISchedulerRepository>;
  let mockMessageQueue: MockProxy<IMessageQueue>;

  beforeEach(() => {
    mockSchedulerRepository = mock<ISchedulerRepository>();
    mockMessageQueue = mock<IMessageQueue>();
  });

  it("should remove a repeatable task", async () => {
    const removeRepeatableTaskUseCase = new RemoveRepeatableTaskUseCase(
      mockSchedulerRepository,
      mockMessageQueue
    );
    const removeRepeatableTaskDTO: IRemoveRepeatableTaskDTO = {
      job: JobsNames.USERS_SEMANTIX_TO_DB,
      repeat: {
        cron: "* * */30 * *",
      }
    };
    await removeRepeatableTaskUseCase.execute(removeRepeatableTaskDTO);
    expect(mockMessageQueue.removeRepeatableMessage).toBeCalledWith(
      JobsNames.USERS_SEMANTIX_TO_DB,
      removeRepeatableTaskDTO.repeat
    );
    expect(mockSchedulerRepository.updateByJobAndRepeat).toBeCalledWith(
      JobsNames.USERS_SEMANTIX_TO_DB,
      removeRepeatableTaskDTO.repeat,
      { status: IStatusScheduler.FINISHED }
    );
  });
});