# Secure Task Manager API (JWT Authentication)
Assignment 4 for backend development and mern integration

---

This project is a backend API for a Task Management system built using Node.js, Express, MongoDB, and JSON Web Tokens (JWT).  
It implements secure user authentication and authorization, ensuring that users can only access and manage their own tasks.

---

## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware
- Task ownership authorization 
- Centralized error handling
- Secure CRUD operations for tasks

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs
- Postman (API testing)

---

## Authentication Flow

1. User registers using `/api/auth/register`
2. User logs in using `/api/auth/login`
3. On successful login, a JWT token is generated
4. Token is sent in request headers for protected routes
5. Middleware verifies the token and attaches user data to the request
6. Only authenticated users can access protected endpoints

---

## Authorization Logic

- Each task is associated with a specific user using the `user` field in the Task schema.

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
```

- For task-related routes, the API checks:
Task ID, Logged-in user ID
This ensures users can only view, update, or delete their own tasks.

## Error Handling

The project uses centralized error handling middleware to return meaningful error messages for:
- Invalid or missing tokens
- Unauthorized access
- Resource not found
- Server errors

## Environment Variables

Create a .env file with the following:
- ```PORT=5000```
- ```MONGO_URI=your_mongodb_connection_string```
- ```JWT_SECRET=your_jwt_secret```

## How to run the project

1. Install dependencies:
```npm install```
2. Start the server:
```npm start```
3. Test APIs using Postman


Author Komal Joshi