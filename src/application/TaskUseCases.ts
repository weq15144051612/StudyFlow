import { TaskService, CreateTaskCommand } from '../domain';
import { Task } from '../domain';

export class CreateTaskUseCase {
  constructor(private readonly taskService: TaskService) {}

  execute(input: CreateTaskCommand): Task {
    if (!input.title || input.title.length > 100) {
      throw new Error('Task title is required and must be at most 100 characters');
    }

    if (!input.dueDate || input.dueDate < new Date()) {
      throw new Error('Due date must be in the future');
    }

    if (input.priority === 'high' && !input.dueDate) {
      throw new Error('High priority tasks must have a due date');
    }

    return this.taskService.createTask(input);
  }
}

export class CompleteTaskUseCase {
  constructor(private readonly taskService: TaskService) {}

  execute(taskId: string): Task {
    const task = this.taskService.getTaskById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskService.completeTask(taskId);
  }
}

export class ListTasksByPriorityUseCase {
  constructor(private readonly taskService: TaskService) {}

  execute(userId: string): Task[] {
    return this.taskService.listTasksByPriority(userId);
  }
}

export class ListDueTasksUseCase {
  constructor(private readonly taskService: TaskService) {}

  execute(date: Date): Task[] {
    return this.taskService.listDueTasks(date);
  }
}

export class UpdateTaskStatusUseCase {
  constructor(private readonly taskService: TaskService) {}

  execute(taskId: string, status: import('../domain').TaskStatus): Task {
    const task = this.taskService.getTaskById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskService.updateTaskStatus(taskId, status);
  }
}