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
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidation } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@UseGuards(AuthGuard())
@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  private getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  private createTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get("/:id")
  private getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete("/:id")
  private deleteTask(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch("/:id/status")
  private updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidation) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
