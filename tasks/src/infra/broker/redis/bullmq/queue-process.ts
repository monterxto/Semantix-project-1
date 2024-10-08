import {
  makeCreateReportsToGofileJob,
  makeUsersSemantixToDbJob,
} from "@/main/factories/application/jobs";
import { Worker } from "bullmq";
import { queueConfig } from "@/infra/configs/bullmq";

export const startConsumer = async () => {
  new Worker(
    queueConfig.name,
    async (job) => {
      switch (job.name) {
        case "UsersSemantixToDb":
          await makeUsersSemantixToDbJob().handle(job);
          break;
        case "CreateReportsToGofile":
          await makeCreateReportsToGofileJob().handle(job);
          break;
        default:
          break;
      }
    },
    queueConfig.opts
  );
};
