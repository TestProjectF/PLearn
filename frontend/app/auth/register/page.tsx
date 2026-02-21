'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { email, password, role });
            setError(null);
            router.push('/auth/login'); // Redirect đến login sau register
        } catch (err) {
            setError('Registration failed or server error');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
                    Register
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
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   focus:border-green-500 font-medium"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 
                   rounded-lg text-gray-900 placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   focus:border-green-500 font-medium"
                />

                <select
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value as 'student' | 'teacher')
                    }
                    className="w-full px-4 py-2 mb-4 border border-gray-300 
                   rounded-lg text-gray-900 font-medium 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   focus:border-green-500"
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white font-semibold 
                   py-2 rounded-lg hover:bg-green-700 
                   transition duration-200"
                >
                    Register
                </button>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    Have account?{" "}
                    <a
                        href="/auth/login"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}