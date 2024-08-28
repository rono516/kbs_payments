import {Navigate} from "react-router-dom";
import AuthService from "../../../core/access-control/AuthService";
export const ProtectedRoute = ({ children }) => {
    if (!AuthService.check()) {
        return <Navigate to="/auth/login" replace />;
    }
    return children;
};
