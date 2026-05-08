/* ================= THEME SYSTEM — Single Source of Truth ================= */

// Always save as "dark" or "light" string (never "true"/"false")
function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
}

function updateThemeIcon() {
  const btns = document.querySelectorAll(".theme-toggle, [onclick='toggleTheme()']");
  btns.forEach(btn => {
    btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/* ================= APPLY SAVED THEME ================= */
(function applyThemeImmediately() {
  const saved = localStorage.getItem("theme");
  // Handle both old "true"/"false" format and new "dark"/"light" format
  if (saved === "dark" || saved === "true") {
    document.body.classList.add("dark");
    // Migrate old format
    if (saved === "true") localStorage.setItem("theme", "dark");
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  updateThemeIcon();
});
