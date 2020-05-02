import { Injectable } from "@nestjs/common";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  public async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  public async deleteTask(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<void> {
    await this.taskRepository.updateTaskStatus(id, status);
  }

  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
}
