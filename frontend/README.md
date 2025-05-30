```markdown
# To-Let Globe Frontend

**Version: 1.0.0**
**Last Updated: May 30, 2025**
**Primary Technologies: React.js, JavaScript, Vite, React Router, Axios, React Hook Form**
**UI Design: Modern dark theme with distinctive cyan/gold gradient accents.**

---

📄 Table of Contents

* [1. Project Overview](#-1-project-overview)
* [2. Features](#-2-features)
* [3. Tech Stack & Key Libraries](#-3-tech-stack--key-libraries)
* [4. Design Philosophy](#-4-design-philosophy)
* [5. Prerequisites](#-5-prerequisites)
* [6. Getting Started](#-6-getting-started)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
* [7. Available Scripts](#-7-available-scripts)
* [8. Environment Variables](#-8-environment-variables)
* [9. Project Structure](#-9-project-structure)
* [10. Key Components & Pages](#-10-key-components--pages)
* [11. API Integration](#-11-api-integration)
* [12. State Management](#-12-state-management)
* [13. Routing](#-13-routing)
* [14. Styling](#-14-styling)
* [15. Form Handling & Validation](#-15-form-handling--validation)
* [16. Code Quality](#-16-code-quality)
* [17. Deployment](#-17-deployment)
* [18. Troubleshooting](#-18-troubleshooting)
* [19. Contributing](#-19-contributing)
* [20. License](#-20-license)

---

🚀 1. Project Overview

This project is the **frontend application** for the To-Let Globe platform, providing a secure, intuitive, and user-friendly interface for property listings and user management. It empowers users to register, log in, verify their email, manage their passwords, and access protected dashboard areas. Additionally, it includes a dedicated contact form for direct communication with administrators.

Built with **React (JavaScript)** and **Vite**, this frontend is designed for seamless integration with its corresponding Node.js/Express.js backend API. The UI follows a modern dark theme, highlighted by distinct cyan and gold gradient accents, as depicted in the provided design samples.

---

✨ 2. Features

### User Authentication & Authorization:

* Secure **User Registration** with role selection.
* **User Login** with email/username and password.
* **JWT-based session management** (`localStorage`).
* **Email Verification** flow.
* **Forgot Password** and **Reset Password** functionality.
* **Protected routes** and role-based content display (e.g., on Dashboard).

### User Interface & Experience:

* **User Dashboard** to display profile information.
* **Contact Form:** Dedicated page for users to send inquiries, feedback, or support requests, with confirmation.
* **Responsive design** for optimal viewing across various devices.
* User-friendly notifications for actions and errors (React Toastify).
* Consistent UI/UX based on the "To-Let Globe" design samples.

### Property Management (Future Enhancements):

* Dedicated sections and initial UI components for displaying property listings.
* User interface elements for adding new property listings (for property owners/agents).

---

💻 3. Tech Stack & Key Libraries

* **Core:** React.js (v18+), JavaScript (ES6+)
* **Build Tool:** Vite
* **Routing:** React Router DOM (v6+)
* **API Client:** Axios
* **Form Management:** React Hook Form
* **State Management:** React Context API (for global authentication state)
* **UI Notifications:** React Toastify
* **Icons:** React Icons
* **Styling:** CSS Modules, Global CSS with Variables
* **Code Quality:** ESLint, Prettier

---

🎨 4. Design Philosophy

The UI design is inspired by the provided "To-Let Globe" design samples, particularly the login screen:

* **Theme:** Dark mode serves as the primary aesthetic.
* **Accent Colors:** A distinctive gradient border and key interactive elements (buttons, active states) utilize a vibrant combination of **cyan (`#22d3ee`)** and **gold (`#f5b920`)**.
* **Typography:** Clean, modern sans-serif fonts (e.g., Poppins) ensure readability.
* **Layout:** Authentication forms feature centered content with clear structure. The overall application maintains a responsive layout.
* **Consistency:** Design elements such as inputs, buttons, links, and cards are consistently applied across all authentication and main application pages to ensure a cohesive user experience.

---

🧱 5. Prerequisites

Before setting up the frontend, ensure you have:

* **Node.js** (v18.x or later recommended, includes npm).
* A modern web browser (Chrome, Firefox, Edge, Safari).
* The corresponding To-Let Globe Backend API must be running and accessible (locally or deployed).

---

🚀 6. Getting Started

### Backend Setup

The frontend relies on the backend API. Please ensure the backend server is running (typically on `http://localhost:5001` for local development). Refer to the [main monorepo README](../README.md) or the dedicated [Backend README](../backend/README.md) for detailed backend setup instructions.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    If you've cloned the monorepo, move into the `frontend` folder:

    ```bash
    cd to-let-globe/frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Open the newly created `.env` file in the frontend root and set the `VITE_API_BASE_URL` to point to your running backend API.
    * **Local Backend Example:** `VITE_API_BASE_URL=http://localhost:5001/api`
    * **Deployed Backend Example:** `VITE_API_BASE_URL=https://to-let-globe-backend.onrender.com/api` (replace with your actual Render URL)

