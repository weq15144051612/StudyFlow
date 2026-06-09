import { Task, TaskRepository } from '../domain';

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Map<string, Task> = new Map();

  save(task: Task): void {
    this.tasks.set(task.id, task);
  }

  findById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  findByUserId(userId: string): Task[] {
    return Array.from(this.tasks.values()).filter(task => task.userId === userId);
  }

  findByDueDate(date: Date): Task[] {
    const targetDateStr = date.toISOString().split('T')[0];
    return Array.from(this.tasks.values()).filter(task => {
      const taskDateStr = task.dueDate.toISOString().split('T')[0];
      return taskDateStr === targetDateStr;
    });
  }

  delete(id: string): void {
    this.tasks.delete(id);
  }

  findAll(): Task[] {
    return Array.from(this.tasks.values());
  }
}