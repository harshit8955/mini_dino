/* ==================================================
   main.js — consolidated frontend logic
   - sample data initializer
   - render plants grid + details
   - cart (by plant id + qty)
   - favorites (by plant id)
   - theme & i18n
   ================================================== */

// -------------------- Initialization --------------------
document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  applySavedLang();
  ensureSampleData();
  
  // Try rendering grid (for index.html)
  if(document.getElementById("plantGrid")) {
      renderPlants();
      
      // Setup filters for index.html
      const priceFilter = document.getElementById("priceFilter");
      if(priceFilter) {
          priceFilter.addEventListener("input", function() {
              document.getElementById("priceValue").innerText = this.value;
              renderPlants();
          });
      }
      
      const sizeFilter = document.getElementById("sizeFilter");
      if(sizeFilter) sizeFilter.addEventListener("change", renderPlants);
      
      const sunFilter = document.getElementById("sunFilter");
      if(sunFilter) sunFilter.addEventListener("change", renderPlants);

      document.querySelectorAll("#categoryList li").forEach(li => {
        li.addEventListener("click", function () {
          document.querySelectorAll("#categoryList li").forEach(l => l.classList.remove("active"));
          this.classList.add("active");
          renderPlants();
        });
      });
  }

  // Try rendering list (for manage-plants.html)
  const filterCategory = document.getElementById('filterCategory');
  if (filterCategory) {
      filterCategory.addEventListener('change', renderAdminPlantsList);
      if(document.getElementById("plantList")) {
          renderAdminPlantsList();
      }
  }

  loadCart();
  loadFav();
  updateNavCounts();
  showLoginState();
});

