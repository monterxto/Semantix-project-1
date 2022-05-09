import { makeUsersSemantixToDbJob } from "@/main/factories/application/jobs";
import { Worker } from "bullmq";
import { queueConfig } from "@/infra/configs/bullmq"

export const startConsumer = async () => {
  new Worker(queueConfig.name, async (job) => {
    
    switch (job.name) {
      case "UsersSemantixToDb":
        makeUsersSemantixToDbJob().handle(job);
        break;
      default:
        break;
    }
  }, queueConfig.opts);
};
