import { useAuthContext } from './Context/authcontext';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const { authUser } = useAuthContext();
    if (!authUser) {
        return <Navigate to="/login" />;
    }
    return children;
};
export default ProtectedRoute;