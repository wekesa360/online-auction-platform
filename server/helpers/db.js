import mongoose from 'mongoose';
import config from '../config.js';

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Set the maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Set the server selection timeout
      socketTimeoutMS: 45000, // Set the socket timeout
    };

    await mongoose.connect(config.mongoDBUri, options);
    console.log('Connected to MongoDB');

    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Automatically reconnect if the connection is lost
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected, trying to reconnect...');
      connectDB();
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;