import { adaptRoute } from "@/main/adapter/main/routes";
import { Router } from "express";
import {
  makeScheduleTaskController,
  makeRemoveRepeatableTaskController,
} from "@/main/factories/application/controllers/scheduler";

export default (router: Router): void => {
  router.post("/scheduler", adaptRoute(makeScheduleTaskController()));
  router.patch("/scheduler/removerepeatabletask", adaptRoute(makeRemoveRepeatableTaskController()));
};
