import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase.js";
import { PrismaTaskRepository } from "../../infrastructure/database/prisma/PrismaTaskRepository.js";
import { TaskValidator } from "../../infrastructure/validators/TaskValidator.js";
import type { CreateTaskDTO } from "../../application/dto/CreateTaskDTO.js";

export class TaskController {
  static async createTask(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as CreateTaskDTO
    const repository = new PrismaTaskRepository()
    const validator = new TaskValidator()

    const useCase = new CreateTaskUseCase(repository, validator)

    try {
      const task = await useCase.execute(data)

      res.statusCode = 201
      res.send(task)
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.send({ message: 'Internal server error', cause: (error as Error).stack })
    }
  }
}