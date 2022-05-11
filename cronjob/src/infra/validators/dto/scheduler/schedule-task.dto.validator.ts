import {
  IScheduleTaskDTO,
  JobsNames,
} from "@/domain/scheduler/usecases/schedule-task/dto";
import {
  IsBoolean,
  IsIn,
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

  @IsIn([JobsNames.CREATE_REPORTS_TO_GOFILE, JobsNames.USERS_SEMANTIX_TO_DB])
  @IsNotEmpty()
  @IsString()
  job: JobsNames;

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
