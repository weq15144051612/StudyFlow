import { TaskService } from '../domain';
import { TaskDTO, CreateTaskDTO } from '../application';

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  private toDTO(task: import('../domain').Task): TaskDTO {
    return {
      id: task.id,
      userId: task.userId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate.toISOString(),
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      completedAt: task.completedAt ? task.completedAt.toISOString() : null
    };
  }

  createTask(dto: CreateTaskDTO): TaskDTO {
    const task = this.taskService.createTask({
      userId: dto.userId,
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      dueDate: new Date(dto.dueDate)
    });
    return this.toDTO(task);
  }

  completeTask(taskId: string): TaskDTO {
    const task = this.taskService.completeTask(taskId);
    return this.toDTO(task);
  }

  getTasksByUser(userId: string): TaskDTO[] {
    const tasks = this.taskService.listTasksByPriority(userId);
    return tasks.map(task => this.toDTO(task));
  }

  getDueTasks(dateStr: string): TaskDTO[] {
    const tasks = this.taskService.listDueTasks(new Date(dateStr));
    return tasks.map(task => this.toDTO(task));
  }

  updateTaskStatus(taskId: string, statusStr: string): TaskDTO {
    const status = import('../domain/TaskStatus').TaskStatus[statusStr as keyof typeof import('../domain/TaskStatus').TaskStatus];
    const task = this.taskService.updateTaskStatus(taskId, status);
    return this.toDTO(task);
  }

  getTask(taskId: string): TaskDTO | null {
    const task = this.taskService.getTaskById(taskId);
    return task ? this.toDTO(task) : null;
  }
}