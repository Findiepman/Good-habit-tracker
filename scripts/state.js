export const state = {
    habits: JSON.parse(localStorage.getItem("habits")) || []
};