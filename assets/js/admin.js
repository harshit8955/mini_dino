/* ===================================================
   admin.js — clean, de-duplicated admin logic
   =================================================== */

// ===== SINGLE DOMContentLoaded INIT =====
document.addEventListener("DOMContentLoaded", function () {

    // Apply theme
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "true") {
        document.body.classList.add("dark");
        if (saved === "true") localStorage.setItem("theme", "dark"); // migrate
    }

    // Dashboard stats (only if elements exist)
    updateStats();

    // Image preview (add-plant page)
    const imageInput = document.getElementById("imageUpload");
    const preview = document.getElementById("preview");
    if (imageInput && preview) {
        imageInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                    preview.src = reader.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Add plant form (add-plant page)
    const form = document.getElementById("plantForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name     = document.getElementById("plantName").value.trim();
            const category = document.getElementById("category").value;
            const price    = document.getElementById("price").value;
            const image    = preview ? preview.src : "";
            const tagEl    = document.getElementById("ptag");
            const tag      = tagEl ? tagEl.value : "";

            if (!name || !category || !price) {
                alert("Please fill all required fields.");
                return;
            }

            const newPlant = {
                id: Date.now(),
                name,
                category,
                price: parseInt(price),
                image,
                tag,
                size: "",
                sunlight: ""
            };

            let plants = JSON.parse(localStorage.getItem('plants')) || [];
            plants.push(newPlant);
            localStorage.setItem('plants', JSON.stringify(plants));

            alert("Plant Added Successfully 🌿");
            form.reset();
            if (preview) preview.style.display = "none";
        });
    }

    // Manage plants page — display list
    const plantList = document.getElementById("plantList");
    const filter    = document.getElementById("filterCategory");
    if (plantList && filter) {
        displayPlants();
        filter.addEventListener("change", displayPlants);
    }

    // Language
    applyLanguage();
});


// ===== THEME TOGGLE (single definition) =====
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    const btns = document.querySelectorAll(".theme-toggle");
    btns.forEach(b => b.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙");
}


// ===== DASHBOARD STATS =====
function updateStats() {
    const plants = JSON.parse(localStorage.getItem("plants")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const users  = JSON.parse(localStorage.getItem("users"))  || [];

    const elPlant = document.getElementById("plantCount");
    const elOrder = document.getElementById("orderCount");
    const elUser  = document.getElementById("userCount");

    if (elPlant) elPlant.innerText = plants.length;
    if (elOrder) elOrder.innerText = orders.length;
    if (elUser)  elUser.innerText  = users.length;
}


// ===== DISPLAY PLANTS (manage-plants page) =====
function displayPlants() {
    const plantList = document.getElementById("plantList");
    const filter    = document.getElementById("filterCategory");
    if (!plantList || !filter) return;

    const selected = filter.value;
    const plants   = JSON.parse(localStorage.getItem('plants')) || [];
    plantList.innerHTML = "";

    const filtered = plants.filter(p => selected === "All" || p.category === selected);

    if (filtered.length === 0) {
        plantList.innerHTML = "<p style='padding:20px;'>No plants found.</p>";
        return;
    }

    filtered.forEach(plant => {
        plantList.innerHTML += `
            <div class="plant-card">
                <img src="${plant.image_url || plant.image || ''}" style="width:100%;height:180px;object-fit:cover;border-radius:8px;">
                <div class="info" style="padding:15px;">
                    <h4>${plant.name}</h4>
                    <p>Category: ${plant.category}</p>
                    <p><strong>₹${plant.price}</strong></p>
                    <div style="display:flex;gap:8px;margin-top:10px;">
                        <button onclick="editPlant(${plant.id})" style="flex:1;padding:8px;background:#2196F3;color:white;border:none;border-radius:4px;cursor:pointer;">Edit</button>
                        <button onclick="deletePlant(${plant.id})" style="flex:1;padding:8px;background:#f44336;color:white;border:none;border-radius:4px;cursor:pointer;">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}


// ===== DELETE PLANT =====
function deletePlant(id) {
    if (!confirm("Are you sure you want to delete this plant?")) return;
    let plants = JSON.parse(localStorage.getItem('plants')) || [];
    plants = plants.filter(p => p.id !== id);
    localStorage.setItem('plants', JSON.stringify(plants));
    displayPlants();
    updateStats();
}


// ===== EDIT PLANT =====
function editPlant(id) {
    let plants = JSON.parse(localStorage.getItem("plants")) || [];
    let plant  = plants.find(p => p.id === id);
    if (!plant) return;

    const newName  = prompt("Edit Plant Name:", plant.name);
    const newPrice = prompt("Edit Price:", plant.price);

    if (newName && newPrice) {
        plant.name  = newName.trim();
        plant.price = parseInt(newPrice);
        localStorage.setItem("plants", JSON.stringify(plants));
        displayPlants();
    }
}


// ===== ADD TO CART (no duplicates) =====
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart 🛒");
}


// ===== FAVORITE TOGGLE =====
function toggleFavorite(id) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    const idx = fav.indexOf(id);
    if (idx > -1) {
        fav.splice(idx, 1);
        alert("Removed from favorites");
    } else {
        fav.push(id);
        alert("Added to favorites ❤");
    }
    localStorage.setItem("fav", JSON.stringify(fav));
}


// ===== QUANTITY SELECTOR =====
let quantity = 1;

function increaseQty() {
    quantity++;
    const el = document.getElementById("qty");
    if (el) el.innerText = quantity;
}

function decreaseQty() {
    if (quantity > 1) {
        quantity--;
        const el = document.getElementById("qty");
        if (el) el.innerText = quantity;
    }
}


// ===== CREATE ADMIN =====
function createAdmin() {
    const name     = (document.getElementById("name")     || {}).value || "";
    const email    = (document.getElementById("email")    || {}).value || "";
    const password = (document.getElementById("password") || {}).value || "";

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    let admins = JSON.parse(localStorage.getItem("admins")) || [];

    // Check for duplicate
    const exists = admins.find(a => a.email === email || a.username === email);
    if (exists) {
        alert("An admin with this email/username already exists.");
        return;
    }

    admins.push({ name, email, username: email, password });
    localStorage.setItem("admins", JSON.stringify(admins));
    alert("New admin created successfully ✅");
}


// ===== LANGUAGE =====
function toggleLanguage() {
    const current = localStorage.getItem("lang") || "en";
    const newLang = current === "en" ? "hi" : "en";
    localStorage.setItem("lang", newLang);
    applyLanguage();
}

function applyLanguage() {
    const lang = localStorage.getItem("lang") || "en";
    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.getAttribute("data-" + lang);
    });
}