"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskList = void 0;
const uuid_1 = require("uuid");
class TaskList {
    constructor(props) {
        this.id = props.id || (0, uuid_1.v4)();
        this.userId = props.userId;
        this.name = props.name;
        this.description = props.description || '';
        this.taskIds = props.taskIds || [];
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }
    addTask(taskId) {
        if (!this.taskIds.includes(taskId)) {
            this.taskIds.push(taskId);
            this.updatedAt = new Date();
        }
    }
    removeTask(taskId) {
        const index = this.taskIds.indexOf(taskId);
        if (index !== -1) {
            this.taskIds.splice(index, 1);
            this.updatedAt = new Date();
        }
    }
    hasTask(taskId) {
        return this.taskIds.includes(taskId);
    }
}
exports.TaskList = TaskList;
//# sourceMappingURL=TaskList.js.map