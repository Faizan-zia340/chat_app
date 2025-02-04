


import Swal from 'sweetalert2';
import  { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../database/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = (e) => {
        setIsLoading(true);
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                const uid = response.user.uid;
                const userData = { fullName, email, uid };
                localStorage.setItem("userId", uid);
                await setDoc(doc(db, "users", uid), userData);
                setIsLoading(false);

                Swal.fire({
                    icon: "success",
                    title: "Signup Completed!",
                    text: "Do you want to continue?",
                });
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error during signup:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setIsLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Welcome to ChatApp</h1>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {isLoading ? (
                            <div className="w-full flex justify-center py-2 px-4 rounded">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" className='h-6 w-6' alt="Loading" />
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Sign Up
                            </button>
                        )}
                    </div>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
