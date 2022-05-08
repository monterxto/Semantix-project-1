import { model, Schema, Types } from "mongoose";
import { Scheduler } from "@/domain/scheduler/entities";
import { IRepeatOptions } from "@/domain/scheduler/types";

export type SchedulerDocument = {
  _id: string;
  name: string;
  job: string;
  data: any;
  enabled: boolean;
  repeat?: IRepeatOptions;
};

const SchedulerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    job: {
      type: String,
      required: true,
    },

    data: {
      type: Object,
      required: false,
    },

    enabled: {
      type: Boolean,
      required: false,
      default: true,
    },

    repeat: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

export const SchedulerModel = model<Scheduler>("Scheduler", SchedulerSchema);
