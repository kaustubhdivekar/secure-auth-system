# TO-LET Frontend - Secure Authentication System  Frontend

**Version:** 1.0.0
**Last Updated:** May 23, 2025
**Primary Technologies:** React.js, JavaScript, Vite, React Router, Axios, React Hook Form
**UI Design:** Dark theme with cyan/gold gradient accents, matching the provided "TO-LET" login screen sample.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Tech Stack & Key Libraries](#tech-stack--key-libraries)
4.  [Design Philosophy](#design-philosophy)
5.  [Prerequisites](#prerequisites)
6.  [Getting Started](#getting-started)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
7.  [Available Scripts](#available-scripts)
8.  [Environment Variables](#environment-variables)
9.  [Project Structure](#project-structure)
10. [Key Components & Pages](#key-components--pages)
11. [API Integration](#api-integration)
12. [State Management](#state-management)
13. [Routing](#routing)
14. [Styling](#styling)
15. [Form Handling & Validation](#form-handling--validation)
16. [Code Quality](#code-quality)
17. [Deployment](#deployment)
18. [Troubleshooting](#troubleshooting)
19. [Contributing](#contributing)
20. [License](#license)

---

## 1. Project Overview 

This project is the frontend application for the "TO-LET" platform, providing a secure and user-friendly interface for a comprehensive authentication system. It allows users to register, log in, verify their email, manage their passwords, and access protected dashboard areas. The design is based on a modern dark theme with distinct cyan and gold gradient accents, as showcased in the provided login screen sample.

This frontend is built using React (with JavaScript) and Vite, designed to seamlessly integrate with its corresponding Node.js backend API.

---

## 2. Features 

* User Registration with role selection.
* User Login with email/username and password.
* JWT-based session management (token stored in `localStorage`).
* Email Verification flow.
* Forgot Password and Reset Password functionality.
* Protected routes and role-based content display (e.g., on Dashboard).
* User Dashboard to display profile information.
* Responsive design intended for modern browsers.
* User-friendly notifications for actions and errors.
* Consistent UI/UX based on the "TO-LET" design sample.

---

## 3. Tech Stack & Key Libraries 

* **Core:** React.js (v18+), JavaScript (ES6+)
* **Build Tool:** Vite
* **Routing:** React Router DOM (v6+)
* **API Client:** Axios
* **Form Management:** React Hook Form
* **State Management:** React Context API (for authentication state)
* **UI Notifications:** React Toastify
* **Icons:** React Icons
* **Styling:** CSS Modules, Global CSS with Variables
* **Code Quality:** ESLint, Prettier

---

## 4. Design Philosophy 

The UI is built around the provided login screen sample:
* **Theme:** Dark mode as the primary theme.
* **Accent Colors:** A distinctive gradient border using cyan (`#22d3ee`) and gold (`#f5b920`) for key form elements (Login, Register, etc.). Buttons and active states also utilize these accents.
* **Typography:** Clean, modern sans-serif font (e.g., Poppins).
* **Layout:** Centered content for authentication forms, clear navigation, and responsive structure.
* **Consistency:** The design elements (inputs, buttons, links, cards) from the login page are replicated across other authentication and application pages to ensure a cohesive user experience.

---

## 5. Prerequisites 

* Node.js (v18.x or later recommended - includes npm).
* A modern web browser (Chrome, Firefox, Edge, Safari).
* The corresponding [Backend API](link-to-your-backend-repo-readme-if-separate) must be running and accessible.

---

## 6. Getting Started 

### Backend Setup

Ensure the backend API server is running (typically on `http://localhost:5001`). Refer to the backend project's `README.md` for setup instructions.

### Frontend Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-frontend-repository-url>
    cd <frontend-project-folder>
    ```

2.  **Install dependencies:**
    Ensure you are in the `frontend` project root.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    * Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    * Edit the `.env` file in the `frontend` root. At a minimum, set the `VITE_API_BASE_URL` to point to your running backend API (e.g., `http://localhost:5001/api`). See [Environment Variables](#environment-variables) for more details.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173` (or the port Vite assigns).

---

## 7. Available Scripts 

In the `frontend` project directory, you can run the following scripts:

* `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
* `npm run build`: Builds the app for production to the `dist` folder.
* `npm run lint`: Lints the codebase using ESLint to check for errors and style issues.
* `npm run format`: Formats the code using Prettier.
* `npm run preview`: Serves the production build locally for testing.
* `npm test`: (If tests are configured - e.g., with Vitest) Runs the test suite.

---

## 8. Environment Variables 

Create a `.env` file in the `frontend` root based on `.env.example`. Vite requires environment variables exposed to the client to be prefixed with `VITE_`.

* `VITE_API_BASE_URL`: **Required.** The base URL for the backend API.
    * Example: `VITE_API_BASE_URL=http://localhost:5001/api`

*(Add any other frontend-specific environment variables here if needed.)*

---

## 9. Project Structure 

frontend/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, custom SVGs
│   ├── components/
│   │   ├── common/           # Button.jsx, InputField.jsx
│   │   ├── layout/           # Navbar.jsx, MainLayout.jsx, AuthLayout.jsx
│   │   └── ui/               # PasswordStrengthIndicator.jsx
│   ├── contexts/             # AuthContext.jsx
│   ├── hooks/                # useAuth.js (custom hook for AuthContext)
│   ├── pages/                # Page components (LoginPage.jsx, DashboardPage.jsx etc.)
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   └── Status/
│   │   └── HomePage.jsx
│   ├── services/             # apiService.js, authService.js
│   ├── styles/               # global.css, theme.css
│   ├── App.jsx               # Main application component with routing
│   └── main.jsx              # Application entry point
├── .env                      # Local environment variables (Git ignored)
├── .env.example              # Example environment variables
├── .eslintrc.cjs             # ESLint configuration
├── .gitignore
├── .prettierrc.json          # Prettier configuration
├── index.html                # Main HTML page for Vite
├── package.json
└── vite.config.js            # Vite configuration


---

## 10. Key Components & Pages 

* **`LoginPage.jsx`**: Implements the exact UI provided in the sample image, including the gradient border form, input fields with icons, and styled links/button.
* **`RegisterPage.jsx`**: Extends the login page design for user registration.
* **`ForgotPasswordPage.jsx` & `ResetPasswordPage.jsx`**: Password management forms following the established dark theme and gradient accent style.
* **`VerifyEmailPage.jsx`**: Handles the email verification token flow.
* **`DashboardPage.jsx`**: A protected route displaying user information, styled consistently.
* **`Navbar.jsx`**: Top navigation bar matching the sample UI's header elements.
* **`InputField.jsx` & `Button.jsx`**: Common components styled to match the sample UI for consistent forms and actions.
* **`AuthLayout.jsx`**: A layout component to center authentication forms and apply the distinctive gradient border theme.
* **`MainLayout.jsx`**: The main application layout including the `Navbar`.

---

## 11. API Integration 

* All backend API calls are managed through `src/services/authService.js`, which uses an `axios` instance configured in `src/services/apiService.js`.
* `apiService.js` includes:
    * Setting the `baseURL` from `VITE_API_BASE_URL`.
    * A request interceptor to automatically attach the JWT (from `localStorage`) to `Authorization` headers for authenticated requests.
    * A response interceptor to handle global errors (like `401 Unauthorized` for session expiry, triggering a logout).

---

## 12. State Management 

* **Global Authentication State:** Managed using React's Context API (`src/contexts/AuthContext.jsx`). This context provides:
    * `user` object (current authenticated user).
    * `token` (JWT).
    * `isAuthenticated` boolean flag.
    * `isLoading` boolean flag (for initial auth check).
    * `login()` and `logout()` methods.
* **Local Component State:** Managed using `useState` for form inputs (via React Hook Form), error messages, and UI toggles.

---

## 13. Routing 

* Client-side routing is handled by `react-router-dom`.
* Routes are defined in `src/App.jsx`, utilizing lazy loading for page components to improve initial load performance.
* **`ProtectedRoute.jsx`**: A higher-order component that checks authentication status (from `AuthContext`) and role (if specified) before allowing access to a route, redirecting to `/login` or `/unauthorized` as needed.

---

## 14. Styling 

* **Global Styles:** Defined in `src/styles/theme.css` (CSS variables for colors, fonts, spacing) and `src/styles/global.css` (base element styles, resets).
* **Component-Specific Styles:** CSS Modules (`*.module.css`) are used for scoping styles to individual components, preventing class name collisions.
* **Design Consistency:** The dark theme and accent colors (cyan/gold gradient) from the login UI sample are applied globally and to all components.

---

## 15. Form Handling & Validation 

* **React Hook Form** is used for all forms (Login, Register, Password Reset, etc.) for:
    * Performance and reduced re-renders.
    * Easy validation (required fields, patterns, custom validation).
    * Managing form state (submission status, errors).
* Client-side validation provides immediate feedback to the user.
* Backend API performs the definitive validation.

---

## 16. Code Quality 

* **ESLint:** Enforces JavaScript coding standards and catches potential errors. Configuration in `.eslintrc.cjs`.
* **Prettier:** Ensures consistent code formatting. Configuration in `.prettierrc.json`.
* Run `npm run lint` and `npm run format` regularly. Integration with VS Code for format-on-save is recommended.

---

## 17. Deployment 

1.  **Build the application:**
    ```bash
    npm run build
    ```
    This command compiles and optimizes the React application into static assets in the `dist/` directory.

2.  **Deploy static assets:**
    The `dist/` folder can be deployed to any static site hosting service, such as:
    * Netlify
    * Vercel
    * GitHub Pages
    * AWS S3 + CloudFront
    * Firebase Hosting

3.  **SPA Routing Configuration:**
    Ensure your hosting provider is configured to handle Single Page Application (SPA) routing. Typically, this involves redirecting all paths that are not static files to `index.html`, allowing React Router to manage the routes.
    * **Netlify:** Create a `public/_redirects` file with `/* /index.html 200`.
    * **Vercel:** Usually handles this automatically or via `vercel.json`.

---

## 18. Troubleshooting 

* **API Connection Issues:**
    * Ensure the backend server is running.
    * Verify `VITE_API_BASE_URL` in your `frontend/.env` file is correct and accessible.
    * Check browser console for CORS errors (ensure backend CORS is configured for your frontend origin, especially in production).
* **Login/Registration Fails:**
    * Check browser console for network errors or specific messages from the backend.
    * Verify payloads sent from the frontend match what the backend expects.
    * Ensure the backend database is connected and running.
* **Styling Issues:**
    * Ensure CSS Modules are imported correctly (e.g., `import styles from './MyComponent.module.css';`).
    * Check for CSS specificity conflicts or typos in class names.
    * Use browser developer tools to inspect elements and applied styles.
* **Environment Variables Not Working:**
    * Ensure frontend environment variables are prefixed with `VITE_`.
    * Restart the Vite development server (`npm run dev`) after changing `.env` files.

---

## 19. Contributing 

Contributions are welcome! Please follow these general guidelines:
1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes, adhering to the existing code style and conventions.
4.  Write tests for any new functionality (if applicable).
5.  Ensure `npm run lint` and `npm run format` pass without errors.
6.  Commit your changes with clear, descriptive messages.
7.  Push to your feature branch and open a Pull Request against the `main` (or `develop`) branch of the original repository.

---

## 20. License 

This project is licensed under the **MIT License**. (You would create a `LICENSE` file with the MIT license text in your project root).