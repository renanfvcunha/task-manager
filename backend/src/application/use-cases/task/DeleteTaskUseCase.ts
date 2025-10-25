import type { ITaskRepository } from "~/domain/repositories/ITaskRepository.js"
import type { ITaskValidator } from "~/domain/services/ITaskValidator.js"

export class DeleteTaskUseCase {
  taskRepository: ITaskRepository
  taskValidator: ITaskValidator

  constructor(taskRepository: ITaskRepository, taskValidator: ITaskValidator) {
    this.taskRepository = taskRepository
    this.taskValidator = taskValidator
  }

  async execute(id: string): Promise<void> {
    const isValidUUID = await this.taskValidator.checkValidUUID(id)
    if (!isValidUUID) throw new Error('invalidUUID')

    const task = await this.taskRepository.find(id)
    if (task == null) throw new Error('taskNotFound')

    await this.taskRepository.delete(id)
  }
}