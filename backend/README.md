````markdown
# To-Let Globe - Backend API

**Version: 1.0.0**
**Last Updated: May 30, 2025**
**Primary Technologies: Node.js, Express.js, MongoDB (with Mongoose), JWT**

---

📄 Table of Contents

1.  [Project Overview](#1-project-overview)
2.  [Features](#2-features)
3.  [Tech Stack](#3-tech-stack)
4.  [Prerequisites](#4-prerequisites)
5.  [Getting Started](#5-getting-started)
    * [Cloning the Repository](#cloning-the-repository)
    * [Environment Setup](#environment-setup)
    * [Installing Dependencies](#installing-dependencies)
    * [Running the Application](#running-the-application)
6.  [API Endpoints](#6-api-endpoints)
    * [Authentication & User Routes (`/api/auth`)](#authentication--user-routes-apiauth)
    * [Contact Routes (`/api/contact`)](#contact-routes-apicontact)
7.  [Environment Variables](#7-environment-variables)
8.  [Project Structure](#8-project-structure)
9.  [Scripts](#9-scripts)
10. [Security Features](#10-security-features)
11. [Testing](#11-testing)
    * [Running Unit/Integration Tests](#running-unitintegration-tests)
12. [Code Style & Linting](#12-code-style--linting)
13. [Contributing](#13-contributing)
14. [License](#14-license)
15. [Contact](#15-contact)

---

## 1. Project Overview

This project provides a robust and secure backend API for the To-Let Globe application. It supports diverse user roles (e.g., User, Admin, potentially Tenant, Owner, etc.) and includes core functionalities such as user registration with email verification, login with JWT-based session management, secure password hashing, password reset functionality, role-based access control, and a fully functional contact form system.

The API is designed to be consumed by a modern frontend application (e.g., the To-Let Globe React Frontend).

---

## 2. Features

### User Authentication & Authorization:

* **User Registration:** New user sign-up with optional role selection.
* **Email Verification:** Account activation via secure email links.
* **User Login:** Secure authentication using email/username and password.
* **JWT Authentication:** Stateless session management using JSON Web Tokens.
* **Password Hashing:** Secure storage of passwords using `bcryptjs`.
* **Forgot/Reset Password:** Secure mechanism for users to recover and reset forgotten passwords via email.
* **Role-Based Access Control (RBAC):** Middleware to protect routes based on user roles.
* **Protected Routes:** Secure access to user-specific and role-specific resources.

### Contact Form Management:

* **Message Submission:** API endpoint to receive user contact messages.
* **Database Persistence:** Stores all contact messages in MongoDB.
* **Email Notifications:** Sends automated confirmation emails to the user and notification emails to the configured admin upon successful submission.

### API Management & Security:

* **Input Validation:** Server-side validation of incoming data using `express-validator`.
* **Centralized Error Handling:** Graceful error management for consistent API responses.
* **Security Headers:** Enhanced security with `helmet` middleware.
* **Rate Limiting:** Protection against brute-force attacks using `express-rate-limit`.
* **HTTP Request Logging:** Development logging using `morgan`.
* **CORS Handling:** Configured for seamless cross-origin resource sharing.

---

## 3. Tech Stack

* **Runtime Environment:** Node.js (v18.x or later recommended)
* **Framework:** Express.js
* **Database:** MongoDB (NoSQL database, typically hosted on MongoDB Atlas)
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

---

## 4. Prerequisites

Before you begin, ensure you have the following installed on your local development machine:

* **Node.js:** Version 18.x or higher. Download from [nodejs.org](https://nodejs.org/). (npm is included with Node.js installation).
* **MongoDB:** Version 5.x or higher. Download from [mongodb.com](https://www.mongodb.com/try/download/community) or preferably use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
* **Git:** For cloning the repository. Download from [git-scm.com](https://git-scm.com/).
* **(Optional) A REST Client:** Tools like Postman, Insomnia, or the VS Code REST Client extension for testing API endpoints.

---

## 5. Getting Started

### Cloning the Repository

If you haven't already, clone the main To-Let Globe monorepo and navigate into the backend directory:

```bash
git clone [https://github.com/your-username/to-let-globe.git](https://github.com/your-username/to-let-globe.git)
cd to-let-globe/backend
````

**Note:** Replace `your-username` with your actual GitHub username.

### Environment Setup

This project uses a `.env` file to store environment-specific configurations and sensitive credentials.

1.  **Create a `.env` file:**
    Copy the example file to create your local environment configuration:

    ```bash
    cp .env.example .env
    ```

2.  **Edit `.env`:**
    Open the newly created `.env` file and fill in the required variables. Refer to the [Environment Variables](https://www.google.com/search?q=%237-environment-variables) section for detailed descriptions of each variable.

      * Ensure `MONGODB_URI` points to your MongoDB instance (local or Atlas).
      * Set a strong, unique `JWT_SECRET`.
      * Configure email settings (use Ethereal.email credentials for development/testing).
      * Set `FRONTEND_URL` to your frontend application's URL (e.g., `http://localhost:5173` for local development).
      * Set `ADMIN_EMAIL` to the email address where you want to receive contact form notifications.

### Installing Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### Running the Application

  * **Development Mode (with Nodemon for auto-restarts):**

    ```bash
    npm run dev
    ```

    The server will typically start on the port specified in your `.env` file (default: `5001`). You should see console logs indicating server startup and MongoDB connection status.

  * **Production Mode:**

    ```bash
    npm start
    ```

    This command runs the server using `node server.js`. Ensure your `NODE_ENV` in `.env` is set to `production` when deploying for production environments.

-----

## 6\. API Endpoints

All API endpoints are prefixed with `/api`.

### Authentication & User Routes (`/api/auth`)

| Method | Endpoint                    | Description                                                            | Access                 |
| :----- | :-------------------------- | :--------------------------------------------------------------------- | :--------------------- |
| `POST` | `/register`                 | Register a new user with email and password.                           | Public                 |
| `POST` | `/login`                    | Authenticate user, returns JWT on success.                             | Public                 |
| `GET`  | `/verify-email/:token`      | Verify user's email using a unique token from the email link.          | Public                 |
| `POST` | `/forgot-password`          | Request a password reset email for a given email address.              | Public                 |
| `POST` | `/reset-password/:token`    | Reset user's password using the token and a new password.              | Public                 |
| `POST` | `/resend-verification-email`| Request a new email verification link if the previous expired.         | Public                 |
| `GET`  | `/me`                       | Get details of the currently authenticated user.                       | Private (Requires JWT) |
| `GET`  | `/admin-summary`            | Example endpoint requiring 'admin' role.                               | Private (Admin Role)   |

### Contact Routes (`/api/contact`)

| Method | Endpoint | Description                                                                         | Access |
| :----- | :------- | :---------------------------------------------------------------------------------- | :----- |
| `POST` | `/`      | Submits a new contact message. Saves to DB and sends confirmation/notification emails. | Public |

-----

## 7\. Environment Variables

The following environment variables are used by the application. Create a `.env` file in the root of the backend project directory and populate it based on `.env.example`.

  * `NODE_ENV`: Application environment (`development`, `production`, `test`).
  * `BACKEND_PORT`: Port the backend server will run on (e.g., `5001`).
  * `MONGODB_URI`: Connection string for your MongoDB database (e.g., from MongoDB Atlas).
  * `JWT_SECRET`: A long, random, and strong secret key for signing JSON Web Tokens.
  * `JWT_EXPIRES_IN`: Expiration time for JWTs (e.g., `1h` for 1 hour, `7d` for 7 days).
  * `FRONTEND_URL`: Base URL of your frontend application (used for generating email links, e.g., `http://localhost:5173` for local development, or your Vercel URL for production).
  * `ADMIN_EMAIL`: The email address (e.g., `admin@toletglobe.com`) that will receive notifications for new contact form submissions.

### Email Settings (Ethereal for Development & Testing):

These are used for testing email functionality without needing a real email provider.

  * `ETHEREAL_HOST`: (e.g., `smtp.ethereal.email`)
  * `ETHEREAL_PORT`: (e.g., `587`)
  * `ETHEREAL_SECURE`: (`false` for TLS, `true` for SSL/465 port)
  * `ETHEREAL_USER`: Your Ethereal.email username.
  * `ETHEREAL_PASS`: Your Ethereal.email password.

### Email Settings (Production - Example using a real SMTP service):

Replace Ethereal settings with your actual SMTP provider credentials for production.

  * `EMAIL_HOST`: SMTP host of your production email provider (e.g., `smtp.sendgrid.net`).
  * `EMAIL_PORT`: SMTP port (e.g., `587` for TLS, `465` for SSL).
  * `EMAIL_SECURE`: `true` if using SSL (port 465), `false` for TLS (port 587).
  * `EMAIL_USER`: Username for your production email provider.
  * `EMAIL_PASS`: Password for your production email provider.
  * `EMAIL_FROM_NAME`: Sender name for all outgoing emails (e.g., "To-Let Globe Support").
  * `EMAIL_FROM_ADDRESS`: Sender email address (e.g., `noreply@toletglobe.com`).

### Rate Limiting (Optional - using default values if not set):

  * `RATE_LIMIT_WINDOW_MS`: Time window for rate limiting in milliseconds (e.g., `900000` for 15 minutes).
  * `RATE_LIMIT_MAX_REQUESTS`: Maximum requests allowed per IP within the defined window (e.g., `100`).

-----

## 8\. Project Structure

```
backend/
├── __tests__/                  # Jest test files for controllers, routes, etc.
│   ├── controllers/
│   │   └── authController.test.js
│   └── routes/
│       └── contactRoutes.test.js  # Example test for new contact route
├── config/                     # Configuration files (e.g., database connection)
│   └── db.js                   # MongoDB connection logic
├── controllers/                # Business logic and request handlers
│   ├── authController.js       # User authentication logic
│   └── contactController.js    # Contact form submission logic
├── middleware/                 # Custom Express middleware functions
│   ├── authMiddleware.js       # JWT validation, user retrieval
│   ├── errorMiddleware.js      # Centralized error handling
│   ├── validationMiddleware.js # Input validation via express-validator
├── models/                     # Mongoose schemas and models
│   ├── User.js                 # User schema
│   └── Contact.js              # Contact message schema
├── routes/                     # Express route definitions
│   ├── authRoutes.js           # Authentication related API routes
│   └── contactRoutes.js        # Contact form API routes
├── utils/                      # Utility functions and services
│   ├── emailService.js         # Nodemailer integration
│   ├── generateToken.js        # JWT token generation
│   └── sendEmail.js            # Email sending utility
├── .env                        # Local environment variables (ignored by Git)
├── .env.example                # Template for environment variables
├── .eslintignore               # Files/directories to ignore for ESLint
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Files/directories to ignore for Git
├── jest.config.js              # Jest test runner configuration
├── jest.setup.js               # Global setup for Jest tests (e.g., in-memory DB)
├── package-lock.json
├── package.json                # Project metadata and dependencies
├── README.md                   # This file (Backend API README)
└── server.js                   # Main application entry point
```

-----

## 9\. Scripts

The following npm scripts are available in `package.json` for development and testing:

  * `npm start`: Starts the server in production mode (`node server.js`).
  * `npm run dev`: Starts the server in development mode with `nodemon` for automatic reloading on file changes.
  * `npm test`: Runs all Jest tests (`jest --runInBand`).
  * `npm run test:watch`: Runs Jest tests in watch mode (re-runs tests on file changes).
  * `npm run test:coverage`: Runs Jest tests and generates a detailed code coverage report (output in the `coverage/` directory).
  * `npm run lint`: Lints the codebase using ESLint to identify code quality issues.
  * `npm run format`: Automatically formats the codebase using Prettier to enforce consistent styling.

-----

## 10\. Security Features

To ensure a robust and secure API, the following security measures are implemented:

  * **Password Hashing:** User passwords are never stored in plain text. Instead, `bcryptjs` is used to securely hash and salt them, making them resistant to rainbow table attacks.
  * **JWT Authentication:** JSON Web Tokens are employed for secure, stateless user sessions. Tokens are cryptographically signed with a strong, secret key (`JWT_SECRET`) to prevent tampering.
  * **HTTPS Enforcement (Production):** While not enforced directly by this Node.js application (as it's typically handled by a reverse proxy like Nginx or the hosting platform), using HTTPS is absolutely crucial for production deployments to encrypt data in transit.
  * **Input Validation:** `express-validator` is used to rigorously validate all incoming request data on the server-side. This helps prevent common vulnerabilities like SQL injection, XSS, and ensures data integrity.
  * **Environment Variables:** Sensitive information such as database credentials, JWT secrets, and API keys are stored in `.env` files and explicitly excluded from version control (`.gitignore`).
  * **Security Headers:** The `helmet` middleware is integrated to set various HTTP headers that help protect against common web vulnerabilities, including Cross-Site Scripting (XSS), clickjacking, and others.
  * **Rate Limiting:** `express-rate-limit` middleware is configured to prevent brute-force attacks on authentication endpoints and other sensitive routes by limiting the number of requests per IP address within a specified time window.
  * **CORS (Cross-Origin Resource Sharing):** The `cors` middleware is properly configured to manage access to the API, typically allowing requests only from the specified frontend URL.
  * **Token Hashing for Verification/Reset:** Email verification and password reset tokens sent to users are distinct from the (hashed) versions stored in the database. This adds an extra layer of security, as even if a token is intercepted, it cannot be directly used to gain access.
  * **Principle of Least Privilege (via Roles):** The `authorizeRoles` middleware ensures that users can only access API resources and perform actions that are appropriate for their assigned role, enforcing access control.

-----

## 11\. Testing

This project utilizes Jest for unit and integration testing. Supertest is used for making HTTP requests to test API endpoints, and MongoDB Memory Server provides an isolated, in-memory MongoDB instance for tests, ensuring tests are fast and don't affect your development database.

### Running Unit/Integration Tests

  * To run all tests:

    ```bash
    npm test
    ```

  * To run tests in watch mode (tests automatically re-run on file changes):

    ```bash
    npm run test:watch
    ```

  * To generate a detailed code coverage report (output will be in the `coverage/` directory):

    ```bash
    npm run test:coverage
    ```

    You can then open `coverage/lcov-report/index.html` in your web browser to view the interactive report.

Test files are organized within the `__tests__` directory, mirroring the structure of the code they are testing (e.g., `__tests__/controllers/authController.test.js`).

-----

## 12\. Code Style & Linting

To maintain code consistency and quality across the project, the following tools are integrated:

  * **ESLint:** Used for static code analysis to find problematic patterns, potential errors, and code that doesn’t adhere to defined style guidelines. The configuration is found in `.eslintrc.js`.

  * **Prettier:** Functions as an opinionated code formatter to ensure a consistent and readable code style across the entire codebase. The configuration is in `.prettierrc.json`.

  * To lint the code:

    ```bash
    npm run lint
    ```

  * To automatically format the code:

    ```bash
    npm run format
    ```

It's highly recommended to integrate these tools with your Integrated Development Environment (IDE), such as VS Code, for real-time feedback and automatic format-on-save functionality.

-----

## 13\. Contributing

Contributions are welcome\! If you'd like to contribute to the To-Let Globe backend, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/add-new-feature
    # OR
    git checkout -b fix/resolve-api-bug-123
    ```
3.  **Make your changes.** Ensure you adhere to the project's code style and write comprehensive tests for any new functionality or bug fixes.
4.  **Commit your changes** with a clear and descriptive commit message, ideally following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g., `feat: Implement admin dashboard API`, `fix: Correct password reset token validation`).
5.  **Push your changes** to your forked repository:
    ```bash
    git push origin feature/add-new-feature
    ```
6.  **Open a Pull Request** to the `main` (or `develop`) branch of the original repository.
7.  Provide a clear description of your changes and why they were made in the Pull Request.

Please ensure all tests pass (`npm test`) and the linter shows no errors (`npm run lint`) before submitting a Pull Request.

-----

## 14\. License

This project is licensed under the MIT License. For the full license text, please see the `LICENSE` file in the [monorepo root directory](https://www.google.com/search?q=../LICENSE).

-----

## 15\. Contact

For any inquiries, feedback, or support related to the To-Let Globe Backend API, please reach out via the contact form on the frontend application or directly via email:

  * **Project Maintainer:** Kaustubh Divekar
  * **Email:** your-email@example.com
  * **GitHub:** [https://github.com/kaustubhdivekar](https://github.com/kaustubhdivekar)

<!-- end list -->

```
```