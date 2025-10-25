import type { FastifyInstance } from "fastify";
import { TaskController } from "../controllers/TaskController.js";

export async function taskRoutes(app: FastifyInstance) {
  app.post('/task', TaskController.createTask)
  app.get('/task', TaskController.findAllTasks)
  app.get('/task/:id', TaskController.findOneTask)
  app.put('/task/:id', TaskController.updateTask)
  app.delete('/task/:id', TaskController.deleteTask)
}