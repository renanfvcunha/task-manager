import { z } from "zod";
import type { ITaskValidator } from "../../domain/services/ITaskValidator.js";
import type { CreateTaskDTO } from "../../application/dto/CreateTaskDTO.js";

export class TaskValidator implements ITaskValidator {
  async create(data: CreateTaskDTO): Promise<void> {
    const schema = z.object({
      title: z.string().min(3).max(255),
      description: z.string().min(3),
      completed: z.boolean()
    })

    await z.safeParseAsync(schema, data)
  }
}