import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";

export default function DashboardPage() {
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users/me", {
                    credentials: "include",
                });

                if (!response.ok) {
                    setUsername(null);
                    return;
                }

                const username = await response.text();
                setUsername(username);
            } catch (error) {
                console.error("Failed to fetch username:", error);
                setUsername(null);
            }
        };

        fetchUsername();
    }, []);
    if (!username) {
        return <div>Loading...</div>;
    }
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