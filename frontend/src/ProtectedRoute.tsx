import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { username, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!username || username.length === 0) {
        navigate("/login");
        
    }

    return <>{children}</>;
}