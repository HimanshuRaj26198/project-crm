import { Navigate } from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "../store/AuthStore";

export const AuthGuard = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
    console.log("USer in AuthGuard", user)
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
