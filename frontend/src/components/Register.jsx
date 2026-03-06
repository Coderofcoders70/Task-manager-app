import { useState } from 'react';
import API from '../services/api';

const Register = ({ setToken, toggleView }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/register', formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userName', data.name);
            setToken(data.token);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>
                {error && <p className="text-red-300 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <input className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none" type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    <input className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none" type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition">Register</button>
                </form>
                <p className="text-indigo-100 text-center mt-6">
                    Already have an account? <button onClick={toggleView} className="underline font-semibold">Login</button>
                </p>
            </div>
        </div>
    );
};

export default Register;