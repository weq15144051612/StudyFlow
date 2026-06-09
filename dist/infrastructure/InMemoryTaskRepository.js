"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTaskRepository = void 0;
class InMemoryTaskRepository {
    constructor() {
        this.tasks = new Map();
    }
    save(task) {
        this.tasks.set(task.id, task);
    }
    findById(id) {
        return this.tasks.get(id);
    }
    findByUserId(userId) {
        return Array.from(this.tasks.values()).filter(task => task.userId === userId);
    }
    findByDueDate(date) {
        const targetDateStr = date.toISOString().split('T')[0];
        return Array.from(this.tasks.values()).filter(task => {
            const taskDateStr = task.dueDate.toISOString().split('T')[0];
            return taskDateStr === targetDateStr;
        });
    }
    delete(id) {
        this.tasks.delete(id);
    }
    findAll() {
        return Array.from(this.tasks.values());
    }
}
exports.InMemoryTaskRepository = InMemoryTaskRepository;
//# sourceMappingURL=InMemoryTaskRepository.js.map