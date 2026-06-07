import mongoose from 'mongoose';

export let dbConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    const error = new Error('MONGODB_URI is not defined in environment variables');
    error.statusCode = 500;
    throw error;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { 
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 2000,
    });
    dbConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    dbConnected = false;
    console.error('MongoDB Connection Error:', err.message);
    // Rethrow to be caught by the initialization logic
    throw err;
  }
};