4.  **Run the development server:**

    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

---

📜 7. Available Scripts

In the frontend project directory, you can run the following npm scripts:

* `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
* `npm run build`: Builds the application for production into the `dist` folder.
* `npm run lint`: Runs ESLint to check for code quality and style issues.
* `npm run format`: Formats the code using Prettier.
* `npm run preview`: Serves the production build locally for testing purposes.
* `npm test`: (If configured with Vitest/Jest) Executes the test suite.

---

⚙️ 8. Environment Variables

Create a `.env` file in the frontend root based on `.env.example`. All environment variables exposed to the client-side by Vite must be prefixed with `VITE_`.

* **`VITE_API_BASE_URL`**: **Required.** The base URL for the backend API.
    * Example: `VITE_API_BASE_URL=http://localhost:5001/api`

---

🌳 9. Project Structure

```
frontend/
├── public/                 # Static assets (e.g., favicons, manifest.json)
├── src/
│   ├── assets/             # Images, custom SVGs, fonts
│   ├── components/
│   │   ├── common/         # Reusable basic UI elements (Button, InputField, etc.)
│   │   ├── layout/         # Layout components (Navbar, MainLayout, AuthLayout)
│   │   └── ui/             # Specific UI components (PasswordStrengthIndicator)
│   ├── contexts/           # React Context API providers (e.g., AuthContext)
│   ├── hooks/              # Custom React hooks (e.g., useAuth)
│   ├── pages/              # Top-level page components
│   │   ├── Auth/           # Authentication-related pages (Login, Register, etc.)
│   │   ├── Dashboard/      # User dashboard pages
│   │   ├── Status/         # Pages for verification/error status
│   │   └── HomePage.jsx    # Main landing page
│   ├── services/           # API integration logic (apiService, authService)
│   ├── styles/             # Global CSS, theme variables, CSS Modules
│   ├── App.jsx             # Main application component with routing setup
│   └── main.jsx            # Application entry point
├── .env                    # Local environment variables (Git ignored)
├── .env.example            # Template for environment variables
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore
├── .prettierrc.json        # Prettier configuration
├── index.html              # Main HTML file for Vite
├── package.json            # Frontend dependencies and scripts
└── vite.config.js          # Vite build configuration
```

---

🌟 10. Key Components & Pages

* **`HomePage.jsx`**: The main landing page, incorporating sections like Welcome, Services, About Us, Our Mission, Hiring Partners, Top Locations, and Partnered Universities, consistent with the overall "To-Let Globe" design vision.
* **`LoginPage.jsx`**: Implements the exact UI provided in the design sample, featuring the distinctive gradient border form, input fields with icons, and styled links/buttons.
* **`RegisterPage.jsx`**: Extends the login page design for new user account creation.
* **`ForgotPasswordPage.jsx`** & **`ResetPasswordPage.jsx`**: Forms for password management, maintaining the established dark theme and gradient accent style.
* **`VerifyEmailPage.jsx`**: Handles the email verification token flow, displaying status to the user.
* **`DashboardPage.jsx`**: A protected route that displays authenticated user information, styled consistently.
* **`ContactPage.jsx`**: A new page containing the contact form, allowing users to send messages.
* **`Navbar.jsx`**: Top navigation bar that aligns with the sample UI's header elements and project branding.
* **`InputField.jsx`** & **`Button.jsx`**: Common, reusable UI components styled to match the design samples for consistent forms and actions across the application.
* **`AuthLayout.jsx`**: A layout component responsible for centering authentication forms and applying the distinctive gradient border theme around them.
* **`MainLayout.jsx`**: The primary application layout, which includes the Navbar and wraps most application pages.

---

🔗 11. API Integration

All communication with the backend API is centralized through `src/services/authService.js` and `src/services/apiService.js`.

* **`src/services/apiService.js`** configures an `axios` instance with:
    * `baseURL` dynamically set from `VITE_API_BASE_URL`.
    * A request interceptor to automatically attach the JWT (retrieved from `localStorage`) to the `Authorization` header for all authenticated requests.
    * A response interceptor to handle global errors (e.g., `401 Unauthorized` responses indicating session expiry, triggering an automatic logout).

---

🔄 12. State Management

* **Global Authentication State:** Managed efficiently using React's **Context API** (`src/contexts/AuthContext.jsx`). This context provides:
    * The `user` object (representing the currently authenticated user).
    * The `token` (JWT for API authentication).
    * An `isAuthenticated` boolean flag.
    * An `isLoading` boolean flag (for the initial authentication check).
    * `login()` and `logout()` methods to manage user sessions.
* **Local Component State:** Handled using React's `useState` hook for managing form inputs (leveraging React Hook Form), displaying error messages, and controlling UI toggles.

---

🛣️ 13. Routing

