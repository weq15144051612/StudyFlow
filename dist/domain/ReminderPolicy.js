"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAILY_SUMMARY_POLICY = exports.INSTANT_POLICY = exports.ONE_DAY_BEFORE_POLICY = exports.ReminderType = void 0;
var ReminderType;
(function (ReminderType) {
    ReminderType["ONE_DAY_BEFORE"] = "one_day_before";
    ReminderType["INSTANT"] = "instant";
    ReminderType["DAILY_SUMMARY"] = "daily_summary";
})(ReminderType || (exports.ReminderType = ReminderType = {}));
exports.ONE_DAY_BEFORE_POLICY = {
    type: ReminderType.ONE_DAY_BEFORE,
    daysBefore: 1,
    isInstant: false
};
exports.INSTANT_POLICY = {
    type: ReminderType.INSTANT,
    daysBefore: 0,
    isInstant: true
};
exports.DAILY_SUMMARY_POLICY = {
    type: ReminderType.DAILY_SUMMARY,
    daysBefore: 0,
    isInstant: false
};
//# sourceMappingURL=ReminderPolicy.js.map