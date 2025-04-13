# Library API

This is a RESTful API for a book management system built with **Express.js** and **Prisma ORM**.  
It allows users to register, log in, browse books, and leave reviews. Admin users can manage books, authors, genres, and publishers.  
The API also includes features like favorites, request validation with Zod, and secure session-based authentication.

## Features

- 🔐 User authentication with sessions (register, login, logout)
- 📚 CRUD operations for books, authors, genres, and publishers (Admin only)
- ❤️ Manage favorite books
- 🌟 Add, edit, and delete reviews for books
- 🧪 Request validation using Zod
- 🛡️ Protected routes with role-based access (User/Admin)
- ⚙️ Prisma ORM with MySQL database
- 🛠️ Easy setup with environment variables and seed script

## 🧰 Tech Stack

### Backend

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for building RESTful APIs
- **TypeScript** – Strongly typed programming language that builds on JavaScript
- **Prisma ORM** – Database toolkit and type-safe query builder
- **MySQL** – Relational database used with Prisma and express-mysql-session

### Authentication & Session

- **bcrypt** – Password hashing
- **express-session** – Session management
- **express-mysql-session** – Stores sessions in a MySQL database

### Validation

- **zod** – TypeScript-first schema validation with static type inference

### Environment Management

- **dotenv** – Loads environment variables from `.env` file

### Development Tools

- **Nodemon** – Auto-restarts the server on file changes
- **ts-node-dev / tsx** – Runs TypeScript directly in Node.js
- **ESLint & TypeScript-ESLint** – Code linting and formatting
- **@types/\*** – Type definitions for improved TypeScript support

### HTTP Errors

- **http-errors** – Simplified error creation and handling for Express

### CORS

- **cors** – Middleware to enable Cross-Origin Resource Sharing

## Setup

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/anelsahovic/library-api.git
cd library-api
```

### 2. Install Dependencies

Run the following command to install the necessary packages:

```bash
npm install
```

### 3. Setup the Environment Variables

Create a .env file in the root directory of the project. Below are the required environment variables:

```bash
DATABASE_URL=your-database-url-here
PORT=3000
SESSION_SECRET=your-session-secret-here
```

### 4. Database Migration and Seeding

Run the following command to generate your database schema and run migrations with seeding:

```bash
npm run db:reset
```

### 5. Start the Server

After setting up your environment and database, start the server:

```bash
npm start
```

## 📚 API Endpoints

### 🔐 Auth Routes (`/api/auth`)

- `GET /api/auth/` – Get the authenticated user
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login
- `POST /api/auth/logout` – Logout

### 📘 Book Routes (`/api/books`) – Requires Auth

- `GET /api/books/` – List all books
- `GET /api/books/:bookId` – Get book by ID
- `POST /api/books/` – Create a new book (Admin only)
- `PUT /api/books/:bookId` – Update book (Admin only)
- `DELETE /api/books/:bookId` – Delete book (Admin only)

### ✍️ Author Routes (`/api/authors`) – Requires Auth

- `GET /api/authors/` – List all authors
- `GET /api/authors/:authorId` – Get author by ID
- `POST /api/authors/` – Create a new author (Admin only)
- `PUT /api/authors/:authorId` – Update author (Admin only)
- `DELETE /api/authors/:authorId` – Delete author (Admin only)

### 🏷️ Genre Routes (`/api/genres`) – Requires Auth

- `GET /api/genres/` – List all genres
- `GET /api/genres/:genreId` – Get genre by ID
- `POST /api/genres/` – Create a new genre (Admin only)
- `PUT /api/genres/:genreId` – Update genre (Admin only)
- `DELETE /api/genres/:genreId` – Delete genre (Admin only)

### 🏢 Publisher Routes (`/api/publishers`) – Requires Auth

- `GET /api/publishers/` – List all publishers
- `GET /api/publishers/:publisherId` – Get publisher by ID
- `POST /api/publishers/` – Create a new publisher (Admin only)
- `PUT /api/publishers/:publisherId` – Update publisher (Admin only)
- `DELETE /api/publishers/:publisherId` – Delete publisher (Admin only)

### ⭐ Favorite Routes (`/api/favorites`) – Requires Auth

- `GET /api/favorites/` – List favorite books
- `POST /api/favorites/` – Add a book to favorites
- `DELETE /api/favorites/:bookId` – Remove book from favorites

### 📝 Review Routes (`/api/reviews`) – Requires Auth

- `GET /api/reviews/` – List all reviews
- `GET /api/reviews/book/:bookId` – Get all reviews for a book
- `GET /api/reviews/:reviewId` – Get review by ID
- `POST /api/reviews/` – Create a new review
- `PUT /api/reviews/:reviewId` – Update review
- `DELETE /api/reviews/:reviewId` – Delete review

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request.

---

## 📩 Contact

- **GitHub**: [github.com/anelsahovic](https://github.com/anelsahovic)
- **Email**: anel.sahovic.bsc@gmail.com
