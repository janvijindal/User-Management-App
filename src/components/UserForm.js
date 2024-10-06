
import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: ''
        },
        company: {
            name: ''
        },
        website: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: {
                    street: user.address?.street || '',
                    suite: user.address?.suite || '',
                    city: user.address?.city || '',
                    zipcode: user.address?.zipcode || ''
                },
                company: {
                    name: user.company?.name || ''
                },
                website: user.website || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressKey = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressKey]: value
                }
            }));
        } else if (name.startsWith('company.')) {
            const companyKey = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                company: {
                    ...prevData.company,
                    [companyKey]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = user ? { ...user, ...formData } : formData;
        onSubmit(updatedUser);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div>
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>

            {/* Address Section */}
            <div>
                <label className="block text-gray-700">Street</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700">Suite</label>
                <input
                    type="text"
                    name="address.suite"
                    value={formData.address.suite}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700">City</label>
                <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700">Zip Code</label>
                <input
                    type="text"
                    name="address.zipcode"
                    value={formData.address.zipcode}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Company Section */}
            <div>
                <label className="block text-gray-700">Company</label>
                <input
                    type="text"
                    name="company.name"
                    value={formData.company.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Website Field */}
            <div>
                <label className="block text-gray-700">Website</label>
                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {user ? 'Update' : 'Add'} User
                </button>
            </div>
        </form>
    );
};

export default UserForm;
