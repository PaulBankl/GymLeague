import { useContext, useState } from "react";
import { login } from "../services/Userservice";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const { refreshUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        

        try {
            await login(username, password);
                    await refreshUser();
                    navigate("/app");
               
            
        }catch  {
            setError("An error occurred during login. Please try again.");
        }
        
    }
    return (
        <div className="flex  flex-col items-center h-screen">
            <h1 className="text-3xl font-bold mb-4 mt-[10vw] text-[clamp(48px,10vw,72px)]">Login</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="flex items-center flex-col items-center h-screen">

                <label htmlFor="username" className="mb-2 block font-body text-[13px] font-medium text-muted self-start">
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-surface-2 border-border rounded-md p-2 mb-4 w-[80vw] md:w-[35vw] "
                />

                <label htmlFor="password" className="mb-2 block font-body text-[13px] font-medium text-muted self-start">
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-surface-2 border-border rounded-md p-2 mb-4 w-[80vw] md:w-[35vw] "
                />

                <button type="submit" className="bg-accent border border-border rounded-md p-2 mb-4 w-[80vw] hover:bg-accent-dim md:w-[35vw] ">
                    Login
                </button>
                <Link to="/register" >
                    Don't have an account? Register
                </Link>
            </form>
        </div>
    );
}
