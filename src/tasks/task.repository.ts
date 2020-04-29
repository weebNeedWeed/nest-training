import { Task } from "./tasks.model";
import { Repository } from "typeorm";

export class TaskRepository extends Repository<Task> {}
