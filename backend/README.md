# Secure & Flexible Authentication System - Backend API

**Version:** 1.0.0
**Last Updated:** May 21, 2025
**Primary Technologies:** Node.js, Express.js, MongoDB (with Mongoose), JWT

-----

## Table of Contents

Table of Contents

  * [1. Project Overview]
  * [2. Features]
  * [3. Tech Stack]
  * [4. Prerequisites]
  * [5. Getting Started]
      * [Cloning the Repository]
      * [Environment Setup]
      * [Installing Dependencies]
      * [Running the Application]
  * [6. API Endpoints]
      * [Authentication Routes (`/api/auth`)]
      * [User Routes (`/api/users` - Example)]
  * [7. Environment Variables]
  * [8. Project Structure]
  * [9. Scripts]
  * [10. Security Features]
  * [11. Testing]
      * [Running Unit/Integration Tests]
  * [12. Code Style & Linting]
  * [13. Contributing]
  * [14. License]
  * [15. Contact]

-----

## 1\. Project Overview

This project provides a robust and secure backend API for a flexible website authentication system. It caters to diverse user roles (Buyer, Tenant, Owner, User, Admin, Content Creator) and includes core functionalities such as **user registration with email verification**, **login with JWT-based session management**, **secure password hashing**, **password reset functionality**, and **role-based access control**.

The API is designed to be consumed by a frontend application (e.g., a React SPA).

-----

## 2\. Features

  * **User Registration:** New user sign-up with role selection.
  * **Email Verification:** Account activation via email link.
  * **User Login:** Secure authentication using email/username and password.
  * **JWT Authentication:** Stateless session management using JSON Web Tokens.
  * **Password Hashing:** Secure storage of passwords using `bcryptjs`.
  * **Forgot/Reset Password:** Secure mechanism for users to recover and reset forgotten passwords via email.
  * **Role-Based Access Control (RBAC):** Middleware to protect routes based on user roles.
  * **Protected Routes:** Secure access to user-specific and role-specific resources.
  * **Input Validation:** Server-side validation of incoming data using `express-validator`.
  * **Centralized Error Handling:** Graceful error management.
  * **Security Headers:** Enhanced security with `helmet`.
  * **Rate Limiting:** Protection against brute-force attacks using `express-rate-limit`.
  * **HTTP Request Logging:** Development logging using `morgan`.

-----

## 3\. Tech Stack

  * **Runtime Environment:** Node.js (v18.x or later recommended)
  * **Framework:** Express.js
  * **Database:** MongoDB (NoSQL database)
  * **ODM (Object Data Modeling):** Mongoose
  * **Authentication:** JSON Web Tokens (JWT) (`jsonwebtoken`)
  * **Password Hashing:** `bcryptjs`
  * **Email Sending:** Nodemailer (with Ethereal.email for development/testing)
  * **Input Validation:** `express-validator`
  * **Environment Variables:** `dotenv`
  * **Security:** `helmet`, `express-rate-limit`
  * **HTTP Logging:** `morgan`
  * **CORS Handling:** `cors`
  * **Testing:** Jest, Supertest, MongoDB Memory Server

-----

## 4\. Prerequisites

