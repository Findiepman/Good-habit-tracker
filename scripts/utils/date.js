export function getToday() {
    return new Date().toISOString().split("T")[0];
}
export function getPreviousDay(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split("T")[0];
}