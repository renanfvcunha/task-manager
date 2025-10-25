import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskUseCase } from "~/application/use-cases/task/CreateTaskUseCase.js";
import { PrismaTaskRepository } from "~/infrastructure/database/prisma/PrismaTaskRepository.js";
import { ZodTaskValidator } from "~/infrastructure/validators/ZodTaskValidator.js";
import type { TaskDTO } from "~/application/dto/TaskDTO.js";
import { FindAllTasksUseCase } from "~/application/use-cases/task/FindAllTasksUseCase.js";
import { FindOneTaskUseCase } from "~/application/use-cases/task/FindOneTaskUseCase.js";
import { UpdateTaskUseCase } from "~/application/use-cases/task/UpdateTaskUseCase.js";
import z, { ZodError } from "zod";
import { DeleteTaskUseCase } from "~/application/use-cases/task/DeleteTaskUseCase.js";

export class TaskController {
  static async createTask(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as TaskDTO
    const repository = new PrismaTaskRepository()
    const validator = new ZodTaskValidator()

    const useCase = new CreateTaskUseCase(repository, validator)

    try {
      const task = await useCase.execute(data)

      res.statusCode = 201
      res.send(task)
    } catch (error) {
      if (error instanceof ZodError) {
        res.statusCode = 404
        res.send({ message: z.prettifyError(error) })
        return
      }

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

  static async updateTask(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string }
    const data = req.body as TaskDTO
    const validator = new ZodTaskValidator()
    const repository = new PrismaTaskRepository()
    const useCase = new UpdateTaskUseCase(repository, validator)

    try {
      const updatedTask = await useCase.execute(id, data)

      res.send(updatedTask)
    } catch (error) {
      const err = error as Error

      if (err.message === 'invalidUUID') {
        res.statusCode = 400
        res.send({ message: 'Invalid ID' })
        return
      }

      if (err.message === 'taskNotFound') {
        res.statusCode = 404
        res.send({ message: 'Task not found' })
        return
      }

      if (error instanceof ZodError) {
        res.statusCode = 400
        console.log(error.issues)
        res.send({ message: "Input validation error", errors: error.issues.map(issue => `${issue.path}: ${issue.message}`) })
        return
      }

      console.error(err)
      res.statusCode = 500
      res.send({ message: 'Internal server error', cause: err.stack })
    }
  }

  static async deleteTask(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string }
    const validator = new ZodTaskValidator()
    const repository = new PrismaTaskRepository()
    const useCase = new DeleteTaskUseCase(repository, validator)

    try {
      await useCase.execute(id)

      res.statusCode = 204
      res.send()
    } catch (error) {
      const err = error as Error

      if (err.message === 'invalidUUID') {
        res.statusCode = 400
        res.send({ message: 'Invalid ID' })
        return
      }

      if (err.message === 'taskNotFound') {
        res.statusCode = 404
        res.send({ message: 'Task not found' })
        return
      }

      console.error(err)
      res.statusCode = 500
      res.send({ message: 'Internal server error', cause: err.stack })
    }
  }
}