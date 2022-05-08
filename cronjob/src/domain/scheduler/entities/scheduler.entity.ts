import { IRepeatOptions } from "@/domain/scheduler/types"

export class Scheduler {
  private id: string
  private name: string
  private job: string
  private data?: any
  private enabled?: boolean
  private repeat?: IRepeatOptions

  constructor(
    id: string,
    name: string,
    job: string,
    data?: any,
    enabled?: boolean,
    repeat?: IRepeatOptions
  ) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.data = data;
    this.enabled = enabled || true;
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
  }

  public static create(
    id: string,
    name: string,
    job: string,
    data?: any,
    enabled?: boolean,
    repeat?: IRepeatOptions
  ): Scheduler {
    return new Scheduler(id, name, job, data, enabled, repeat);
  }

  public static fromJSON(json: any): Scheduler {
    return new Scheduler(
      json.id,
      json.name,
      json.job,
      json.data,
      json.enabled,
      json.repeat
    );
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      job: this.job,
      data: this.data,
      enabled: this.enabled,
      repeat: this.repeat
    };
  }
}