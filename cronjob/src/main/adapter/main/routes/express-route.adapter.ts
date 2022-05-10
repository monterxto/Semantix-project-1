import { IController } from "@/application/protocols";

import { Request, Response } from "express";

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.arrayErrors || httpResponse.body.message,
      });
    }
  };
};
