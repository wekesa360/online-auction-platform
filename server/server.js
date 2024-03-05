import express from 'express';
import morgan from 'morgan'; // Logging library
import cors from 'cors'; // CORS middleware
import connectDB from './helpers/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import errorHandler from './helpers/error-handler.js'; // Error handling middleware
import config from './config.js'; // Configuration module

const app = express();
const PORT = config.port || 3000;

// Connect to MongoDB
connectDB();

// Logging middleware
app.use(morgan('combined'));

// CORS middleware
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/api/v1/auth', authRoutes);

// Define user routes
app.use('/api/v1/user', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});