"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServiceImpl = void 0;
const domain_1 = require("../domain");
const Priority_1 = require("../domain/Priority");
class TaskServiceImpl {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(input) {
        const task = new domain_1.Task({
            userId: input.userId,
            title: input.title,
            description: input.description,
            priority: input.priority,
            dueDate: input.dueDate
        });
        this.taskRepository.save(task);
        return task;
    }
    completeTask(taskId) {
        const task = this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.complete();
        this.taskRepository.save(task);
        return task;
    }
    listTasksByPriority(userId) {
        const tasks = this.taskRepository.findByUserId(userId);
        return tasks.sort((a, b) => {
            const priorityOrder = { [Priority_1.Priority.HIGH]: 0, [Priority_1.Priority.MEDIUM]: 1, [Priority_1.Priority.LOW]: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
    listDueTasks(date) {
        return this.taskRepository.findByDueDate(date);
    }
    getTaskById(taskId) {
        return this.taskRepository.findById(taskId);
    }
    updateTaskStatus(taskId, status) {
        const task = this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.updateStatus(status);
        this.taskRepository.save(task);
        return task;
    }
}
exports.TaskServiceImpl = TaskServiceImpl;
//# sourceMappingURL=TaskServiceImpl.js.map