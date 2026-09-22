import React from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/App.css";
  import { createContext,useEffect, useState } from "react";
  import * as Userservice from "./services/Userservice";
import { AuthProvider } from './context/AuthContext';

  
function App() {

  
  
  


  return (
    <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
   
  )
}

export default App
