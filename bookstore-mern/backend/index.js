// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js'; // Import book routes

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/bookstore';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/books', bookRoutes); // Book routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
