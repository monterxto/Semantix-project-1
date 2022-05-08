import { RepeatOptions } from "@/domain/scheduler/types"

export class Scheduler {
  private id: string
  private name: string
  private queue: string
  private job: string
  private data: any
  private enabled?: boolean
  private repeat?: RepeatOptions

  constructor(
    id: string,
    name: string,
    queue: string,
    job: string,
    data: any,
    enabled?: boolean,
    repeat?: RepeatOptions
  ) {
    this.id = id;
    this.name = name;
    this.queue = queue;
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
    if (!this.queue) {
      throw new Error("Scheduler queue is required");
    }
    if (!this.job) {
      throw new Error("Scheduler job is required");
    }
    if (!this.data) {
      throw new Error("Scheduler data is required");
    }
  }

  public static create(
    id: string,
    name: string,
    queue: string,
    job: string,
    data: any,
    enabled?: boolean,
    repeat?: RepeatOptions
  ): Scheduler {
    return new Scheduler(id, name, queue, job, data, enabled, repeat);
  }

  public static fromJson(json: any): Scheduler {
    return new Scheduler(
      json.id,
      json.name,
      json.queue,
      json.job,
      json.data,
      json.enabled,
      json.repeat
    );
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      queue: this.queue,
      job: this.job,
      data: this.data,
      enabled: this.enabled,
      repeat: this.repeat
    };
  }
}