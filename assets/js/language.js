let currentLang = localStorage.getItem("lang") || "en";

function updateLanguage(lang) {

    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.getAttribute("data-" + lang);
    });

    const btn = document.getElementById("langBtn");
    if(btn){
        btn.textContent = lang === "en" ? "हिंदी" : "English";
    }

    localStorage.setItem("lang", lang);
    currentLang = lang;
}

document.addEventListener("DOMContentLoaded", () => {

    updateLanguage(currentLang);

    const btn = document.getElementById("langBtn");

    if(btn){
        btn.addEventListener("click", () => {

            if(currentLang === "en"){
                updateLanguage("hi");
            }else{
                updateLanguage("en");
            }

        });
    }

});