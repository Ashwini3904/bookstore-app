// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [stockFilter, setStockFilter] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data.data);
                setFilteredBooks(response.data.data);
            } catch (error) {
                console.log('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const results = books.filter((book) =>
            book.Title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter === '' || book.Book_category === categoryFilter) &&
            (ratingFilter === '' || book.Star_rating === ratingFilter) &&
            (stockFilter === '' || (stockFilter === 'In stock' ? book.Stock === 'In stock' : book.Stock === 'Out of stock'))
        );
        setFilteredBooks(results);
    }, [searchTerm, categoryFilter, ratingFilter, stockFilter, books]);

    const categories = [...new Set(books.map(book => book.Book_category))];
    const ratings = [...new Set(books.map(book => book.Star_rating))];

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 font-semibold text-gray-800'>Books List</h1>
                <Link to='/profile'>
                    <MdOutlineAccountCircle className='text-green-600 text-4xl hover:text-green-500 transition duration-200' />
                </Link>
            </div>

            <div className='flex flex-col md:flex-row gap-4 mb-4'>
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border p-2 rounded-md w-full md:w-1/3 focus:border-green-400'
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className='border p-2 rounded-md w-full md:w-1/3 focus:border-green-400'
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className='border p-2 rounded-md w-full md:w-1/3 focus:border-green-400'
                >
                    <option value="">All Ratings</option>
                    {ratings.map((rating) => (
                        <option key={rating} value={rating}>{rating}</option>
                    ))}
                </select>
                <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className='border p-2 rounded-md w-full md:w-1/3 focus:border-green-400'
                >
                    <option value="">All Stock</option>
                    <option value="In stock">In Stock</option>
                    <option value="Out of stock">Out of Stock</option>
                </select>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2 text-left'>
                    <thead>
                        <tr className='bg-green-600 text-white'>
                            <th className='p-2 rounded-md'>No</th>
                            <th className='p-2 rounded-md'>Title</th>
                            <th className='p-2 rounded-md'>Category</th>
                            <th className='p-2 rounded-md'>Rating</th>
                            <th className='p-2 rounded-md'>Price</th>
                            <th className='p-2 rounded-md'>Stock</th>
                            <th className='p-2 rounded-md'>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book, index) => (
                                <tr key={book._id} className='odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition duration-150'>
                                    <td className='p-2 text-center'>{index + 1}</td>
                                    <td className='p-2'>{book.Title}</td>
                                    <td className='p-2'>{book.Book_category}</td>
                                    <td className='p-2'>{book.Star_rating}</td>
                                    <td className='p-2'>{`$${book.Price.toFixed(2)}`}</td>
                                    <td className='p-2'>{book.Stock}</td>
                                    <td className='p-2'>{book.Quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className='text-center py-4 text-gray-500'>No books available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
