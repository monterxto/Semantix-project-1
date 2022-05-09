import { adaptRoute } from "@/main/adapter/main/routes";
import { Router } from "express";
import { makeScheduleTaskController } from "@/main/factories/application/controllers/scheduler";

export default (router: Router): void => {
  router.post("/scheduler", adaptRoute(makeScheduleTaskController()));
};
