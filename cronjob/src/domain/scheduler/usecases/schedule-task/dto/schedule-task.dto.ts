import { IRepeatOptions, IStatusScheduler } from "@/domain/scheduler/types";

export interface IScheduleTaskDTO {
  name: string;
  job: string;
  status?: IStatusScheduler;
  data?: any;
  repeat?: IRepeatOptions;
  delay?: string;
}
