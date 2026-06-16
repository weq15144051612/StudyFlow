import { Task } from '../src/domain/Task';
import { Priority } from '../src/domain/Priority';
import { InMemoryTaskRepository } from '../src/infrastructure/InMemoryTaskRepository';
import { TaskServiceImpl } from '../src/infrastructure/TaskServiceImpl';

describe('Tag Filtering', () => {
  let repository: InMemoryTaskRepository;
  let service: TaskServiceImpl;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    service = new TaskServiceImpl(repository);
  });

  describe('Task Creation with Tags', () => {
    it('should create a task with tags', () => {
      const task = service.createTask({
        userId: 'user1',
        title: 'Learn TypeScript',
        priority: Priority.HIGH,
        dueDate: new Date('2026-12-31'),
        tags: ['learning', 'programming']
      });

      expect(task.tags).toEqual(['learning', 'programming']);
    });

    it('should create a task without tags (default empty array)', () => {
      const task = service.createTask({
        userId: 'user1',
        title: 'Read book',
        priority: Priority.MEDIUM,
        dueDate: new Date('2026-12-31')
      });

      expect(task.tags).toEqual([]);
    });

    it('should create a task with empty tags array', () => {
      const task = service.createTask({
        userId: 'user1',
        title: 'Empty tags task',
        priority: Priority.LOW,
        dueDate: new Date('2026-12-31'),
        tags: []
      });

      expect(task.tags).toEqual([]);
    });
  });

  describe('listTasksByTag', () => {
    it('should return tasks with matching tag', () => {
      // Create tasks with different tags
      service.createTask({
        userId: 'user1',
        title: 'Task 1',
        priority: Priority.HIGH,
        dueDate: new Date('2026-12-31'),
        tags: ['work', 'urgent']
      });
      service.createTask({
        userId: 'user1',
        title: 'Task 2',
        priority: Priority.MEDIUM,
        dueDate: new Date('2026-12-31'),
        tags: ['personal']
      });
      service.createTask({
        userId: 'user1',
        title: 'Task 3',
        priority: Priority.LOW,
        dueDate: new Date('2026-12-31'),
        tags: ['work', 'docs']
      });

      const result = service.listTasksByTag('user1', 'work');

      expect(result.length).toBe(2);
      expect(result.map(t => t.title)).toContain('Task 1');
      expect(result.map(t => t.title)).toContain('Task 3');
    });

    it('should return empty array when no tasks match', () => {
      service.createTask({
        userId: 'user1',
        title: 'Task 1',
        priority: Priority.HIGH,
        dueDate: new Date('2026-12-31'),
        tags: ['work']
      });

      const result = service.listTasksByTag('user1', 'personal');

      expect(result).toEqual([]);
    });

    it('should filter by user ID', () => {
      service.createTask({
        userId: 'user1',
        title: 'User1 Task',
        priority: Priority.HIGH,
        dueDate: new Date('2026-12-31'),
        tags: ['work']
      });
      service.createTask({
        userId: 'user2',
        title: 'User2 Task',
        priority: Priority.MEDIUM,
        dueDate: new Date('2026-12-31'),
        tags: ['work']
      });

      const result = service.listTasksByTag('user1', 'work');

      expect(result.length).toBe(1);
      expect(result[0].title).toBe('User1 Task');
    });

    it('should return empty array for non-existent user', () => {
      const result = service.listTasksByTag('nonexistent', 'work');

      expect(result).toEqual([]);
    });

    it('should handle tasks without tags', () => {
      service.createTask({
        userId: 'user1',
        title: 'Task with tags',
        priority: Priority.HIGH,
        dueDate: new Date('2026-12-31'),
        tags: ['work']
      });
      service.createTask({
        userId: 'user1',
        title: 'Task without tags',
        priority: Priority.MEDIUM,
        dueDate: new Date('2026-12-31')
      });

      const result = service.listTasksByTag('user1', 'work');

      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Task with tags');
    });
  });
});
