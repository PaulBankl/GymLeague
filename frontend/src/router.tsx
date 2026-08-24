import React from 'react'
import { createBrowserRouter, Link, } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";


export const router = createBrowserRouter([
  {
    path:"/",
    element: <HomePage />
  },
  {path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/app",
    element: <div>
      <h1>GymLeague</h1>
    </div>,
  },
  {path: "/register",
    element: <div>Register</div>
  },
  {path: "/login",
    element: <div>Login</div>
  },
  {
    path: "/app",
    element: <div>
      <h1>App</h1>
    </div>
  }
]);


