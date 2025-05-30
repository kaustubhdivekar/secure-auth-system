```markdown
# To-Let Globe

**Version: 1.0.0**
**Last Updated: May 30, 2025**

This repository contains the complete source code for To-Let Globe, a full-stack application designed for property listings and tenant/landlord interactions. Structured as a monorepo, it features a robust Node.js/Express.js backend and a dynamic React.js/JavaScript frontend. The system includes comprehensive user authentication, secure data handling, and essential communication features like a contact form with persistent storage.

---

## 🚀 Project Overview

To-Let Globe is built to facilitate the renting and leasing process, providing a secure, flexible, and modern platform for users. It showcases a decoupled backend API and a responsive React frontend, demonstrating best practices in JWT handling, email-based account management, secure data processing, and integrated communication features. The frontend implements a sleek dark theme with cyan/gold accents, aligning with modern UI/UX principles.

---

## ✨ Features

### Backend Highlights
* **User Authentication:** Secure user registration with `bcryptjs` hashing, JWT-based login/session management.
* **Account Management:** Email verification with unique, expiring tokens; robust password reset functionality.
* **Authorization:** Role-Based Access Control (RBAC) middleware for protected API routes.
* **Data Handling:** Centralized error handling, input validation (`express-validator`).
* **Security:** `helmet` for HTTP header security, `express-rate-limit` for brute-force protection.
* **Communication:** Integrated email service (Nodemailer) for verification, password resets, and contact form confirmations/notifications.
* **Contact Form Module:**
    * **Persistent Storage:** Saves all contact messages securely to MongoDB.
    * **Automated Notifications:** Sends a confirmation email to the user upon submission and a notification email to the configured admin address.
* **CORS Configuration:** Seamless cross-origin communication between frontend and backend.

### Frontend Highlights
* **User Interface:** User-friendly forms for Registration, Login, Forgot Password, and Reset Password, adhering to a modern dark theme with distinct cyan/gold accents.
* **User Experience:** Client-side routing with React Router, JWT stored in `localStorage` for automatic API authentication, global authentication state management via React Context.
* **Protected Routes:** Ensures only authenticated and authorized users can access specific areas.
* **Dashboard:** Personalized user dashboard for profile management.
* **Notifications:** React Toastify for clear user feedback and alerts.
* **Responsiveness:** Designed to provide a seamless experience across various devices.
* **Property Display (Future):** Layouts and initial components for displaying property listings.
* **Add Property (Future):** User interface elements for adding new property listings.

---

## 💻 Tech Stack

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **ODM:** Mongoose (for MongoDB interaction)
* **Authentication:** `jsonwebtoken`, `bcryptjs`
* **Email:** Nodemailer
* **Validation:** `express-validator`
* **Security:** `helmet`, `express-rate-limit`
* **Environment:** `dotenv`

### Frontend
* **Library/Framework:** React.js
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **API Client:** Axios
* **Forms:** React Hook Form
* **State Management:** React Context API
* **UI Notifications:** React Toastify
* **Icons:** React Icons
* **Styling:** CSS Modules, Global CSS with Variables

### Database
* **MongoDB:** NoSQL database (hosted via MongoDB Atlas for cloud accessibility).

### Deployment
* **Backend:** Render
* **Frontend:** Vercel

---

## 📂 Monorepo Structure

```

to-let-globe/
├── backend/                  \# Node.js Express.js Backend Application
│   ├── config/               \# Database connection, security configs
│   ├── controllers/          \# Business logic for routes
│   ├── middleware/           \# Auth, error handling, rate limiting
│   ├── models/               \# Mongoose schemas (User, Contact, etc.)
│   ├── routes/               \# API endpoint definitions
│   ├── utils/                \# Email service, JWT helpers
│   ├── .env.example          \# Example environment variables for backend
│   ├── package.json          \# Backend dependencies and scripts
│   └── server.js             \# Main backend entry point
├── frontend/                 \# React.js Frontend Application
│   ├── public/               \# Static assets
│   ├── src/                  \# React source code
│   │   ├── assets/           \# Images, custom SVGs
│   │   ├── components/       \# Reusable UI components
│   │   ├── contexts/         \# React Context for global state (e.g., Auth)
│   │   ├── hooks/            \# Custom React hooks
│   │   ├── pages/            \# Page-level components (Login, Dashboard, Contact)
│   │   ├── services/         \# API integration services
│   │   └── styles/           \# Global CSS, theme variables, CSS modules
│   │   ├── App.jsx           \# Main application component with routing
│   │   └── main.jsx          \# Application entry point
│   ├── .env.example          \# Example environment variables for frontend
│   ├── index.html            \# Main HTML page
│   ├── package.json          \# Frontend dependencies and scripts
│   └── vite.config.js        \# Vite build configuration
├── .gitignore                \# Global Git ignore rules
└── README.md                 \# This file (Monorepo Root README)

