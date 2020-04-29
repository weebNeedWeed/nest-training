import { TaskStatus } from "./../task-status.enum";
import { IsOptional, IsNotEmpty, IsIn } from "class-validator";

export class GetTasksFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: string;

  @IsOptional()
  @IsNotEmpty()
  search: TaskStatus;
}
