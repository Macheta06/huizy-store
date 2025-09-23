// client/src/context/AuthContext.jsx
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// 1. Importa el contexto desde el archivo de hooks
import { AuthContext } from "../hooks/useAuth";

// 2. Este archivo ahora solo exporta el componente
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token")); // Lee desde el inicio

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
      }
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
    <AuthContext.Provider value={{ user, token, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
