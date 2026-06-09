import { TaskService, TaskRepository, CreateTaskCommand, Task } from '../domain';
import { TaskSortStrategy } from '../domain/TaskSortStrategy';
import { PrioritySortStrategy } from '../domain/strategy/PrioritySortStrategy';

export class TaskServiceImpl implements TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly sortStrategy: TaskSortStrategy = new PrioritySortStrategy()
  ) {}

  createTask(input: CreateTaskCommand): Task {
    const task = new Task({
      userId: input.userId,
      title: input.title,
      description: input.description,
      priority: input.priority,
      dueDate: input.dueDate
    });
    this.taskRepository.save(task);
    return task;
  }

  completeTask(taskId: string): Task {
    const task = this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    task.complete();
    this.taskRepository.save(task);
    return task;
  }

  listTasksByPriority(userId: string): Task[] {
    const tasks = this.taskRepository.findByUserId(userId);
    return this.sortStrategy.sort(tasks);
  }

  listDueTasks(date: Date): Task[] {
    return this.taskRepository.findByDueDate(date);
  }

  getTaskById(taskId: string): Task | undefined {
    return this.taskRepository.findById(taskId);
  }

  updateTaskStatus(taskId: string, status: import('../domain').TaskStatus): Task {
    const task = this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    task.updateStatus(status);
    this.taskRepository.save(task);
    return task;
  }
}