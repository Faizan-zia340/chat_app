// import Swal from 'sweetalert2';
// import React, { useState } from 'react';
// import { auth } from '../database/firebase.config';
// import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [resetEmail, setResetEmail] = useState('');
//     const [showResetModal, setShowResetModal] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         signInWithEmailAndPassword(auth, email, password)
//             .then(async (response) => {
//                 const uid = response.user.uid;
//                 localStorage.setItem("userId", uid);
//                 setIsLoading(false);
//                 Swal.fire({
//                     icon: "success",
//                     title: "Login Completed!",
//                 });
//                 navigate('/home');
//             })
//             .catch((error) => {
//                 console.error("Error during login:", error);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: error.message,
//                 });
//                 setIsLoading(false);
//             });
//     };

//     const handleResetPassword = (e) => {
//         e.preventDefault();
//         sendPasswordResetEmail(auth, resetEmail)
//             .then(() => {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Check your email!",
//                     text: "A password reset link has been sent to your email address.",
//                 });
//                 setShowResetModal(false);
//             })
//             .catch((error) => {
//                 console.error("Error sending password reset email:", error);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: error.message,
//                 });
//             });
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg transform scale-110 origin-center">
//                 <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>
//                     <div className="flex items-center justify-between">
//                         {isLoading ? (
//                             <div className="w-full flex justify-center py-2 px-4 rounded">
//                                 <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" className='h-6 w-6' alt="Loading" />
//                             </div>
//                         ) : (
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                             >
//                                 Sign In
//                             </button>
//                         )}
//                     </div>
//                 </form>
//                 <p className="text-center text-gray-600 text-sm mt-6">
//                     <a href="#" onClick={() => setShowResetModal(true)} className="text-blue-500 hover:text-blue-700">Forgot password?</a>
//                 </p>
//                 <p className="text-center text-gray-600 text-sm mt-6">
//                     Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a>
//                 </p>

//                 {/* Password Reset Modal */}
//                 {showResetModal && (
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
//                         <div className="bg-white p-6 rounded-lg">
//                             <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
//                             <form onSubmit={handleResetPassword}>
//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resetEmail">
//                                         Email
//                                     </label>
//                                     <input
//                                         type="email"
//                                         id="resetEmail"
//                                         value={resetEmail}
//                                         onChange={(e) => setResetEmail(e.target.value)}
//                                         className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter your email to reset"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowResetModal(false)}
//                                         className="w-1/2 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="w-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
//                                     >
//                                         Send Reset Link
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Login;

import Swal from 'sweetalert2';
import { useState } from 'react';
import { auth } from '../database/firebase.config';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                const uid = response.user.uid;
                localStorage.setItem("userId", uid);
                setIsLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Login Completed!",
                });
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error during login:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setIsLoading(false);
            });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Check your email!",
                    text: "A password reset link has been sent to your email address.",
                });
                setShowResetModal(false);
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Welcome to ChatApp</h1>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
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
                                Sign In
                            </button>
                        )}
                    </div>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    <a href="#" onClick={() => setShowResetModal(true)} className="text-blue-500 hover:text-blue-700">Forgot password?</a>
                </p>
                <p className="text-center text-gray-600 text-sm mt-6">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a>
                </p>

                {showResetModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
                            <form onSubmit={handleResetPassword}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resetEmail">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="resetEmail"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your email to reset"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setShowResetModal(false)}
                                        className="w-1/2 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                                    >
                                        Send Reset Link
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
