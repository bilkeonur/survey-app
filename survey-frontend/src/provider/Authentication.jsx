import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";

const Authentication = ({ children }) => {
  const { loginData } = useAuth();
  const location = useLocation();

  if (loginData.token == "") {
    return <Navigate to="/auth/signin" state={{ path: location.pathname }} />;
  }

  return children;
};

export default Authentication;