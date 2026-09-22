import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Link } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { username, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!username || username.length === 0) {
        return <div>You need to be logged in to view this page. <Link to="/login">Login</Link></div>;
        
    }

    return <>{children}</>;
}