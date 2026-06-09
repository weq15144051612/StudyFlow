export declare enum ReminderType {
    ONE_DAY_BEFORE = "one_day_before",
    INSTANT = "instant",
    DAILY_SUMMARY = "daily_summary"
}
export interface ReminderPolicy {
    type: ReminderType;
    daysBefore: number;
    isInstant: boolean;
}
export declare const ONE_DAY_BEFORE_POLICY: ReminderPolicy;
export declare const INSTANT_POLICY: ReminderPolicy;
export declare const DAILY_SUMMARY_POLICY: ReminderPolicy;
//# sourceMappingURL=ReminderPolicy.d.ts.map