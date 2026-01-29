import { state } from './state.js';

export function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(state.habits));
}

export function loadHabits() {
    const stored = localStorage.getItem("habits");
    state.habits = stored ? JSON.parse(stored) : [];
}