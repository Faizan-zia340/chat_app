import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import Navbar from "../components/navbar"; // Adjust import path as needed
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../database/firebase.config'; // Adjust import path as needed

const defaultImg = "https://cdn.dribbble.com/users/1210339/screenshots/2767019/avatar18.gif"; // Default profile image

export default function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true); // To manage loading state
    const users = getAuth().currentUser; // Get the current authenticated user

    useEffect(() => {
        const getUserData = async () => {
            if (users) {
                const uid = users.uid; // Get the user ID from Firebase Auth
                const docSnap = await getDoc(doc(db, "users", uid));
                if (docSnap.exists()) {
                    setUserInfo(docSnap.data());
                } else {
                    console.error("No such user document!");
                }
            } else {
                console.error("No user is currently logged in.");
            }
            setLoading(false); // Set loading to false once data is fetched
        };

        getUserData();
    }, [users]); // Dependency on user state

    // Show loading state until data is fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex justify-center items-center flex-col p-5'>
            <Navbar />

            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <img src={userInfo?.img || defaultImg} alt="Profile" className="h-32 w-32 object-cover rounded-full mb-4" />
                
                <h2 className="text-xl font-semibold mb-2">
                    Full Name: {users?.fullName || 'N/A'}
                </h2>
                
                <h3 className="text-md text-gray-600 mb-2">
                    Email: {users?.email || 'N/A'} {/* Display user's email from Firebase Auth */}
                </h3>

                <p className="text-sm text-gray-500">
                    UID: {users?.uid || 'N/A'}
                </p>

                {/* Add any other user details here */}
            </div>
        </div>
    );
}
