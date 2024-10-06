
// src/pages/UserList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../components/UserForm';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/ Modal';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch users from API
    const loadUsers = async () => {
        try {
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // Add user using API
    const handleAddUser = async (newUser) => {
        try {
            const response = await createUser(newUser);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Edit user using API
    const handleEditUser = async (updatedUser) => {
        try {
            await updateUser(updatedUser.id, updatedUser); // Update user in API
            setUsers((prevUsers) =>
                prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
            );
            setShowModal(false);
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    // Delete user using API
    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) return;

        try {
            await deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const openAddModal = () => {
        setCurrentUser(null); // Clear the form for adding a new user
        setIsEditMode(false);
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setCurrentUser(user); // Load user data into the form
        setIsEditMode(true);
        setShowModal(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <button onClick={openAddModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Add User
            </button>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Email</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Phone</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'}`}>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <Link to={`/user/${user.id}`} className="text-blue-600">
                                        {user.name}
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.phone}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => openEditModal(user)}
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserForm
                        user={currentUser} // Pass the current user data to the form
                        onSubmit={isEditMode ? handleEditUser : handleAddUser} // Toggle between Add and Edit
                        onClose={() => setShowModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default UserList;
