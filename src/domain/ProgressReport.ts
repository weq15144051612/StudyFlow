export interface ProgressReport {
  userId: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  generatedAt: Date;
}

export function calculateCompletionRate(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100 * 100) / 100;
}

export function createProgressReport(
  userId: string,
  totalTasks: number,
  completedTasks: number
): ProgressReport {
  return {
    userId,
    totalTasks,
    completedTasks,
    completionRate: calculateCompletionRate(completedTasks, totalTasks),
    generatedAt: new Date()
  };
}