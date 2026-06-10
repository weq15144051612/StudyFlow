import { v4 as uuidv4 } from 'uuid';
import { Priority } from './Priority';
import { TaskStatus } from './TaskStatus';

export interface TaskProps {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  status?: TaskStatus;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  completedAt?: Date | null;
  tags?: string[];
}

export class Task {
  public readonly id: string;
  public readonly userId: string;
  public title: string;
  public description: string;
  public priority: Priority;
  public status: TaskStatus;
  public dueDate: Date;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public completedAt: Date | null;
  public readonly tags: string[];

  constructor(props: TaskProps) {
    this.id = props.id || uuidv4();
    this.userId = props.userId;
    this.title = props.title;
    this.description = props.description || '';
    this.priority = props.priority;
    this.status = props.status || TaskStatus.TODO;
    this.dueDate = props.dueDate;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.completedAt = props.completedAt || null;
    this.tags = props.tags || [];
  }

  public complete(): void {
    if (this.status === TaskStatus.COMPLETED) {
      throw new Error('Task is already completed');
    }
    this.status = TaskStatus.COMPLETED;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  public updateStatus(newStatus: TaskStatus): void {
    if (this.status === TaskStatus.COMPLETED && newStatus === TaskStatus.TODO) {
      throw new Error('Completed task cannot be changed back to TODO');
    }
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  public isOverdue(): boolean {
    return this.dueDate < new Date() && this.status !== TaskStatus.COMPLETED;
  }
}