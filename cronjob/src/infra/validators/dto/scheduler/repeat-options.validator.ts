import { IRepeatOptions } from "@/domain/scheduler/types";
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RepeatOptionsValidator implements IRepeatOptions {

  @IsNotEmpty()
  @IsString()
  cron: string;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsISO8601()
  startAt?: Date;

  @IsOptional()
  @IsISO8601()
  endAt?: Date;
}