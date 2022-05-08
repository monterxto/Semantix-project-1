import { queueConfig } from "@/infra/configs/bullmq";
import { QueueScheduler } from "bullmq";

export const startScheduler = (): QueueScheduler => {
  return new QueueScheduler(process.env.BULLMQ_QUEUE_NAME, queueConfig.opts);
};