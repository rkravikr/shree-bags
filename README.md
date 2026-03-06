# Shree Bags – Product Catalog Website

A full-stack product catalog website built for showcasing bags and allowing customers to place orders directly through WhatsApp.

This project includes a public storefront for customers and an admin dashboard for managing products, categories, and images.

The goal is to provide a lightweight alternative to a full e-commerce store where customers browse products online and complete purchases through WhatsApp conversations.

---

# Project Overview

Shree Bags is a product catalog website designed for small businesses that want an online presence without a complex checkout system.

Customers can browse products, view details, and place orders through WhatsApp. The business owner can manage all products through an admin dashboard.

Key capabilities:

* Browse products and categories
* View detailed product pages
* WhatsApp ordering integration
* Admin dashboard for product management
* Image upload support
* Mobile-friendly interface

---

# Tech Stack

### Frontend

* React
* Vite
* TailwindCSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### ORM

* Prisma ORM

### Image Storage

* Cloudinary

### Hosting

* Frontend: Vercel
* Backend: Render
* Database: Neon PostgreSQL

---

# Project Structure

```
shree-bags
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── prisma
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── admin
│   │   ├── components
│   │   ├── pages
│   │   └── services
│   └── vite.config.js
│
├── bags_catalog_prd.md
├── deployment_guide.md
└── README.md
```

---

# Features

### Customer Website

* Browse all available products
* Filter products by category
* View product details
* Order products directly via WhatsApp
* Mobile-friendly UI

### Admin Dashboard

* Admin authentication
* Add new products
* Edit products
* Delete products
* Upload product images
* Manage categories

---

# Setup Instructions

## 1. Clone the Repository

```
git clone https://github.com/rkravikr/shree-bags.git
cd shree-bags
```

---

## 2. Backend Setup

```
cd backend
npm install
```

Create environment file:

```
cp .env.example .env
```

Start the backend server:

```
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 3. Frontend Setup

Open a new terminal.

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Environment Variables

Backend `.env`

```
DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

# Database Setup

Run Prisma migrations:

```
npx prisma migrate dev
```

Generate Prisma client:

```
npx prisma generate
```

Optional: open Prisma Studio

```
npx prisma studio
```

---

# API Endpoints

### Admin

```
POST /api/admin/login
```

### Products

```
GET /api/products
GET /api/products/:slug
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Categories

```
GET /api/categories
POST /api/categories
DELETE /api/categories/:id
```

---

# Deployment

### Backend Deployment (Render)

1. Create a new Web Service
2. Connect GitHub repository
3. Set root directory to:

```
backend
```

Build command:

```
npm install
```

Start command:

```
node server.js
```

---

### Frontend Deployment (Vercel)

1. Import project from GitHub
2. Set root directory:

```
frontend
```

Build command:

```
npm run build
```

Output directory:

```
dist
```

---

# Future Improvements

* Multiple product images
* Product search
* Advanced filtering
* SEO optimization
* Analytics integration
* Inventory tracking

---

# Author

Ravi Kumar Varma

BTech Computer Science Student
Full-Stack Developer

---

# License

This project is for educational and freelance development purposes.
