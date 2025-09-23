import { Task } from "../../domain/entities/Task.js";
import type { ITaskRepository } from "../../domain/repositories/ITaskRepository.js";
import type { ITaskValidator } from "../../domain/services/ITaskValidator.js";
import type { CreateTaskDTO } from "../dto/CreateTaskDTO.js";

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

  async execute(data: CreateTaskDTO): Promise<Task> {
    const task = new Task()
    task.title = data.title
    task.description = data.description
    task.completed = data.completed

    await this.taskValidator.create(task)

    const createdTask = await this.taskRepository.create(task)
    return createdTask
  }
}