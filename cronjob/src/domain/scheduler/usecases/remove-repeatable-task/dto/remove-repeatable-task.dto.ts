import { IRepeatOptions } from "@/domain/scheduler/types";

export interface IRemoveRepeatableTaskDTO {
  job: string;
  repeat: IRepeatOptions;
}