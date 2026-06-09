import { Task } from './Task';
import { TaskStatus } from './TaskStatus';
import { Priority } from './Priority';

export interface CreateTaskCommand {
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: Date;
}

export interface TaskService {
  createTask(input: CreateTaskCommand): Task;
  completeTask(taskId: string): Task;
  listTasksByPriority(userId: string): Task[];
  listDueTasks(date: Date): Task[];
  getTaskById(taskId: string): Task | undefined;
  updateTaskStatus(taskId: string, status: TaskStatus): Task;
}

export interface TaskRepository {
  save(task: Task): void;
  findById(id: string): Task | undefined;
  findByUserId(userId: string): Task[];
  findByDueDate(date: Date): Task[];
  delete(id: string): void;
}

export interface UserService {
  createUser(name: string, email: string): import('./User').User;
  getUserById(id: string): import('./User').User | undefined;
}

export interface UserRepository {
  save(user: import('./User').User): void;
  findById(id: string): import('./User').User | undefined;
  findAll(): import('./User').User[];
}