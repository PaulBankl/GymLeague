
import { useNavigate } from "react-router-dom";
import { logout } from "../services/Userservice";

export function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const success = await logout();

        if (success) {
            navigate("/login");
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}