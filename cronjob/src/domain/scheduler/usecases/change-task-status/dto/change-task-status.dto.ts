import { IStatusScheduler } from "@/domain/scheduler/types";

export interface ITaskDTO {
  jobId: string;
  status: IStatusScheduler;
}
