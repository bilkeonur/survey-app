import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/profile";
  
  const [loginData, setLoginData] = useState({ token: "", permissions: [] });

  const login = (token) => {
    setLoginData({ token: token, 
      permissions: [
        "AnswerTypeManagement", 
        "CreateOrganization", 
        "OrganizationManagement",
        "SurveyManagement"]});
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
    navigate(redirectPath, { replace: true });
  };

  const logout = () => {
    setLoginData({ token: "", permissions: [] });
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
  };

  return (
    <AuthContext.Provider value={{ loginData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};