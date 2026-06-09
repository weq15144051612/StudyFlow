"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCompletionRate = calculateCompletionRate;
exports.createProgressReport = createProgressReport;
function calculateCompletionRate(completed, total) {
    if (total === 0)
        return 0;
    return Math.round((completed / total) * 100 * 100) / 100;
}
function createProgressReport(userId, totalTasks, completedTasks) {
    return {
        userId,
        totalTasks,
        completedTasks,
        completionRate: calculateCompletionRate(completedTasks, totalTasks),
        generatedAt: new Date()
    };
}
//# sourceMappingURL=ProgressReport.js.map