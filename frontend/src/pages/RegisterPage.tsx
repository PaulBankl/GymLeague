import { useState } from "react";
import { register } from "../services/Userservice";



export default function RegisterPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        register(username, password, email)
            .then(response => {
                if (response.ok) {
                    alert("User registered successfully!");
                } else {
                    alert("Failed to register user.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while registering the user.");
            });
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
