import { RepeatOptions } from "@/domain/scheduler/types";

export interface IScheduleTaskDTO {
  id: string;
  name: string;
  queue: string;
  job: string;
  data: any;
  enabled?: boolean;
  repeat?: RepeatOptions;
}