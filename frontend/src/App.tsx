import React from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/App.css";
  import { createContext,useEffect, useState } from "react";
  import * as Userservice from "./services/Userservice";

   export const AuthContext = createContext<string | undefined | null>(undefined);
function App() {

  const [username, setUsername] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function fetchUser() {
      const username = await Userservice.getUser();
      setUsername(username);
    }
    fetchUser();
  }, []);
  
  
  


  return (
    <AuthContext.Provider value={username}>
    <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
