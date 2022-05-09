import { bodyParser, cors } from "@/main/middlewares";

import express, { Express } from "express";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
};
