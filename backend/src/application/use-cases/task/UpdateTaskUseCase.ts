import type { TaskDTO } from "~/application/dto/TaskDTO.js"
import type { Task } from "~/domain/entities/Task.js"
import type { ITaskRepository } from "~/domain/repositories/ITaskRepository.js"
import type { ITaskValidator } from "~/domain/services/ITaskValidator.js"

export class UpdateTaskUseCase {
  taskRepository: ITaskRepository
  taskValidator: ITaskValidator

  constructor(taskRepository: ITaskRepository, taskValidator: ITaskValidator) {
    this.taskRepository = taskRepository
    this.taskValidator = taskValidator
  }

  async execute(id: string, data: TaskDTO): Promise<Task> {
    const isValidUUID = await this.taskValidator.checkValidUUID(id)
    if (!isValidUUID) throw new Error('invalidUUID')

    const task = await this.taskRepository.find(id)
    if (task == null) throw new Error('taskNotFound')

    task.title = data.title
    task.description = data.description

    await this.taskValidator.validate(task)

    const updatedTask = await this.taskRepository.update(id, task)
    return updatedTask
  }
}