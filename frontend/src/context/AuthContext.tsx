import { createContext, useContext, useEffect, useState } from "react";
import * as Userservice from "../services/Userservice";


const AuthContext = createContext<string | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const username = Userservice.getUser();
}