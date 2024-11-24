import { Task } from "./task";

export interface TaskApiResponse {
  tasks: Task[];
  success: boolean;
  message?: string;
}
