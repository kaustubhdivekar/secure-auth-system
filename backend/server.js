// 1. Import Core Modules
const express = require('express'); // Express framework for building web applications
const dotenv = require('dotenv');   // For loading environment variables from a .env file
const cors = require('cors');       // For enabling Cross-Origin Resource Sharing
const authRoutes = require('./routes/authRoutes'); // Import the auth router
const contactRoutes = require('./routes/contactRoutes'); // Import the contact router
const blogRoutes = require('./routes/blogRoutes'); // Import the blog router
const { errorHandler } = require('./middleware/errorMiddleware'); // Import the error router
const rateLimit = require('express-rate-limit'); // Import express rate limit
const helmet = require('helmet');
const morgan = require('morgan');

// 2. Load Environment Variables
// This line loads variables from a .env file into process.env
// Should be done early, especially before database connections or port configurations
dotenv.config({ path: './.env' }); // By default, it looks for a .env file in the root of the project

// 3. Import Database Connection Function (we'll create this soon)
const connectDB = require('./config/db');

// 4. Initialize Express Application
const app = express(); // Creates an instance of the Express application

// Secure HTTP headers
app.use(helmet()); // Sets various HTTP headers to help protect your app

// 5. Connect to Database
connectDB(); // Call the function to establish MongoDB connection

// 6. Middleware Setup
// Enable CORS for all routes and origins (for development).
// For production, you might want to configure specific origins.
// app.use(cors());
// Configure CORS
const allowedOrigins = [
    'http://localhost:5173', // Your frontend local development URL
    'http://localhost:3000', // Common for Create React App local dev
    'https://to-let-globe-kaustubh-divekar-projects.vercel.app/',
    'https://to-let-globe-mlwindwy0-kaustubh-divekar-projects.vercel.app/',
    'https://to-let-globe-rho.vercel.app' // Vercel frontend URL AFTER deployment
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
}));

// Express middleware to parse JSON request bodies.
// When the frontend sends JSON data (e.g., in a POST request),
// this middleware parses it and makes it available in `req.body`.
app.use(express.json());

// Express middleware to parse URL-encoded request bodies (e.g., from HTML forms).
// `extended: false` uses the querystring library (simpler).
app.use(express.urlencoded({ extended: false }));

// 7. Define a Simple Test Route
// A GET request to the root URL ('/') of our API
app.get('/', (req, res) => {
  // req: request object (contains info about the incoming request)
  // res: response object (used to send a response back to the client)
  res.status(200).json({ message: 'Welcome to the Secure Auth System API!' });
});

// 8. Define API Routes
// All routes defined in authRoutes.js will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
// Example: app.use('/api/users', require('./routes/userRoutes'));
// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
// app.use('/api', propertyRoutes); // Will be added later

// 9. Global Error Handling Middleware
app.use(errorHandler);


// 10. Define the Port
// Use the PORT environment variable if set, otherwise default to 5000.
// process.env.PORT allows the hosting provider to set the port.
const PORT = process.env.PORT || 5001; // Changed from PORT to BACKEND_PORT to avoid conflict with frontend

// Apply rate limiting to API routes to prevent abuse
// You can configure different limiters for different routes if needed
const apiLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' },
});

app.use('/api', apiLimiter); // Apply to all routes starting with /api

// For more sensitive routes like login or password reset, you might want stricter limits:
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // Limit each IP to 10 auth attempts per window
    message: { success: false, message: 'Too many authentication attempts from this IP, please try again after 10 minutes.' },
    skipSuccessfulRequests: true, // Don't count successful auths against the limit
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
// app.use('/api/auth/register', authLimiter); // Also consider for registration

// HTTP request logger middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // 'dev' format gives colored status codes for quick visual feedback
}

// 11. Start the Server
// The app.listen() function starts a UNIX socket and listens for connections on the specified path (or port).
// app.listen(PORT, () => {
//   console.log(`Backend server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
//   console.log('Press Ctrl+C to stop the server.');
// });
app.listen(PORT, () => {
    console.log(`Backend server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});