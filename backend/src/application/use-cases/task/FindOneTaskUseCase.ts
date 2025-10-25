import type { Task } from "~/domain/entities/Task.js"
import type { ITaskRepository } from "~/domain/repositories/ITaskRepository.js"
import type { ITaskValidator } from "~/domain/services/ITaskValidator.js"

export class FindOneTaskUseCase {
  taskRepository: ITaskRepository
  taskValidator: ITaskValidator

  constructor(taskRepository: ITaskRepository, taskValidator: ITaskValidator) {
    this.taskRepository = taskRepository
    this.taskValidator = taskValidator
  }

  async execute(id: string): Promise<Task | null> {
    const isValidUUID = await this.taskValidator.checkValidUUID(id)
    if (!isValidUUID) throw new Error('invalidUUID')

    const task = await this.taskRepository.find(id)

    return task
  }
}