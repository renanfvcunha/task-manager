import type { CreateTaskDTO } from "../../application/dto/CreateTaskDTO.js";

export interface ITaskValidator {
  create(task: CreateTaskDTO): Promise<void>;
  checkValidUUID(id: string): Promise<boolean>;
}