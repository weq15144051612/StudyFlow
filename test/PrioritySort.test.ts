import { Task } from '../src/domain/Task';
import { Priority } from '../src/domain/Priority';
import { TaskServiceImpl } from '../src/infrastructure/TaskServiceImpl';
import { InMemoryTaskRepository } from '../src/infrastructure/InMemoryTaskRepository';

describe('Priority Sorting', () => {
  let repository: InMemoryTaskRepository;
  let service: TaskServiceImpl;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    service = new TaskServiceImpl(repository);
  });

  describe('listTasksByPriority', () => {
    it('should sort tasks with all three priorities as HIGH -> MEDIUM -> LOW', () => {
      const lowTask = new Task({
        userId: 'user-001',
        title: 'Low Priority Task',
        priority: Priority.LOW,
        dueDate: new Date('2026-06-15')
      });

      const highTask = new Task({
        userId: 'user-001',
        title: 'High Priority Task',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      const mediumTask = new Task({
        userId: 'user-001',
        title: 'Medium Priority Task',
        priority: Priority.MEDIUM,
        dueDate: new Date('2026-06-15')
      });

      repository.save(lowTask);
      repository.save(highTask);
      repository.save(mediumTask);

      const sortedTasks = service.listTasksByPriority('user-001');

      expect(sortedTasks.length).toBe(3);
      expect(sortedTasks[0].priority).toBe(Priority.HIGH);
      expect(sortedTasks[1].priority).toBe(Priority.MEDIUM);
      expect(sortedTasks[2].priority).toBe(Priority.LOW);
    });

    it('should sort correctly with only two priorities', () => {
      const lowTask = new Task({
        userId: 'user-001',
        title: 'Low Priority Task',
        priority: Priority.LOW,
        dueDate: new Date('2026-06-15')
      });

      const highTask = new Task({
        userId: 'user-001',
        title: 'High Priority Task',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      repository.save(lowTask);
      repository.save(highTask);

      const sortedTasks = service.listTasksByPriority('user-001');

      expect(sortedTasks.length).toBe(2);
      expect(sortedTasks[0].priority).toBe(Priority.HIGH);
      expect(sortedTasks[1].priority).toBe(Priority.LOW);
    });

    it('should maintain original order for tasks with same priority (stable sort)', () => {
      const highTask1 = new Task({
        userId: 'user-001',
        title: 'High Priority Task 1',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      const highTask2 = new Task({
        userId: 'user-001',
        title: 'High Priority Task 2',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      const highTask3 = new Task({
        userId: 'user-001',
        title: 'High Priority Task 3',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });

      repository.save(highTask1);
      repository.save(highTask2);
      repository.save(highTask3);

      const sortedTasks = service.listTasksByPriority('user-001');

      expect(sortedTasks.length).toBe(3);
      expect(sortedTasks[0].title).toBe('High Priority Task 1');
      expect(sortedTasks[1].title).toBe('High Priority Task 2');
      expect(sortedTasks[2].title).toBe('High Priority Task 3');
    });

    it('should return empty array when no tasks exist', () => {
      const sortedTasks = service.listTasksByPriority('user-001');
      expect(sortedTasks).toEqual([]);
    });

    it('should return empty array for non-existent user', () => {
      const task = new Task({
        userId: 'user-001',
        title: 'Test Task',
        priority: Priority.HIGH,
        dueDate: new Date('2026-06-15')
      });
      repository.save(task);

      const sortedTasks = service.listTasksByPriority('non-existent-user');
      expect(sortedTasks).toEqual([]);
    });

    it('should handle mixed priorities with multiple tasks each', () => {
      const tasks = [
        { title: 'Task 1', priority: Priority.LOW as Priority },
        { title: 'Task 2', priority: Priority.HIGH as Priority },
        { title: 'Task 3', priority: Priority.MEDIUM as Priority },
        { title: 'Task 4', priority: Priority.HIGH as Priority },
        { title: 'Task 5', priority: Priority.LOW as Priority },
        { title: 'Task 6', priority: Priority.MEDIUM as Priority }
      ];

      tasks.forEach(({ title, priority }) => {
        repository.save(new Task({
          userId: 'user-001',
          title,
          priority,
          dueDate: new Date('2026-06-15')
        }));
      });

      const sortedTasks = service.listTasksByPriority('user-001');

      expect(sortedTasks.length).toBe(6);
      
      const highTasks = sortedTasks.filter(t => t.priority === Priority.HIGH);
      const mediumTasks = sortedTasks.filter(t => t.priority === Priority.MEDIUM);
      const lowTasks = sortedTasks.filter(t => t.priority === Priority.LOW);

      expect(highTasks.length).toBe(2);
      expect(mediumTasks.length).toBe(2);
      expect(lowTasks.length).toBe(2);

      expect(highTasks[0].title).toBe('Task 2');
      expect(highTasks[1].title).toBe('Task 4');
      expect(mediumTasks[0].title).toBe('Task 3');
      expect(mediumTasks[1].title).toBe('Task 6');
      expect(lowTasks[0].title).toBe('Task 1');
      expect(lowTasks[1].title).toBe('Task 5');
    });
  });
});