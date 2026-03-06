# Product Requirements Document (PRD)

## Project Title

Shree Bags – Product Catalog Website with WhatsApp Ordering and Admin Dashboard

## Project Overview

This project involves building a full-stack product catalog website for a bag-selling business. The website will showcase available products and allow customers to place orders through WhatsApp. The client will manage products, categories, and images through an admin dashboard.

The system will include:

- Public customer-facing website
- Admin dashboard for product management
- Backend API with database integration
- WhatsApp ordering integration

The primary goal is to create a simple but professional online presence that converts visitors into WhatsApp inquiries.

---

# Objectives

1. Showcase all available bag products
2. Allow customers to browse categories
3. Display product details and prices
4. Allow ordering via WhatsApp
5. Provide admin panel to manage products
6. Allow easy expansion as new products are added

---

# Target Users

## Customers

People visiting the website to browse and inquire about bags.

Needs:

- Easy product browsing
- Mobile-friendly experience
- Quick WhatsApp ordering

## Admin (Business Owner)

Business owner who manages product catalog.

Needs:

- Add/edit/delete products
- Upload product images
- Manage product categories

---

# Core Features

## Public Website

### Home Page

Components:

- Navigation bar
- Hero banner
- Featured products
- Categories section
- About preview
- WhatsApp CTA
- Footer

### Products Page

Displays all products in grid layout.

Features:

- Category filtering
- Search functionality
- Pagination

Product Card includes:

- Product image
- Product name
- Price
- View details button

### Product Details Page

Displays detailed information.

Includes:

- Product images
- Product name
- Price
- Description
- Category
- WhatsApp order button

### About Page

Information about brand and company.

### Contact Page

Contact methods:

- WhatsApp
- Phone
- Instagram

---

# Admin Dashboard

## Admin Login

Admin authentication required.

Fields:

- Email
- Password

## Dashboard Overview

Displays:

- Total products
- Total categories
- Recently added products

## Product Management

Admin capabilities:

- Add product
- Edit product
- Delete product

Fields:

- Product name
- Description
- Price
- Category
- Product image

## Category Management

Admin can:

- Create category
- Edit category
- Delete category

Example categories:

- Shopping Bags
- Tote Bags
- Gift Bags
- Travel Bags

---

# Technology Stack

Frontend:

- React
- Vite
- TailwindCSS
- React Router

Backend:

- Node.js
- Express

Database:

- PostgreSQL

ORM:

- Prisma

Image Storage:

- Cloudinary

Deployment:

- Frontend: Vercel
- Backend: Render or Railway
- Database: Neon PostgreSQL

---

# Database Schema

## Product

Fields:

- id
- name
- description
- price
- imageUrl
- categoryId
- createdAt

## Category

Fields:

- id
- name

## Admin

Fields:

- id
- email
- password

---

# API Endpoints

## Product Endpoints

GET /products GET /products/\:id POST /products PUT /products/\:id DELETE /products/\:id

## Category Endpoints

GET /categories POST /categories PUT /categories/\:id DELETE /categories/\:id

## Admin Endpoints

POST /admin/login

---

# WhatsApp Ordering

When a customer clicks "Order on WhatsApp", a WhatsApp chat opens with a prefilled message.

Example message: Hello, I want to order this product:

Product: {product name} Price: {product price} Link: {product URL}

