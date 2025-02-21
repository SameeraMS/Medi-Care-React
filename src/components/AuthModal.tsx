import React, { useState } from 'react';
import { X, Mail, Phone, Lock, User } from 'lucide-react';
import axios from '../utils/axios'; // Import Axios instance

interface AuthModalProps {
    onClose: () => void;
    onSuccess: (user: { email: string; name: string }) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Sign Up function
    const handleSignUp = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/users', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            onSuccess({ email: response.data.user.email, name: response.data.user.name });
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('email', response.data.user.email);
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
        setLoading(false);
    };

    // Sign In function
    const handleSignIn = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/users/login', {
                email: formData.email,
                password: formData.password
            });

            onSuccess({ email: response.data.user.email, name: response.data.user.name });
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('email', response.data.user.email);
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
        setLoading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isSignUp ? handleSignUp() : handleSignIn();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl w-full max-w-lg p-10 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
                    {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {isSignUp && (
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {isSignUp && (
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-transform duration-300 transform hover:scale-105 font-bold text-lg"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 hover:text-blue-700 font-semibold">
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
}
