import type { TaskDTO } from "../../application/dto/TaskDTO.js";

export interface ITaskValidator {
  create(task: TaskDTO): Promise<void>;
  checkValidUUID(id: string): Promise<boolean>;
}