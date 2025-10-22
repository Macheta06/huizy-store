// client/src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const API_URL = import.meta.env.VITE_API_URL || "";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }
      // Si el login es exitoso, guarda el token y redirige al inicio
      loginAction(data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow"
      >
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-3 rounded hover:bg-teal-700"
        >
          Entrar
        </button>
        <div className="mt-6 text-center text-sm">
          <Link
            to="/forgot-password"
            /*Ruta placeholder*/ className="text-teal-600 hover:underline mr-4"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/register" className="text-teal-600 hover:underline">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
