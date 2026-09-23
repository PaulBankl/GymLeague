import { createContext,  useEffect, useState } from "react";
import * as Userservice from "../services/Userservice";


type AuthContextType = {
    username: string | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({ username: null, loading: true, refreshUser: async () => {}, logout: async () => {} });

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