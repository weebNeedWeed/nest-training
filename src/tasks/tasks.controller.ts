import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidation } from "./pipes/task-status-validation.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // private getTasks(
  //   @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  // ): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // private createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Get("/:id")
  // private getTaskById(@Param("id") id: string): Task {
  //   return this.tasksService.getTaskbyId(id);
  // }

  // @Delete("/:id")
  // private deleteTask(@Param("id") id: string): void {
  //   this.tasksService.deleteTask(id);
  // }

  // @Patch("/:id/status")
  // private updateTaskStatus(
  //   @Param("id") id: string,
  //   @Body("status", TaskStatusValidation) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
