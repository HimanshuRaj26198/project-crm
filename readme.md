# 📘 Project CRM – Backend Documentation

---

## 1️⃣ Project Overview

The CRM Backend is a RESTful API built using:

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT-based authentication
- Custom rate limiting middleware

It provides APIs for:

- User authentication
- User management
- Contact management
- Request validation
- Route-level rate limiting

---

## 2️⃣ Project Architecture

```
backend/
│
├── controllers/
│   ├── user.controller.ts
│   └── contacts.controller.ts
│
├── routes/
│   ├── user.routes.ts
│   └── contacts.routes.ts
│
├── models/
│   ├── user.model.ts
│   └── contact.model.ts
│
├── middleware/
│   ├── authenticate.ts
│   ├── raterLimitter.ts
│   ├── routeLimitter.ts
│   └── validate.ts
│
├── app.ts
└── server.ts
```

---

## 3️⃣ Server Setup

### `server.ts`

Responsible for:

- Starting the HTTP server
- Connecting to database
- Listening on configured PORT

### `app.ts`

Responsible for:

- Express app initialization
- Middleware registration
- Route registration
- Global error handling

---

## 4️⃣ Authentication System

### 🔐 JWT Authentication

File: `middleware/authenticate.ts`

How It Works:

1. User logs in
2. Server generates JWT
3. Client sends token in header:

```
Authorization: Bearer <token>
```

4. `authenticate` middleware:
   - Verifies token
   - Extracts user info
   - Attaches user to `req.user`
   - Calls `next()`

If invalid → returns `401 Unauthorized`

---

## 5️⃣ User Module

### 📦 User Model

File: `models/user.model.ts`

Fields:

- _id
- name
- email
- password (hashed)
- createdAt
- updatedAt

Passwords are stored securely using hashing (bcrypt assumed).

---

### 📌 User Routes

Base Route:

```
/api/users
```

---

### 🔹 Register User

**POST** `/api/users/register`

#### Body

```json
{
  "name": "Himanshu",
  "email": "himanshu@gmail.com",
  "password": "123456"
}
```

#### Response

```json
{
  "message": "User created successfully"
}
```

---

### 🔹 Login User

**POST** `/api/users/login`

#### Body

```json
{
  "email": "himanshu@gmail.com",
  "password": "123456"
}
```

#### Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

### 🔹 Get Current User

**GET** `/api/users/me`

Headers:

```
Authorization: Bearer <token>
```

#### Response

```json
{
  "id": "...",
  "name": "Himanshu",
  "email": "himanshu@gmail.com"
}
```

---

## 6️⃣ Contacts Module

### 📦 Contact Model

File: `models/contact.model.ts`

Fields:

- _id
- name
- email
- phone
- owner (User reference)
- createdAt
- updatedAt

Each contact belongs to a specific user.

---

### 📌 Contact Routes

Base Route:

```
/api/contacts
```

All routes are protected with `authenticate` middleware.

---

### 🔹 Create Contact

**POST** `/api/contacts`

#### Body

```json
{
  "name": "Client A",
  "email": "client@gmail.com",
  "phone": "9876543210"
}
```

---

### 🔹 Get All Contacts

**GET** `/api/contacts`

Returns only logged-in user's contacts.

---

### 🔹 Get Single Contact

**GET** `/api/contacts/:id`

---

### 🔹 Update Contact

**PUT** `/api/contacts/:id`

---

### 🔹 Delete Contact

**DELETE** `/api/contacts/:id`

---

## 7️⃣ Middleware Layer

### 🛡 `authenticate.ts`

- Verifies JWT
- Protects private routes

---

### 🚦 `raterLimitter.ts`

Global rate limiter middleware.

Purpose:

- Prevent brute force attacks
- Protect login endpoint

Example:

- 100 requests per 15 minutes

---

### 🚦 `routeLimitter.ts`

Route-level rate limiting.

Example:

- Login → strict limit
- Other routes → moderate limit

---

### ✅ `validate.ts`

Used to validate request body.

Purpose:

- Prevent invalid input
- Enforce required fields
- Avoid bad database entries

---

## 8️⃣ Error Handling Strategy

All errors return structured JSON.

### HTTP Status Codes Used

| Status | Meaning |
|--------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

## 9️⃣ Security Measures

- JWT Authentication
- Password hashing
- Rate limiting
- Route protection
- Input validation

---

## 🔟 Deployment

Backend runs inside Docker.

### Build

```bash
docker-compose build
```

### Run

```bash
docker-compose up -d
```

---

## 1️⃣1️⃣ Environment Variables

Stored inside:

```
backend/.env
```

### Example

```
PORT=4000
MONGO_URI=mongodb://...
JWT_SECRET=your_secret
```

---

## 1️⃣2️⃣ How to Test Using Postman

1. Register user
2. Login → copy token
3. Add header:

```
Authorization: Bearer <token>
```

4. Access protected routes

---

## 1️⃣3️⃣ Future Improvements (Recommended)

- Role-based access (Admin/User)
- Refresh token system
- Logging (Winston)
- API versioning (`/api/v1`)
- Swagger Documentation
- Redis-based rate limiting
- Email verification
- Password reset

---

## 🎯 Final Summary

This backend follows a clean, modular, and production-ready architecture with:

- Clear separation of concerns
- Secure authentication flow
- Middleware-based protection
- Scalable structure
- Docker-ready deployment

It is suitable for scaling into a full SaaS CRM platform.

