import { useContext, useState } from "react";
import { login } from "../services/Userservice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { refreshUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const success = await login(username, password);

        if (success) {
            if (success) {
                await refreshUser();
                navigate("/app");
            }
        } else {
            alert("Failed to login user.");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="username">
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
}
