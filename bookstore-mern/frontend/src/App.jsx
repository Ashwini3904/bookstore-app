// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AuthForm from './pages/AuthForm';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/auth" element={<AuthForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<UserProfile />} /> {/* Add Profile Route */}
            </Routes>
        </Router>
    );
};

export default App;
