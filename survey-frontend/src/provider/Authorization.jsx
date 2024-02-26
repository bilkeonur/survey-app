import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Unauthorized from "@/pages/dashboard/Unauthorized";
import { useAuth } from "@/provider/AuthProvider";

const Authorization = ({ element, permissions }) => {
  const { loginData } = useAuth();
  const location = useLocation();
  
  if (loginData.permissions.length != 0) {
    const userPermission = loginData.permissions;
    const isAllowed = permissions.some((allowed) =>
      userPermission.includes(allowed)
    );

    return isAllowed ? element : <Unauthorized />;
  }

  return <Navigate to='/auth/signin' state={{ path: location.pathname }} replace />;
};

export default Authorization;