Before you begin, ensure you have the following installed on your local development machine:

  * **Node.js:** Version 18.x or higher. Download from [nodejs.org](https://nodejs.org/). (npm is included with Node.js)
  * **MongoDB:** Version 5.x or higher. Download from [mongodb.com](https://www.mongodb.com/try/download/community) or use a cloud service like MongoDB Atlas.
  * **Git:** For cloning the repository. Download from [git-scm.com](https://git-scm.com/).
  * **(Optional) A REST Client:** Tools like Postman, Insomnia, or the VS Code REST Client extension for testing API endpoints.

-----

## 5\. Getting Started

### Cloning the Repository

```bash
git clone <repository-url>
cd <project-backend-folder-name> # e.g., cd secure-auth-backend
```

### Environment Setup

Create a `.env` file:
This project uses a `.env` file to store environment-specific configurations and sensitive credentials. Copy the example file and update it with your settings:

```bash
cp .env.example .env
```

Edit `.env`:
Open the newly created `.env` file and fill in the required variables. Refer to the [Environment Variables] section for details on each variable.

  * Ensure `MONGODB_URI` points to your MongoDB instance.
  * Set a strong `JWT_SECRET`.
  * Configure email settings (Ethereal for dev, or your actual provider).
  * Set `FRONTEND_URL` for email links.

### Installing Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### Running the Application

**Development Mode (with Nodemon for auto-restarts):**

```bash
npm run dev
```

The server will typically start on the port specified in your `.env` file (default: 5001). You should see logs indicating server start and MongoDB connection status.

**Production Mode:**

```bash
npm start
```

This runs the server using `node server.js`. Ensure your `NODE_ENV` in `.env` is set to `production` for production builds.

-----

## 6\. API Endpoints

API Endpoints

All API endpoints are prefixed with `/api`.

### Authentication Routes (`/api/auth`)

| Method | Endpoint                       | Description                                                | Access                   |
| :----- | :----------------------------- | :--------------------------------------------------------- | :----------------------- |
| `POST` | `/register`                    | Register a new user.                                       | `Public`                 |
| `POST` | `/login`                       | Log in an existing user, returns JWT.                      | `Public`                 |
| `GET`  | `/verify-email/:token`         | Verify user's email via token from link.                   | `Public`                 |
| `POST` | `/forgot-password`             | Request a password reset email.                            | `Public`                 |
| `POST` | `/reset-password/:token`       | Reset password using token and new password.               | `Public`                 |
| `POST` | `/resend-verification-email`   | Request a new email verification link.                     | `Public`                 |
| `GET`  | `/me`                          | Get details of the currently authenticated user.           | `Private` (Requires JWT) |
| `GET`  | `/admin-summary` (Example)     | Example admin-only endpoint.                               | `Private` (Admin Role)   |

### User Routes (`/api/users` - Example)

(If you have other resource routes, document them similarly)

| Method | Endpoint | Description                       | Access                 |
| :----- | :------- | :-------------------------------- | :--------------------- |
| `GET`  | `/`      | Get all users (Admin only example). | `Private` (Admin Role) |
| `GET`  | `/:id`   | Get a specific user by ID.        | `Private`              |


-----

## 7\. Environment Variables

Environment Variables

The following environment variables are used by the application. Create a `.env` file in the root of the backend project and populate it based on `.env.example`.

  * `NODE_ENV`: Application environment (`development`, `production`, `test`).
  * `BACKEND_PORT`: Port the backend server will run on (e.g., `5001`).
  * `MONGODB_URI`: Connection string for your MongoDB database.
  * `JWT_SECRET`: A long, random, and strong secret key for signing JWTs.
  * `JWT_EXPIRES_IN`: Expiration time for JWTs (e.g., `1h`, `7d`).
  * `FRONTEND_URL`: Base URL of your frontend application (used for generating email links, e.g., `http://localhost:3000`).

**Email Settings (Ethereal for Development):**

  * `ETHEREAL_HOST`: (e.g., `smtp.ethereal.email`)
  * `ETHEREAL_PORT`: (e.g., `587`)
  * `ETHEREAL_SECURE`: (e.g., `false`)
  * `ETHEREAL_USER`: Ethereal username.
  * `ETHEREAL_PASS`: Ethereal password.

**Email Settings (Production - Example):**

  * `EMAIL_HOST`: SMTP host of your email provider.
  * `EMAIL_PORT`: SMTP port.
  * `EMAIL_SECURE`: `true` if using SSL (e.g., port 465), `false` for TLS (e.g., port 587).
  * `EMAIL_USER`: Username for your email provider.
  * `EMAIL_PASS`: Password for your email provider.
  * `EMAIL_FROM_NAME`: Sender name for emails (e.g., "My App").
  * `EMAIL_FROM_ADDRESS`: Sender email address (e.g., `noreply@example.com`).

**Rate Limiting (Optional Defaults):**

  * `RATE_LIMIT_WINDOW_MS`: Time window for rate limiting in milliseconds (e.g., `900000` for 15 minutes).
  * `RATE_LIMIT_MAX_REQUESTS`: Max requests allowed per IP within the window (e.g., `100`).

-----

## 8\. Project Structure

```
backend/
├── __tests__/                   # Jest test files
│   └── controllers/
│       └── authController.test.js
├── config/                      # Configuration files (e.g., database)
│   └── db.js
├── controllers/                 # Request handlers and business logic
│   ├── authController.js
│   └── verifyEmailController.js
├── middleware/                  # Custom Express middleware
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
├── models/                      # Mongoose models and schemas
│   └── User.js
├── routes/                      # Express route definitions
│   └── authRoutes.js
├── utils/                       # Utility functions and services
│   └── emailService.js
├── .env                         # Environment variables (ignored by Git)
├── .env.example                 # Example environment variables
├── .eslintignore                # Files/directories to ignore for ESLint
├── .eslintrc.js                 # ESLint configuration
├── .gitignore                   # Files/directories to ignore for Git
├── jest.config.js               # Jest test runner configuration
├── jest.setup.js                # Global setup for Jest tests (e.g., in-memory DB)
├── package-lock.json
├── package.json                 # Project metadata and dependencies
├── README.md                    # This file
└── server.js                    # Main application entry point
```

-----

## 9\. Scripts

The following scripts are available in `package.json`:

  * `npm start`: Starts the server in production mode (`node server.js`).
  * `npm run dev`: Starts the server in development mode with Nodemon for auto-reloading (`nodemon server.js`).
  * `npm test`: Runs Jest tests (`jest --runInBand`).
  * `npm run test:watch`: Runs Jest tests in watch mode.
  * `npm run test:coverage`: Runs Jest tests and generates a code coverage report.
  * `npm run lint`: Lints the codebase using ESLint.
  * `npm run format`: Formats the codebase using Prettier.

-----

## 10\. Security Features

  * **Password Hashing:** Uses `bcryptjs` to securely hash and salt user passwords.
  * **JWT Authentication:** Employs JSON Web Tokens for secure, stateless user sessions. Tokens are signed with a strong secret.
  * **HTTPS (Recommended for Production):** While this backend doesn't enforce HTTPS directly (typically handled by a reverse proxy like Nginx or hosting platform), it's crucial for production deployments.
  * **Input Validation:** `express-validator` is used to validate all incoming request data on the server-side, preventing common injection vulnerabilities and ensuring data integrity.
  * **Environment Variables:** Sensitive information (database credentials, JWT secrets, API keys) is stored in `.env` files and not committed to version control.
  * **Security Headers:** `helmet` middleware is used to set various HTTP headers that help protect against common web vulnerabilities (XSS, clickjacking, etc.).
  * **Rate Limiting:** `express-rate-limit` helps prevent brute-force attacks on authentication and other sensitive endpoints.
  * **CORS:** `cors` middleware is configured to manage Cross-Origin Resource Sharing, typically allowing requests from the configured frontend URL.
  * **Token Hashing for Verification/Reset:** Email verification and password reset tokens sent to users are different from the (hashed) versions stored in the database, enhancing security.
  * **Principle of Least Privilege (via Roles):** The `authorizeRoles` middleware ensures users can only access resources appropriate for their assigned role.

-----

## 11\. Testing

This project uses **Jest** for unit and integration testing, **Supertest** for HTTP endpoint testing, and **MongoDB Memory Server** for an in-memory MongoDB instance during tests.

### Running Unit/Integration Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode (re-runs tests on file changes):

```bash
npm run test:watch
```

To generate a code coverage report (output in the `coverage/` directory):

```bash
npm run test:coverage
```

Open `coverage/lcov-report/index.html` in your browser to view the detailed report.

Test files are located in the `__tests__` directory, mirroring the structure of the code they are testing.

-----

## 12\. Code Style & Linting

  * **ESLint:** Used for static code analysis to find problematic patterns or code that doesn’t adhere to style guidelines. Configuration is in `.eslintrc.js`.
  * **Prettier:** Used as an opinionated code formatter to ensure consistent code style across the project. Configuration is in `.prettierrc.json`.

To lint the code:

```bash
npm run lint
```

To automatically format the code:

```bash
npm run format
```

It's recommended to integrate these with your IDE (e.g., VS Code) for real-time feedback and format-on-save functionality.

-----

## 13\. Contributing

Contributions are welcome\! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    # OR
    git checkout -b fix/issue-number
    ```
3.  Make your changes. Ensure you adhere to the code style and write tests for new functionality.
4.  Commit your changes with a descriptive commit message (e.g., following [Conventional Commits]).
5.  Push your changes to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
6.  Open a Pull Request to the `main` (or `develop`) branch of the original repository.
7.  Provide a clear description of your changes in the Pull Request.

Please ensure all tests pass and the linter shows no errors before submitting a PR.

-----

## 14\. License

This project is licensed under the MIT License.

-----