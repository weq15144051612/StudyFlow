"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
const TaskStatus_1 = require("./TaskStatus");
class Task {
    constructor(props) {
        this.id = props.id || (0, uuid_1.v4)();
        this.userId = props.userId;
        this.title = props.title;
        this.description = props.description || '';
        this.priority = props.priority;
        this.status = props.status || TaskStatus_1.TaskStatus.TODO;
        this.dueDate = props.dueDate;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
        this.completedAt = props.completedAt || null;
    }
    complete() {
        if (this.status === TaskStatus_1.TaskStatus.COMPLETED) {
            throw new Error('Task is already completed');
        }
        this.status = TaskStatus_1.TaskStatus.COMPLETED;
        this.completedAt = new Date();
        this.updatedAt = new Date();
    }
    updateStatus(newStatus) {
        if (this.status === TaskStatus_1.TaskStatus.COMPLETED && newStatus === TaskStatus_1.TaskStatus.TODO) {
            throw new Error('Completed task cannot be changed back to TODO');
        }
        this.status = newStatus;
        this.updatedAt = new Date();
    }
    isOverdue() {
        return this.dueDate < new Date() && this.status !== TaskStatus_1.TaskStatus.COMPLETED;
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map