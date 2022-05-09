export interface IJobRequest {
  name: string;
  data: any;
}

export interface IJob {
  handle: (job: IJobRequest) => Promise<void>;
}
