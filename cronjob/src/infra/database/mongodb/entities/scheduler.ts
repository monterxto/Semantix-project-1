import { model, Schema, Types } from "mongoose";
import { Scheduler } from "@/domain/scheduler/entities";
import { IRepeatOptions, IStatusScheduler } from "@/domain/scheduler/types";

export type SchedulerDocument = {
  _id: string;
  name: string;
  job: string;
  data: any;
  status: IStatusScheduler;
  repeat?: IRepeatOptions;
  delay?: Date;
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

    status: {
      type: String,
      required: true,
    },

    repeat: {
      type: Object,
      required: false,
    },

    delay: {
      type: Date,
      required: false
    }
  },
  { timestamps: true }
);

export const SchedulerModel = model<Scheduler>("Scheduler", SchedulerSchema);
