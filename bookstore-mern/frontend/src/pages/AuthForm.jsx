import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../AuthForm.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/signup';
            const response = await axios.post(url, formData);
            
            if (response.status === 200 || response.status === 201) {
                // Store the user's email in localStorage on successful login or signup
                if (response.data && response.data.user && response.data.user.email) {
                    localStorage.setItem('userEmail', response.data.user.email);
                }
                
                // Navigate to home page
                navigate('/home');
            }
        } catch (err) {
            setError('Authentication failed. Please check your credentials.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">{isLogin ? 'Login' : 'Signup'}</h2>
            <div className="auth-toggle">
                <button
                    className={!isLogin ? 'active' : ''}
                    onClick={() => { setIsLogin(false); setError(''); }}
                >
                    Signup
                </button>
                <button
                    className={isLogin ? 'active' : ''}
                    onClick={() => { setIsLogin(true); setError(''); }}
                >
                    Login
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="auth-input"
                        value={formData.name}
                        onChange={handleChange}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="auth-input"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="auth-input"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" className="auth-button">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            {error && <div className="auth-error">{error}</div>}
        </div>
    );
};

export default AuthForm;
