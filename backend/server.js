// 1. Import Core Modules
const express = require('express'); // Express framework for building web applications
const dotenv = require('dotenv');   // For loading environment variables from a .env file
const cors = require('cors');       // For enabling Cross-Origin Resource Sharing
const authRoutes = require('./routes/authRoutes'); // Import the auth router
const { errorHandler } = require('./middleware/errorMiddleware'); // Import the error router


// 2. Load Environment Variables
// This line loads variables from a .env file into process.env
// Should be done early, especially before database connections or port configurations
dotenv.config(); // By default, it looks for a .env file in the root of the project

// 3. Import Database Connection Function (we'll create this soon)
const connectDB = require('./config/db');

// 4. Initialize Express Application
const app = express(); // Creates an instance of the Express application

// 5. Connect to Database
connectDB(); // Call the function to establish MongoDB connection

// 6. Middleware Setup
// Enable CORS for all routes and origins (for development).
// For production, you might want to configure specific origins.
app.use(cors());

// Express middleware to parse JSON request bodies.
// When the frontend sends JSON data (e.g., in a POST request),
// this middleware parses it and makes it available in `req.body`.
app.use(express.json());

// Express middleware to parse URL-encoded request bodies (e.g., from HTML forms).
// `extended: false` uses the querystring library (simpler).
app.use(express.urlencoded({ extended: false }));

// 7. Define a Simple Test Route
// A GET request to the root URL ('/') of our API
app.get('/api', (req, res) => {
  // req: request object (contains info about the incoming request)
  // res: response object (used to send a response back to the client)
  res.status(200).json({ message: 'Welcome to the Secure Auth System API!' });
});

// 8. Define API Routes
// All routes defined in authRoutes.js will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
// Example: app.use('/api/users', require('./routes/userRoutes'));

// 9. Global Error Handling Middleware
app.use(errorHandler);


// 10. Define the Port
// Use the PORT environment variable if set, otherwise default to 5000.
// process.env.PORT allows the hosting provider to set the port.
const PORT = process.env.BACKEND_PORT || 5001; // Changed from PORT to BACKEND_PORT to avoid conflict with frontend

// 11. Start the Server
// The app.listen() function starts a UNIX socket and listens for connections on the specified path (or port).
app.listen(PORT, () => {
  console.log(`Backend server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server.');
});