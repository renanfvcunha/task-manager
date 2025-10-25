import type { Task } from "../entities/Task.js";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findAll(): Promise<Task[]>;
  find(id: string): Promise<Task | null>;
  update(id: string, task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}