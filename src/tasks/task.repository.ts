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
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await task.save();

    return task;
  }

  public async deleteTask(id: number, user: User): Promise<void> {
    const taskDeleting: DeleteResult = await this.delete({
      id,
      userId: user.id,
    });

    if (!taskDeleting.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return;
  }

  public async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<void> {
    const taskUpdating: UpdateResult = await this.update(
      { id, userId: user.id },
      { status },
    );

    if (!taskUpdating.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  public async getTasks(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const query: SelectQueryBuilder<Task> = this.createQueryBuilder("task");

    const { search, status } = filterDto;

    query.where("task.userId = :userId", { userId: user.id });

    if (search) {
      query.andWhere(
        "task.title LIKE :search OR task.description LIKE :search",
        {
          search: `%${search}%`,
        },
      );
    }

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    const tasks: Task[] = await query.getMany();

    return tasks;
  }

  public async getTaskById(id: number, user: User): Promise<Task> {
    const found: Task = await this.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }
}
