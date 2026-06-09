export enum ReminderType {
  ONE_DAY_BEFORE = 'one_day_before',
  INSTANT = 'instant',
  DAILY_SUMMARY = 'daily_summary'
}

export interface ReminderPolicy {
  type: ReminderType;
  daysBefore: number;
  isInstant: boolean;
}

export const ONE_DAY_BEFORE_POLICY: ReminderPolicy = {
  type: ReminderType.ONE_DAY_BEFORE,
  daysBefore: 1,
  isInstant: false
};

export const INSTANT_POLICY: ReminderPolicy = {
  type: ReminderType.INSTANT,
  daysBefore: 0,
  isInstant: true
};

export const DAILY_SUMMARY_POLICY: ReminderPolicy = {
  type: ReminderType.DAILY_SUMMARY,
  daysBefore: 0,
  isInstant: false
};