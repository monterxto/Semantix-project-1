import { IRepeatOptions } from "@/domain/scheduler/types";

export interface IScheduleTaskDTO {
  name: string;
  job: string;
  data?: any;
  enabled?: boolean;
  repeat?: IRepeatOptions;
}