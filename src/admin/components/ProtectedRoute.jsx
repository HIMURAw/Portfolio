import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAdminLoggedIn } = useAuth();

    if (!isAdminLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return children ? children : <Outlet />;
};


export default ProtectedRoute;
