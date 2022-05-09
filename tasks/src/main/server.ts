import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import { startConsumer } from "@/infra/broker/redis/bullmq";

startConsumer().then( () => {
  console.log("Consumer started");
})