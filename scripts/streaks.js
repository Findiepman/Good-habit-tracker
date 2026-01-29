import { getPreviousDay } from "./utils/date.js";
import { getToday } from "./utils/date.js";

export function calculateStreak(habit) {
    let streak = 0;

    if (!habit.logs || Object.keys(habit.logs).length === 0) return 0;

    const today = getToday();
    const yesterday = getPreviousDay(today);

    // bepaal correcte startdag
    let currentDate;
    if (habit.logs[today]?.completed === true) {
        currentDate = today;
    } else {
        currentDate = yesterday;
    }

    // tel streak terug
    while (habit.logs[currentDate]?.completed === true) {
        streak++;
        currentDate = getPreviousDay(currentDate);
    }

    return streak;
}