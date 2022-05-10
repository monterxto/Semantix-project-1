import { IScheduleTaskDTO } from "@/domain/scheduler/usecases/schedule-task/dto";
import {
  IsBoolean,
  IsISO8601,
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
  @ValidateNested()
  @Type(() => RepeatOptionsValidator)
  repeat?: RepeatOptionsValidator;

  @IsOptional()
  @IsISO8601()
  delay?: string;
}
