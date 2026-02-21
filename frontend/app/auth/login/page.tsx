'use client'; // Đây là client component để dùng state và event

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Để redirect sau login

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            setError(null);
            router.push('/dashboard'); // Redirect đến dashboard
        } catch (err) {
            setError('Invalid credentials or server error');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
                    Login
                </h2>

                {error && (
                    <p className="text-red-600 mb-4 text-sm font-medium">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 
                   rounded-lg text-gray-900 placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 font-medium"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 
                   rounded-lg text-gray-900 placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 font-medium"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white font-semibold 
                   py-2 rounded-lg hover:bg-blue-700 
                   transition duration-200"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    No account?{" "}
                    <a
                        href="/auth/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}