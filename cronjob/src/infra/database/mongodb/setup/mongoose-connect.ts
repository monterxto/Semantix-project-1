import { mongodbConfig } from "@/infra/configs/mongodb";
import { connect } from "mongoose";

export const connectDb = async (): Promise<typeof import("mongoose")> => {
  return connect(`mongodb://${mongodbConfig.host}/${mongodbConfig.db}`, mongodbConfig.opts);
};
