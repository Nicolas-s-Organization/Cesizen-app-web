import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "./Spinner";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <Spinner />;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default ProtectedRoute;