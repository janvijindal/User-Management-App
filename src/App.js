
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    {/* Route for listing users */}
                    <Route path="/" element={<UserList />} />
                    
                    {/* Route for viewing user details */}
                    <Route path="/user/:id" element={<UserDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
