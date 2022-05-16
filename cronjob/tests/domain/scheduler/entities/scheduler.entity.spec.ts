import { Scheduler } from "@/domain/scheduler/entities";
import { IStatusScheduler } from "@/domain/scheduler/types/";

describe("Scheduler entity unit test", () => {
  it("should create a schedule", () => {
    const scheduler = new Scheduler(
      "1",
      "Atualizar usuarios",
      "UsersSemantixToDb",
      IStatusScheduler.WAITING
    );
    expect(scheduler).toBeTruthy();
  });

  it("should create a schedule with status waiting", () => {
    const scheduler = new Scheduler(
      "1",
      "Atualizar usuarios",
      "UsersSemantixToDb",
      IStatusScheduler.WAITING
    );
    expect(scheduler.getStatus()).toBe(IStatusScheduler.WAITING);
  });

  it("should throw an error when create a schedule with invalid id", () => {
    expect(
      () =>
        new Scheduler(
          undefined,
          "Atualizar usuarios",
          "UsersSemantixToDb",
          IStatusScheduler.WAITING
        )
    ).toThrow('Scheduler id is required');
  });

  it("should throw an error when create a schedule with invalid name", () => {
    expect(
      () =>
        new Scheduler(
          "1",
          undefined,
          "UsersSemantixToDb",
          IStatusScheduler.WAITING
        )
    ).toThrow('Scheduler name is required');
  });

  it("should throw an error when create a schedule with invalid job", () => {
    expect(
      () =>
        new Scheduler(
          "1",
          "Atualizar usuarios",
          undefined,
          IStatusScheduler.WAITING
        )
    ).toThrow('Scheduler job is required');
  });

  it("should throw an error when create a schedule with invalid status", () => {
    expect(
      () =>
        new Scheduler(
          "1",
          "Atualizar usuarios",
          "UsersSemantixToDb",
          undefined
        )
    ).toThrow(
      "Scheduler status is 'SCHEDULED', 'REPEATED', 'WAITING', 'FINISHED'"
    );
  });
});
