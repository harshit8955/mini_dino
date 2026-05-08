<<<<<<< HEAD
/* ================= THEME SYSTEM ================= */

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark);

  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  if (document.body.classList.contains("dark")) {
    btn.textContent = "☀️";
  } else {
    btn.textContent = "🌙";
  }
}

/* ================= LOAD SAVED THEME ================= */

document.addEventListener("DOMContentLoaded", function () {

  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }

  updateThemeIcon();
});
=======
/* ================= THEME SYSTEM ================= */

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark);

  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  if (document.body.classList.contains("dark")) {
    btn.textContent = "☀️";
  } else {
    btn.textContent = "🌙";
  }
}

/* ================= LOAD SAVED THEME ================= */

document.addEventListener("DOMContentLoaded", function () {

  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }

  updateThemeIcon();
});
>>>>>>> a500549 (sample commit)
