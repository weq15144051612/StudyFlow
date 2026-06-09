import { TaskService } from '../domain';
import { TaskDTO, CreateTaskDTO } from '../application';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    private toDTO;
    createTask(dto: CreateTaskDTO): TaskDTO;
    completeTask(taskId: string): TaskDTO;
    getTasksByUser(userId: string): TaskDTO[];
    getDueTasks(dateStr: string): TaskDTO[];
    updateTaskStatus(taskId: string, statusStr: string): TaskDTO;
    getTask(taskId: string): TaskDTO | null;
}
//# sourceMappingURL=TaskController.d.ts.map