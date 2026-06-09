import { TaskService, CreateTaskCommand } from '../domain';
import { Task } from '../domain';
export declare class CreateTaskUseCase {
    private readonly taskService;
    constructor(taskService: TaskService);
    execute(input: CreateTaskCommand): Task;
}
export declare class CompleteTaskUseCase {
    private readonly taskService;
    constructor(taskService: TaskService);
    execute(taskId: string): Task;
}
export declare class ListTasksByPriorityUseCase {
    private readonly taskService;
    constructor(taskService: TaskService);
    execute(userId: string): Task[];
}
export declare class ListDueTasksUseCase {
    private readonly taskService;
    constructor(taskService: TaskService);
    execute(date: Date): Task[];
}
export declare class UpdateTaskStatusUseCase {
    private readonly taskService;
    constructor(taskService: TaskService);
    execute(taskId: string, status: import('../domain').TaskStatus): Task;
}
//# sourceMappingURL=TaskUseCases.d.ts.map