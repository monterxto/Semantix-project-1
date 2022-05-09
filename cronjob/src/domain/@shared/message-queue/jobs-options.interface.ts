import { IRepeatOptions } from "@/domain/scheduler/types";

export type IJobsOptions = {
  delay?: number;
  repeat?: IRepeatOptions;
};
