import { IRepeatOptions, IStatusScheduler } from "@/domain/scheduler/types";

export class Scheduler {
  private id: string;
  private name: string;
  private job: string;
  private status: IStatusScheduler;
  private data?: any;
  private repeat?: IRepeatOptions;

  constructor(
    id: string,
    name: string,
    job: string,
    status: IStatusScheduler,
    data?: any,
    repeat?: IRepeatOptions
  ) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.status = status;
    this.data = data;
    this.repeat = repeat;

    this.validate();
  }

  public validate(): void {
    if (!this.id) {
      throw new Error("Scheduler id is required");
    }
    if (!this.name) {
      throw new Error("Scheduler name is required");
    }
    if (!this.job) {
      throw new Error("Scheduler job is required");
    }
    if (!(this.status in IStatusScheduler)) {
      throw new Error(
        "Scheduler status is 'SCHEDULED', 'REPEATED', 'WAITING', 'FINISHED'"
      );
    }
  }

  public static create(
    id: string,
    name: string,
    job: string,
    status: IStatusScheduler,
    data?: any,
    repeat?: IRepeatOptions
  ): Scheduler {
    return new Scheduler(id, name, job, status, data, repeat);
  }

  public static fromJSON(json: any): Scheduler {
    return new Scheduler(
      json.id,
      json.name,
      json.job,
      json.status,
      json.data,
      json.repeat
    );
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      job: this.job,
      data: this.data,
      status: this.status,
      repeat: this.repeat,
    };
  }
}
