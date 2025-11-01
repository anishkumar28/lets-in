import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../components/Database/Firebase";

const PublicRoute = ({ children }) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  // If user is already logged in → redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
