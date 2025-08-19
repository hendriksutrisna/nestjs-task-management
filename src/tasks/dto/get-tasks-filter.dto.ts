/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
