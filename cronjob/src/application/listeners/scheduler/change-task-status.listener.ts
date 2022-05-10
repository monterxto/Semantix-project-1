import { IListener, Task } from "@/application/protocols";
import { IChangeTaskStatusUseCase } from "@/domain/scheduler/usecases/change-task-status";
export class ChangeTaskStatusListener implements IListener {
  constructor(
    private readonly changeTaskStatusUseCase: IChangeTaskStatusUseCase
  ) {}

  async handle(task: Task): Promise<void> {
    await this.changeTaskStatusUseCase.execute(task);
  }
}
