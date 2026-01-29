const toggleBtn = document.getElementById("darkmode-toggle");
const STORAGE_KEY = "theme";

toggleBtn.addEventListener("click", () => {
    const root = document.documentElement;

    root.classList.add("theme-transition");
    root.classList.toggle("dark-mode");

    localStorage.setItem(
        STORAGE_KEY,
        root.classList.contains("dark-mode") ? "dark" : "light"
    );

    setTimeout(() => {
        root.classList.remove("theme-transition");
    }, 400);
});