Client-side routing is powered by `react-router-dom`.

* Routes are comprehensively defined in `src/App.jsx`, utilizing lazy loading for page components to optimize initial load performance.
* **`ProtectedRoute.jsx`**: A higher-order component that intelligently checks the authentication status (from `AuthContext`) and user role (if specified) before granting access to a route. It redirects unauthenticated users to `/login` or unauthorized users to `/unauthorized` as needed.

---

💅 14. Styling

* **Global Styles:** Defined in `src/styles/theme.css` (for CSS variables managing colors, fonts, and spacing) and `src/styles/global.css` (for base HTML element styles and resets).
* **Component-Specific Styles:** **CSS Modules** (`*.module.css`) are utilized for scoping styles to individual components, effectively preventing class name collisions and ensuring maintainability.
* **Design Consistency:** The overarching dark theme and the distinctive accent colors (cyan/gold gradient) from the design samples are applied consistently across the entire application and all components.

---

📝 15. Form Handling & Validation

**React Hook Form** is the chosen library for all forms (Login, Register, Password Reset, Contact, etc.) due to its benefits in:

* Optimized performance and reduced re-renders.
* Easy and flexible validation (required fields, pattern matching, custom validation rules).
* Efficient management of form state (submission status, error messages).
* Client-side validation provides immediate feedback to the user, enhancing the user experience.
* The backend API performs the definitive server-side validation to ensure data integrity and security.

---

📏 16. Code Quality

* **ESLint:** Configured to enforce JavaScript coding standards and proactively identify potential errors. The configuration is found in `.eslintrc.cjs`.
* **Prettier:** Ensures consistent code formatting across the entire codebase, eliminating style debates. The configuration is in `.prettierrc.json`.

It is highly recommended to run `npm run lint` and `npm run format` regularly. Integrating these commands with your VS Code setup (e.g., format-on-save) is strongly encouraged for a streamlined development workflow.

---

🚀 17. Deployment

1.  **Build the application:**

    ```bash
    npm run build
    ```
    This command compiles and optimizes the React application, generating production-ready static assets within the `dist/` directory.

2.  **Deploy static assets:**
    The generated `dist/` folder can be deployed to any static site hosting service, such as:
    * Vercel (recommended, as configured in the monorepo root)
    * Netlify
    * GitHub Pages
    * AWS S3 + CloudFront
    * Firebase Hosting

3.  **SPA Routing Configuration:**
    Ensure your chosen hosting provider is configured to handle **Single Page Application (SPA) routing** correctly. This typically involves redirecting all paths that are not direct static file requests to `index.html`, allowing React Router to manage the client-side routes.
    * **Vercel:** Usually handles this automatically, or it can be configured via a `vercel.json` file if needed.
    * **Netlify:** Create a `public/_redirects` file with the rule: `/* /index.html 200`.

---

⁉️ 18. Troubleshooting

### API Connection Issues:

* Verify that the backend server is actively running.
* Confirm that `VITE_API_BASE_URL` in your `frontend/.env` file is correctly set and points to an accessible backend URL (e.g., `http://localhost:5001/api` for local development or your deployed Render URL for production).
* Check your browser's developer console for any **Cross-Origin Resource Sharing (CORS)** errors. Ensure your backend's CORS configuration allows requests from your frontend's origin, especially in production environments.

### Login/Registration Failures:

* Examine the browser console for network errors or specific error messages returned from the backend API.
* Verify that the data payloads sent from the frontend forms exactly match the expectations of the backend API.
* Ensure that the backend database is connected and fully operational.

### Styling Discrepancies:

* Confirm that CSS Modules are imported correctly (e.g., `import styles from './MyComponent.module.css';`).
* Check for potential CSS specificity conflicts or typographical errors in class names.
* Utilize your browser's developer tools to inspect elements and trace the applied styles.

### Environment Variables Not Loading:

* Ensure that all frontend environment variables intended for client-side use are correctly prefixed with `VITE_`.
* Always restart the Vite development server (`npm run dev`) after making any changes to your `.env` files.

---

🤝 19. Contributing

Contributions are highly encouraged and welcome! Please follow these general guidelines to contribute to the project:

1.  **Fork the repository.**
2.  **Create a new feature branch:** `git checkout -b feature/your-feature-name`
3.  **Make your changes:** Adhere to the existing code style and conventions.
4.  **Write tests:** Implement tests for any new functionality you introduce (if applicable).
5.  **Ensure code quality:** Run `npm run lint` and `npm run format` to ensure your code passes checks and is consistently formatted.
6.  **Commit your changes:** Use clear, descriptive, and conventional commit messages.
7.  **Push to your feature branch:** `git push origin feature/your-feature-name`
8.  **Open a Pull Request:** Submit a Pull Request against the `main` (or `develop`) branch of the original repository.

---

⚖️ 20. License

This project is licensed under the MIT License. For full details, please refer to the `LICENSE` file located in the monorepo root directory.
```