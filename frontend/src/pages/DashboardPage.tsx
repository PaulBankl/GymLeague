import { useContext} from "react";

import { Link } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import { AuthContext } from "../context/AuthContext";


export default function DashboardPage() {
    const { username } = useContext(AuthContext);
    return (
        <div className ="flex flex-col items-center h-screen mt-[10vw]">
            <h1 className="font-heading text-[clamp(48px,10vw,72px)] text-center font-black tracking-[-2px]">Welcome back <br></br>{username}!</h1>
            <p className="text-muted">Welcome to the dashboard!</p>
            <Link to="/exercises" className="font-heading mt-[2vh] md:text-[clamp(24px,5vw,36px)]">
                Go to Exercises
            </Link>
            <br />
            <Link to="/community" className="font-heading md:text-[clamp(24px,5vw,36px)]">Go to Communities</Link>
            <br>
            </br>
            <LogoutButton />
        </div>
    );
}