import { v4 as uuidv4 } from 'uuid';

export interface TaskListProps {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  taskIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class TaskList {
  public readonly id: string;
  public readonly userId: string;
  public name: string;
  public description: string;
  public taskIds: string[];
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: TaskListProps) {
    this.id = props.id || uuidv4();
    this.userId = props.userId;
    this.name = props.name;
    this.description = props.description || '';
    this.taskIds = props.taskIds || [];
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public addTask(taskId: string): void {
    if (!this.taskIds.includes(taskId)) {
      this.taskIds.push(taskId);
      this.updatedAt = new Date();
    }
  }

  public removeTask(taskId: string): void {
    const index = this.taskIds.indexOf(taskId);
    if (index !== -1) {
      this.taskIds.splice(index, 1);
      this.updatedAt = new Date();
    }
  }

  public hasTask(taskId: string): boolean {
    return this.taskIds.includes(taskId);
  }
}