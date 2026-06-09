"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskStatusUseCase = exports.ListDueTasksUseCase = exports.ListTasksByPriorityUseCase = exports.CompleteTaskUseCase = exports.CreateTaskUseCase = void 0;
class CreateTaskUseCase {
    constructor(taskService) {
        this.taskService = taskService;
    }
    execute(input) {
        if (!input.title || input.title.length > 100) {
            throw new Error('Task title is required and must be at most 100 characters');
        }
        if (!input.dueDate || input.dueDate < new Date()) {
            throw new Error('Due date must be in the future');
        }
        if (input.priority === 'high' && !input.dueDate) {
            throw new Error('High priority tasks must have a due date');
        }
        return this.taskService.createTask(input);
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
class CompleteTaskUseCase {
    constructor(taskService) {
        this.taskService = taskService;
    }
    execute(taskId) {
        const task = this.taskService.getTaskById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        return this.taskService.completeTask(taskId);
    }
}
exports.CompleteTaskUseCase = CompleteTaskUseCase;
class ListTasksByPriorityUseCase {
    constructor(taskService) {
        this.taskService = taskService;
    }
    execute(userId) {
        return this.taskService.listTasksByPriority(userId);
    }
}
exports.ListTasksByPriorityUseCase = ListTasksByPriorityUseCase;
class ListDueTasksUseCase {
    constructor(taskService) {
        this.taskService = taskService;
    }
    execute(date) {
        return this.taskService.listDueTasks(date);
    }
}
exports.ListDueTasksUseCase = ListDueTasksUseCase;
class UpdateTaskStatusUseCase {
    constructor(taskService) {
        this.taskService = taskService;
    }
    execute(taskId, status) {
        const task = this.taskService.getTaskById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        return this.taskService.updateTaskStatus(taskId, status);
    }
}
exports.UpdateTaskStatusUseCase = UpdateTaskStatusUseCase;
//# sourceMappingURL=TaskUseCases.js.map