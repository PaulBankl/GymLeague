import React from 'react'
import { createBrowserRouter, Link, } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/app",
    element: <div>
      <h1>GymLeague</h1>
    </div>,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/app",
    element: <div>
      <h1>App</h1>
    </div>
  }
]);


