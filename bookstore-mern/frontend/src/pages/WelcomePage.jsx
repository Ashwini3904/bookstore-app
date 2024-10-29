// src/pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../WelcomePage.css'; // Import the CSS file

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/auth');
    };

    return (
        <div className="welcome-page">
            <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Welcome to Book Store Management
                </h1>
                <p className="text-gray-600 mb-6">
                    Discover and manage your favorite books with ease. Click below to get started!
                </p>
                <button
                    onClick={handleGetStarted}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-500 transition duration-200"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
