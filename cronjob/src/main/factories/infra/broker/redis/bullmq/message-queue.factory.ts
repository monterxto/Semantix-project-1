import { IMessageQueue } from "@/domain/@shared/message-queue";
import { MessageQueue } from "@/infra/broker/redis/bullmq";
import { queueConfig } from "@/infra/configs/bullmq";
import { Queue } from "bullmq";

export const makeMessageQueue = (): IMessageQueue => {
  const queue = new Queue(queueConfig.name, queueConfig.opts);
  return new MessageQueue(queue);
};
