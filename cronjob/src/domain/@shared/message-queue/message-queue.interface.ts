import { IRepeatOptions } from "@/domain/scheduler/types";
import { QueueOptions } from "./queue-options.interface";

export interface IMessageQueue {
  sendMessage(job: string, data: any, repeat?: IRepeatOptions): Promise<void>;
  drain(): Promise<void>;
  removeRepeatableMessage(name: string, repeatOpts: IRepeatOptions): Promise<void>;
}