WhatsApp URL format: [https://wa.me/{phone}?text={encoded](https://wa.me/{phone}?text={encoded) message}

---

# UI Components

## Shared Components

- Navbar
- Footer
- ProductCard
- WhatsAppFloatingButton

## Page Components

- HomePage
- ProductsPage
- ProductDetailsPage
- AboutPage
- ContactPage

## Admin Components

- AdminLogin
- AdminDashboard
- AddProductForm
- EditProductForm
- CategoryManager

---

# Project Structure

frontend src components pages services utils

backend controllers routes middleware config prisma

---

# Development Steps

## Step 1

Setup project repositories

Create folders: frontend backend

## Step 2

Setup backend

Install dependencies

npm init npm install express cors dotenv prisma @prisma/client

Initialize Prisma

npx prisma init

Connect database

Create schema

Run migration

npx prisma migrate dev

## Step 3

Create API routes

Products API Categories API Admin login API

## Step 4

Setup frontend

Create React project

npm create vite\@latest

Install dependencies

npm install react-router-dom axios tailwindcss

Configure TailwindCSS

## Step 5

Create UI components

Navbar Hero Product Grid Product Card Footer

## Step 6

Build product pages

Products page Product details page

## Step 7

Connect frontend with backend API

Use Axios to fetch products

## Step 8

Implement WhatsApp order button

Generate dynamic message using product data

## Step 9

Build admin dashboard

Admin login page Product management pages Category management

## Step 10

Image upload system

Upload images to Cloudinary Save returned URL in database

## Step 11

Testing

Test all pages Test admin functionality Test WhatsApp ordering Test mobile responsiveness

## Step 12

Deployment

Deploy backend Deploy frontend Connect domain

---

# Performance Requirements

- Page load under 3 seconds
- Mobile responsive design
- Lazy loading for product images

---

# Security Requirements

- Admin authentication
- Password hashing
- Protected admin routes

---

# Future Improvements

- Product search with advanced filters
- Multiple product images
- Bulk order request form
- Analytics integration
- SEO optimization

---

# Deliverables

1. Public product website
2. Admin dashboard
3. Backend API
4. Database schema
5. Deployment setup

---

# Estimated Timeline

Planning: 1 day Backend Development: 2 days Frontend Development: 3 days Admin Dashboard: 2 days Testing and Deployment: 1 day

Total Estimated Time: 7-9 days

---

# System Architecture Document

## High Level Architecture

Client Browser (User) ↓ React Frontend (Vite + Tailwind) ↓ HTTP API Node.js + Express Backend ↓ Prisma ORM PostgreSQL Database

Image Storage: Cloudinary

Deployment Layers:

- Frontend → Vercel
- Backend → Render / Railway
- Database → Neon PostgreSQL

## Data Flow

1. Admin logs into dashboard
2. Admin adds or edits products
3. Backend API validates request
4. Images uploaded to Cloudinary
5. Cloudinary returns image URL
6. Prisma stores product data in PostgreSQL
7. Frontend fetches products via API
8. Users browse products
9. User clicks WhatsApp order
10. WhatsApp opens with prefilled message

## Authentication Flow

Admin Login ↓ POST /admin/login ↓ Backend verifies credentials ↓ JWT token generated ↓ Token stored in browser ↓ Protected admin routes require token

## Scalability Considerations

- Pagination for product list
- Image lazy loading
- API caching (optional future improvement)

---

# Production Database Schema (Prisma)

Example production-ready Prisma schema:

```prisma
generator client {
 provider = "prisma-client-js"
}

 datasource db {
 provider = "postgresql"
 url = env("DATABASE_URL")
}

model Product {
 id Int @id @default(autoincrement())
 name String
 slug String @unique
 description String
 price Float
 imageUrl String
 categoryId Int
 category Category @relation(fields: [categoryId], references: [id])
 createdAt DateTime @default(now())
 updatedAt DateTime @updatedAt
}

model Category {
 id Int @id @default(autoincrement())
 name String
 slug String @unique
 products Product[]
}

model Admin {
 id Int @id @default(autoincrement())
 email String @unique
 password String
 createdAt DateTime @default(now())
}
```

## Database Relationships

Category (1) → (Many) Products

Each product belongs to one category.

## Indexing Strategy

Indexes should exist for:

- Product slug
- Category slug
- Product categoryId

---

# Frontend UI Wireframe

## Home Page Layout

Navbar ↓ Hero Banner ↓ Featured Products ↓ Categories Section ↓ About Preview ↓ Call To Action (WhatsApp) ↓ Footer

## Products Page Layout

Navbar ↓ Filters (Category / Search) ↓ Product Grid ↓ Pagination ↓ Footer

## Product Details Layout

Navbar ↓ Product Image Gallery ↓ Product Info

Name Price Description Category

↓ Order on WhatsApp Button ↓ Footer

## Admin Dashboard Layout

Sidebar Navigation

Dashboard Products Categories Logout

Dashboard Page

Statistics Recent Products

Product Management Page

Table layout

Columns:

- Product Image
- Name
- Price
- Category
- Edit
- Delete

Add Product Form

Fields:

- Name
- Description
- Price
- Category
- Image Upload

---

# Frontend Component Map

## Layout Components

Navbar Footer Sidebar (Admin)

## Product Components

ProductCard ProductGrid ProductImageGallery ProductDetails

## Utility Components

SearchBar CategoryFilter Pagination WhatsAppButton

## Admin Components

AdminLogin DashboardStats ProductTable AddProductForm EditProductForm CategoryManager

---

# AI Coding Prompt Pack

These prompts are optimized for coding assistants such as Cursor, Continue.dev, or Copilot.

## Backend Build Prompt

Build a Node.js Express backend for a product catalog website.

Requirements:

- Use Express.js
- Use Prisma ORM
- Use PostgreSQL database
- Implement REST API
- Implement admin authentication with JWT

Required API endpoints:

Products: GET /products GET /products/\:slug POST /products PUT /products/\:id DELETE /products/\:id

Categories: GET /categories POST /categories PUT /categories/\:id DELETE /categories/\:id

Admin: POST /admin/login

Additional requirements:

- Use bcrypt for password hashing
- Use middleware for route protection
- Use MVC architecture

## Database Setup Prompt

Create Prisma schema for a product catalog system.

Models required:

Product Category Admin

Features:

- One-to-many relationship between Category and Product
- Auto timestamps
- Unique slug fields

After schema creation:

- Run migration
- Generate Prisma client

## Frontend Build Prompt

Create a React frontend using Vite and TailwindCSS.

Requirements:

Pages:

Home Products Product Details About Contact

Features:

- Fetch products from backend API
- Product grid layout
- Category filtering
- Pagination

Components required:

Navbar Footer ProductCard ProductGrid SearchBar Pagination

## Admin Dashboard Prompt

Create an admin dashboard in React.

Requirements:

Admin authentication Protected routes

Pages:

Admin Login Dashboard Products Management Categories Management

Features:

Add product Edit product Delete product Upload product images

## Deployment Prompt

Prepare project for deployment.

Frontend:

Deploy React app to Vercel.

Backend:

Deploy Node.js API to Render or Railw
