import { createContext  } from "react";



type AuthContextType = {
    username: string | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({ username: null, loading: true, refreshUser: async () => {}, logout: async () => {} });

