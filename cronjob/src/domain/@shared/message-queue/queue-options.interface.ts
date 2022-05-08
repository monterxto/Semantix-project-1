import { IRepeatOptions } from "@/domain/scheduler/types";

export type QueueOptions = {
  connection: {
    host: string;
    port: number;
  };
  defaultJobOptions: {
    repeat?: IRepeatOptions;
    delay?: number;
    removeOnFail?: boolean;
    attempts?: number;
    timeout?: number;
  };
};
