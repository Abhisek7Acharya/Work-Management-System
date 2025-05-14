import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'   
// This component checks if the user is authenticated by checking the token in the context.
// If the token is not present, it redirects the user to the login page.
const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}
export default ProtectedRoute
// This component checks if the user is authenticated by checking the token in the context.