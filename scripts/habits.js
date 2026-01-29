import { activeHabitId } from "./app.js";
import { state } from "./state.js";
import { saveHabits } from "./storage.js";
import { getToday } from "./utils/date.js";
import { elements } from "./element.js";
import { renderHabits } from "./ui.js";

export function createHabit(name, desc) {
    const existingHabit = state.habits.find(habit => habit.name === name.toLowerCase());
    if (!existingHabit && name && desc) {
        const newHabit =
        {
            name: name,
            id: Date.now(),
            desc: desc,
            logs: {},
        }
        state.habits.push(newHabit)
        console.log(state.habits)
        elements.habitNaam.value = "";
        elements.habitdesc.value = "";
        saveHabits();
        renderHabits();
    }
    else {
        elements.habitInput.placeholder = "A habit with that name already exists!"
        setTimeout(function () {
            elements.habitInput.placeholder = "Voer je habit in";
        }, 2000)
    }
}
export function deleteHabit(id) {
    state.habits = state.habits.filter(h => h.id !== id);
    saveHabits();
    renderHabits();
}
export function openhabitDelete(habit) {
    let activeHabitId = habit.id;


    delhabit.style.display = "flex"; // modal tonen

    // close modal als je buiten klikt
    elements.delhabitmenu.addEventListener("click", (e) => {
        if (e.target === elements.delhabitmenu) {
            elements.delhabit.style.display = "none";
        }
    });

    elements.habitconfirmBtn.addEventListener("click", function () {
        if (elements.habitDetailModal.style.display == "flex") { elements.habitDetailModal.style.display = "none" }
        delhabit.style.display = "none"
        deleteHabit(habit.id);
    })


}
export function toggleDailyLog(habitId) {
    const habit = state.habits.find(h => h.id === habitId);
    if (!habit) return;

    const today = getToday();
    if (!habit.logs) habit.logs = {};
    if (!habit.logs[today]) habit.logs[today] = { completed: false, note: "" };

    // Enkel markeren als complete, geen toggle
    habit.logs[today].completed = true;

    saveHabits();
}
export function getTodayLog(habit) {
    const today = getToday();
    if (!habit.logs) habit.logs = {};
    if (!habit.logs[today]) habit.logs[today] = { completed: false, note: "" };
    return habit.logs[today];
}


export function isHabitDoneToday(habit) {
    const today = getToday();
    return habit.logs?.[today]?.completed === true;
}

export function saveDailyNote(note) {
    if (!activeHabitId) return;

    const habit = state.habits.find(h => h.id === activeHabitId);
    if (!habit) return;

    const today = getToday();

    if (!habit.logs) habit.logs = {};
    if (!habit.logs[today]) {
        habit.logs[today] = { completed: false, note: "" };
    }

    habit.logs[today].note = note;

    saveHabits();
}