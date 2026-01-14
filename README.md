# gym-inventory

# 🏋️ Gym Inventory Manager

A simple, clean **CRUD web application** to manage gym equipment and categories.  
Built as part of **The Odin Project** curriculum using **Node.js, Express, PostgreSQL, and EJS**.

This app lets you:
- Organize gym equipment into categories
- Add, edit, view, and delete items
- Prevent accidental deletion of categories that still contain items
- Work with a real relational database schema

## 🌐 Live Preview

🚀 **View the deployed app here:**  
👉 https://gym-inventory-production.up.railway.app/

> Hosted on Railway with a PostgreSQL database

---

## ✨ Features

### Categories
- View all categories
- Create new categories
- Edit existing categories
- Delete categories (blocked if items still belong to them)

### Items
- View all gym items
- Create new items assigned to categories
- Edit item details
- Delete items
- Automatically track last-updated timestamps

### Database
- PostgreSQL relational database
- One-to-many relationship (Categories → Items)
- Data integrity enforced with foreign keys and constraints
- Automatic `updated_at` handling using database triggers

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Views:** EJS (server-side rendering)
- **Styling:** Minimal inline CSS (focus on functionality)
- **Environment:** dotenv

---

## 📂 Project Structure

```
gym-inventory/
├─ app.js
├─ routes/
│  ├─ categoriesRouter.js
│  └─ itemsRouter.js
├─ controllers/
│  ├─ categoriesController.js
│  └─ itemsController.js
├─ models/
│  ├─ categoryModel.js
│  └─ itemModel.js
├─ db/
│  ├─ schema.sql
│  ├─ seed.sql
│  └─ pool.js
├─ views/
│  ├─ categories/
│  ├─ items/
│  └─ partials/
├─ public/
├─ .env
└─ README.md
```

---

## 🗄️ Database Schema Overview

- **categories**
  - `id`, `name`, `description`, `created_at`

- **items**
  - `id`, `category_id`, `name`, `brand`, `model`, `condition`
  - `quantity`, `unit`, `location`, `notes`
  - `created_at`, `updated_at`

Categories and items are linked with a **foreign key constraint**, ensuring data consistency.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/gym-inventory.git
cd gym-inventory
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create the database
```bash
createdb gym_inventory
```

### 4️⃣ Configure environment variables
Create a `.env` file:
```env
DATABASE_URL=postgresql://YOUR_USER@localhost:5432/gym_inventory
```

### 5️⃣ Run database schema and seed data
```bash
psql gym_inventory < db/schema.sql
psql gym_inventory < db/seed.sql
```

### 6️⃣ Start the app
```bash
npm run start
```

Visit: **http://localhost:3000**

---

## 🧪 Sample Data

The app includes seeded data such as:
- Cardio machines
- Free weights
- Accessories
- Recovery equipment

This makes it easy to explore the app immediately after setup.

---

## 🎯 Learning Goals

This project focuses on:
- MVC architecture in Express
- SQL database design
- One-to-many relationships
- Server-side rendering with EJS
- Clean separation of concerns
- Real-world CRUD patterns

---

## 🔮 Possible Improvements

- Authentication / admin roles
- Search and filtering
- Pagination
- Improved styling with a CSS framework
- Deployment (Railway / Render / Fly.io)

---

## 📜 License

This project is open source and available under the **MIT License**.

---

Built with 💪 as part of **The Odin Project**