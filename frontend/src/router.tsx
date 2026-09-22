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
import AllCommunityPage from './pages/AllCommunityPage';
import PublicCommunityDetailPage from './pages/PublicCommunityDetailPage';
import ProtectedRoute from './ProtectedRoute';


export const router = createBrowserRouter([
  {
    path: "/",
    element:
    <ProtectedRoute>
     <HomePage />
     </ProtectedRoute>
  },
  {
    path: "/register",
    element:
     <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/app",
    element:
     <ProtectedRoute>
       <DashboardPage />
     </ProtectedRoute>
  },
  {
    path: "/community",
    element: 
    <ProtectedRoute>
      <CommunityOverviewPage />
    </ProtectedRoute>
  },
  {
    path: "/exercises",
    element: 
    <ProtectedRoute>
      <ExerciseOverviewPage />
    </ProtectedRoute>
  },
  {
    path: "/exercises/:id",
    element:
     <ProtectedRoute>
       <ExerciseDetailPage/>
     </ProtectedRoute>
  },
  {
    path: "/community/:id",
    element: 
    <ProtectedRoute>
      <CommunityDetailPage/>
    </ProtectedRoute>
  },
  {
    path: "/community/all",
    element:<ProtectedRoute>
     <AllCommunityPage/>
    </ProtectedRoute>
  },
  
  {
    path: "/community/public/:id",
    element: <ProtectedRoute>
      <PublicCommunityDetailPage />
    </ProtectedRoute>
  }
]);


