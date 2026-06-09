export interface ProgressReport {
    userId: string;
    totalTasks: number;
    completedTasks: number;
    completionRate: number;
    generatedAt: Date;
}
export declare function calculateCompletionRate(completed: number, total: number): number;
export declare function createProgressReport(userId: string, totalTasks: number, completedTasks: number): ProgressReport;
//# sourceMappingURL=ProgressReport.d.ts.map