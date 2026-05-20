# eCommerce API

A backend REST API project built with Express, TypeScript, MongoDB Atlas, Mongoose, and Zod.

## Features

- CRUD operations for:
  - Categories
  - Products
  - Users
  - Orders

- Request validation using Zod
- MongoDB Atlas integration
- Mongoose schemas and models
- Layered architecture:
  - Routes
  - Controllers
  - Services
  - Models

- Centralized error handling
- REST Client test collection
- Render deployment ready

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose
- Zod
- REST Client (VS Code)

---

## Project Structure

```txt
src/
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── schemas/
├── services/
├── types/
├── utils/
└── app.ts
```

---

## Validation

The project uses Zod for:

- Request body validation
- Route params validation
- ObjectId validation
- DTO type inference

---

## Business Logic

Examples:

- Check whether category/product/user exists
- Prevent duplicate categories
- Automatically calculate order total
- Validate product references inside orders

---

## Development

```bash
npm install
npm run dev
```

---

## Production

```bash
npm run build
npm start
```

---

## Deployment

The API is prepared for deployment on Render using MongoDB Atlas.

---

## Testing

REST Client `.http` files are included for testing all CRUD endpoints.

Examples:

- category.http
- product.http
- user.http
- order.http
