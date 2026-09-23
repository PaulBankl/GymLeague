import { useState } from "react";
import { register } from "../services/Userservice";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        if(username.trim() === "" || password.trim() === "" || email.trim() === "") {
            alert("All fields are required.");
            return;
        }
        if(username.length < 3 || username.length > 20) {
            alert("Username must be between 3 and 20 characters long.");
            return;
        }
        if(password.length < 5 || password.length > 100) {
            alert("Password must be between 5 and 100 characters long.");
            return;
        }
        if(email.length === 0) {
            alert("Email is required.");
            return;
        }
        event.preventDefault();
        const success = await register(username, password, email);
                if (success) {
                    navigate("/login");
                } else {
                    alert("Failed to register user.");
                }
        }
        return (
            <div>
                <h1>Register</h1>
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
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>
            </div>
        );
    }
