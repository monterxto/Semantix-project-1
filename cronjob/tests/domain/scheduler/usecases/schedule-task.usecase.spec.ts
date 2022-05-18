import { IMessageQueue } from "@/domain/@shared/message-queue";
import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { ScheduleTaskUseCase } from "@/domain/scheduler/usecases/schedule-task";
import {
  IScheduleTaskDTO,
  JobsNames,
} from "@/domain/scheduler/usecases/schedule-task/dto";
import { IStatusScheduler } from "@/domain/scheduler/types";
import { mock, MockProxy } from "jest-mock-extended";
import { Scheduler } from "@/domain/scheduler/entities";
import { IJobsOptions } from "@/domain/@shared/message-queue/jobs-options.interface";

describe("Schedule task usecase unit test", () => {
  let mockSchedulerRepository: MockProxy<ISchedulerRepository>;
  let mockMessageQueue: MockProxy<IMessageQueue>;

  beforeEach(() => {
    mockSchedulerRepository = mock<ISchedulerRepository>();
    mockMessageQueue = mock<IMessageQueue>();
  });

  it("should create a schedule", async () => {
    const scheduleTaskUseCase = new ScheduleTaskUseCase(
      mockSchedulerRepository,
      mockMessageQueue
    );
    mockSchedulerRepository.create.mockResolvedValue(
      new Scheduler(
        "1",
        "Atualizar usuarios",
        JobsNames.USERS_SEMANTIX_TO_DB,
        IStatusScheduler.WAITING
      )
    );
    const scheduleTaskDTO: IScheduleTaskDTO = {
      name: "Atualizar usuarios",
      job: JobsNames.USERS_SEMANTIX_TO_DB,
    };
    const jobsOptions: IJobsOptions = {
      jobId: "1",
      repeat: undefined
    };
    await scheduleTaskUseCase.execute(scheduleTaskDTO);
    expect(mockSchedulerRepository.create).toBeCalledWith(scheduleTaskDTO);
    expect(mockMessageQueue.sendMessage).toBeCalledWith(
      JobsNames.USERS_SEMANTIX_TO_DB,
      undefined,
      jobsOptions
    );
  });
});
