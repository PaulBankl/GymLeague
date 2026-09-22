import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import { AuthContext } from "../context/AuthContext";


export default function DashboardPage() {
    const { username } = useContext(AuthContext);
    return (
        <div>
            <h1>Welcome back {username}!</h1>
            <p>Welcome to the dashboard!</p>
            <Link to="/exercises">Go to Exercises</Link>
            <br />
            <Link to="/community">Go to Communities</Link>
            <br>
            </br>
            <LogoutButton />
        </div>
    );
}