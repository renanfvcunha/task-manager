import type { Task } from "~/domain/entities/Task.js"
import type { ITaskRepository } from "~/domain/repositories/ITaskRepository.js"

export class FindAllTasksUseCase {
  taskRepository: ITaskRepository

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll()
    
    return tasks
  }
}