import { queueConfig } from "@/infra/configs/bullmq";
import { QueueScheduler } from "bullmq";

export const startScheduler = (): QueueScheduler => {
  return new QueueScheduler(queueConfig.name, queueConfig.opts);
};