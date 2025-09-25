import type { FastifyInstance } from "fastify";
import { TaskController } from "../controllers/TaskController.js";

export async function taskRoutes(app: FastifyInstance) {
  app.post('/task', TaskController.createTask)
}