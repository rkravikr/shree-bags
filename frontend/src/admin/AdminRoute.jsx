import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const adminInfo = localStorage.getItem('adminInfo');
    const parsedInfo = adminInfo ? JSON.parse(adminInfo) : null;

    // Check if token exists
    if (!parsedInfo || !parsedInfo.token) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminRoute;
