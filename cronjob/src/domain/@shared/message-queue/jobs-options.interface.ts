import { IRepeatOptions } from "@/domain/scheduler/types";
import { JobsOptions } from "bullmq";

export type IJobsOptions = {
  delay?: number;
  repeat?: IRepeatOptions;
  jobId: string;
};
