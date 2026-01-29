# Habit Tracker (Practice Project)

A simple habit tracking web app built as a **learning project** to practice JavaScript, state management, UI logic, and localStorage persistence.

This project is **not intended for production or deployment**, but it is fully functional and was built to explore real-world frontend problems and solutions.

---

## ✨ Features

- Create and delete habits
- Daily completion tracking
- Daily notes per habit
- Automatic streak calculation
- Statistics overview:
  - Total habits
  - Habits completed today
  - Completion rate (last 7 days)
  - Longest streak
- Persistent data using `localStorage`
- Modal-based habit detail view
- Clean separation of logic (state, UI, helpers)

---

## 🧠 What I Practiced / Learned

- Managing application state without frameworks
- Working with dates and edge cases (e.g. day transitions at 00:00)
- Structuring a JavaScript project across multiple files
- Debugging real bugs caused by state inconsistency
- Keeping UI and logic in sync
- Refactoring messy code into clearer responsibilities

---

## 🛠️ Tech Stack

- HTML
- CSS
- Vanilla JavaScript (ES Modules)
- LocalStorage (no backend)

---

## 📊 Data Model (Simplified)

habit = {
  id: Number,
  name: String,
  desc: String,
  logs: {
    "YYYY-MM-DD": {
      completed: Boolean,
      note: String
    }
  },
  streak: Number
}

## ⚠️ Notes
This app uses localStorage, so data is stored per browser.

There is no authentication or backend.

The project was intentionally stopped once learning goals were reached.

## 🚀 Future Ideas (Not Implemented)
Backend / database

User accounts

Weekly / monthly charts

Export data

Mobile-first redesign

## ✅ Status
Finished as a practice project.


The app is complete for its intended purpose: learning and experimentation.


