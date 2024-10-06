
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDetails = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <p>User not found.</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                    <h1 className="text-5xl text-center text-blue-600 font-bold mb-6">User Details</h1>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Name: <span className="font-medium">{user.name}</span>
                        </h2>
                        <p className="text-gray-700 text-lg"><strong>Email:</strong> {user.email}</p>
                        <p className="text-gray-700 text-lg"><strong>Phone:</strong> {user.phone}</p>
                        
                        {/* Address Section */}
                        <p className="text-gray-700 text-lg">
                            <strong>Address:</strong> {user?.address?.street}, {user?.address?.suite}, {user?.address?.city}, {user?.address?.zipcode}
                        </p>
                        
                        {/* Company Section */}
                        <p className="text-gray-700 text-lg"><strong>Company:</strong> {user.company.name}</p>
                        
                        <p className="text-gray-700 text-lg">
                            <strong>Website:</strong> 
                            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                {user.website}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
