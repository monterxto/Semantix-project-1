import { IRepeatOptions } from "@/domain/scheduler/types";
import { IJobsOptions } from "./jobs-options.interface";
import { QueueOptions } from "./queue-options.interface";

export interface IMessageQueue {
  sendMessage(job: string, data: any, opts?: IJobsOptions): Promise<void>;
  drain(): Promise<void>;
  removeRepeatableMessage(name: string, repeatOpts: IRepeatOptions): Promise<void>;
}