// -------------------- Sample data --------------------
function ensureSampleData() {
  if (localStorage.getItem('plants')) return;
  const sample = [
    { id: 1, name: 'Snake Plant', category: 'indoor', price: 599, size: 'medium', sunlight: 'low', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80&auto=format&fit=crop' },
    { id: 2, name: 'Monstera Deliciosa', category: 'indoor', price: 1299, size: 'large', sunlight: 'medium', image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&q=80&auto=format&fit=crop' },
    { id: 3, name: 'Aloe Vera', category: 'succulent', price: 349, size: 'small', sunlight: 'high', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80&auto=format&fit=crop' },
    { id: 4, name: 'Olive Tree', category: 'outdoor', price: 2499, size: 'large', sunlight: 'high', image: 'https://images.unsplash.com/photo-1524594154900-1a4d4a3c2d9b?w=800&q=80&auto=format&fit=crop' },
    { id: 5, name: 'Lavender', category: 'flowering', price: 449, size: 'medium', sunlight: 'high', image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80&auto=format&fit=crop' },
    { id: 6, name: 'ZZ Plant', category: 'indoor', price: 799, size: 'medium', sunlight: 'low', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80&auto=format&fit=crop' }
  ];
  localStorage.setItem('plants', JSON.stringify(sample));
}

// -------------------- Plants rendering (Index) --------------------
function renderPlants() {
  const grid = document.getElementById("plantGrid");
  if(!grid) return;

  const activeCat = document.querySelector("#categoryList li.active");
  const selectedCategory = activeCat ? activeCat.dataset.category.toLowerCase() : "all";
  
  const maxPriceEl = document.getElementById("priceFilter");
  const maxPrice = maxPriceEl ? parseInt(maxPriceEl.value) : 2000;
  
  const sizeEl = document.getElementById("sizeFilter");
  const size = sizeEl ? sizeEl.value.toLowerCase() : "all";
  
  const sunEl = document.getElementById("sunFilter");
  const sun = sunEl ? sunEl.value.toLowerCase() : "all";

  let plants = JSON.parse(localStorage.getItem('plants')) || [];
  grid.innerHTML = "";

  const filteredPlants = plants.filter(p => {
      const pCat = (p.category || '').toLowerCase();
      const pSize = (p.size || '').toLowerCase();
      const pSun = (p.sunlight || '').toLowerCase();

      return (selectedCategory === "all" || pCat === selectedCategory) &&
             (p.price <= maxPrice) &&
             (size === "all" || size === "" || pSize === size) &&
             (sun === "all" || sun === "" || pSun === sun);
  });

  if(filteredPlants.length === 0) {
      grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #666;'>No plants found matching your filters.</p>";
      return;
  }

  filteredPlants.forEach(p => {
      grid.innerHTML += `
        <div class="plant-card plantCard card">
          <img src="${p.image || p.image_url || ''}" alt="${p.name}">
          <div class="info">
            <h4>${p.name}</h4>
            <p style="color: #666; font-size: 14px;">${p.category || 'Uncategorized'}</p>
            <h3 style="color: #2e7d32; margin: 5px 0;">₹${p.price}</h3>
            <div style="margin-top:12px; display: flex; gap: 8px;">
              <button onclick="viewPlant(${p.id})" style="flex:1; padding: 8px; border: 1px solid #2e7d32; border-radius: 4px; background: transparent; color: #2e7d32; font-weight: bold; cursor: pointer;">View</button>
              <button onclick="addToCart(${p.id})" style="flex:2; padding: 8px; border: none; border-radius: 4px; background: #2e7d32; color: white; font-weight: bold; cursor: pointer;">Add to cart</button>
              <button onclick="toggleFavorite(${p.id})" style="padding: 8px; border: none; border-radius: 4px; background: #ffebee; color: #c62828; cursor: pointer;">❤</button>
            </div>
          </div>
        </div>
      `;
  });
}

function viewPlant(id){
  location.href = `plant_details.html?id=${id}`;
}

function getPlantById(id){
  const plants = JSON.parse(localStorage.getItem('plants')) || [];
  return plants.find(p => p.id === Number(id));
}

// -------------------- Admin Plants Rendering --------------------
function renderAdminPlantsList() {
    const plantList = document.getElementById("plantList");
    const filter = document.getElementById("filterCategory");
    if (!plantList || !filter) return;

    let selected = filter.value.toLowerCase();
    let plants = JSON.parse(localStorage.getItem('plants')) || [];
    plantList.innerHTML = "";

    const filtered = plants.filter(p => selected === "all" || (p.category || '').toLowerCase() === selected);

    if(filtered.length === 0) {
        plantList.innerHTML = "<p>No plants found.</p>";
        return;
    }

    filtered.forEach(plant => {
        plantList.innerHTML += `
            <div class="plant-card card">
                <img src="${plant.image_url || plant.image}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;">
                <div class="info" style="padding: 15px;">
                    <h4 style="margin-bottom: 5px;">${plant.name}</h4>
                    <p style="color: #666; font-size: 14px; margin-bottom: 5px;">Category: ${plant.category}</p>
                    <p style="font-weight: bold; margin-bottom: 15px;">Price: ₹${plant.price}</p>
                    <div style="display: flex; gap: 10px;">
                        <button class="edit-btn" onclick="editPlant(${plant.id})" style="flex: 1; padding: 8px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">Edit</button>
                        <button class="delete-btn" onclick="deletePlant(${plant.id})" style="flex: 1; padding: 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// -------------------- Cart (stores {id, qty}) --------------------
function addToCart(plantId){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === plantId);
  if (existing) existing.qty++;
  else cart.push({ id: plantId, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateNavCounts();
  alert('Added to cart');
}

function loadCart(){
  const box = document.getElementById('cartItems');
  if (!box) return;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const plants = JSON.parse(localStorage.getItem('plants')) || [];

  if (cart.length === 0) {
    box.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let html = '<table><tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr>';
  let grand = 0;
  cart.forEach(item => {
    const p = plants.find(x => x.id === item.id) || {};
    const total = (p.price || 0) * item.qty;
    grand += total;
    html += `<tr>
      <td style="display:flex;gap:10px;align-items:center"><img src="${p.image || ''}" style="width:60px;height:40px;object-fit:cover;border-radius:6px"> <div>${p.name || ''}</div></td>
      <td>₹${p.price || 0}</td>
      <td><input type="number" value="${item.qty}" min="1" style="width:60px" onchange="setCartQty(${item.id}, this.value)"></td>
      <td>₹${total}</td>
      <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
    </tr>`;
  });
  html += `<tr><td colspan="3" style="text-align:right"><strong>Grand Total:</strong></td><td><strong>₹${grand}</strong></td><td></td></tr>`;
  html += '</table>';
  box.innerHTML = html;
}

function setCartQty(id, qty){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i=>i.id===id);
  if (!item) return;
  item.qty = Math.max(1, Number(qty));
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateNavCounts();
}

function removeFromCart(id){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(i=>i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateNavCounts();
}

// -------------------- Favorites --------------------
function toggleFavorite(id){
  let fav = JSON.parse(localStorage.getItem('fav')) || [];
  if (fav.includes(id)) fav = fav.filter(x=>x!==id);
  else fav.push(id);
  localStorage.setItem('fav', JSON.stringify(fav));
  loadFav();
  updateNavCounts();
  alert('Favorites updated');
}

function loadFav(){
  const box = document.getElementById('favItems');
  if (!box) return;
  const fav = JSON.parse(localStorage.getItem('fav')) || [];
  const plants = JSON.parse(localStorage.getItem('plants')) || [];
  if (fav.length === 0) { box.innerHTML = '<p>No favorites yet.</p>'; return; }
  box.innerHTML = '';
  fav.forEach(id => {
    const p = plants.find(x => x.id === id);
    if (!p) return;
    box.innerHTML += `<div class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <img src="${p.image || ''}" style="width:80px;height:60px;object-fit:cover;border-radius:6px">
      <div>
        <strong>${p.name}</strong>
        <div>₹${p.price}</div>
        <div style="margin-top:6px"><button onclick="addToCart(${p.id})">Add to cart</button></div>
      </div>
    </div>`;
  });
}

// -------------------- Search (works with dynamically rendered cards) --------------------
function searchPlant(){
  const input = (document.getElementById('search') || {}).value || '';
  document.querySelectorAll('.plantCard').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(input.toLowerCase()) ? '' : 'none';
  });
}

// -------------------- Theme & i18n --------------------
function toggleTheme(){
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
function applySavedTheme(){
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
}

function setLang(lang){
  document.querySelectorAll('[data-en]').forEach(el=> el.innerText = el.getAttribute('data-'+lang));
  localStorage.setItem('lang', lang);
}
function applySavedLang(){
  if (localStorage.getItem('lang')) setLang(localStorage.getItem('lang'));
}

// -------------------- Helpers --------------------
function updateNavCounts() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const fav = JSON.parse(localStorage.getItem('fav')) || [];
  const cartCount = cart.reduce((s,i)=>s + (i.qty||0), 0);
  const elCart = document.getElementById('cartCount');
  const elFav = document.getElementById('favCount');
  if (elCart) elCart.innerText = cartCount;
  if (elFav) elFav.innerText = fav.length;
}

function getCurrentUser(){
  try { return JSON.parse(localStorage.getItem('currentUser')||'null'); } catch(e){ return null; }
}

function showLoginState(){
  const user = getCurrentUser();
  const navLogin = document.getElementById('navLogin');
  const navLogout = document.getElementById('navLogout');
  const navUser = document.getElementById('navUser');
  if(user){
    if(navLogin) navLogin.style.display = 'none';
    if(navLogout) navLogout.style.display = 'inline-block';
    if(navUser) navUser.innerText = user.name || user.email || 'User';
  } else {
    if(navLogin) navLogin.style.display = 'inline-block';
    if(navLogout) navLogout.style.display = 'none';
    if(navUser) navUser.innerText = '';
  }
}
