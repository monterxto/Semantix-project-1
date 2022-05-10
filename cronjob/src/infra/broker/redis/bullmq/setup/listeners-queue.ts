import { Queue, QueueEvents } from "bullmq";
import { queueConfig } from "@/infra/configs/bullmq";
import { makeChangeTaskStatusListener } from "@/main/factories/application/listeners/scheduler";
import { IStatusScheduler } from "@/domain/scheduler/types";

export const queueListenerManager = (): void => {
  const queueEvents = new QueueEvents(queueConfig.name, queueConfig.opts);

  queueEvents.on("completed", (job) => {
    console.log("completed", job);
    if (!job.jobId.startsWith("repeat")) {
      makeChangeTaskStatusListener().handle({
        jobId: job.jobId,
        status: IStatusScheduler.FINISHED,
      });
    }
  });

  queueEvents.on("failed", (job) => {
    console.log("failed", job);
    if (!job.jobId.startsWith("repeat")) {
      makeChangeTaskStatusListener().handle({
        jobId: job.jobId,
        status: IStatusScheduler.FAILED,
      });
    }
  });

  queueEvents.on("active", (job) => {
    console.log("active", job);
    if (!job.jobId.startsWith("repeat")) {
      makeChangeTaskStatusListener().handle({
        jobId: job.jobId,
        status: IStatusScheduler.ACTIVE,
      });
    }
  });
};
