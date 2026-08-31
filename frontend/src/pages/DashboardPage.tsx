import { useEffect } from "react";
import {getUser} from "../services/Userservice";
import { Link } from "react-router-dom";

export default function DashboardPage() {
    const username = sessionStorage.getItem("username");
    useEffect(() => {
    getUser(username);
}, []);
    return (
        <div>
            <h1>Welcome back {username}!</h1>
            <p>Welcome to the dashboard!</p>
            <Link to="/exercises">Go to Exercises</Link>
            <br />
            <Link to="/communities">Go to Communities</Link>
        </div>
    );
}