import {  useEffect, useState } from "react";
import * as Userservice from "../services/Userservice";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        refreshUser();
    }, []);

    async function refreshUser() {
    try {
        const username = await Userservice.getUser();
        setUsername(username);
    } catch (error) {
        console.error("Failed to fetch user:", error);
        setUsername(null);
    } finally {
        setLoading(false);
    }
}

async function logout() {
    await Userservice.logout();
    setUsername(null);
}
    return (
    <AuthContext.Provider value={{ username, loading, refreshUser, logout}}>
        {children}
    </AuthContext.Provider>
);
}