'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.replace('/auth/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-600 font-medium">Checking authentication...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
                    Welcome to Dashboard
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    You are logged in.
                </p>

                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        router.replace('/auth/login');
                    }}
                    className="w-full bg-red-600 text-white font-semibold 
                     py-2 rounded-lg hover:bg-red-700 
                     transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}