export interface TaskListProps {
    id?: string;
    userId: string;
    name: string;
    description?: string;
    taskIds?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class TaskList {
    readonly id: string;
    readonly userId: string;
    name: string;
    description: string;
    taskIds: string[];
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(props: TaskListProps);
    addTask(taskId: string): void;
    removeTask(taskId: string): void;
    hasTask(taskId: string): boolean;
}
//# sourceMappingURL=TaskList.d.ts.map