import { TaskSortStrategy } from '../TaskSortStrategy';
import { Task } from '../Task';
import { Priority } from '../Priority';

export class PrioritySortStrategy implements TaskSortStrategy {
  private priorityOrder: Record<Priority, number>;

  constructor(order?: Record<Priority, number>) {
    this.priorityOrder = order || {
      [Priority.HIGH]: 0,
      [Priority.MEDIUM]: 1,
      [Priority.LOW]: 2
    };
  }

  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      return this.priorityOrder[a.priority] - this.priorityOrder[b.priority];
    });
  }
}