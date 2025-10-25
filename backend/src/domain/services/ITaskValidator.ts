import type { TaskDTO } from "../../application/dto/TaskDTO.js";

export interface ITaskValidator {
  validate(task: TaskDTO): Promise<void>;
  checkValidUUID(id: string): Promise<boolean>;
}