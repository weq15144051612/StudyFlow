"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    toDTO(task) {
        return {
            id: task.id,
            userId: task.userId,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate.toISOString(),
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString(),
            completedAt: task.completedAt ? task.completedAt.toISOString() : null
        };
    }
    createTask(dto) {
        const task = this.taskService.createTask({
            userId: dto.userId,
            title: dto.title,
            description: dto.description,
            priority: dto.priority,
            dueDate: new Date(dto.dueDate)
        });
        return this.toDTO(task);
    }
    completeTask(taskId) {
        const task = this.taskService.completeTask(taskId);
        return this.toDTO(task);
    }
    getTasksByUser(userId) {
        const tasks = this.taskService.listTasksByPriority(userId);
        return tasks.map(task => this.toDTO(task));
    }
    getDueTasks(dateStr) {
        const tasks = this.taskService.listDueTasks(new Date(dateStr));
        return tasks.map(task => this.toDTO(task));
    }
    updateTaskStatus(taskId, statusStr) {
        const status = Promise.resolve().then(() => __importStar(require('../domain/TaskStatus'))).TaskStatus[statusStr];
        const task = this.taskService.updateTaskStatus(taskId, status);
        return this.toDTO(task);
    }
    getTask(taskId) {
        const task = this.taskService.getTaskById(taskId);
        return task ? this.toDTO(task) : null;
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=TaskController.js.map