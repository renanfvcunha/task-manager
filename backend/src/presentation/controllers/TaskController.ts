import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskUseCase } from "~/application/use-cases/task/CreateTaskUseCase.js";
import { PrismaTaskRepository } from "~/infrastructure/database/prisma/PrismaTaskRepository.js";
import { ZodTaskValidator } from "~/infrastructure/validators/ZodTaskValidator.js";
import type { CreateTaskDTO } from "~/application/dto/CreateTaskDTO.js";
import { FindAllTasksUseCase } from "~/application/use-cases/task/FindAllTasksUseCase.js";
import { FindOneTaskUseCase } from "~/application/use-cases/task/FindOneTaskUseCase.js";

export class TaskController {
  static async createTask(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as CreateTaskDTO
    const repository = new PrismaTaskRepository()
    const validator = new ZodTaskValidator()

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
  
  static async findAllTasks(_: any, res: FastifyReply) {
    const repository = new PrismaTaskRepository()
    const useCase = new FindAllTasksUseCase(repository)
    
    try {
      const tasks = await useCase.execute()
      
      res.statusCode = 200
      res.send(tasks)
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.send({ message: 'Internal server error', cause: (error as Error).stack })
    }
  }
  
  static async findOneTask(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string }
    const repository = new PrismaTaskRepository()
    const validator = new ZodTaskValidator()
    const useCase = new FindOneTaskUseCase(repository, validator)
    
    try {
      const task = await useCase.execute(id)
      
      if (task == null) {
        res.statusCode = 404
        res.send({ message: 'Task not found' })
        return
      }
      
      res.statusCode = 200
      res.send(task)
    }
    catch (error) {
      if ((error as Error).message === 'invalidUUID') {
        res.statusCode = 400
        res.send({ message: 'Invalid ID' })
        return
      }

      console.error(error)
      res.statusCode = 500
      res.send({ message: 'Internal server error', cause: (error as Error).stack })
    }
  }
}