import {
  Repository,
  EntityRepository,
  DeleteResult,
  UpdateResult,
  SelectQueryBuilder,
} from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await task.save();

    return task;
  }

  public async deleteTask(id: number): Promise<void> {
    const taskDeleting: DeleteResult = await this.delete(id);
    if (!taskDeleting.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return;
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<void> {
    const taskUpdating: UpdateResult = await this.update(id, { status });
    if (!taskUpdating.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query: SelectQueryBuilder<Task> = this.createQueryBuilder("task");

    const { search, status } = filterDto;

    if (search) {
      query.where("task.title LIKE :search OR task.description LIKE :search", {
        search: `%${search}%`,
      });
    }

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    const tasks: Task[] = await query.getMany();

    return tasks;
  }

  public async getTaskById(id: number): Promise<Task> {
    const found: Task = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }
}
