import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initFirebase } from './config/firebase.js';
import { ensureSeeded } from './utils/ensureSeeded.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    await ensureSeeded();
  } catch (err) {
    const isDev = process.env.NODE_ENV !== 'production';
    if (!isDev) {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    }
    console.warn(`MongoDB unavailable (${err.message}). Using in-memory API data for development.`);
    console.warn('Install and start MongoDB for persistent storage, or run: npm run seed');
  }

  initFirebase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
