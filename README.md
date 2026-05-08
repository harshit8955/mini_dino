<<<<<<< HEAD
# 🌿 PUSHPAK — Plant Store (Local Demo)

PUSHPAK is a **simple plant store web application** built using **HTML, CSS, and Vanilla JavaScript**.
It runs completely on the browser using **localStorage**, so no backend server is required for the demo.

This project demonstrates a **basic e-commerce workflow** for plants including product listing, cart system, favorites, and an admin panel for managing plants.

---

# 🚀 Features

### 🌱 User Features

* Browse plants in a responsive **plant grid layout**
* View **plant details page**
* Add plants to **Cart**
* Add plants to **Favorites**
* Filter plants by **category**
* Persistent data using **localStorage**
* Responsive UI for **desktop and mobile**

### 🛠 Admin Features

* Add new plants
* Upload plant images with **live preview**
* Edit plant details
* Delete plants
* Manage plants stored in **localStorage**

### 🎨 UI Features

* Modern responsive design
* Dark / Light theme toggle
* Hindi / English language support
* Card-based product layout

---

# 📂 Project Structure

```
pushpak/
│
├── index.html
├── plants.html
├── plant.html
├── favorites.html
├── cart.html
├── garden.html
├── facts.html
│
├── admin/
│   ├── add-plant.html
│   ├── manage-plants.html
│   ├── dashboard.html
│   └── orders.html
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── theme.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── admin.js
│   │   ├── language.js
│   │   └── theme.js
│   │
│   └── images/
│
└── README.md
```

---

# ▶️ How to Run

1. Download or clone the repository.

```bash
git clone https://github.com/yourusername/pushpak.git
```

2. Open the project folder.

3. Open `index.html` in your browser.

No server or installation required.

---

# 🔐 Admin Panel

To manage plants:

Open:

```
admin/add-plant.html
```

or

```
admin/manage-plants.html
```

Admin pages allow you to:

* Add plants
* Upload plant images
* Edit plant details
* Delete plants

All data is stored in **localStorage**.

---

# 🗄 Data Model

Plant object structure:

```javascript
{
  id: number,
  name: "Plant Name",
  category: "Indoor | Outdoor | Flowering",
  price: number,
  image: "image-url-or-base64"
}
```

Cart object:

```javascript
{
  id: plantId,
  qty: number
}
```

---

# 🌐 Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla)
* Browser localStorage

---

# 📌 Future Improvements

Possible improvements for this project:

* Node.js / Express backend
* Database integration (MongoDB / MySQL)
* Cloud image storage (Cloudinary / AWS S3)
* User authentication system
* Payment gateway integration
* Plant recommendation system
* Search functionality
* Admin analytics dashboard

---

# 🌱 About the Project

PUSHPAK is a demo project designed to simulate a **small plant nursery e-commerce platform**.
It focuses on frontend functionality and simple data management using browser storage.

---

# 📜 License

This project is open source and available under the **MIT License**.

---

# 🌿 Author

Developed by **Harshit Sharma**

If you like this project, feel free to ⭐ the repository.
=======
# Pushpak — Plant Store (Local demo)

This repository is a small static plant store built with HTML, CSS and vanilla JavaScript. Data is stored in the browser's localStorage so you can run the site locally without any backend.

## What I implemented ✅
- Responsive, modern UI for listing plants and product details
- Admin section to add / edit / delete plants (uses localStorage)
- Cart and Favorites (persisted to localStorage)
- Image upload in Admin uses local preview (base64) — no external service required
- Seed/sample data is added automatically on first load

## How to run
1. Open `index.html` in your browser (no server required).
2. Browse `Plants`, view `Plant Details`, add items to Cart/Favorites.

## Admin
- Open `admin/add-plant.html` to add plants (image preview included).
- Open `admin/manage-plants.html` to edit/delete plants.
- Admin pages use the same `localStorage` dataset as the public UI.

## Developer notes
- Data model for a plant: `{ id, name, category, price, image }` (image is a URL or base64 string).
- Cart stores objects `{ id, qty }`.
- Sample data is injected on first page load by `assets/js/main.js`.

## Where to edit
- Frontend logic: `assets/js/main.js`
- Admin logic: `assets/js/admin.js`
- Styles: `assets/css/style.css`

## Next improvements (optional)
- Add a small backend (Node/Express or Firebase) to persist data across devices
- Integrate Cloudinary or S3 for image hosting
- Add form validation and unit/UI tests

If you want, I can: add deployment instructions (GitHub Pages), implement a Node backend, or wire Cloudinary uploads — tell me which next. 🌿
>>>>>>> a500549 (sample commit)
