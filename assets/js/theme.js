/* ==================================================
   theme.js — SINGLE SOURCE OF TRUTH for dark mode
   Load this FIRST before main.js or admin.js
   ================================================== */

// Apply theme instantly on load (prevents flash)
(function () {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "true") {
        document.documentElement.classList.add("dark");
        document.body && document.body.classList.add("dark");
    }
})();

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark");
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Update all theme toggle buttons
    document.querySelectorAll(".theme-toggle").forEach(btn => {
        btn.textContent = isDark ? "☀️" : "🌙";
    });
}

// Once DOM is ready, sync button state with saved theme
document.addEventListener("DOMContentLoaded", function () {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark" || saved === "true";

    // Ensure body has correct class
    document.body.classList.toggle("dark", isDark);

    // Migrate old "true"/"false" string format
    if (saved === "true") localStorage.setItem("theme", "dark");
    if (saved === "false") localStorage.setItem("theme", "light");

    // Set correct icon on all toggle buttons
    document.querySelectorAll(".theme-toggle").forEach(btn => {
        btn.textContent = isDark ? "☀️" : "🌙";
    });
});
