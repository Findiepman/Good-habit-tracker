import { calculateStreak } from "./streaks.js";
import { getToday } from "./utils/date.js";
import { elements } from "./element.js";
import { saveHabits } from "./storage.js";
import { openhabitDelete } from "./habits.js";
import { toggleDailyLog } from "./habits.js";
import { renderHabits } from "./ui.js";


export function openHabitModal(habit) {
    let activeHabitId = habit.id;

    const today = getToday();

    // Zorg dat er altijd een log object is voor vandaag
    if (!habit.logs) habit.logs = {};
    if (!habit.logs[today]) habit.logs[today] = { completed: false, note: "" };
    const log = habit.logs[today];

    // Bereken streak
    let streak = calculateStreak(habit);

    // Titel & beschrijving
    elements.modalTitle1.textContent = habit.name;
    elements.detailDesc.textContent = habit.desc;
    elements.detailStreak.textContent = habit.streak ? `🔥 ${habit.streak}-day streak` : "No streak";

    // Checkbox reflecteert state (read-only)
    elements.detailCheckbox.checked = log.completed;
    elements.detailCheckbox.disabled = true;

    elements.detailNoteTextarea.value = log.note || ""; // altijd tonen, ook als leeg
    elements.detailNoteTextarea.disabled = log.completed; // niet meer bewerkbaar als completed

    // Note input: alleen updaten als nog niet completed
    elements.detailNoteTextarea.oninput = () => {
        if (!log.completed) {          // alleen bewerken als nog niet completed
            log.note = elements.detailNoteTextarea.value;
            saveHabits();
        }
    };

    // Modal tonen
    elements.habitDetailModal.style.display = "flex";

    // Note input: update log altijd, ook als leeg
    elements.detailNoteTextarea.oninput = () => {
        log.note = elements.detailNoteTextarea.value; // leeg of gevuld, blijft altijd
        saveHabits();
    };

    // Delete button
    elements.deleteHabitBtn.onclick = () => {
        openhabitDelete(habit);
    };

    // Complete for today knop
    elements.completeTodayBtn.onclick = () => {
        if (!log.completed) {              // voorkomen van meerdere clicks
            toggleDailyLog(habit.id);      // togglet completed + slaat op
            log.completed = true;          // reflecteer meteen in modal
            elements.detailCheckbox.checked = true;
            elements.detailNoteTextarea.disabled = true; // disable textarea na completeren
        }
        elements.habitDetailModal.style.display = "none";
        renderHabits();                    // update dashboard
    };

    // Close modal als je buiten klikt
    elements.habitDetailModal.onclick = (e) => {
        if (e.target === elements.habitDetailModal) {
            elements.habitDetailModal.style.display = "none";
        }
    };
}