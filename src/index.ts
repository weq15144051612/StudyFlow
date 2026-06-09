import { TaskServiceImpl, InMemoryTaskRepository } from './infrastructure';
import { TaskController } from './interfaces';
import { CreateTaskUseCase, CompleteTaskUseCase, ListTasksByPriorityUseCase } from './application';
import { Priority, TaskStatus } from './domain';

const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskServiceImpl(taskRepository);
const taskController = new TaskController(taskService);

const createTaskUseCase = new CreateTaskUseCase(taskService);
const completeTaskUseCase = new CompleteTaskUseCase(taskService);
const listTasksUseCase = new ListTasksByPriorityUseCase(taskService);

console.log('=== StudyFlow Task Management System ===\n');

try {
  const task1 = createTaskUseCase.execute({
    userId: 'user-001',
    title: 'Complete software construction lab',
    description: 'Finish experiment 1 for software construction course',
    priority: Priority.HIGH,
    dueDate: new Date('2026-06-10')
  });
  console.log('Created Task:', task1.title, '- Priority:', task1.priority);

  const task2 = createTaskUseCase.execute({
    userId: 'user-001',
    title: 'Review design patterns',
    description: 'Review strategy and state pattern',
    priority: Priority.MEDIUM,
    dueDate: new Date('2026-06-15')
  });
  console.log('Created Task:', task2.title, '- Priority:', task2.priority);

  const task3 = createTaskUseCase.execute({
    userId: 'user-001',
    title: 'Read textbook chapter 5',
    priority: Priority.LOW,
    dueDate: new Date('2026-06-20')
  });
  console.log('Created Task:', task3.title, '- Priority:', task3.priority);

  console.log('\n--- Tasks by Priority ---');
  const sortedTasks = listTasksUseCase.execute('user-001');
  sortedTasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.priority.toUpperCase()}] ${task.title} - Due: ${task.dueDate.toLocaleDateString()}`);
  });

  console.log('\n--- Completing Task 1 ---');
  const completedTask = completeTaskUseCase.execute(task1.id);
  console.log('Completed Task:', completedTask.title, '- Status:', completedTask.status);

  console.log('\n--- Updated Task List ---');
  const updatedTasks = listTasksUseCase.execute('user-001');
  updatedTasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.priority.toUpperCase()}] ${task.title} - Status: ${task.status}`);
  });

  console.log('\n=== System Initialized Successfully ===');
} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : String(error));
}