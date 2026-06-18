# Employee Task Management System

## Project Overview

Employee Task Management System is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js).

The application enables organizations to manage employees and tasks through role-based access control. Users can register, login, manage tasks, add comments, receive notifications, and access role-specific dashboards.

This project was developed as part of the IBM FullStack Web Application Development Hands-on Activity.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Token Authentication
* Password Hashing using Bcrypt
* Logout Functionality

### Authorization

* Protected Backend APIs
* Protected Frontend Routes
* Role-Based Access Control (RBAC)

### Roles

#### Admin

* View Dashboard Summary
* Manage Tasks
* Manage Comments
* Manage Notifications

#### Manager

* Create Tasks
* Update Tasks
* View Dashboard Summary

#### Employee

* View Tasks
* Update Tasks
* Add Comments
* View Notifications

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Authentication

* JWT (JSON Web Token)
* BcryptJS

### Testing

* Jest
* Supertest

---

## Project Structure

employee-task-management

├── backend

│ ├── src

│ │ ├── controllers

│ │ ├── models

│ │ ├── routes

│ │ ├── middlewares

│ │ ├── validators

│ │ └── tests

│

├── frontend

│ ├── src

│ │ ├── pages

│ │ ├── services

│ │ ├── routes

│ │ └── components

---

## Installation

### Clone Repository

git clone <your-github-repository-url>

cd employee-task-management

---

## Backend Setup

Navigate to backend folder:

cd backend

Install dependencies:

npm install

Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=1d

Start backend server:

npm run dev

Server runs at:

http://localhost:5000

---

## Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start frontend:

npm run dev

Application runs at:

http://localhost:5173

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

### Dashboard

GET /api/dashboard

### Tasks

POST /api/tasks

GET /api/tasks

GET /api/tasks/:id

PUT /api/tasks/:id

DELETE /api/tasks/:id

### Comments

POST /api/comments

GET /api/comments

PUT /api/comments/:id

DELETE /api/comments/:id

### Notifications

POST /api/notifications

GET /api/notifications

PUT /api/notifications/:id/read

DELETE /api/notifications/:id

---

## Testing

Run Backend Tests

npm test

Coverage Report

npm test -- --coverage

Current Backend Coverage:

Statements: 70%+

---

## Screenshots

Include screenshots of:

* Home Page
* Registration Page
* Login Page
* Dashboard
* Tasks CRUD
* Comments Module
* Notifications Module
* Coverage Report

---

## Future Enhancements

* Email Notifications
* Task Assignment Workflow
* File Attachments
* Real-time Notifications
* Refresh Token Authentication

---

## Author

Janhavi Agrawal

IBM FullStack Web Application Development Assignment
