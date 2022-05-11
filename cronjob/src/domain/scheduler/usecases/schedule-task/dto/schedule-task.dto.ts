import { IRepeatOptions, IStatusScheduler } from "@/domain/scheduler/types";

export enum JobsNames {
  CREATE_REPORTS_TO_GOFILE = "CreateReportsToGofile",
  USERS_SEMANTIX_TO_DB = "UsersSemantixToDb",
}

export interface IScheduleTaskDTO {
  name: string;
  job: JobsNames;
  status?: IStatusScheduler;
  data?: any;
  repeat?: IRepeatOptions;
  delay?: string;
}
