import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { RepeatOptionsValidator } from "./repeat-options.validator";

export class SchedulerTaskDTOValidator implements IScheduleTaskDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  job: string;

  @IsOptional()
  @IsObject()
  data?: any;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean = true;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => RepeatOptionsValidator)
  repeat?: RepeatOptionsValidator;
}
