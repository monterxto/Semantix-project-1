import "module-alias/register";
import "reflect-metadata";
import { setupApp } from "./config";
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "@/infra/database/mongodb/setup";
import { startScheduler } from "@/infra/broker/redis/bullmq/scheduler-queue";

connectDb().then(
  async () => {
    try {
      startScheduler();
      const app = await setupApp();
      app.listen(process.env.SERVER_PORT, () =>
        console.log(
          `Server running at http://localhost:${process.env.SERVER_PORT}`
        )
      );
    } catch (error) {
      console.error(error);
    }
  },
  (error) => {
    console.error(error);
  }
);
