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
          setUser(decodedToken.user);
          setToken(currentToken);
        }
      } catch (error) {
        // Si el token es inválido o malformado, lo registramos y deslogueamos al usuario.
        console.error("Token inválido encontrado en localStorage:", error);
        logout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const loginAction = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decodedToken = jwtDecode(newToken);
    setUser(decodedToken.user);
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
