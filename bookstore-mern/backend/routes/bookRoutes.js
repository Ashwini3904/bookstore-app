// routes/bookRoutes.js
import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Route to get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books
    res.status(200).json({ data: books }); // Wrap in "data" as expected by the frontend
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
});

export default router;
