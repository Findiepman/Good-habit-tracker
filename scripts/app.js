console.log("App started");
import { createHabit } from './habits.js';
import { loadHabits } from './storage.js';
import { renderHabits } from './ui.js';
import { elements } from './element.js';

export let activeHabitId = null;

elements.plusBtn.addEventListener("click", function () {
    elements.habitModal.style.display = "flex"
    elements.habitModal.addEventListener("click", (e) => {
        if (e.target === elements.habitModal) {
            elements.habitModal.style.display = "none";
        }
    });
})
elements.modalCancelBtn.addEventListener("click", function () {
    elements.habitNaam.value = ""
    elements.habitdesc.value = ""
    elements.habitModal.style.display = "none";

})
elements.createBtn.addEventListener("click", function () {
    if (elements.habitNaam.value && elements.habitdesc.value !== "") {
        createHabit(elements.habitNaam.value, elements.habitdesc.value);
        elements.habitNaam.value = "";
        elements.habitdesc.value = "";
        elements.habitModal.style.display = "none";
    }
    else if (elements.habitNaam.value === "") {
        elements.habitNaam.value = ""
        elements.habitNaam.placeholder = "You have to input a name!"
        setTimeout(function () {
            elements.habitNaam.placeholder = "Habit name"
        }, 2000)
    }
    if (elements.habitdesc.value === "") {
        elements.habitdesc.value == ""
        elements.habitdesc.placeholder = "You have to input a description!"
        setTimeout(function () {
            elements.habitdesc.placeholder = "Description"
        }, 2000)
    }
})
elements.detailCheckbox.addEventListener("change", () => {
    toggleDailyLog(activeHabitId);
});

elements.detailNoteTextarea.addEventListener("input", (e) => {
    saveDailyNote(e.target.value);
});

function initApp() {
    loadHabits();
    renderHabits();
}

initApp();

