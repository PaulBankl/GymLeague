import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate} from "react-router-dom";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { username, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!username || username.length === 0) {
        return <Navigate to="/login" />;
        
    }

    else{
        return <>{children}</>;
    }

}