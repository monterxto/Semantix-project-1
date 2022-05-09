import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { RepeatOptionsValidator } from "./repeat-options.validator";
import { IRemoveRepeatableTaskDTO } from "@/domain/scheduler/usecases/remove-repeatable-task/dto";

export class RemoveRepeatableTaskDTOValidator
  implements IRemoveRepeatableTaskDTO
{
  @IsNotEmpty()
  @IsString()
  job: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RepeatOptionsValidator)
  repeat: RepeatOptionsValidator;
}
