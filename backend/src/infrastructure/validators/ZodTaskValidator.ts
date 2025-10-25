import { z } from "zod";
import type { ITaskValidator } from "~/domain/services/ITaskValidator.js";
import type { TaskDTO } from "~/application/dto/TaskDTO.js";

export class ZodTaskValidator implements ITaskValidator {
  async create(data: TaskDTO): Promise<void> {
    const schema = z.object({
      title: z.string().min(3).max(255),
      description: z.string().min(3),
      completed: z.boolean()
    })

    await z.safeParseAsync(schema, data)
  }

  async checkValidUUID(id: string): Promise<boolean> {
    const schema = z.uuidv4()
    const result = await z.safeParseAsync(schema, id)

    return result.success
  }
}