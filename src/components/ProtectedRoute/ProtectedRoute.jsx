import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// These are your locally defined credentials
const ADMIN_LOGIN = 'logistics@admin.com';
const ADMIN_PASSWORD = 'Logistics123@#';

/**
 * For local simulation:
 * We consider the user "Logged In" if the localStorage 'token'
 * matches a combination of the credentials.
 */
const VALID_TOKEN = btoa(`${ADMIN_LOGIN}:${ADMIN_PASSWORD}`);

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    // Check if we are in a browser environment and get the token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Validate the token against our local constants
    if (!token || token !== VALID_TOKEN) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;