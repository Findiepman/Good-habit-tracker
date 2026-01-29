import { state } from "./state.js";
import { calculateStreak } from "./streaks.js";
import { openhabitDelete } from "./habits.js";
import { openHabitModal } from "./modal.js";
import { getToday } from "./utils/date.js";

export function renderHabits() {
    const grid = document.getElementById("habits-grid");
    grid.innerHTML = "";


    state.habits.forEach(habit => {
        habit.streak = calculateStreak(habit);
        const card = document.createElement("div");
        card.className = "habit-card";
        // header
        const header = document.createElement("div");
        header.className = "habit-header";

        const title = document.createElement("h3");
        title.textContent = habit.name;

        const streak = document.createElement("span");
        streak.className = "habit-streak";
        streak.textContent = habit.streak ? `🔥 ${habit.streak}-day streak` : "No streak";

        header.appendChild(title);
        header.appendChild(streak);

        // description
        const desc = document.createElement("p");
        desc.className = "habit-desc";
        desc.textContent = habit.desc || "";

        // daily check button
        const today = getToday();
        const doneToday = habit.logs?.[today];

        const checkBtn = document.createElement("button");
        checkBtn.className = "daily-check";
        checkBtn.textContent = doneToday ? "🗸" : "☓";




        // card click
        card.addEventListener("click", (e) => {
            if (e.ctrlKey) {
                openhabitDelete(habit);
                return;
            }
            openHabitModal(habit);
        });

        // append alles
        card.appendChild(header);
        card.appendChild(desc);
        card.appendChild(checkBtn);

        grid.appendChild(card);
    });
}