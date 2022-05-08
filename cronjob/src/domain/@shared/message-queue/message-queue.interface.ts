import { RepeatOptions } from "@/domain/scheduler/types";
import { QueueOptions } from "./queue-options.interface";

export interface IMessageQueue {
  constructor(name: string, opts?: QueueOptions): void;
  sendMessage(job: string, data: any, repeat?: RepeatOptions): Promise<void>;
  sendMessageBulk(job: string, data: any, repeat?: RepeatOptions): Promise<void>;
  drain(): Promise<void>;
}