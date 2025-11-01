import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../components/Database/Firebase";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  // If user is not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
