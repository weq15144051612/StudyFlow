import { Task } from '../src/domain/Task';
import { Priority } from '../src/domain/Priority';
import { TaskStatus } from '../src/domain/TaskStatus';

describe('Task Entity', () => {
  describe('Task Creation', () => {
    it('should create a task with valid properties', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        description: 'Test Description',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      expect(task.id).toBeDefined();
      expect(task.userId).toBe('user-001');
      expect(task.title).toBe('Test Task');
      expect(task.description).toBe('Test Description');
      expect(task.priority).toBe(Priority.HIGH);
      expect(task.status).toBe(TaskStatus.TODO);
      expect(task.completedAt).toBeNull();
    });

    it('should create a task with default values', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.MEDIUM,
        dueDate: new Date('2026-06-15')
      });

      expect(task.description).toBe('');
      expect(task.status).toBe(TaskStatus.TODO);
      expect(task.completedAt).toBeNull();
    });
  });

  describe('Task Completion', () => {
    it('should complete a task successfully', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      task.complete();

      expect(task.status).toBe(TaskStatus.COMPLETED);
      expect(task.completedAt).toBeInstanceOf(Date);
    });

    it('should throw error when completing an already completed task', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      task.complete();

      expect(() => task.complete()).toThrow('Task is already completed');
    });
  });

  describe('Task Status Update', () => {
    it('should update status from TODO to IN_PROGRESS', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.MEDIUM,
        dueDate: new Date('2026-06-15')
      });

      task.updateStatus(TaskStatus.IN_PROGRESS);

      expect(task.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it('should not allow changing completed task back to TODO', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      task.complete();

      expect(() => task.updateStatus(TaskStatus.TODO)).toThrow(
        'Completed task cannot be changed back to TODO'
      );
    });
  });

  describe('Task Overdue Check', () => {
    it('should detect overdue task', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.HIGH,
        dueDate: new Date('2025-01-01')
      });

      expect(task.isOverdue()).toBe(true);
    });

    it('should not mark completed task as overdue', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.HIGH,
        dueDate: new Date('2025-01-01')
      });

      task.complete();

      expect(task.isOverdue()).toBe(false);
    });
  });
});