import { ITaskDTO } from "./dto";

export interface IChangeTaskStatusUseCase {
  execute(task: ITaskDTO): Promise<void>;
}
