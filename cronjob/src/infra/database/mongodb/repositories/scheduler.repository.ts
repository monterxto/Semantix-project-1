import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { SchedulerModel, SchedulerDocument } from "../entities/scheduler";
import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import { Scheduler } from "@/domain/scheduler/entities";
import { IRepeatOptions } from "@/domain/scheduler/types";

export class SchedulerRepository implements ISchedulerRepository {
  async create(scheduler: IScheduleTaskDTO): Promise<Scheduler> {
    try {
      const schedulerDocument: SchedulerDocument = await SchedulerModel.create(
        scheduler
      );
      return Scheduler.create(
        schedulerDocument._id.toString(),
        schedulerDocument.name,
        schedulerDocument.job,
        schedulerDocument.status,
        schedulerDocument?.data,
        schedulerDocument?.repeat,
        schedulerDocument?.delay?.toISOString()
      );
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async findAll(): Promise<Scheduler[]> {
    try {
      const schedulers: SchedulerDocument[] = await SchedulerModel.find();
      return schedulers.map((scheduler) =>
        Scheduler.create(
          scheduler._id.toString(),
          scheduler.name,
          scheduler.job,
          scheduler.status,
          scheduler?.data,
          scheduler?.repeat,
          scheduler?.delay?.toISOString()
        )
      );
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async findById(id: string): Promise<Scheduler> {
    try {
      const scheduler: SchedulerDocument = await SchedulerModel.findById(id);
      return Scheduler.create(
        scheduler._id.toString(),
        scheduler.name,
        scheduler.job,
        scheduler.status,
        scheduler?.data,
        scheduler?.repeat,
        scheduler?.delay?.toISOString()
      );
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async update(id: string, dto: Partial<IScheduleTaskDTO>): Promise<void> {
    try {
      await SchedulerModel.findByIdAndUpdate(id, dto);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await SchedulerModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async updateByJobAndRepeat(
    job: string,
    repeat: IRepeatOptions,
    data: Partial<IScheduleTaskDTO>
  ): Promise<void> {
    try {
      await SchedulerModel.updateMany({ job, repeat }, data);
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
