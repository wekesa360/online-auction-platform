import express from 'express';
import morgan from 'morgan'; // Logging library
import cors from 'cors'; // CORS middleware
import connectDB from './helpers/db.js';
import http from 'http';
import { Server } from "socket.io";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import auctionRoutes from './routes/auction.js';
import auctioneerRoutes from './routes/auctioneer.js';
import bidRoutes from './routes/bid.js';
import errorHandler from './helpers/error-handler.js'; // Error handling middleware
import config from './config.js'; // Configuration module


const app = express();
const server = http.createServer(app);
const io = new Server(server);


const PORT = config.port || 3000;

connectDB();

// Logging middleware
//app.use(morgan('combined'));

// CORS middleware
app.use(cors());

// Parse JSON request body
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/an', auctionRoutes);
app.use('/api/v1/bd', bidRoutes);
app.use('/api/v1/au', auctioneerRoutes);

// Error handling middleware
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}
);
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export {app, io}