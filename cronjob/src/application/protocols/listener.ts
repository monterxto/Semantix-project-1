import { IStatusScheduler } from "@/domain/scheduler/types";

export type Task = {
  jobId: string;
  status: IStatusScheduler;
};

export interface IListener {
  handle: (task: Task) => Promise<void>;
}
