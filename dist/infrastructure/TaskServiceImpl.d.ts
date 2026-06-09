import { TaskService, TaskRepository, CreateTaskCommand, Task } from '../domain';
export declare class TaskServiceImpl implements TaskService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    createTask(input: CreateTaskCommand): Task;
    completeTask(taskId: string): Task;
    listTasksByPriority(userId: string): Task[];
    listDueTasks(date: Date): Task[];
    getTaskById(taskId: string): Task | undefined;
    updateTaskStatus(taskId: string, status: import('../domain').TaskStatus): Task;
}
//# sourceMappingURL=TaskServiceImpl.d.ts.map