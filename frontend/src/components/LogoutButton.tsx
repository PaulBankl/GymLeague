
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function LogoutButton() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
       await logout();
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="bg-surface-2 border border-border rounded-md p-2 pl-4 pr-4 ">
            Logout
        </button>
    );
}