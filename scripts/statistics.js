import { state } from "./state.js"
import { getToday } from "./utils/date.js";
import { calculateStreak } from "./streaks.js";


export function calculateStats() {
    const habits = state.habits || [];
    const todayStr = getToday();

    // 1. Total habits
    const totalHabits = habits.length;

    // 2. Habits completed today
    let completedToday = 0;
    habits.forEach(habit => {
        if (habit.logs?.[todayStr]?.completed === true) {
            completedToday++;
        }
    });

    // 3. Completion rate (last 7 days)
    let totalLogs = state.habits.length;
    let completedLogs = 0;
    let completionRate

    const last7Days = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toISOString().split("T")[0]);
    }

    habits.forEach(habit => {
        if (!habit.logs) return;

        last7Days.forEach(dateStr => {
            const log = habit.logs[dateStr];
            if (log) {
                if (log.completed === true) {
                    completedLogs++;
                }
            }
        });
    });
    completionRate = totalLogs > 0 ? Math.round((completedToday / totalLogs) * 100) : 0;
    if (completionRate >= 100) {
        completionRate = "100";
    }


    // 4. Longest streak
    let longestStreak = 0;
    habits.forEach(habit => {
        const streak = habit.streak ?? calculateStreak(habit);
        if (streak > longestStreak) {
            longestStreak = streak;
        }
    });

    return {
        totalHabits,
        completedToday,
        completionRate,
        longestStreak
    };
}

export function updateStatsDisplay() {
    const stats = calculateStats();
    console.log("sdafdsf")

    document.getElementById("total-habits").textContent = stats.totalHabits;
    document.getElementById("fortnite").textContent = `${stats.completedToday} / ${stats.totalHabits}`;
    document.getElementById("completion-rate").textContent = `${stats.completionRate}%`;
    document.getElementById("longest-streak").textContent = stats.longestStreak;
}
document.addEventListener('DOMContentLoaded', () => {
    updateStatsDisplay();
});