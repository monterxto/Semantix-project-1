import { IMessageQueue } from "@/domain/@shared/message-queue";
import { IRepeatOptions } from "@/domain/scheduler/types";
import { Queue } from "bullmq";

export class MessageQueue implements IMessageQueue {
  constructor(private queue: Queue) {}

  async sendMessage(
    job: string,
    data: any,
    repeat?: IRepeatOptions
  ): Promise<void> {
    await this.queue.add(job, data, { repeat });
  }

  async drain(): Promise<void> {
    await this.queue.drain();
  }

  async removeRepeatableMessage(name: string, repeatOpts: IRepeatOptions): Promise<void> {
    await this.queue.removeRepeatable(name, repeatOpts);
  }
}
