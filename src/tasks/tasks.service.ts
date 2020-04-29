import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
import { v4 as uuidv4 } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      title,
      description,
      id: uuidv4(),
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  public getTaskbyId(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found"`);
    }

    return found;
  }

  public deleteTask(id: string): void {
    if (this.getTaskbyId(id))
      this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskbyId(id);
    task.status = status;
    return task;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    let tasks: Task[] = this.getAllTasks();

    const { status, search } = filterDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}
