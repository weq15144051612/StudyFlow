import { Task } from './Task';

export interface TaskSortStrategy {
  sort(tasks: Task[]): Task[];
}