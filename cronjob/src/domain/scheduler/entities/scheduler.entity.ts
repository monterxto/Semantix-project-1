import { IRepeatOptions, IStatusScheduler } from "@/domain/scheduler/types";

export class Scheduler {
  private id: string;
  private name: string;
  private job: string;
  private status: IStatusScheduler;
  private data?: any;
  private repeat?: IRepeatOptions;
  private delay?: string;

  constructor(
    id: string,
    name: string,
    job: string,
    status: IStatusScheduler,
    data?: any,
    repeat?: IRepeatOptions,
    delay?: string
  ) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.status = status;
    this.data = data;
    this.repeat = repeat;
    this.delay = delay;

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
    repeat?: IRepeatOptions,
    delay?: string
  ): Scheduler {
    return new Scheduler(id, name, job, status, data, repeat, delay);
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

  public getId(): string {
    return this.id;
  }
}
