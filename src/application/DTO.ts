import { Priority } from '../domain/Priority';
import { TaskStatus } from '../domain/TaskStatus';

export interface CreateTaskDTO {
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: string;
}

export interface TaskDTO {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface ProgressReportDTO {
  userId: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  generatedAt: string;
}