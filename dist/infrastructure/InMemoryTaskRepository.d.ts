import { Task, TaskRepository } from '../domain';
export declare class InMemoryTaskRepository implements TaskRepository {
    private tasks;
    save(task: Task): void;
    findById(id: string): Task | undefined;
    findByUserId(userId: string): Task[];
    findByDueDate(date: Date): Task[];
    delete(id: string): void;
    findAll(): Task[];
}
//# sourceMappingURL=InMemoryTaskRepository.d.ts.map