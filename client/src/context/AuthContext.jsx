import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (form) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);
      const userData = {
        role: res.data.role,
        username: res.data.username
      };

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      toast.error("Login failed. Please check your credentials.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
