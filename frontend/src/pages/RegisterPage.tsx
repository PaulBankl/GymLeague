import { useState } from "react";
import { register } from "../services/Userservice";
import { Link, useNavigate } from "react-router-dom";


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
        if(password.length < 5 || password.length > 50) {
            alert("Password must be at least 5 characters long.");
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
            <div className="flex  flex-col items-center h-screen">
                <h1 className="text-3xl font-bold mb-4 mt-[10vw] text-[clamp(48px,10vw,72px)]">Register</h1>
                <form onSubmit={handleSubmit} className="flex items-center flex-col items-center h-screen">

                    <label htmlFor="username" className="mb-2 block font-body text-[13px] font-medium text-muted self-start">
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} className="bg-surface-2 border-border rounded-md p-2 mb-4 w-[80vw] md:w-[35vw] "
                    />

                    <label htmlFor="password" className="mb-2 block font-body text-[13px] font-medium text-muted self-start" >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} className="bg-surface-2 border border-border rounded-md p-2 mb-4 w-[80vw] md:w-[35vw]"
                    />
                    <label htmlFor="email" className="mb-2 block font-body text-[13px] font-medium text-muted self-start">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} className="bg-surface-2 border border-border rounded-md p-2 mb-4 w-[80vw] md:w-[35vw]"
                    />

                    <button type="submit" className="bg-accent border border-border rounded-md p-2 mb-4 w-[80vw] hover:bg-accent-dim md:w-[35vw] " >
                        Register
                    </button>
                    <Link to="/login" className="">
                        Already have an account? Login
                    </Link>
                </form>
            </div>
        );
    }
