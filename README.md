# Secure Auth System - Full Stack Application (Monorepo) 

**Version:** 1.0.0
**Last Updated:** May 25, 2025
**Live Frontend (Vercel):** [https://secure-auth-system-kaustubh-divekar-projects.vercel.app/](https://secure-auth-system-kaustubh-divekar-projects.vercel.app/)
**Live Backend API (Render):** [https://secure-auth-system-a29n.onrender.com/](https://secure-auth-system-a29n.onrender.com/)
This repository contains the complete source code for a full-stack Secure Authentication System, structured as a monorepo with a Node.js/Express.js backend and a React.js/JavaScript frontend. It demonstrates robust authentication flows including JWT management, email verification, password reset, and role-based access.

---

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Tech Stack](#tech-stack)
4.  [Monorepo Structure](#monorepo-structure)
5.  [Prerequisites](#prerequisites)
6.  [Local Development Setup](#local-development-setup)
7.  [API Endpoints Overview](#api-endpoints-overview)
8.  [Key Frontend Pages](#key-frontend-pages)
9.  [Environment Variables Details](#environment-variables-details)
10. [Deployment Instructions](#deployment-instructions)
11. [Testing](#testing)
12. [Code Quality & Conventions](#code-quality--conventions)
13. [Contributing](#contributing)
14. [License](#license)

---

<details>
<summary>
  <h2>1. Project Overview </h2>
</summary>

This monorepo houses a full-stack application designed to provide a secure, flexible, and modern authentication system. It features a decoupled backend API and a responsive React frontend, showcasing best practices in JWT handling, email-based account management, and secure data processing. The frontend implements a dark theme with cyan/gold accents as per the provided UI samples.

</details>

---

<details>
<summary>
  <h2>2. Features </h2>
</summary>

### Backend Features

* User Registration with secure password hashing (bcryptjs).
* Email Verification via unique, expiring tokens.
* Login with JWT (JSON Web Token) generation and validation.
* Password Reset functionality via email.
* Role-Based Access Control (RBAC) middleware.
* Protected API routes.
* Input validation and centralized error handling.
* Security enhancements: `helmet` for headers, `express-rate-limit` for brute-force protection.
* CORS configuration.

### Frontend Features

* User-friendly forms for Registration, Login, Forgot Password, and Reset Password, matching the provided UI design.
* Client-side routing with React Router.
* JWT stored in `localStorage` and automatically sent with API requests.
* Global authentication state management via React Context.
* Protected routes redirecting unauthenticated users.
* Dashboard for authenticated users to view profile information.
* Notifications/Toasts for user feedback.
* Responsive dark-theme design with cyan/gold accents.

</details>

---

<details>
<summary>
  <h2>3. Tech Stack </h2>
</summary>

### Backend

* **Runtime:** Node.js
* **Framework:** Express.js
* **ODM:** Mongoose
* **Authentication:** `jsonwebtoken`, `bcryptjs`
* **Email:** Nodemailer
* **Validation:** `express-validator`
* **Security:** `helmet`, `express-rate-limit`

### Frontend

* **Library/Framework:** React.js (JavaScript)
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **API Client:** Axios
* **Forms:** React Hook Form
* **State Management:** React Context API
* **UI Notifications:** React Toastify
* **Icons:** React Icons
* **Styling:** CSS Modules, Global CSS with Variables

### Database

* MongoDB (via MongoDB Atlas for cloud hosting)

### Deployment

* **Backend:** Render
* **Frontend:** Vercel
* **Database:** MongoDB Atlas

</details>

---

<details>
<summary>
  <h2>4. Monorepo Structure </h2>
</summary>

secure-auth-system/
├── backend/                  # Node.js Backend Application
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/                 # React Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore                # Root gitignore (can include common ignores and backend/frontend specifics)
└── README.md                 # This file (Monorepo Root README)


*(Consider using a root `package.json` with workspaces if you plan to manage dependencies or run scripts for both projects from the root, e.g., using npm workspaces, yarn workspaces, or pnpm).*

</details>

---

<details>
<summary>
  <h2>5. Prerequisites </h2>
</summary>

* **Node.js** (v18.x or later recommended).
* **npm** (v8.x or later) or yarn/pnpm.
* **Git**.
* A **MongoDB Atlas account** (free tier available).
* A **Render account** (free tier available).
* A **Vercel account** (free tier available).
* A **transactional email service provider** (e.g., SendGrid, Mailgun for production emails) or Ethereal.email for development.

</details>

---

<details>
<summary>
  <h2>6. Local Development Setup </h2>
</summary>

### Clone Repository

```bash
git clone <https://github.com/kaustubhdivekar/secure-auth-system>
cd secure-auth-system
Environment Variables
You will need to set up .env files for both the backend and frontend applications separately.

Backend Environment (backend/.env):

Navigate to the backend directory:

Bash

cd backend
cp .env.example .env
Edit backend/.env with your local MongoDB URI, JWT secret, email provider credentials, and FRONTEND_URL (e.g., http://localhost:5173 for Vite dev).

Frontend Environment (frontend/.env):

Navigate to the frontend directory:

Bash

cd ../frontend # (from backend folder) or cd frontend (from root)
cp .env.example .env
Edit frontend/.env with VITE_API_BASE_URL (e.g., http://localhost:5001/api if your backend runs on port 5001).

Backend Setup
Navigate to the backend directory:

Bash

cd backend # (if not already there)
Install dependencies:

Bash

npm install
Run the backend server (typically on port 5001):

Bash

npm run dev
Frontend Setup
Navigate to the frontend directory (in a new terminal window/tab):

Bash

cd frontend # (if not already there)
Install dependencies:

Bash

npm install
Run the frontend development server (typically on port 5173):

Bash

npm run dev
Running Both Services Concurrently
You will need two separate terminal windows: one for the backend (npm run dev in backend/) and one for the frontend (npm run dev in frontend/).
Access the frontend application in your browser (e.g., http://localhost:5173). It will make API calls to your local backend.

&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>7. API Endpoints Overview &lt;/h2>
&lt;/summary>

The backend exposes RESTful APIs under the /api prefix. Key authentication routes include:

POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify-email/:token
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
GET /api/auth/me (Protected)
(Refer to the backend's README or API documentation for detailed request/response schemas).

&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>8. Key Frontend Pages &lt;/h2>
&lt;/summary>

Login & Registration: Styled to match the dark theme with cyan/gold gradient accents.
Password Management: Forgot Password and Reset Password pages maintain the design consistency.
Email Verification: Page to confirm email verification status.
Dashboard: Protected area for authenticated users to view their profile.
Navbar: Consistent navigation across all pages.
&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>9. Environment Variables Details &lt;/h2>
&lt;/summary>

Backend (backend/.env)
NODE_ENV: development or production.
BACKEND_PORT: e.g., 5001.
MONGODB_URI: Your MongoDB Atlas connection string (or local MongoDB URI).
JWT_SECRET: A strong, random secret for JWT signing.
JWT_EXPIRES_IN: e.g., 1h, 7d.
FRONTEND_URL: e.g., http://localhost:5173 (for dev) or your Vercel URL (for prod).
EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM_NAME, EMAIL_FROM_ADDRESS: For your email service.
ETHEREAL_USER, ETHEREAL_PASS: For Ethereal.email development.
Frontend (frontend/.env)
VITE_API_BASE_URL: e.g., http://localhost:5001/api (for dev) or your Render backend URL (for prod).
&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>10. Deployment Instructions &lt;/h2>
&lt;/summary>

MongoDB Atlas Setup
Create a free account at MongoDB Atlas.
Create a new cluster (the free M0 tier is sufficient for development/small projects).
In your cluster settings, go to Network Access and add your current IP address (for local development) and 0.0.0.0/0 (Allow Access From Anywhere - for Render/Vercel, though be mindful of security implications; refine later if needed).
Go to Database Access and create a database user with a username and password. Grant this user "Read and write to any database" privileges.
Go to Databases, click "Connect" for your cluster, choose "Connect your application," select Node.js driver, and copy the connection string. Replace <username>, <password>, and myFirstDatabase (or your chosen DB name) in the string. This is your MONGODB_URI.
Backend Deployment (Render)
Push your code to a Git provider (GitHub, GitLab, Bitbucket).
Sign up/log in to Render.
Click "New +" and select "Web Service".
Connect your Git repository.
Configure the service:
Name: e.g., secure-auth-backend.
Region: Choose a region close to you or your users.
Branch: main (or your deployment branch).
Root Directory: backend (if your package.json for the backend is in the backend/ subdirectory of your monorepo). If Render doesn't easily support monorepo subdirectories, you might need to deploy the backend from a separate repository or adjust build settings.
Build Command: npm install (or yarn install).
Start Command: npm start (or node server.js).
Environment: Choose "Node".
Environment Variables: Add all necessary variables from your backend/.env file (e.g., MONGODB_URI pointing to Atlas, JWT_SECRET, FRONTEND_URL pointing to your Vercel frontend URL once deployed, production email credentials).
Select the Free instance type if applicable.
Click "Create Web Service". Render will build and deploy your backend. Note the .onrender.com URL provided.
Frontend Deployment (Vercel)
Push your code to a Git provider.
Sign up/log in to Vercel.
Click "Add New..." and select "Project".
Import your Git repository.
Configure the project:
Vercel usually auto-detects React (Vite) projects.
Root Directory: frontend (if your package.json for the frontend is in the frontend/ subdirectory).
Build Command: Should be auto-detected as npm run build or vite build.
Output Directory: Should be auto-detected as dist.
Environment Variables: Add VITE_API_BASE_URL and set its value to your deployed Render backend URL (e.g., https://your-backend-url.onrender.com/api).
Click "Deploy". Vercel will build and deploy your frontend. Note the URL provided.
Post-Deployment:

Update FRONTEND_URL in your Render backend environment variables to your Vercel deployment URL.
Update VITE_API_BASE_URL in your Vercel frontend environment variables to your Render backend deployment URL.
Redeploy both services if environment variables were updated after the initial deploy.
&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>11. Testing &lt;/h2>
&lt;/summary>

Backend: Unit and integration tests are written using Jest and Supertest. Run with npm test in the backend/ directory.
Frontend: (If implemented) Component and integration tests can be written using Vitest/Jest and React Testing Library. Run with npm test in the frontend/ directory.
&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>12. Code Quality & Conventions &lt;/h2>
&lt;/summary>

Linters & Formatters: ESLint and Prettier are configured for both backend and frontend to maintain code consistency and quality.
Commit Messages: Follow Conventional Commits or a similar standard for clear commit history.
Branching Strategy: Use a Gitflow-like model (feature branches, develop, main) for organized development.
&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>13. Contributing &lt;/h2>
&lt;/summary>

Contributions are welcome! Please fork the repository, create a feature branch, make your changes, and submit a pull request. Ensure your code adheres to the project's linting rules and testing standards.

&lt;/details>

&lt;details>
&lt;summary>
&lt;h2>14. License &lt;/h2>
&lt;/summary>

This project is licensed under the MIT License. (Create a LICENSE file with the MIT license text in the monorepo root).

&lt;/details>