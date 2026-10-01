import { useContext, useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as Userservice from "../services/Userservice";

export default function HomePage() {
  const { username} = useContext(AuthContext);
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(false);
    
    useEffect(() => {
        async function checkServerHealth() {
            const response = await Userservice.checkHealth();
            if (!response) {
                setServerError(true);
            }
        }
        checkServerHealth();
    }, []);

    if(serverError) {
        return (
            <div>
              <h1 className="text-2xl font-bold">Server is currently offline</h1>
            </div>
        );
    }



    if (username && username.length > 0) {
        navigate("/app");
        
    }
  return (
    <div className="flex flex-col items-center mt-[5vh] h-screen">
        <h1 className="font-heading text-[clamp(22px,10vw,72px)] text-center font-black tracking-[-2px]">GymLeague</h1>
        <p className="text-center text-muted">Log into your account or create one if you don't have one.</p>
        <Link to="/register" className="bg-accent border border-border text-center mt-3 rounded-md p-2 mb-4 w-[50vw] hover:bg-accent-dim md:w-[25vw] ">Register</Link>
        <br></br>
        <Link to="/login" className="bg-accent border border-border text-center mt-3 rounded-md p-2 mb-4 w-[50vw] hover:bg-accent-dim md:w-[25vw] ">Login</Link>
    </div>
  );
}

