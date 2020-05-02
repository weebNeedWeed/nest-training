import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  // Query,
  // UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidation } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  private getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Post()
  private createTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get("/:id")
  private getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete("/:id")
  private deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  private updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidation) status: TaskStatus,
  ): Promise<void> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
