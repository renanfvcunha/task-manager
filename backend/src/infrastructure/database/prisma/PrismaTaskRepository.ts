import type { Task } from "~/domain/entities/Task.js";
import type { ITaskRepository } from "~/domain/repositories/ITaskRepository.js";
import { db } from "./index.js";

export class PrismaTaskRepository implements ITaskRepository {
  async create(task: Task): Promise<Task> {
    const created = await db.task.create({
      data: {
        title: task.title,
        description: task.description
      }
    })

    return created
  }

  async findAll(): Promise<Task[]> {
    const tasks = await db.task.findMany()

    return tasks
  }

  async find(id: string): Promise<Task | null> {
    const task = await db.task.findFirst({
      where: {
        id
      }
    })

    return task
  }

  async update(id: string, task: Task): Promise<Task> {
    const result = await db.task.update({
      where: {
        id
      },
      data: {
        title: task.title,
        description: task.description
      }
    })

    return result
  }

  async delete(id: string): Promise<void> {
    await db.task.delete({
      where: {
        id
      }
    })
  }
}