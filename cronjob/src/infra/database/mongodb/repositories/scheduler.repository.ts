import { ISchedulerRepository } from "@/domain/scheduler/repository";
import { SchedulerModel, SchedulerDocument } from "../entities/scheduler";
import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import { Scheduler } from "@/domain/scheduler/entities";

export class SchedulerRepository implements ISchedulerRepository {
  async create(scheduler: IScheduleTaskDTO): Promise<void> {
    try {
      await SchedulerModel.create(scheduler);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async findAll(): Promise<Scheduler[]> {
    try {
      const schedulers: SchedulerDocument[] = await SchedulerModel.find();
      return schedulers.map((scheduler) =>
        Scheduler.fromJSON({ ...scheduler, id: scheduler._id })
      );
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async findById(id: string): Promise<Scheduler> {
    try {
      const scheduler: SchedulerDocument = await SchedulerModel.findById(id);
      return Scheduler.fromJSON({ ...scheduler, id: scheduler._id });
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
}
