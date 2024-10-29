// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userEmail = localStorage.getItem('userEmail'); // Retrieve email from local storage

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`http://localhost:5000/api/users/profile?email=${userEmail}`);
                setUserData(response.data.user);
            } catch (error) {
                setError('Error loading profile.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) fetchUserData();
        else setError("User email not found. Please log in again.");
    }, [userEmail]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await axios.put(`http://localhost:5000/api/users/profile?email=${userEmail}`, userData);
            setSuccess('Profile updated successfully.');
        } catch (error) {
            setError('Error updating profile.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 px-4 py-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-500 transition duration-200"
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
