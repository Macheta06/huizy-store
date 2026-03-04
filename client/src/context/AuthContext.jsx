// client/src/context/AuthContext.jsx
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      try {
        const decodedToken = jwtDecode(currentToken);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
        } else {
          // CAMBIO AQUÍ: Mapeamos los campos planos del nuevo JWT
          setUser({
            id: decodedToken.id,
            name: decodedToken.name,
            isAdmin: decodedToken.isAdmin,
          });
          setToken(currentToken);
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const loginAction = (newToken) => {
    setLoading(true);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decodedToken = jwtDecode(newToken);
    setUser({
      id: decodedToken.id,
      name: decodedToken.name,
      isAdmin: decodedToken.isAdmin,
    });
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
