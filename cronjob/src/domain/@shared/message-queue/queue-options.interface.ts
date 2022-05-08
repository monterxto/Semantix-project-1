import { RepeatOptions } from "@/domain/scheduler/types";

export type QueueOptions = {
  repeat?: RepeatOptions;
  delay?: number;
  removeOnFail?: boolean;
  attempts?: number;
  timeout?: number;
}