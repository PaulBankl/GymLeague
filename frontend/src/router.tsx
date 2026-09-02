import React from 'react'
import { createBrowserRouter, Link, } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ExerciseOverviewPage from "./pages/ExerciseOverviewPage";
import DashboardPage from "./pages/DashboardPage";
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import CommunityOverviewPage from './pages/CommunityOverviewPage';
import CommunityDetailPage from './pages/CommunityDetailPage';


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
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/app",
    element: <DashboardPage />
  },
  {
    path: "/community",
    element: <CommunityOverviewPage />
  },
  {
    path: "/exercises",
    element: <ExerciseOverviewPage />
  },
  {
    path: "/exercises/:id",
    element: <ExerciseDetailPage/>
  },
  {
    path: "/community/:id",
    element: <CommunityDetailPage/>
  }
]);


