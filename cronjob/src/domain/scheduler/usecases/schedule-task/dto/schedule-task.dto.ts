import { RepeatOptions } from "@/domain/scheduler/types";

export interface IScheduleTaskDTO {
  id: string;
  name: string;
  repeat: RepeatOptions;
  queue: string;
  job: string;
  data: any;
  enabled: boolean;
}