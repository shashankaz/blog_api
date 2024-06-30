# Blog Backend API

## Table of Contents

- [Blog Backend API](#blog-backend-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Post Management](#post-management)
    - [Comment Management](#comment-management)

## Introduction

This is a backend API for a blog application built with Node.js, Express, and MongoDB. The API supports user authentication, post creation, updating, deleting, liking, disliking, and commenting on posts.

## Features

- User Registration and Login with JWT-based authentication
- Create, read, update, and delete posts
- Like and dislike posts
- Add, update, and delete comments on posts
- Get user profile information along with the post count

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv
- cookie-parser
- cors

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

```bash
git clone https://github.com/shashankaz/blog_api.git
```

2. Navigate to the project directory:

```bash
cd blog_api
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
```

5. Start the server:

```bash
npm start
```

## API Endpoints

### Authentication

- **Register a new user**

  ```
  POST /api/auth/register
  ```

  **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "bio": "Software Developer",
    "profilePicture": "url_to_profile_picture"
  }
  ```

- **Login a user**

  ```
  POST /api/auth/login
  ```

  **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Logout a user**

  ```
  GET /api/auth/logout
  ```

- **Get user profile and post count**

  ```
  GET /api/auth/profile
  ```

### Post Management

- **Create a new post**

  ```
  POST /api/posts
  ```

  **Request Body:**

  ```json
  {
    "title": "My First Post",
    "content": "This is the content of my first post."
  }
  ```

- **Get all posts**

  ```
  GET /api/posts
  ```

- **Get posts created by the logged-in user**

  ```
  GET /api/posts/me
  ```

- **Get a single post by ID**

  ```
  GET /api/posts/:id
  ```

- **Update a post**

  ```
  PUT /api/posts/:id
  ```

  **Request Body:**

  ```json
  {
    "title": "Updated Post Title",
    "content": "Updated content of the post."
  }
  ```

- **Delete a post**

  ```
  DELETE /api/posts/:id
  ```

- **Like a post**

  ```
  POST /api/posts/:id/like
  ```

- **Dislike a post**

  ```
  POST /api/posts/:id/dislike
  ```

### Comment Management

- **Add a comment to a post**

  ```
  POST /api/posts/:id/comment
  ```

  **Request Body:**

  ```json
  {
    "content": "This is a comment."
  }
  ```

- **Update a comment**

  ```
  PUT /api/posts/:postId/comment/:commentId
  ```

  **Request Body:**

  ```json
  {
    "content": "Updated comment content."
  }
  ```

- **Delete a comment**

  ```
  DELETE /api/posts/:postId/comment/:commentId
  ```

