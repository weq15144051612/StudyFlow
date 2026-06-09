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
}
export declare class Task {
    readonly id: string;
    readonly userId: string;
    title: string;
    description: string;
    priority: Priority;
    status: TaskStatus;
    dueDate: Date;
    readonly createdAt: Date;
    updatedAt: Date;
    completedAt: Date | null;
    constructor(props: TaskProps);
    complete(): void;
    updateStatus(newStatus: TaskStatus): void;
    isOverdue(): boolean;
}
//# sourceMappingURL=Task.d.ts.map