````

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js:** v18.x or later (includes npm).
* **Git:** Download & Install Git.
* **A MongoDB Atlas account:** Sign up for a free tier.
* **A Render account:** Sign up for a free tier.
* **A Vercel account:** Sign up for a free tier.
* **A transactional email service provider** (e.g., SendGrid, Mailgun for production emails) or [Ethereal.email](https://ethereal.email/) for development testing.

---

## 🚀 Local Development Setup

Follow these steps to get the To-Let Globe application running on your local machine.

### 1. Clone the Repository

First, clone the monorepo to your local machine:

```bash
git clone [https://github.com/your-username/to-let-globe.git](https://github.com/your-username/to-let-globe.git)
cd to-let-globe
````

**Note:** Replace `your-username` with your actual GitHub username.

### 2\. Environment Variables Setup

You will need to set up `.env` files for both the backend and frontend applications separately. These files will contain sensitive information and local configurations.

#### Backend Environment (`backend/.env`)

Navigate into the backend directory:

```bash
cd backend
```

Copy the example environment file:

```bash
cp .env.example .env
```

Open the newly created `.env` file and fill in your details:

  * **`MONGODB_URI`**: Your MongoDB Atlas connection string.
  * **`JWT_SECRET`**: A very strong, random secret string for JWT signing.
  * **`ETHEREAL_USER`, `ETHEREAL_PASS`**: Your Ethereal.email credentials for development emails.
  * **`ADMIN_EMAIL`**: An email address to receive contact form notifications (can be another Ethereal.email for dev).
  * **`FRONTEND_URL`**: `http://localhost:5173` (for local frontend development).

#### Frontend Environment (`frontend/.env`)

Navigate into the frontend directory (from the backend directory, use `cd ../frontend`, or from the root, use `cd frontend`):

```bash
cd ../frontend # or cd frontend
```

Copy the example environment file:

```bash
cp .env.example .env
```

Open the newly created `.env` file and fill in your details:

  * **`VITE_API_BASE_URL`**: `http://localhost:5001/api` (assuming your backend runs on port 5001).

### 3\. Install Dependencies & Run Services

You will need two separate terminal windows/tabs: one for the backend and one for the frontend.

#### Backend Setup

In your first terminal, navigate to the backend directory:

```bash
cd to-let-globe/backend
```

Install dependencies:

```bash
npm install
```

Run the backend server:

```bash
npm run dev
```

The backend server will typically run on `http://localhost:5001`.

#### Frontend Setup

In your second terminal, navigate to the frontend directory:

```bash
cd to-let-globe/frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend development server:

```bash
npm run dev
```

The frontend application will typically be available at `http://localhost:5173`.

### 4\. Access the Application

Once both services are running, open your web browser and go to: `http://localhost:5173`

-----

## 🗺️ API Endpoints Overview

The backend exposes RESTful APIs under the `/api` prefix.

  * `POST /api/auth/register` - User registration
  * `POST /api/auth/login` - User login
  * `GET /api/auth/verify-email/:token` - Email verification
  * `POST /api/auth/forgot-password` - Request password reset link
  * `POST /api/auth/reset-password/:token` - Reset password
  * `GET /api/auth/me` - Get current user's profile (Protected)
  * `POST /api/contact` - Submit a contact form message

(Refer to the `backend/README.md` for more detailed API documentation.)

-----

## 🔑 Key Frontend Pages

  * **Home Page (`/`)**: The main landing page for To-Let Globe (as per UI design).
  * **Login (`/login`)**: User authentication.
  * **Register (`/register`)**: New user account creation.
  * **Forgot Password (`/forgot-password`)**: Initiate password reset.
  * **Reset Password (`/reset-password/:token`)**: Complete password reset.
  * **Email Verification Status (`/verify-email`)**: Page to confirm email verification.
  * **Dashboard (`/dashboard`)**: Protected area for authenticated users.
  * **Contact Us (`/contact`)**: Form to send messages to administrators.

-----

## 🔒 Environment Variables Details

Refer to the `.env.example` files in both `backend/` and `frontend/` directories for a complete list and their descriptions.

**Important:** Never commit your actual `.env` files to Git. Use `.env.example` for templating.

-----

## 🚀 Deployment Instructions

This project is set up for continuous deployment with Render for the backend and Vercel for the frontend.

### 1\. MongoDB Atlas Setup

1.  Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Create a new cluster (the free M0 tier is sufficient).
3.  **Configure Network Access:** Add your current IP address (for local development) and `0.0.0.0/0` (Allow Access From Anywhere - be cautious in production, narrow this down if possible).
4.  **Configure Database Access:** Create a new database user with a strong username and password. Grant "Read and write to any database" privileges.
5.  **Get your Connection String:** Go to "Databases", click "Connect" for your cluster, choose "Connect your application," select Node.js driver, and copy the connection string. Replace `<username>`, `<password>`, and `myFirstDatabase` (or your chosen DB name) in the string. This is your `MONGODB_URI`.

### 2\. Backend Deployment (Render)

1.  Push your code to GitHub/GitLab/Bitbucket. (Ensure your `to-let-globe` repository is pushed).
2.  Sign up/log in to [Render](https://render.com/).
3.  Click "New +" and select "Web Service".
4.  Connect your Git repository.
5.  Configure the service:
      * **Name:** `to-let-globe-backend`
      * **Region:** Choose a region close to your users or database.
      * **Branch:** `main` (or your deployment branch).
      * **Root Directory:** `backend` (crucial for monorepos).
      * **Build Command:** `npm install`
      * **Start Command:** `npm start` (or `node server.js`)
      * **Environment:** Node
      * **Environment Variables:** Add all necessary variables from your `backend/.env` file.
          * `NODE_ENV`: `production`
          * `MONGODB_URI`: Your MongoDB Atlas connection string.
          * `JWT_SECRET`: A very strong, random secret.
          * `JWT_EXPIRES_IN`: e.g., `1h`
          * `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM_NAME`, `EMAIL_FROM_ADDRESS`: Your production email service credentials.
          * `ADMIN_EMAIL`: Your production admin email.
          * `FRONTEND_URL`: Initially, leave this blank or use a placeholder. You'll update it with your Vercel frontend URL after deployment.
      * Select the Free instance type if applicable.
6.  Click "Create Web Service". Render will build and deploy your backend. Note the `.onrender.com` URL provided.

### 3\. Frontend Deployment (Vercel)

1.  Push your code to GitHub/GitLab/Bitbucket.
2.  Sign up/log in to [Vercel](https://vercel.com/).
3.  Click "Add New..." and select "Project".
4.  Import your Git repository.
5.  Configure the project:
      * **Project Name:** `to-let-globe-frontend`
      * Vercel usually auto-detects React (Vite) projects.
      * **Root Directory:** `frontend` (crucial for monorepos).
      * **Build Command:** Should be auto-detected as `npm run build` or `vite build`.
      * **Output Directory:** Should be auto-detected as `dist`.
      * **Environment Variables:**
          * `VITE_API_BASE_URL`: Set this to your deployed Render backend URL (e.g., `https://to-let-globe-backend.onrender.com/api`).
6.  Click "Deploy". Vercel will build and deploy your frontend. Note the `.vercel.app` URL provided.

### 4\. Post-Deployment Updates

1.  **Update Render Backend:** Go back to your `to-let-globe-backend` service on Render. Update the `FRONTEND_URL` environment variable to your Vercel frontend URL (e.g., `https://to-let-globe-frontend.vercel.app`). Trigger a redeploy on Render.
2.  **Verify Deployment:** Open your Vercel frontend URL. Test all functionalities, especially login, registration, and the contact form, to ensure seamless communication with the deployed backend and database.

-----

## ✅ Testing

  * **Backend:** Unit and integration tests are written using Jest and Supertest.
      * Run tests: `npm test` in the `backend/` directory.
  * **Frontend:** (If implemented) Component and integration tests can be written using Vitest/Jest and React Testing Library.
      * Run tests: `npm test` in the `frontend/` directory.

-----

## 📐 Code Quality & Conventions

  * **Linters & Formatters:** ESLint and Prettier are configured for both backend and frontend to maintain code consistency and quality.
      * Run `npm run lint` to check for errors.
      * Run `npm run format` to automatically format code.
  * **Commit Messages:** Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for a clear and automated changelog-friendly commit history (e.g., `feat: Add contact form`, `fix: Resolve email sending error`).
  * **Branching Strategy:** A Gitflow-like model (feature branches, `develop`, `main`) is recommended for organized development.

-----

## 👋 Contributing

Contributions are welcome\! Please fork the repository, create a feature branch, make your changes, and submit a pull request. Ensure your code adheres to the project's linting rules and testing standards.

-----

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file in the monorepo root for details.

```
```