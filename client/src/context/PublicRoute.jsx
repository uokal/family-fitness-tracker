import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
