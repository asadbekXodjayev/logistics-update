import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_TOKEN } from '../../lib/auth';

/**
 * For local simulation:
 * We consider the user "Logged In" if the localStorage 'token'
 * matches the token derived from the env credentials.
 */
const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    // Check if we are in a browser environment and get the token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Validate the token against the env-sourced credentials
    if (!token || token !== AUTH_TOKEN) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;