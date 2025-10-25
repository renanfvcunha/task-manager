import type { TaskDTO } from "~/application/dto/TaskDTO.js";
import { Task } from "~/domain/entities/Task.js";
import type { ITaskRepository } from "~/domain/repositories/ITaskRepository.js";
import type { ITaskValidator } from "~/domain/services/ITaskValidator.js";

export class CreateTaskUseCase {
  taskRepository: ITaskRepository
  taskValidator: ITaskValidator

  constructor(
    taskRepository: ITaskRepository,
    taskValidator: ITaskValidator
  ) {
    this.taskRepository = taskRepository
    this.taskValidator = taskValidator
  }

  async execute(data: TaskDTO): Promise<Task> {
    const task = new Task()
    task.title = data.title
    task.description = data.description

    await this.taskValidator.create(task)

    const createdTask = await this.taskRepository.create(task)
    return createdTask
  }
}