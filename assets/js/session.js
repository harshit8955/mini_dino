/* ================= SESSION PROTECTION ================= */

// Only redirect if we're on an admin page (but NOT the login page)
(function(){
  const path = window.location.pathname.toLowerCase();
  const isAdminPage = path.includes("/admin/") || path.includes("\\admin\\");
  const isLoginPage = path.includes("admin_login") || path.includes("login");

  if(isAdminPage && !isLoginPage){
    if(localStorage.getItem("adminLoggedIn") !== "true"){
      window.location.href = "admin_login.html";
    }
  }
})();

/* ================= AUTO LOGOUT (30 min) ================= */
let _sessionTimeout;

function resetTimer(){
  clearTimeout(_sessionTimeout);
  _sessionTimeout = setTimeout(logout, 30 * 60 * 1000);
}

function logout(){
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("currentUser");
  alert("Logged out.");
  window.location.href = "admin_login.html";
}

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keypress", resetTimer);
document.addEventListener("DOMContentLoaded", resetTimer);