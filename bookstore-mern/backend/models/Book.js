// models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: String, required: true },
  quantity: { type: Number, required: true }
});

// Ensure that we don’t overwrite the model if it already exists
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;
