import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import { startConsumer } from "@/infra/broker/redis/bullmq";
import { connectDb } from "@/infra/database/mongodb/setup";

connectDb().then(
  async () => {
    try {
      await startConsumer();
      console.log("Consumer started");
    } catch (error) {
      console.error(error);
    }
  }
)